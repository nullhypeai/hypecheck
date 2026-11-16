-- HypeCheck initial schema.
--
-- Run once in a new Supabase project: Supabase Dashboard -> SQL Editor -> paste -> Run.
-- Safe to re-run: every statement is idempotent.
--
-- Tables
--   profiles  one row per user, holds paid report credits
--   reports   one row per generated report, public via its slug
--
-- Security model
--   - Reports are readable by anyone. Share links (/report/<slug>) must work for
--     signed-out visitors. Do not put private data in report_data.
--   - Users can read their own profile but cannot write it. Credits are only
--     changed server-side with the service-role key (payment webhook and the
--     report route), so SUPABASE_SERVICE_ROLE_KEY is required in the app.

-- ── profiles ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  report_credits integer not null default 0 check (report_credits >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Create a profile automatically for every new auth user.
-- The payment webhook adds credits to this row, so it must exist.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users who signed up before this migration ran.
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

-- ── reports ─────────────────────────────────────────────────────────────────
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  slug text not null unique,
  idea_text text not null,
  report_data jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists reports_user_id_created_at_idx
  on public.reports (user_id, created_at desc);

alter table public.reports enable row level security;

drop policy if exists "Reports are publicly readable" on public.reports;
create policy "Reports are publicly readable"
  on public.reports for select
  using (true);

-- Fallback path only: the app inserts with the service-role key when it is set.
drop policy if exists "Users can insert their own reports" on public.reports;
create policy "Users can insert their own reports"
  on public.reports for insert
  with check (auth.uid() = user_id);
