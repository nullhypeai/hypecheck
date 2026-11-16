> **Maintainer notes for the hosted instance at hypecheck.nullhype.tech.** If you are self-hosting, ignore this file and follow [docs/self-hosting.md](docs/self-hosting.md). Nothing here (project refs, team names, URLs) applies to your deployment.

# HypeCheck — build context (resume here)

AI startup-idea validator. Describe an idea → structured report (Hype Score, competitors, market sizing, risks, monetization, demand signals, build/don't-build verdict).

## Where it lives
- **Folder:** `~/hypecheck`
- **Repo:** `nullhypeai/hypecheck` (`origin`) + `saikiranandula/hypecheck` (`fork`)
- **Vercel project:** `hypecheck` (team `saikiranandulas-projects`) → **https://hypecheck.nullhype.tech**
- Git auto-deploy from `nullhypeai/hypecheck` `main` is connected.
- NOTE: the Nullhype hub was split out of this app; `src/app/page.tsx` now serves **only** the HypeCheck product (no host-branching). The hub lives in `nullhypeai/nullhype-hub`.

## Stack
Next.js 16 (App Router), **Tailwind v4**, TypeScript. Deps: `@anthropic-ai/sdk` (Claude), `@supabase/ssr` + `@supabase/supabase-js`, `dodopayments`, `standardwebhooks`, `nanoid`, `@vercel/analytics`.

## Architecture
- **Report gen + metering:** `src/app/api/hypecheck/route.ts` — Haiku 5.5 judge gate (rejects non-ideas with `NOT_A_BUSINESS_IDEA`, fails open), then `src/lib/report/generate.ts` (Sonnet 5.5 default, web search up to 10, structured JSON output, adaptive thinking, effort `medium`) streamed to `/check` as NDJSON progress events, 3 free reports/account, then paid credits; admin emails bypass limits.
- **Auth:** Supabase OAuth (GitHub + Google). `src/lib/supabase/{server,client}.ts`, `src/app/auth/{sign-in,callback}/route.ts`, `src/app/login/page.tsx`, `src/proxy.ts` (middleware: protects `/check`, `/reports`, `/admin`).
- **Payments:** Dodo one-time. `src/app/api/payments/checkout/route.ts` + `webhook/route.ts` → `profiles.report_credits`. `src/components/UpgradePrompt.tsx`.
- **Pages:** `/check` (run), `/report/[slug]` (public share), `/reports` (history), `/admin` (metrics), `/blog/*`, `/privacy`, `/terms`.
- **Admin:** `src/lib/admin.ts` (email allowlist via `HYPECHECK_ADMIN_EMAILS`).

## Env vars (names only)
`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (default `claude-sonnet-5-5`), `ANTHROPIC_JUDGE_MODEL` (default `claude-haiku-5-5`), `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DODO_SECRET_KEY`, `DODO_WEBHOOK_SECRET`, `DODO_ENVIRONMENT`, `DODO_PRODUCT_ID_SINGLE`, `DODO_PRODUCT_ID_PACK`, `HYPECHECK_ADMIN_EMAILS`, `NEXT_PUBLIC_APP_URL`.

## Supabase (SHARED, ref `ejwpbauewggbfqdxvddl`)
Tables: `profiles` (id, report_credits), `reports` (user_id, slug, idea_text, report_data jsonb). Auth redirect allowlist includes `https://hypecheck.nullhype.tech/**`. AdoptCheck reuses this same project.

## Local dev / checks
```bash
npm install
npm run dev
npm run build
npm run lint
```

## Current state / notes
Live and established (Product Hunt launched May 2026). Pricing: 3 free, then $5 / 1 report or $8.99 / 10. `@vercel/analytics` already wired in `layout.tsx`.
Nov 2026: upgraded to Sonnet 5.5 with live web search, NDJSON progress UI, editorial redesign, self-hosting docs (commits f0aed0a, 4690efc). Product Hunt launch materials are committed under `docs/product-hunt-*` and `scripts/generate-product-hunt-assets.mjs` (May 2026 copy and visuals; they show the old design).

## Open items (as of 2026-11-16)
1. **Atomic credits, not shipped yet.** Branch `claude/wizardly-bartik-3a135d` adds `supabase/migrations/0002_atomic_credits.sql` and reworks credit handling in `src/app/api/hypecheck/route.ts` (reserve before generation, consume with the report insert, refund on failure). Order matters because `main` auto-deploys:
   1. Optional check in the Supabase SQL Editor: `select table_name, column_name, data_type from information_schema.columns where table_schema='public' and table_name in ('profiles','reports') order by 1;` (needs `profiles.report_credits` and `reports.user_id, slug, idea_text, report_data`).
   2. Paste and run all of `0002_atomic_credits.sql` in the SQL Editor (one transaction; only adds `hypecheck_*` objects and drops the user insert policy on `reports`). Safe to run before the merge: current `main` saves reports with the service-role key.
   3. Then merge the branch to `main` and tick "Atomic credit accounting" in the README roadmap.
   Do **not** run `0001_initial_schema.sql` on production; it is for fresh installs and the tables already exist.
2. **Manual production checks:** run one real signed-in report on hypecheck.nullhype.tech, open its share link signed out, and open `/admin` with the admin account.
3. **SEO:** verify the domain in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`. A weekly blog pipeline is being considered.
4. **Housekeeping:** stale Codex worktree at `~/.codex/worktrees/2fca/hypecheck` and old Claude worktrees can be removed once their branches are merged or abandoned.

## Gotchas
Vercel CLI on this machine is old/flaky for env/domain ops → use REST API or dashboard. Supabase service-role + Dodo keys appeared in a build chat → rotation recommended (re-wire both projects after).

## Next ideas
Analytics conversion events, Speed Insights, more SEO/blog content, model refresh.
