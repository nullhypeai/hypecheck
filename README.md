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
- **Report History** — unlimited subscribers can revisit past reports any time

---

## Pricing

| Plan | Price | What you get |
|---|---|---|
| Pay-per-report | **$5 / report** | One full HypeCheck report, shareable link included |
| Unlimited | **$15 / month** | Unlimited reports, full history, priority processing |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Database & Auth | [Supabase](https://supabase.com) |
| AI | [Claude API](https://www.anthropic.com) (Anthropic) |
| Payments | [Stripe](https://stripe.com) |
| Hosting | [Vercel](https://vercel.com) |

---

## Running Locally

**Prerequisites:** Node.js 18+, a Supabase project, an Anthropic API key, and a Stripe account.

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

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Roadmap

- [x] Core report generation with Claude
- [x] Pay-per-report via Stripe
- [x] Monthly unlimited subscription tier
- [x] Shareable public report links
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
