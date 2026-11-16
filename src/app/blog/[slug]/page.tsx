import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { getAllPosts, getPost, showDrafts } from "@/lib/blog";
import { formatPostDate, jsonLd } from "@/lib/blogFormat";
import { PUBLISHER_NAME, SITE_URL } from "@/lib/site";

// Every post is prerendered from content/blog at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts({ includeDrafts: showDrafts() }).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, { includeDrafts: showDrafts() });
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  return {
    title: `${post.title} - HypeCheck`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${path}`,
      siteName: "HypeCheck",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [PUBLISHER_NAME],
      tags: post.keywords,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug, { includeDrafts: showDrafts() });
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const organization = { "@type": "Organization", name: PUBLISHER_NAME, url: SITE_URL };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: organization,
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(post.keywords.length ? { keywords: post.keywords.join(", ") } : {}),
    ...(post.sources.length
      ? {
          citation: post.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.title,
            url: s.url,
            ...(s.publisher ? { publisher: { "@type": "Organization", name: s.publisher } } : {}),
          })),
        }
      : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 2, name: post.title, item: url },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-[728px] px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/blog"
            className="font-sans text-[13px] text-muted underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
          >
            Back to blog
          </Link>

          {post.draft && (
            <p className="mt-8 border border-validate bg-validate-soft px-4 py-3 font-sans text-[13px] text-ink">
              Draft for review. This post is hidden in production until <code>draft: false</code> is set.
            </p>
          )}

          <header className="mt-10 border-t border-t-ink border-b border-b-rule pt-5 pb-8">
            <p className="kicker">{post.kicker}</p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 font-serif text-[17px] leading-relaxed text-ink-soft">{post.dek}</p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] tabular-nums text-muted">
              <span>Published {formatPostDate(post.date)}</span>
              {post.updated && (
                <>
                  <span>/</span>
                  <span>Updated {formatPostDate(post.updated)}</span>
                </>
              )}
              <span>/</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </header>

          <div className="article-body mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.sources.length > 0 && (
            <section className="mt-12 border-t border-ink pt-5" aria-labelledby="sources">
              <h2 id="sources" className="kicker">
                Sources
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 font-sans text-[14px] leading-relaxed text-ink-soft marker:font-mono marker:text-[11px] marker:text-muted">
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      rel="noopener noreferrer"
                      className="underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
                    >
                      {source.title}
                    </a>
                    {source.publisher && <span className="text-muted">, {source.publisher}</span>}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="mt-12 border-t border-ink pt-6">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
              Get a fast first-pass validation report
            </h2>
            <p className="mt-3 font-serif text-[17px] leading-relaxed text-ink-soft">
              HypeCheck turns a rough startup idea into a structured report with a Hype Score,
              competitor analysis, market sizing, execution risks, monetization signals, and a
              clear build-or-don&apos;t-build verdict.
            </p>
            <Link
              href="/check"
              className="mt-5 inline-flex font-sans text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
            >
              Validate your startup idea
            </Link>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
