![MIT License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)

# HypeCheck

**An AI-powered hype filter for startup ideas.**

Got a startup idea? HypeCheck cuts through the noise — it stress-tests your concept against market reality, identifies blindspots, and tells you whether you're sitting on a genuine opportunity or a well-disguised dead end.

**Live at [hypecheck.nullhype.tech](https://hypecheck.nullhype.tech)**

---

## What It Is

HypeCheck is a brutally honest AI analyst for startup ideas built by NullHype AI. Submit your idea and receive a structured report covering market size, competitive landscape, execution risk, monetization viability, and an overall hype score. No flattery, no filler — just signal.

---

## Features

- **Hype Score** — a single 0–100 verdict on your idea's viability
- **Market Reality Check** — TAM/SAM estimates grounded in real data, not guesswork
- **Competitive Teardown** — who already exists, why they might win, and where your opening is
- **Execution Risk Analysis** — technical, regulatory, and go-to-market landmines flagged upfront
- **Monetization Viability** — whether your pricing model holds up under scrutiny
- **Founder Fit Assessment** — an honest read on whether this idea matches the team behind it
- **Shareable Reports** — every report gets a public link you can send to co-founders or investors
- **Report History** — signed-in users can revisit past reports any time

---

## Pricing

| Option | Price | What you get |
|---|---|---|
| Free tier | **$0** | 3 reports per account |
| Single report | **$5 one-time** | 1 additional report credit |
| 10 report pack | **$8.99 one-time** | 10 additional report credits |

No subscriptions. No recurring charges. Purchased credits never expire and are tied to your account.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Database & Auth | [Supabase](https://supabase.com) |
| AI | [Claude API](https://www.anthropic.com) (Anthropic) |
| Payments | [Dodo Payments](https://dodopayments.com) |
| Hosting | [Vercel](https://vercel.com) |

---

## Running Locally

**Prerequisites:** Node.js 18+, a Supabase project, an Anthropic API key, and a Dodo Payments account.

```bash
# 1. Clone the repo
git clone https://github.com/nullhypeai/hypecheck.git
cd hypecheck

# 2. Install dependencies
npm install

# 3. Copy the environment variable template and fill in your values
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root with the following keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Dodo Payments
DODO_SECRET_KEY=your_dodo_secret_key
NEXT_PUBLIC_DODO_PUBLISHABLE_KEY=your_dodo_publishable_key
DODO_PRODUCT_ID_SINGLE=your_dodo_single_report_product_id
DODO_PRODUCT_ID_PACK=your_dodo_10_pack_product_id
DODO_WEBHOOK_SECRET=your_dodo_webhook_secret
DODO_ENVIRONMENT=test_mode

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Roadmap

- [x] Core report generation with Claude
- [x] Credit-based one-time payments via Dodo Payments
- [x] Shareable public report links
- [x] Report history dashboard
- [ ] Batch idea submission (compare multiple ideas side-by-side)
- [ ] Slack / email delivery of reports
- [ ] API access for power users
- [ ] Idea tracking — re-run reports over time to watch market shifts
- [ ] Team workspaces with shared report libraries
- [ ] Browser extension for quick idea capture

---

## Contributing

Contributions are welcome. Please open an issue before submitting a pull request so we can align on scope.

```bash
# Fork the repo, then:
git checkout -b feat/your-feature-name
# make your changes
git commit -m "feat: describe what you did"
git push origin feat/your-feature-name
# open a PR against main
```

All PRs require a passing build and should follow the existing code style. For significant changes, open a discussion first.

---

## License

[MIT](LICENSE)

---

> Built by [NullHype AI](https://nullhype.tech) · Powered by [Claude](https://www.anthropic.com)
