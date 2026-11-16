<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Guide for coding agents

HypeCheck is an open-source Next.js 16 app. A user describes a startup idea, and Claude researches it on the web and returns a scored, sourced validation report. The stack is Supabase (auth and Postgres), the Anthropic API, optional Dodo Payments, and Vercel.

## If you were asked to host or deploy this

Follow [`docs/self-hosting.md`](docs/self-hosting.md) step by step. It is written for you. Rules:

1. **Some steps need a human.** Steps marked **(human)** need dashboard access you probably don't have: creating the Supabase project, OAuth apps, the Anthropic key and Dodo products. Ask the user for the values each step names, then wait. Never invent placeholder values and continue as if setup were done.
2. **Secrets go in `.env.local`** (local) or the host's environment settings (Vercel), and never in committed files, logs or chat output. To check which variables are set, print names only (the guide has a command).
3. **Database:** run every file in `supabase/migrations/` in filename order, in the user's own Supabase project. The files are idempotent.
4. **Verify before you report done.** Run `npx tsc --noEmit`, `npm run lint` and `npm run build`, then work through the checklist in step 7 of the guide (sign in, run one real report, open the share link signed out). If you can't sign in yourself, say which checks you couldn't run.
5. **`CONTEXT.md` is not about your deployment.** It's the original maintainer's notes on the hosted instance at hypecheck.nullhype.tech. Never use its project refs, team names or URLs.
6. **Going public?** Point the user to "Make it yours" (step 10). The privacy policy and terms name NullHype AI and must be replaced by the operator.

## If you were asked to change the code

| Task | Start in |
|---|---|
| Change the analysis, prompt, scoring or report fields | `src/lib/report/generate.ts` (`SYSTEM_PROMPT`, `REPORT_SCHEMA`), then `src/lib/types.ts` and `src/components/report/` |
| Change auth, credits, the input judge or streaming | `src/app/api/hypecheck/route.ts` |
| Change payments | `src/app/api/payments/checkout/route.ts`, `src/app/api/payments/webhook/route.ts` |
| Change the waiting screen | `src/components/check/ResearchProgress.tsx`, `src/app/check/page.tsx` |
| Change look and feel | `src/app/globals.css` (design tokens), `src/components/site/` |
| Change public URLs and repo links | `src/lib/site.ts` |
| Change the database | Add a new numbered file in `supabase/migrations/`; never edit an applied one |

Conventions and gotchas:
- **Report schema.** `REPORT_SCHEMA` is sent as Anthropic structured output, which has rules:
  - every object needs `additionalProperties: false`, with all properties listed in `required`;
  - no `minItems`/`maxItems`, `minimum`/`maximum` or `minLength`/`maxLength`;
  - put limits in `description` instead.
- **New report fields** must be optional in `src/lib/types.ts`. Saved reports in the database are rendered as they are, and older ones lack newer fields.
- **Model URLs.** Render URLs that come from the model only through `safeUrl()` in `src/components/report/levels.tsx`.
- **No secrets in client code.** Only `NEXT_PUBLIC_*` variables may reach the browser. `SUPABASE_SERVICE_ROLE_KEY` and `ANTHROPIC_API_KEY` stay server-side.
- **Builds must not need credentials.** `npm run build` has to pass with no env vars set. Create clients that throw on missing config (Supabase, Dodo) inside request or event handlers, not at module load or render time. The Anthropic client is fine at module scope because its constructor doesn't throw.
- **Copy style.** User-facing text avoids em dashes (the prompt also tells Claude not to use them).
- **Prompt changes cost money to test.** Each test report costs about $0.20. Ask before running more than a few, and include a before/after example in the PR.
- **Before you finish:** `npx tsc --noEmit && npm run lint && npm run build` must pass.
