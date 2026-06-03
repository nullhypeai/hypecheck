import Link from "next/link";

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
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-[13px] text-[#555555] transition-colors hover:text-[#999999]"
        >
          Back to home
        </Link>

        <header className="mt-10 max-w-2xl">
          <p className="text-[13px] font-medium uppercase tracking-widest text-[#60A5FA]">
            HypeCheck Blog
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#F5F5F5] sm:text-5xl">
            Startup validation guides for builders who ship.
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[#999999]">
            Practical playbooks for testing startup ideas, reading market signals, and deciding what
            deserves your next weekend.
          </p>
        </header>

        <main className="mt-12 grid gap-5">
          {posts.map((post) => (
            <article
              key={post.href}
              className="rounded-lg border border-[#1A1A1A] bg-[#111111] p-6 transition-colors hover:border-[#2A2A2A]"
            >
              <div className="flex flex-wrap gap-2 text-[12px] text-[#666666]">
                <span>{post.date}</span>
                <span>/</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#F5F5F5]">
                <Link href={post.href} className="transition-colors hover:text-[#60A5FA]">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#999999]">
                {post.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-[#222222] px-3 py-1 text-[12px] text-[#888888]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
