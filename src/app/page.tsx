import Link from "next/link";

const faqs = [
  {
    question: "What is HypeCheck?",
    answer:
      "HypeCheck is an AI startup idea validator that turns a rough idea into a structured report with a Hype Score, competitors, market sizing, risks, monetization viability, demand signals, and a build-or-don't-build verdict.",
  },
  {
    question: "Who is HypeCheck for?",
    answer:
      "HypeCheck is for indie hackers, developers, product builders, founders, and small teams who want to stress-test an idea before spending weeks building it.",
  },
  {
    question: "How much does HypeCheck cost?",
    answer:
      "Each account gets 3 free reports. After that, one additional report credit costs $5, and a 10 report credit pack costs $8.99.",
  },
  {
    question: "Does HypeCheck require a subscription?",
    answer:
      "No. HypeCheck uses one-time report credits. There are no subscriptions or recurring charges.",
  },
  {
    question: "Is HypeCheck open source?",
    answer:
      "Yes. HypeCheck is open source, and the public repository is available at github.com/nullhypeai/hypecheck.",
  },
  {
    question: "Does HypeCheck replace customer discovery?",
    answer:
      "No. HypeCheck is a fast first-pass reality check. Builders should still validate serious ideas with real customers, landing page tests, pricing experiments, and direct conversations.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NullHype AI",
    url: "https://hypecheck.nullhype.tech",
    sameAs: ["https://x.com/nullhypeai", "https://github.com/nullhypeai/hypecheck"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HypeCheck",
    url: "https://hypecheck.nullhype.tech",
    description:
      "Open-source AI reality checks for startup ideas before builders spend weeks building the wrong thing.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HypeCheck",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://hypecheck.nullhype.tech",
    codeRepository: "https://github.com/nullhypeai/hypecheck",
    description:
      "HypeCheck turns rough startup ideas into AI validation reports with a Hype Score, competitors, market sizing, risks, monetization viability, demand signals, and a build-or-don't-build verdict.",
    offers: [
      {
        "@type": "Offer",
        name: "Free tier",
        price: "0",
        priceCurrency: "USD",
        description: "3 reports per account",
      },
      {
        "@type": "Offer",
        name: "Single report credit",
        price: "5",
        priceCurrency: "USD",
        description: "One additional report credit",
      },
      {
        "@type": "Offer",
        name: "10 report credit pack",
        price: "8.99",
        priceCurrency: "USD",
        description: "10 additional report credits",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {structuredData.map((entry) => (
        <script
          key={entry["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
      {/* ── Sticky Nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            ⚡ HypeCheck{" "}
            <span className="hidden font-normal text-slate-400 sm:inline">
              by NullHype AI
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-6">
            <Link
              href="/blog"
              className="text-xs text-slate-400 transition-colors hover:text-white sm:text-sm"
            >
              Blog
            </Link>
            <Link
              href="/login"
              className="text-xs text-slate-400 transition-colors hover:text-white sm:text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/check"
              className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-blue-700 sm:px-4 sm:text-sm"
            >
              Check My Idea
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="bg-slate-950 px-6 py-28 text-center sm:py-36">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-600/30 bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-400">
              AI powered startup reality check
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stop building things{" "}
              <span className="text-blue-400">nobody wants.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              HypeCheck runs an AI powered reality check on your startup idea. Market size, competitors, demand signals, and a brutally honest
              verdict. In 60 seconds.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Link
                href="/check"
                className="inline-flex flex-col items-center rounded-xl bg-blue-600 px-10 py-4 shadow-lg shadow-blue-900/40 transition-colors hover:bg-blue-700"
              >
                <span className="text-base font-bold text-white">Check My Idea</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────── */}
        <section className="border-y border-slate-800 bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-14 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              How it works
            </h2>
            <ol className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  text: "Describe your idea in plain language",
                },
                {
                  step: "2",
                  text: "HypeCheck analyses market reality, competitors, and demand signals",
                },
                {
                  step: "3",
                  text: "Get a structured report with a Hype Score and a clear verdict",
                },
              ].map(({ step, text }) => (
                <li key={step} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <span className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {step}
                  </span>
                  <p className="text-slate-300 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Features Grid ──────────────────────────────────────────── */}
        <section className="bg-slate-950 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What you get
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "📊",
                  title: "Hype Score",
                  desc: "0 to 100 viability verdict so you know exactly where your idea stands.",
                },
                {
                  icon: "🔍",
                  title: "Competitor Teardown",
                  desc: "Who exists, what they miss, and where your opening is.",
                },
                {
                  icon: "📈",
                  title: "Market Size",
                  desc: "TAM estimate grounded in real data, not wishful thinking.",
                },
                {
                  icon: "💬",
                  title: "Demand Signals",
                  desc: "Real Reddit and X mentions of the problem you're solving.",
                },
                {
                  icon: "⚠️",
                  title: "Execution Risk",
                  desc: "Landmines flagged before you build, not after you ship.",
                },
                {
                  icon: "🔗",
                  title: "Shareable Report",
                  desc: "Send it to co-founders or investors with one link.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-slate-700"
                >
                  <div className="mb-3 text-2xl">{icon}</div>
                  <h3 className="mb-2 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────────────── */}
        <section className="border-t border-slate-800 bg-slate-900 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Simple pricing
            </h2>
            <p className="mb-12 text-center text-sm text-slate-400">
              One-time payments. No recurring plans. No recurring charges.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Single report */}
              <div className="flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-8">
                <p className="mb-1 text-sm font-medium uppercase tracking-widest text-slate-400">
                  Single report
                </p>
                <div className="mb-6 mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">$5</span>
                  <span className="mb-1 text-slate-400">one-time</span>
                </div>
                <ul className="mb-8 flex flex-col gap-3 text-sm text-slate-300">
                  {[
                    "Full HypeCheck report",
                    "Hype Score + verdict",
                    "Competitor analysis",
                    "Shareable link",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/check"
                  className="mt-auto rounded-lg border border-blue-600 px-5 py-3 text-center text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-600/10"
                >
                  Get started
                </Link>
              </div>

              {/* 10 report pack, highlighted */}
              <div className="relative flex flex-col rounded-xl border border-blue-600 bg-slate-800 p-8 shadow-xl shadow-blue-900/30">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Best value
                </div>
                <p className="mb-1 text-sm font-medium uppercase tracking-widest text-blue-400">
                  10 report pack
                </p>
                <div className="mb-6 mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">$8.99</span>
                  <span className="mb-1 text-slate-400">one-time</span>
                </div>
                <ul className="mb-8 flex flex-col gap-3 text-sm text-slate-300">
                  {[
                    "10 full reports",
                    "Everything in single report",
                    "$0.90 per report",
                    "No expiry",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/check"
                  className="mt-auto rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Buy 10 reports
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section className="border-t border-slate-800 bg-slate-950 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Common questions
            </h2>
            <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group p-6">
                  <summary className="cursor-pointer list-none text-base font-semibold text-white">
                    <span>{question}</span>
                    <span className="float-right text-blue-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8 text-center text-sm text-slate-500">
        Built by NullHype AI · Powered by Claude ·{" "}
        <a
          href="https://github.com/nullhypeai/hypecheck"
          className="underline underline-offset-2 transition-colors hover:text-slate-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open source on GitHub
        </a>
        <div className="mt-3 flex justify-center gap-2 text-xs text-slate-600">
          <Link href="/blog" className="transition-colors hover:text-slate-400">
            Blog
          </Link>
          <span>·</span>
          <Link href="/privacy" className="transition-colors hover:text-slate-400">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/terms" className="transition-colors hover:text-slate-400">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
