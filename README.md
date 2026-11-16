![MIT License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-Sonnet%205.5-D97757?logo=anthropic&logoColor=white)

# HypeCheck

**Find out if a startup idea is worth building, before you build it.**

Describe an idea in a few sentences. HypeCheck searches the web for real competitors, prices, market figures and people describing the problem. Then it gives you:
- a scored verdict: Build, Validate first, or Don't build;
- the assumption most likely to be wrong;
- one cheap test to run this week, with a pass/fail target.

Every claim links to its source. When there's no evidence, the report says so instead of inventing some.

**Hosted version:** [hypecheck.nullhype.tech](https://hypecheck.nullhype.tech). 3 free reports, no card.
**Run your own:** see [Self-hosting](#self-hosting). The full guide is [docs/self-hosting.md](docs/self-hosting.md).

---

## What a report contains

| Section | What it tells you |
|---|---|
| Hype Score and verdict | 0 to 100, with Build at 70 and above, Validate first from 40 to 69, Don't build below 40 |
| The bet you're making | The single assumption the idea depends on that is most likely to be wrong |
| Do this next | A test you can run within a week, with a target and what result means keep going or stop |
| Market opportunity | Size, growth and timing, anchored on figures found online, with estimates' arithmetic shown |
| Competitive landscape | Real competitors and substitutes with links, what they charge, and where they fall short |
| Demand signals | Verbatim quotes from people describing the problem, with links, or a plain statement that none were found |
| Monetisation and execution risk | A pricing suggestion anchored on competitors, and the top three risks with mitigations |
| Sources | Every page the report relied on |

Reports have public share links, and signed-in users keep a history.

---

## How it works

```
Browser (/check)                      Server (/api/hypecheck)                 Anthropic API
────────────────                      ───────────────────────                 ─────────────
submit idea  ───────────────────────▶ auth + credit check (Supabase)
                                      judge: is this a business idea? ──────▶ Claude Haiku 5.5
             ◀── NDJSON progress ──── generate report ───────────────────────▶ Claude Sonnet 5.5
live steps, search queries,             (web search up to 10x,                   + web_search tool
timer                                    JSON-schema output)
             ◀── { done, slug } ───── save report + deduct credit (Supabase)
redirect to /report/<slug>
```

- **Report logic:** [`src/lib/report/generate.ts`](src/lib/report/generate.ts) holds the system prompt, scoring rubric, JSON schema and the Claude call. Start here to change the analysis.
- **API route:** [`src/app/api/hypecheck/route.ts`](src/app/api/hypecheck/route.ts) handles auth, metering, the input judge and streaming progress. The job is registered with `after()`, so a report still saves if the user closes the tab.
- **Cost and time:** about $0.20 and 30 to 60 seconds per report. The judge costs a fraction of a cent and rejects non-ideas before any expensive call.

---

## Self-hosting

You need:
- Node.js 20.9+;
- an Anthropic API key;
- a Supabase project;
- a GitHub or Google OAuth app.

Payments ([Dodo](https://dodopayments.com)) are optional.

```bash
git clone https://github.com/nullhypeai/hypecheck.git
cd hypecheck
npm install
cp .env.example .env.local   # then fill in the values
```

1. **Database.** In Supabase's SQL Editor, run [`supabase/migrations/0001_initial_schema.sql`](supabase/migrations/0001_initial_schema.sql), then any later migrations in order.
2. **Sign-in.** Enable GitHub and/or Google in Supabase Auth, and add `http://localhost:3000/**` to its Redirect URLs.
3. **Env vars.** Fill in `.env.local`. These are required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_APP_URL`. Add your email to `HYPECHECK_ADMIN_EMAILS` for unlimited reports.
4. **Run.** `npm run dev`, then open http://localhost:3000, sign in and run a report.
5. **Deploy.** Import the repo into Vercel, add the same env vars, then add your production URL to Supabase's Redirect URLs.

**[docs/self-hosting.md](docs/self-hosting.md)** has every step in detail:
- where each value comes from;
- a verification checklist;
- payments setup;
- what to rebrand (including the privacy policy and terms, which you must replace);
- troubleshooting.

> **Using a coding agent?** Point it at this repository and ask it to follow `docs/self-hosting.md`. [`AGENTS.md`](AGENTS.md) tells agents how the repo is laid out and which steps need a human (dashboard access, OAuth apps, secrets).

---

## Configuration

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase auth and database |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-side writes: reports, credits, payment webhook, `/admin` |
| `ANTHROPIC_API_KEY` | Yes | Report generation. The org must allow web search |
| `NEXT_PUBLIC_APP_URL` | Yes | Public URL: canonical links, sitemap, checkout return |
| `HYPECHECK_ADMIN_EMAILS` | Recommended | Comma-separated emails with unlimited reports and `/admin` |
| `ANTHROPIC_MODEL` / `ANTHROPIC_JUDGE_MODEL` | No | Override `claude-sonnet-5-5` / `claude-haiku-5-5` |
| `DODO_*` (5 variables) | Payments only | See [`.env.example`](.env.example) and the guide |

Without payments configured:
- every account gets 3 free reports;
- admins get unlimited reports;
- the free limit is set in `src/app/api/hypecheck/route.ts`.

---

## Development

```bash
npm run dev        # http://localhost:3000
npx tsc --noEmit   # type-check
npm run lint
npm run build
```

| Path | What lives there |
|---|---|
| `src/lib/report/` | Prompt, report JSON schema, Claude call and research progress events |
| `src/app/api/hypecheck/` | Report API: auth, credits, judge, NDJSON stream |
| `src/app/api/payments/` | Dodo checkout and webhook |
| `src/components/report/` | Report UI |
| `src/components/check/` | Live research progress screen |
| `src/app/` | Pages: landing, `/check`, `/report/[slug]`, `/reports`, `/admin`, legal, blog |
| `src/lib/site.ts` | Public URL and repo links |
| `supabase/migrations/` | Database schema, run in filename order |

This project uses **Next.js 16**, which has breaking changes from earlier versions. Check `node_modules/next/dist/docs/` before relying on remembered APIs.

---

## Roadmap

- [x] Live web research with sourced competitors, quotes and market figures
- [x] Credit-based one-time payments via Dodo Payments
- [x] Shareable public report links and report history
- [ ] Atomic credit accounting (database function)
- [ ] Compare multiple ideas side by side
- [ ] Re-run a report later to see what changed
- [ ] API access

---

## Contributing

Contributions are welcome. Please open an issue first so we can agree on scope, then:

```bash
git checkout -b feat/your-feature
# make your change; npx tsc --noEmit && npm run lint && npm run build must pass
git commit -m "feat: what you did"
git push origin feat/your-feature   # open a PR against main
```

Changes to the prompt or scoring in `src/lib/report/generate.ts` should include a before/after example report in the PR description.

---

## License

[MIT](LICENSE). Built by [NullHype AI](https://nullhype.tech). Powered by [Claude](https://www.anthropic.com).
