# Self-hosting HypeCheck

This guide takes you from a fresh clone to your own running copy of HypeCheck. It is written for people and for coding agents: every step says what to do, where the value comes from, and how to check it worked.

Expect about 30 to 45 minutes the first time. Most of it is clicking through the Supabase and OAuth dashboards.

> **Coding agents:** follow the steps in order. Steps marked **(human)** need someone with dashboard access. Ask them for the values and wait; don't guess or invent values, and never commit `.env.local`. Most steps end with a **Check**. Don't move on until it passes.

## Contents

1. [What you need](#1-what-you-need)
2. [Clone and install](#2-clone-and-install)
3. [Create the Supabase project and database](#3-create-the-supabase-project-and-database)
4. [Set up sign-in (GitHub and/or Google)](#4-set-up-sign-in-github-andor-google)
5. [Get an Anthropic API key](#5-get-an-anthropic-api-key)
6. [Configure environment variables](#6-configure-environment-variables)
7. [Run locally and verify](#7-run-locally-and-verify)
8. [Payments (optional)](#8-payments-optional)
9. [Deploy to Vercel](#9-deploy-to-vercel)
10. [Make it yours](#10-make-it-yours)
11. [Troubleshooting](#11-troubleshooting)
12. [Updating](#12-updating)

---

## 1. What you need

| Requirement | Why | Notes |
|---|---|---|
| Node.js 20.9 or newer | Next.js 16 requires it | `node -v` to check |
| An [Anthropic](https://console.anthropic.com) account with API credit | Writes the reports (Claude Sonnet 5.5 with web search) | About $0.20 per report |
| A [Supabase](https://supabase.com) project | Sign-in (OAuth), database | Free tier is enough to start |
| A GitHub OAuth app and/or a Google OAuth client | The two sign-in buttons | You need at least one |
| A host that runs Node.js, streams responses, and allows requests of up to 300 seconds | Reports stream progress and usually take 30 to 90 seconds; the route allows up to 300 | [Vercel](https://vercel.com) works out of the box |
| A [Dodo Payments](https://dodopayments.com) account | Selling report credits | **Optional.** Skip it for personal or team use |

## 2. Clone and install

```bash
git clone https://github.com/nullhypeai/hypecheck.git
cd hypecheck
npm install
cp .env.example .env.local
```

**Check:** `npm run build` finishes without errors. (It doesn't need real credentials to build.)

## 3. Create the Supabase project and database

1. **(human)** Create a project at [supabase.com/dashboard](https://supabase.com/dashboard). Save the database password somewhere safe.
2. Create the tables. Open **SQL Editor → New query**, paste the full contents of [`supabase/migrations/0001_initial_schema.sql`](../supabase/migrations/0001_initial_schema.sql) and click **Run**. Then run any later files in `supabase/migrations/`, in filename order.

   Or, with `psql` installed and the database connection string, an agent can run the files. **(human)** gets the string from the Supabase dashboard's **Connect** button (the direct connection URI, with the database password filled in). Use it only as a temporary shell variable; the app doesn't need it.
   ```bash
   export DATABASE_URL='postgresql://...'   # temporary, do not save to .env.local
   for f in supabase/migrations/*.sql; do psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"; done
   ```
   The migrations are idempotent, so running them twice is safe.
3. **(human)** Copy three values from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` / publishable key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` / secret key → `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose it to the browser)

**What the schema creates:**
- **`profiles`:** one row per user, holding paid `report_credits`. A trigger creates the row on signup.
- **`reports`:** one row per report: `slug`, `idea_text` and `report_data` (JSON).
- **Row-level security:**
  - Reports are publicly readable, because share links work for signed-out visitors.
  - Users can read their own profile but can't change it.
  - Credits change only server-side, with the service-role key.

**Check:** in **Table Editor** you see `profiles` and `reports`, and both show "RLS enabled".

## 4. Set up sign-in (GitHub and/or Google)

HypeCheck signs users in with Supabase Auth. Your Supabase callback URL is:

```
https://<your-project-ref>.supabase.co/auth/v1/callback
```

(The project ref is the subdomain of your Project URL.)

**GitHub** **(human)**
1. Go to GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**.
2. Set **Homepage URL** to your app URL (use `http://localhost:3000` for now).
3. Set **Authorization callback URL** to the Supabase callback URL above.
4. Copy the Client ID and generate a Client Secret.
5. In Supabase, go to **Authentication → Sign In / Providers → GitHub**, enable it, and paste both values.

**Google** **(human)**
1. Go to Google Cloud Console → APIs & Services → Credentials → **Create credentials → OAuth client ID**, with type **Web application**.
2. Add the Supabase callback URL under **Authorized redirect URIs**.
3. In Supabase, go to **Authentication → Sign In / Providers → Google**, enable it, and paste the client ID and secret.

**Redirect URLs** **(human)**
In Supabase, go to **Authentication → URL Configuration**:
- **Site URL:** your production URL, e.g. `https://hypecheck.example.com`. Use `http://localhost:3000` until you deploy.
- **Redirect URLs:** add `http://localhost:3000/**`, and later `https://your-domain/**`.

If you enable only one provider, remove the other button from [`src/app/login/page.tsx`](../src/app/login/page.tsx).

**Check:** done in step 7. Signing in should land you on `/check` on the same host you started from. If it lands somewhere else, the redirect URLs are wrong.

## 5. Get an Anthropic API key

1. **(human)** In the [Claude Console](https://console.anthropic.com), create an API key → `ANTHROPIC_API_KEY`. Make sure the organization has credit.
2. Reports use Claude's server-side **web search** tool. If your organization has restricted web tools in the Console settings, allow web search, or every report will fail.

Defaults (override only if you have a reason):
- **`ANTHROPIC_MODEL`:** defaults to `claude-sonnet-5-5`. Any override must support adaptive thinking, the `effort` parameter, structured outputs and the `web_search_20260209` tool.
- **`ANTHROPIC_JUDGE_MODEL`:** defaults to `claude-haiku-5-5`. It is a cheap check that rejects submissions that aren't business ideas before the expensive call.

**Cost per report:** about $0.20, made up of:
- about 45K input tokens, mostly search results;
- about 3K output tokens;
- about 6 to 10 searches at $10 per 1,000.

## 6. Configure environment variables

Fill in `.env.local` (created in step 2). [`.env.example`](../.env.example) has the same list with comments.

| Variable | Required | Where it comes from | Used for |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase → Project Settings → API | Auth and database |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Same page, `anon` key | Browser and server auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Same page, `service_role` key | Saving reports, credits, webhook, admin page |
| `ANTHROPIC_API_KEY` | Yes | Claude Console → API keys | Report generation |
| `NEXT_PUBLIC_APP_URL` | Yes | Your public URL, no trailing slash (`http://localhost:3000` locally) | Canonical URLs, sitemap, checkout return URL |
| `HYPECHECK_ADMIN_EMAILS` | Recommended | Comma-separated emails | These accounts get unlimited reports and can open `/admin` |
| `ANTHROPIC_MODEL` | No | | Report model override |
| `ANTHROPIC_JUDGE_MODEL` | No | | Judge model override |
| `DODO_SECRET_KEY` | Only for payments | Dodo dashboard → API keys | Creating checkout links |
| `DODO_WEBHOOK_SECRET` | Only for payments | Dodo dashboard → Webhooks | Verifying payment webhooks |
| `DODO_PRODUCT_ID_SINGLE` | Only for payments | Dodo product ID for 1 report | Checkout |
| `DODO_PRODUCT_ID_PACK` | Only for payments | Dodo product ID for 10 reports | Checkout |
| `DODO_ENVIRONMENT` | Only for payments | `test_mode` or `live_mode` | Dodo API mode |

**Check:**
```bash
node -e "
const env = Object.fromEntries(require('fs').readFileSync('.env.local','utf8').split('\n')
  .filter(l => /^[A-Z_]+=/.test(l)).map(l => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]));
const required = ['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY','ANTHROPIC_API_KEY','NEXT_PUBLIC_APP_URL'];
const placeholder = v => !v || /^your_|your-project-ref|you@example\.com/.test(v);
for (const k of required) console.log((placeholder(env[k]) ? 'MISSING  ' : 'ok       ') + k);
"
```
This prints `ok` or `MISSING` for each required variable without printing any values. A value still set to the `.env.example` placeholder counts as missing. Every line must say `ok`. This only shows that values are filled in; whether they actually work is tested in step 7.

## 7. Run locally and verify

```bash
npm run dev
```

Open http://localhost:3000. If 3000 is taken, free it, or add that port to the Supabase redirect URLs.

Verification checklist:

- [ ] The landing page loads.
- [ ] **Sign in** with GitHub or Google lands you on `/check`.
- [ ] In Supabase **Table Editor → profiles**, your user has a row.
- [ ] Submit a real idea. The waiting screen shows the steps, the timer and live search queries, and a report opens within about 2 minutes.
- [ ] The report lists competitors with links and a **Sources** section.
- [ ] Submit `give me a brownie recipe`. It's rejected straight away with "That doesn't look like a business idea" and no report is used.
- [ ] **My reports** lists your report.
- [ ] Open the report URL in a private window. It loads without signing in, because share links are public.
- [ ] If your email is in `HYPECHECK_ADMIN_EMAILS`, `/admin` shows metrics.

Run the project checks too:
```bash
npx tsc --noEmit
npm run lint
npm run build
```

## 8. Payments (optional)

**Without payments:**
- Every account gets **3 free reports**.
- After that, users see an upgrade dialog, and checkout fails because Dodo isn't configured.
- For personal or team use, put everyone's email in `HYPECHECK_ADMIN_EMAILS` so they get unlimited reports.
- Or change the free limit in [`src/app/api/hypecheck/route.ts`](../src/app/api/hypecheck/route.ts) (search for `reportsUsed < 3`).

**To sell credits with Dodo Payments** **(human)**:
1. Create two **one-time** products: "1 report" and "10 reports". Copy their IDs into `DODO_PRODUCT_ID_SINGLE` and `DODO_PRODUCT_ID_PACK`.
2. Create an API key → `DODO_SECRET_KEY`. Set `DODO_ENVIRONMENT=test_mode` while testing.
3. Add a webhook endpoint `https://your-domain/api/payments/webhook`, subscribed to **`payment.succeeded`**. Copy its signing secret into `DODO_WEBHOOK_SECRET`.
4. Prices shown in the UI are text in [`src/app/page.tsx`](../src/app/page.tsx) and [`src/components/UpgradePrompt.tsx`](../src/components/UpgradePrompt.tsx). Keep them in sync with your Dodo prices. The number of credits each product grants is set in [`src/app/api/payments/checkout/route.ts`](../src/app/api/payments/checkout/route.ts).

**Check:** with a test card in `test_mode`, buy 1 report. `profiles.report_credits` for your user goes up by 1.

> Webhooks can't reach `localhost`. Test payments on a deployed URL, or use a tunnel.

## 9. Deploy to Vercel

1. **(human)** Push your fork to GitHub, then **Import** it in Vercel. The framework is detected as Next.js and needs no build settings.
2. Add every variable from step 6 in **Project → Settings → Environment Variables**, for Production (and Preview if you use previews). Set `NEXT_PUBLIC_APP_URL` to the production URL.
3. Deploy. The report route sets `maxDuration = 300`; Vercel allows that on all plans.
4. **(human)** Add the production URL to the Supabase **Site URL** and **Redirect URLs** (step 4). Update the GitHub OAuth app's Homepage URL too.
5. If you use payments, point the Dodo webhook at the production URL.

**Check:** repeat the step 7 checklist on the production URL.

**Other hosts:**
- Run `npm run build && npm start`. Any Node.js host works if it allows streaming responses and requests of up to 300 seconds. Most reports finish within 90 seconds, but a host that cuts requests off sooner will fail the slow ones.
- Proxies must not buffer `application/x-ndjson` responses, or the waiting screen won't update until the end.
- `after()` (used to finish a report when the user closes the tab) needs a host that keeps the function alive after the response. On a long-running Node server it simply works.

## 10. Make it yours

The code ships with the hosted instance's branding and legal text. Before going public, change:

| What | Where |
|---|---|
| Public URL (sitemap, canonical, Open Graph) | `NEXT_PUBLIC_APP_URL`, read in [`src/lib/site.ts`](../src/lib/site.ts). The blog post keeps the original URL on purpose (see the blog row) |
| Repository link shown on the site | `REPO_URL` in [`src/lib/site.ts`](../src/lib/site.ts) |
| Wordmark ("HypeCheck by NullHype") | [`src/components/site/SiteHeader.tsx`](../src/components/site/SiteHeader.tsx), [`SiteFooter.tsx`](../src/components/site/SiteFooter.tsx) |
| Page title, description, favicon | [`src/app/layout.tsx`](../src/app/layout.tsx) |
| Landing copy, FAQ, structured data, pricing text | [`src/app/page.tsx`](../src/app/page.tsx) |
| **Privacy policy and terms** (names NullHype AI and its contact email) | [`src/app/privacy/page.tsx`](../src/app/privacy/page.tsx), [`src/app/terms/page.tsx`](../src/app/terms/page.tsx). You must replace these with your own. |
| Blog post (the hosted instance's content) | `src/app/blog/`. Delete it or write your own, and update [`src/app/sitemap.ts`](../src/app/sitemap.ts) |
| AI-discovery files describing the hosted product | [`public/llms.txt`](../public/llms.txt), [`public/index.md`](../public/index.md), [`public/product.md`](../public/product.md) |
| Design tokens (colours, fonts) | [`src/app/globals.css`](../src/app/globals.css), [`src/app/layout.tsx`](../src/app/layout.tsx) |
| The analysis itself (prompt, scoring rubric, report schema) | [`src/lib/report/generate.ts`](../src/lib/report/generate.ts) |

`CONTEXT.md` holds the original maintainer's notes about the hosted instance. Ignore it; it doesn't describe your deployment.

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| After sign-in you land on a different domain, or on `/login?error=auth_failed` | The redirect URL isn't allowed | Add `https://your-domain/**` (and `http://localhost:3000/**`) under Supabase → Authentication → URL Configuration |
| A sign-in button opens a Supabase page saying the provider is not enabled | That provider isn't enabled in Supabase | Enable it (step 4), or remove its button from `src/app/login/page.tsx` |
| `/login?error=oauth_start_failed` | Supabase URL or anon key missing or wrong | Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Report fails straight away with "Something went wrong while building your report" | Bad or empty `ANTHROPIC_API_KEY`, no credit, or web search blocked for your org | Check the server logs; fix the key, add credit, or allow web search in the Claude Console |
| The waiting screen stays on the first step, then the report appears all at once | A proxy is buffering the streamed response | Disable buffering for `/api/hypecheck` (the route already sends `X-Accel-Buffering: no`) |
| Reports save, but paid credits never go down | `SUPABASE_SERVICE_ROLE_KEY` missing | Set it. Users can't update their own profile by design |
| Payment succeeds but no credits are added | Webhook not reaching the app, wrong secret, or test/live mismatch | Check the delivery log in the Dodo dashboard, `DODO_WEBHOOK_SECRET` and `DODO_ENVIRONMENT` |
| Webhook logs "User not found" | The user has no `profiles` row | Re-run `0001_initial_schema.sql`. It creates the signup trigger and backfills existing users |
| Real ideas get "That doesn't look like a business idea" | The judge is too strict for your users | Edit `JUDGE_PROMPT` in [`src/app/api/hypecheck/route.ts`](../src/app/api/hypecheck/route.ts). The judge fails open on API errors |
| `/admin` redirects to `/check` | Your email isn't in `HYPECHECK_ADMIN_EMAILS` | Add it (comma-separated, case-insensitive) and redeploy |
| A share link 404s for signed-out visitors | The reports read policy is missing | Re-run the schema SQL |

## 12. Updating

```bash
git pull
npm install
```

Then run any new files in `supabase/migrations/`, in order, and redeploy. Read the commit messages for changes to environment variables.
