import Link from "next/link";
import { REPO_URL, SELF_HOSTING_URL, SITE_URL } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

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
      "Yes. HypeCheck is MIT licensed and the code is at github.com/nullhypeai/hypecheck. The repository includes a self-hosting guide (docs/self-hosting.md) for running your own copy with your own Anthropic and Supabase accounts.",
  },
  {
    question: "Where does the data in a report come from?",
    answer:
      "Each report runs live web searches when you submit your idea. Competitors, prices, market figures and demand quotes come from pages it found, and every report links its sources. When it cannot find evidence, the report says so instead of guessing.",
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
    url: SITE_URL,
    sameAs: ["https://x.com/nullhypeai", REPO_URL],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HypeCheck",
    url: SITE_URL,
    description:
      "Open-source AI reality checks for startup ideas before builders spend weeks building the wrong thing.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HypeCheck",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    codeRepository: REPO_URL,
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

const contents = [
  {
    title: "A verdict you can act on",
    desc: "A Hype Score from 0 to 100 with a clear call: build, validate first, or don't build.",
  },
  {
    title: "The bet you're making",
    desc: "The one assumption your idea depends on that is most likely to be wrong.",
  },
  {
    title: "Real competitors, linked",
    desc: "Who a customer would compare you against, what they charge, and where they fall short.",
  },
  {
    title: "Demand evidence, not vibes",
    desc: "Verbatim quotes from people describing the problem, with links. If nobody is talking about it, the report says so.",
  },
  {
    title: "Market size with the math shown",
    desc: "Anchored on a figure it found, with the arithmetic in plain sight so you can check it.",
  },
  {
    title: "A test to run this week",
    desc: "One cheap next step with a target, and what result means keep going or stop.",
  },
];

function SpecimenReport() {
  return (
    <figure className="relative mr-2.5 sm:mr-0">
      <div className="border border-ink bg-surface p-6 shadow-[10px_10px_0_0_var(--color-ink)] sm:p-7">
        <div className="flex items-center justify-between border-b border-ink pb-2.5">
          <span className="kicker">HypeCheck report</span>
          <span className="kicker">7 sources</span>
        </div>
        <p className="mt-4 font-serif text-[24px] font-medium leading-tight tracking-[-0.01em] text-ink">
          Automatic waitlist backfill for dental clinics
        </p>
        <div className="mt-4 flex items-end gap-5 border-y border-rule py-4">
          <div>
            <p className="kicker">Hype score</p>
            <p className="mt-1 font-serif text-[52px] font-medium leading-none text-validate">
              42<span className="ml-1 font-mono text-[12px] text-faint">/100</span>
            </p>
          </div>
          <span className="mb-1 border-2 border-validate bg-validate-soft px-2.5 py-0.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-validate">
            Validate first
          </span>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
          Open Dental and Dentrix already ship ASAP-list texting. Weave starts around $249/mo and NexHealth around
          $350/mo, so $149 for automation alone is a real but unproven wedge.
        </p>
        <div className="mt-4 bg-ink p-4 text-paper">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent-soft">Do this next</p>
          <p className="mt-1.5 font-serif text-[16px] leading-snug">
            Call 30 independent Open Dental clinics. Keep going if 3 agree to a paid pilot. Stop if most say the built-in
            list already works.
          </p>
        </div>
      </div>
      <figcaption className="mt-5 text-right font-mono text-[11px] text-faint">Excerpt from a real report</figcaption>
    </figure>
  );
}

function HypeCheckHome() {
  return (
    <div className="flex min-h-screen flex-col">
      {hypeCheckStructuredData.map((entry) => (
        <script
          key={entry["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-[1080px] gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="kicker">Startup idea validation, researched</p>
            <h1 className="mt-4 font-serif text-[48px] font-medium leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px]">
              Stop building things nobody wants.
            </h1>
            <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-ink-soft">
              Describe your idea. HypeCheck searches the web for real competitors, prices and people describing the
              problem, then gives you a straight verdict and the cheapest test to run next.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link
                href="/check"
                className="bg-ink px-7 py-4 text-center text-[16px] font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                Check your idea, free
              </Link>
              <p className="text-[13px] text-muted">3 free reports. No card. No subscription.</p>
            </div>
          </div>
          <SpecimenReport />
        </section>

        {/* How it works */}
        <section className="border-y border-rule bg-surface">
          <div className="mx-auto max-w-[1080px] px-4 py-16 sm:px-6">
            <p className="kicker">How it works</p>
            <ol className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-rule">
              {[
                ["Describe it", "A few sentences: who it is for, what it does, how you would charge."],
                [
                  "It does the research",
                  "Live web searches for competitors, pricing, market data and real discussions. You watch it happen.",
                ],
                ["You get a verdict", "A scored, sourced report with one concrete test to run this week."],
              ].map(([title, desc], i) => (
                <li key={title} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
                  <p className="mt-2 font-serif text-[22px] font-medium text-ink">{title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-[1080px] px-4 py-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
            <div>
              <p className="kicker">What a report contains</p>
              <h2 className="mt-3 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                Less cheerleading. More evidence.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Most AI feedback tells you your idea is great. HypeCheck is built to tell you what is true, show where it
                found it, and say plainly when the evidence is not there.
              </p>
            </div>
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {contents.map(({ title, desc }, i) => (
                <li key={title} className="grid grid-cols-[32px_1fr] border-t border-rule py-5">
                  <span className="font-mono text-[12px] text-accent pt-[5px]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-ink">{title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-ink">
          <div className="mx-auto max-w-[1080px] px-4 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
              <div>
                <p className="kicker">Pricing</p>
                <h2 className="mt-3 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                  Pay per report. Never per month.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  Every account starts with 3 free reports. After that, buy credits once. They never expire.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "Single report", price: "$5", note: "One more idea to check.", cta: "Get started", featured: false },
                  { name: "10 reports", price: "$8.99", note: "$0.90 per report. No expiry.", cta: "Buy 10 reports", featured: true },
                ].map((t) => (
                  <div
                    key={t.name}
                    className={`flex flex-col border p-6 ${t.featured ? "border-ink bg-surface" : "border-rule-strong"}`}
                  >
                    <p className="kicker">{t.featured ? "Best value" : "One-off"}</p>
                    <p className="mt-3 font-serif text-[44px] font-medium leading-none text-ink">{t.price}</p>
                    <p className="mt-3 text-[15px] font-medium text-ink">{t.name}</p>
                    <p className="mt-1 text-[13.5px] text-muted">{t.note}</p>
                    <Link
                      href="/check"
                      className={`mt-6 px-5 py-3 text-center text-[14px] font-medium transition-colors ${
                        t.featured ? "bg-ink text-paper hover:bg-ink-soft" : "border border-ink text-ink hover:bg-surface"
                      }`}
                    >
                      {t.cta}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open source */}
        <section className="border-t border-ink">
          <div className="mx-auto grid max-w-[1080px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[320px_1fr]">
            <div>
              <p className="kicker">Open source</p>
              <h2 className="mt-3 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                Read every line. Or run your own.
              </h2>
            </div>
            <div>
              <p className="max-w-[620px] text-[16px] leading-relaxed text-ink-soft">
                HypeCheck is MIT licensed. The research prompt, the scoring rubric and the whole app are on GitHub, so
                you can see exactly how a verdict is reached. You can also host your own copy with your own Anthropic
                and Supabase accounts; the self-hosting guide is written so you, or your coding agent, can follow it
                step by step.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink px-6 py-3 text-center text-[14px] font-medium text-paper transition-colors hover:bg-ink-soft"
                >
                  View on GitHub
                </a>
                <a
                  href={SELF_HOSTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-ink px-6 py-3 text-center text-[14px] font-medium text-ink transition-colors hover:bg-surface"
                >
                  Self-hosting guide
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-rule bg-surface">
          <div className="mx-auto grid max-w-[1080px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[320px_1fr]">
            <div>
              <p className="kicker">Questions</p>
              <h2 className="mt-3 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                Common questions
              </h2>
            </div>
            <div className="border-t border-ink">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group border-b border-rule py-5">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-[16px] font-medium text-ink">
                    <span>{question}</span>
                    <span className="font-mono text-[14px] text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-ink-soft">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function Home() {
  return <HypeCheckHome />;
}
