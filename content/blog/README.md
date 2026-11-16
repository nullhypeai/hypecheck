# Blog posts

Each `.md` file in this folder is one post at `/blog/<file-name>`. The blog index, article pages, `sitemap.xml`, the RSS feed (`/blog/rss.xml`), canonical URLs, Open Graph tags and Article JSON-LD are all generated from these files. There is nothing else to update when you add a post.

This README is ignored by the blog.

## Frontmatter

```yaml
---
title: How to Test Pricing Before You Build Anything   # required, about 65 characters max
description: 140 to 160 characters for search results.  # required
dek: One sentence shown under the headline.             # optional, defaults to description
kicker: Pricing research                                # optional label above the headline
date: 2026-11-20                                        # required, YYYY-MM-DD, the publish date
updated: 2026-12-01                                     # optional, set on material revisions
keywords:                                               # optional, primary keyword first
  - how to test pricing for a startup
  - willingness to pay
draft: true                                             # true hides the post in production
sources:                                                # optional, rendered as a Sources list
  - title: Page title as the site writes it
    url: https://example.com/page
    publisher: Example
---
```

The file name is the slug. Keep it lowercase and hyphenated, and never rename a published post: the URL would change and lose its search ranking.

## Body

Plain markdown (GitHub flavoured: tables, lists, links). Start at `##` headings; the title is the page's only H1. Raw HTML is escaped, not rendered.

## Rules the build enforces

`npm run build` fails, naming the file, if a post:
- has no frontmatter, `title`, `description` or valid `date`;
- has a `slug:` field that doesn't match the file name;
- contains an em dash (site copy style).

## Drafts and review

- `draft: true` posts show up in `npm run dev` and on Vercel preview deployments (with a "Draft for review" banner and `noindex`). They are never built in production, and never appear in the sitemap or RSS feed.
- To publish: set `draft: false`, set `date` to the publish day, and merge to `main`.

## AI drafts

`npm run blog:draft` takes the next `todo` topic from [`../blog-backlog.yml`](../blog-backlog.yml), researches it with Claude and web search, and writes a draft here with `draft: true`. Add `-- --pr` to commit it to a new branch and open a draft pull request against `main` with a review checklist and the claims to verify. It needs `ANTHROPIC_API_KEY` (read from `.env.local` if present) and costs about $0.25 to $0.40 per draft. `-- --dry-run` prints the prompt without calling the API.

With `--pr` it skips topics that already have a `blog/draft-<slug>` branch, and skips the whole run without calling the API when 3 draft PRs are already open (`BLOG_DRAFT_MAX_OPEN`). A topic you reject should get `status: skip` in the backlog, or it will be drafted again.

### Schedule

[`.github/workflows/blog-draft.yml`](../../.github/workflows/blog-draft.yml) runs the drafter with `--pr` on Mondays and Thursdays at 13:00 UTC, and on demand from the Actions tab (optionally with a slug). To turn it on:

1. Add the repository secret `ANTHROPIC_API_KEY`.
2. Add the repository variable `BLOG_DRAFTS_ENABLED` set to `true`. Without it only manual runs happen.
3. In Settings > Actions > General > Workflow permissions, tick "Allow GitHub Actions to create and approve pull requests".

Optional repository variables: `BLOG_DRAFT_MODEL`, `BLOG_DRAFT_MAX_OPEN`. Vercel builds a preview for each draft PR, so review the rendered post there. Expect about $2 to $4 a month.

Google's spam policies treat mass-produced, unreviewed AI content as scaled content abuse. Every AI draft must be read, fact-checked against its sources and edited by a person before `draft: false`. The pull request checklist is the minimum.
