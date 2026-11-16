-- HypeCheck: atomic report entitlements (free tier + paid credits).
--
-- Problem this fixes: /api/hypecheck read profiles.report_credits and counted
-- reports rows, generated a report for ~40-60s, then wrote back
-- `report_credits = <stale value> - 1`. Concurrent requests could spend one
-- credit twice, overwrite a purchase that landed mid-generation, or exceed the
-- 3 free reports.
--
-- New flow (called only by the API route with the service-role key):
--   1. hypecheck_reserve_report(user)     before generation: claims a free slot
--                                         or decrements one credit, atomically.
--   2a. hypecheck_complete_report(...)    on success: inserts the report and
--                                         marks the reservation consumed in one
--                                         transaction.
--   2b. hypecheck_refund_report(...)      on failure: returns the credit / frees
--                                         the slot. Idempotent.
-- A reservation left pending (function killed mid-run, refund call failed) is
-- expired and refunded by the user's next reserve call after 15 minutes. The
-- route's maxDuration is 300s, so a live job can never be expired under it.
--
-- Free-tier semantics are unchanged: a user's first 3 reports are free,
-- counted as existing `reports` rows plus in-flight free reservations.
--
-- Depends on 0001_initial_schema.sql (public.profiles, public.reports). It does
-- not redefine those tables; it only adds the ledger table and functions below.
--
-- The hosted Supabase project is shared with AdoptCheck: everything here is
-- prefixed `hypecheck_` and only touches public.profiles / public.reports,
-- which are HypeCheck's tables.

begin;

-- ── Reservations ledger ──────────────────────────────────────────────────────
create table if not exists public.hypecheck_report_reservations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  kind        text not null check (kind in ('free', 'credit')),
  status      text not null default 'pending'
              check (status in ('pending', 'consumed', 'refunded', 'expired')),
  report_slug text,
  created_at  timestamptz not null default now(),
  settled_at  timestamptz
);

create index if not exists hypecheck_report_reservations_user_pending_idx
  on public.hypecheck_report_reservations (user_id, created_at)
  where status = 'pending';

-- RLS on with no policies: only the service role (which bypasses RLS) can read
-- or write. Users never see or touch this table directly.
alter table public.hypecheck_report_reservations enable row level security;
revoke all on table public.hypecheck_report_reservations from anon, authenticated;

-- ── Reserve ──────────────────────────────────────────────────────────────────
-- Returns one row (reservation_id, kind) when the user is entitled to a report,
-- or zero rows when the free tier is used up and they have no credits.
create or replace function public.hypecheck_reserve_report(p_user_id uuid)
returns table (reservation_id uuid, kind text)
language plpgsql
set search_path = public
as $$
#variable_conflict use_column
declare
  v_free_used int;
  v_id        uuid;
begin
  -- Serialise all entitlement changes for this user. Transaction-scoped, so it
  -- is released on commit/rollback. Works even if the profiles row is missing.
  perform pg_advisory_xact_lock(hashtextextended('hypecheck_entitlement:' || p_user_id::text, 0));

  -- Expire stale reservations from jobs that died without settling, and give
  -- back any credit they held.
  with stale as (
    update public.hypecheck_report_reservations r
       set status = 'expired', settled_at = now()
     where r.user_id = p_user_id
       and r.status = 'pending'
       and r.created_at < now() - interval '15 minutes'
    returning r.kind
  )
  update public.profiles p
     set report_credits = p.report_credits + (select count(*) from stale where stale.kind = 'credit'),
         updated_at = now()
   where p.id = p_user_id
     and exists (select 1 from stale where stale.kind = 'credit');

  -- Free slots used = saved reports + in-flight free reservations. One
  -- statement so both counts come from the same snapshot.
  select (select count(*) from public.reports where user_id = p_user_id)
       + (select count(*) from public.hypecheck_report_reservations r
           where r.user_id = p_user_id and r.status = 'pending' and r.kind = 'free')
    into v_free_used;

  if v_free_used < 3 then
    insert into public.hypecheck_report_reservations (user_id, kind)
    values (p_user_id, 'free')
    returning id into v_id;
    return query select v_id, 'free'::text;
    return;
  end if;

  -- Paid credit: the guarded decrement is the source of truth, never a value
  -- read earlier by the app.
  update public.profiles p
     set report_credits = p.report_credits - 1,
         updated_at = now()
   where p.id = p_user_id
     and p.report_credits > 0;

  if found then
    insert into public.hypecheck_report_reservations (user_id, kind)
    values (p_user_id, 'credit')
    returning id into v_id;
    return query select v_id, 'credit'::text;
  end if;

  -- No entitlement: zero rows.
  return;
end;
$$;

-- ── Complete ─────────────────────────────────────────────────────────────────
-- Saves the report and consumes the reservation atomically. Raises if the
-- reservation is not pending for this user, so nothing is saved for free.
create or replace function public.hypecheck_complete_report(
  p_reservation_id uuid,
  p_user_id        uuid,
  p_slug           text,
  p_idea_text      text,
  p_report_data    jsonb
)
returns void
language plpgsql
set search_path = public
as $$
begin
  -- Same lock as reserve, so a concurrent reserve never sees the report row and
  -- the still-pending reservation at the same time (or neither).
  perform pg_advisory_xact_lock(hashtextextended('hypecheck_entitlement:' || p_user_id::text, 0));

  update public.hypecheck_report_reservations r
     set status = 'consumed', settled_at = now(), report_slug = p_slug
   where r.id = p_reservation_id
     and r.user_id = p_user_id
     and r.status = 'pending';

  if not found then
    raise exception 'hypecheck reservation % is not pending for user %', p_reservation_id, p_user_id
      using errcode = 'P0001';
  end if;

  insert into public.reports (user_id, idea_text, report_data, slug)
  values (p_user_id, p_idea_text, p_report_data, p_slug);
end;
$$;

-- ── Refund ───────────────────────────────────────────────────────────────────
-- Releases a pending reservation; returns its credit if it held one. Returns
-- true if something was refunded, false if it was already settled (no-op).
create or replace function public.hypecheck_refund_report(
  p_reservation_id uuid,
  p_user_id        uuid
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  v_kind text;
begin
  perform pg_advisory_xact_lock(hashtextextended('hypecheck_entitlement:' || p_user_id::text, 0));

  update public.hypecheck_report_reservations r
     set status = 'refunded', settled_at = now()
   where r.id = p_reservation_id
     and r.user_id = p_user_id
     and r.status = 'pending'
  returning r.kind into v_kind;

  if not found then
    return false;
  end if;

  if v_kind = 'credit' then
    update public.profiles p
       set report_credits = p.report_credits + 1,
           updated_at = now()
     where p.id = p_user_id;
  end if;

  return true;
end;
$$;

-- ── Permissions ──────────────────────────────────────────────────────────────
-- Service role only. Supabase grants EXECUTE on new public functions to anon
-- and authenticated by default, so revoke explicitly: otherwise any signed-in
-- user could call these with an arbitrary p_user_id from the browser.
revoke all on function public.hypecheck_reserve_report(uuid) from public, anon, authenticated;
revoke all on function public.hypecheck_complete_report(uuid, uuid, text, text, jsonb) from public, anon, authenticated;
revoke all on function public.hypecheck_refund_report(uuid, uuid) from public, anon, authenticated;

grant execute on function public.hypecheck_reserve_report(uuid) to service_role;
grant execute on function public.hypecheck_complete_report(uuid, uuid, text, text, jsonb) to service_role;
grant execute on function public.hypecheck_refund_report(uuid, uuid) to service_role;

grant select, insert, update on table public.hypecheck_report_reservations to service_role;

-- ── Reports: no direct inserts by users ──────────────────────────────────────
-- Reports are now saved only by hypecheck_complete_report (or, for admins, by
-- the route with the service-role key). The user-insert fallback from 0001 let
-- any signed-in user publish arbitrary report_data at /report/<slug> without
-- paying, so remove it. Public read access is unchanged.
drop policy if exists "Users can insert their own reports" on public.reports;

commit;
