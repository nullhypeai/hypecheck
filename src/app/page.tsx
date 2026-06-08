import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";

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

const hypeCheckStructuredData = [
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

const nullhypeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nullhype",
    url: "https://nullhype.tech",
    sameAs: [
      "https://x.com/nullhypeai",
      "https://github.com/nullhypeai/hypecheck",
      "https://www.producthunt.com/posts/hypecheck",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nullhype",
    url: "https://nullhype.tech",
    description:
      "Nullhype finds, tests, and explains AI and frontier-tech shifts before their business consequences become obvious.",
  },
];

const productLinks = [
  {
    name: "HypeCheck",
    eyebrow: "Live product",
    href: "https://hypecheck.nullhype.tech",
    description:
      "AI reality checks for startup ideas. Stress-test weak assumptions before you build.",
    action: "Try HypeCheck",
  },
  {
    name: "AdoptCheck",
    eyebrow: "Building next",
    href: "https://x.com/nullhypeai",
    description:
      "Open-source repo due diligence before you install, fork, or ship.",
    action: "Follow the build",
  },
];

const proofLinks = [
  {
    label: "HypeCheck on Product Hunt",
    href: "https://www.producthunt.com/posts/hypecheck",
  },
  {
    label: "HypeCheck source code",
    href: "https://github.com/nullhypeai/hypecheck",
  },
  {
    label: "Nullhype on X",
    href: "https://x.com/nullhypeai",
  },
];

function isRootNullhypeHost(host: string) {
  const normalizedHost = host.split(":")[0].toLowerCase();

  return (
    normalizedHost === "nullhype.tech" ||
    normalizedHost === "www.nullhype.tech" ||
    normalizedHost === "localhost"
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("host") ?? "";

  if (isRootNullhypeHost(host)) {
    return {
      title: "Nullhype - AI Signals, Labs, and Builder Tools",
      description:
        "Nullhype finds, tests, and explains AI and frontier-tech shifts before their business consequences become obvious.",
      alternates: {
        canonical: "https://nullhype.tech",
      },
      openGraph: {
        title: "Nullhype",
        description:
          "AI market signals, builder experiments, and small tools from Nullhype Labs.",
        url: "https://nullhype.tech",
        siteName: "Nullhype",
        type: "website",
      },
      twitter: {
        card: "summary",
        title: "Nullhype",
        description:
          "AI market signals, builder experiments, and small tools from Nullhype Labs.",
      },
    };
  }

  return {
    title: "HypeCheck - AI Startup Idea Validator",
    description:
      "Describe your startup idea in plain language. Get a Hype Score, competitor analysis, market sizing, and a Build or Don't Build verdict, powered by AI.",
    alternates: {
      canonical: "https://hypecheck.nullhype.tech",
    },
    openGraph: {
      title: "HypeCheck - AI Startup Idea Validator",
      description:
        "Open-source AI reality checks for startup ideas. Get a Hype Score, competitors, market sizing, risks, monetization signals, and a build-or-don't-build verdict.",
      url: "https://hypecheck.nullhype.tech",
      siteName: "HypeCheck",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "HypeCheck - AI Startup Idea Validator",
      description:
        "Open-source AI reality checks for startup ideas. Get 3 free reports, then buy one-time credits. No subscription.",
    },
  };
}

function NullhypeHub() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {nullhypeStructuredData.map((entry) => (
        <script
          key={entry["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <header className="border-b border-white/10 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-6">
          <Link href="/" className="font-mono text-sm font-semibold uppercase text-neutral-50">
            Nullhype
          </Link>
          <nav className="flex items-center gap-4 text-sm text-neutral-400">
            <a
              href="https://x.com/nullhypeai"
              className="transition-colors hover:text-neutral-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://github.com/nullhypeai/hypecheck"
              className="transition-colors hover:text-neutral-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-cyan-300">
                Nullhype Labs
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-neutral-50 sm:text-6xl">
                Every AI launch has a hidden business implication.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
                Nullhype finds the signal, tests it in public, and turns the useful
                parts into small tools for builders.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://hypecheck.nullhype.tech"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-neutral-50 px-5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-100"
                >
                  Try HypeCheck
                </a>
                <a
                  href="https://x.com/nullhypeai"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-semibold text-neutral-100 transition-colors hover:border-cyan-300 hover:text-cyan-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow @nullhypeai
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-black/30">
              <div className="border-b border-white/10 pb-4">
                <p className="font-mono text-xs uppercase text-neutral-500">
                  Current thesis
                </p>
                <p className="mt-3 text-lg leading-7 text-neutral-100">
                  What changes. Who wins. What gets built.
                </p>
              </div>
              <div className="grid gap-4 pt-5 text-sm text-neutral-300">
                <div className="flex items-start justify-between gap-4">
                  <span>AI startup ideas</span>
                  <span className="font-mono text-cyan-300">HypeCheck</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>Open-source adoption risk</span>
                  <span className="font-mono text-amber-300">AdoptCheck</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>Market implications</span>
                  <span className="font-mono text-neutral-100">Nullhype</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-neutral-900 px-5 py-12 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {productLinks.map((product) => (
              <a
                key={product.name}
                href={product.href}
                className="group border border-white/10 bg-neutral-950 p-6 transition-colors hover:border-cyan-300/70"
                target={product.href.startsWith("http") ? "_blank" : undefined}
                rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <p className="font-mono text-xs uppercase text-neutral-500">
                  {product.eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-neutral-50">
                  {product.name}
                </h2>
                <p className="mt-3 min-h-16 text-sm leading-6 text-neutral-300">
                  {product.description}
                </p>
                <span className="mt-6 inline-flex text-sm font-semibold text-cyan-300 group-hover:text-cyan-100">
                  {product.action} -&gt;
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="px-5 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs font-semibold uppercase text-neutral-500">
              Latest proof
            </p>
            <div className="mt-5 grid gap-3">
              {proofLinks.map((proof) => (
                <a
                  key={proof.href}
                  href={proof.href}
                  className="flex min-h-14 items-center justify-between gap-4 border border-white/10 px-4 text-sm text-neutral-200 transition-colors hover:border-cyan-300/70 hover:text-cyan-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{proof.label}</span>
                  <span aria-hidden="true" className="font-mono text-neutral-500">
                    -&gt;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-neutral-500 sm:px-6">
        Nullhype studies AI, markets, open-source tools, and builder workflows.
      </footer>
    </div>
  );
}

function HypeCheckHome() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {hypeCheckStructuredData.map((entry) => (
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

export default async function Home() {
  const headerList = await headers();
  const host = headerList.get("host") ?? "";

  if (isRootNullhypeHost(host)) {
    return <NullhypeHub />;
  }

  return <HypeCheckHome />;
}
