import { getAllPosts } from "@/lib/blog";
import { PUBLISHER_NAME, SITE_URL } from "@/lib/site";

// Built once at build time from content/blog. Drafts are never included.
export const dynamic = "force-static";

function xml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const categories = post.keywords.map((k) => `      <category>${xml(k)}</category>`).join("\n");
      return [
        "    <item>",
        `      <title>${xml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <description>${xml(post.description)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const lastBuild = posts.length ? rfc822(posts[0].updated ?? posts[0].date) : new Date().toUTCString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HypeCheck Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical guides for validating startup ideas, testing demand, and researching pricing before you build.</description>
    <language>en-us</language>
    <copyright>${xml(PUBLISHER_NAME)}</copyright>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
