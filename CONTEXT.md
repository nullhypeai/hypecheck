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
- **Report gen + metering:** `src/app/api/hypecheck/route.ts` — Claude call (Sonnet 5 default, adaptive thinking, effort `medium`, `max_tokens` 8192), 3 free reports/account, then paid credits; admin emails bypass limits.
- **Auth:** Supabase OAuth (GitHub + Google). `src/lib/supabase/{server,client}.ts`, `src/app/auth/{sign-in,callback}/route.ts`, `src/app/login/page.tsx`, `src/proxy.ts` (middleware: protects `/check`, `/reports`, `/admin`).
- **Payments:** Dodo one-time. `src/app/api/payments/checkout/route.ts` + `webhook/route.ts` → `profiles.report_credits`. `src/components/UpgradePrompt.tsx`.
- **Pages:** `/check` (run), `/report/[slug]` (public share), `/reports` (history), `/admin` (metrics), `/blog/*`, `/privacy`, `/terms`.
- **Admin:** `src/lib/admin.ts` (email allowlist via `HYPECHECK_ADMIN_EMAILS`).

## Env vars (names only)
`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (default `claude-sonnet-5`), `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DODO_SECRET_KEY`, `DODO_WEBHOOK_SECRET`, `DODO_ENVIRONMENT`, `DODO_PRODUCT_ID_SINGLE`, `DODO_PRODUCT_ID_PACK`, `HYPECHECK_ADMIN_EMAILS`, `NEXT_PUBLIC_APP_URL`.

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
Live and established (Product Hunt launched). Pricing: 3 free, then $5 / 1 report or $8.99 / 10. `@vercel/analytics` already wired in `layout.tsx`.
Working tree has uncommitted `docs/product-hunt-*` + `scripts/` — your own pre-existing work, untouched.

## Gotchas
Vercel CLI on this machine is old/flaky for env/domain ops → use REST API or dashboard. Supabase service-role + Dodo keys appeared in a build chat → rotation recommended (re-wire both projects after).

## Next ideas
Analytics conversion events, Speed Insights, more SEO/blog content, model refresh.
