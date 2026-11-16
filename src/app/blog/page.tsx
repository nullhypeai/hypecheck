import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata = {
  title: "Startup Idea Validation Blog - HypeCheck",
  description:
    "Practical guides for validating startup ideas, testing MVP demand, and using AI to stress-test what you should build next.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    title: "How to Validate a Startup Idea Before Building an MVP",
    description:
      "A practical validation workflow for founders, indie hackers, and developers who want signal before they spend weeks building.",
    href: "/blog/how-to-validate-a-startup-idea-before-building-mvp",
    date: "June 3, 2026",
    readTime: "8 min read",
    keywords: ["MVP validation", "startup idea validation", "validate business idea"],
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteHeader />
      <div className="mx-auto w-full max-w-[1008px] flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="font-sans text-[13px] text-muted underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
        >
          Back to home
        </Link>

        <header className="mt-10 max-w-[680px] border-t border-ink pt-5">
          <p className="kicker">
            HypeCheck Blog
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Startup validation guides for builders who ship.
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            Practical playbooks for testing startup ideas, reading market signals, and deciding what
            deserves your next weekend.
          </p>
        </header>

        <main className="mt-12 grid">
          {posts.map((post) => (
            <article
              key={post.href}
              className="border-t border-ink py-8"
            >
              <div className="flex flex-wrap gap-2 font-mono text-[11px] tabular-nums text-muted">
                <span>{post.date}</span>
                <span>/</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight text-ink">
                <Link href={post.href} className="underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                {post.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-4">
                {post.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="font-mono text-[11px] text-muted"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
