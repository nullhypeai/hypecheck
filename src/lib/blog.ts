// File-based blog: every post is a markdown file in content/blog/<slug>.md.
// The blog index, article pages, sitemap and RSS feed are all generated from these files.
// Everything here runs at build time (the blog routes are statically generated).

import fs from 'node:fs'
import path from 'node:path'
import { Marked, type Tokens } from 'marked'
import { parse as parseYaml } from 'yaml'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const WORDS_PER_MINUTE = 230
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export type PostSource = {
  title: string
  url: string
  publisher?: string
}

export type PostMeta = {
  slug: string
  title: string
  /** Meta description, Open Graph, RSS and JSON-LD. Aim for 140 to 160 characters. */
  description: string
  /** Subtitle under the headline and on the blog index. Defaults to `description`. */
  dek: string
  /** Small label above the headline. */
  kicker: string
  /** YYYY-MM-DD */
  date: string
  /** YYYY-MM-DD, set when a published post is materially revised. */
  updated?: string
  keywords: string[]
  /** Drafts never ship to production. They render in `next dev` and Vercel preview deployments. */
  draft: boolean
  sources: PostSource[]
  readingMinutes: number
}

export type Post = PostMeta & { html: string }

class BlogContentError extends Error {
  constructor(file: string, message: string) {
    super(`content/blog/${file}: ${message}`)
    this.name = 'BlogContentError'
  }
}

/** Drafts are visible locally and on preview deployments so reviewers can read them before merging. */
export function showDrafts(): boolean {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview' ||
    process.env.BLOG_SHOW_DRAFTS === '1'
  )
}

function splitFrontmatter(file: string, raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) throw new BlogContentError(file, 'missing frontmatter block (--- ... ---) at the top of the file')
  const data = parseYaml(match[1])
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new BlogContentError(file, 'frontmatter must be a YAML mapping')
  }
  return { data: data as Record<string, unknown>, body: match[2] }
}

function asDate(file: string, field: string, value: unknown): string {
  const text = value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? '')
  if (!DATE_RE.test(text) || Number.isNaN(Date.parse(text))) {
    throw new BlogContentError(file, `${field} must be a date in YYYY-MM-DD form`)
  }
  return text
}

function requiredString(file: string, data: Record<string, unknown>, field: string): string {
  const value = data[field]
  if (typeof value !== 'string' || !value.trim()) throw new BlogContentError(file, `${field} is required`)
  return value.trim()
}

function parseSources(file: string, value: unknown): PostSource[] {
  if (value == null) return []
  if (!Array.isArray(value)) throw new BlogContentError(file, 'sources must be a list')
  return value.map((item, i) => {
    const source = item as Partial<PostSource> | null
    if (!source || typeof source.title !== 'string' || typeof source.url !== 'string') {
      throw new BlogContentError(file, `sources[${i}] needs a title and a url`)
    }
    if (!/^https?:\/\//.test(source.url)) throw new BlogContentError(file, `sources[${i}].url must be http(s)`)
    return {
      title: source.title.trim(),
      url: source.url.trim(),
      ...(typeof source.publisher === 'string' && source.publisher.trim()
        ? { publisher: source.publisher.trim() }
        : {}),
    }
  })
}

function readingMinutes(markdown: string): number {
  const words = markdown.replace(/[#>*_`[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

function parseFile(file: string): { meta: PostMeta; body: string } {
  const slug = file.replace(/\.md$/, '')
  if (!SLUG_RE.test(slug)) {
    throw new BlogContentError(file, 'file name must be a lowercase-hyphenated slug, e.g. my-post.md')
  }

  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  // Site copy style: no em dashes. Catch them here so a draft can't slip one into production.
  if (raw.includes('—')) throw new BlogContentError(file, 'contains an em dash (—); rewrite the sentence')

  const { data, body } = splitFrontmatter(file, raw)
  if (data.slug !== undefined && data.slug !== slug) {
    throw new BlogContentError(file, `frontmatter slug "${String(data.slug)}" must match the file name`)
  }

  const description = requiredString(file, data, 'description')
  const keywords = data.keywords ?? []
  if (!Array.isArray(keywords) || keywords.some((k) => typeof k !== 'string')) {
    throw new BlogContentError(file, 'keywords must be a list of strings')
  }

  return {
    body,
    meta: {
      slug,
      title: requiredString(file, data, 'title'),
      description,
      dek: typeof data.dek === 'string' && data.dek.trim() ? data.dek.trim() : description,
      kicker: typeof data.kicker === 'string' && data.kicker.trim() ? data.kicker.trim() : 'Startup validation',
      date: asDate(file, 'date', data.date),
      ...(data.updated != null ? { updated: asDate(file, 'updated', data.updated) } : {}),
      keywords: keywords as string[],
      draft: data.draft === true,
      sources: parseSources(file, data.sources),
      readingMinutes: readingMinutes(body),
    },
  }
}

function postFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md')
}

/** Newest first. Drafts are left out unless `includeDrafts` is true. */
export function getAllPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}): PostMeta[] {
  return postFiles()
    .map((f) => parseFile(f).meta)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)))
}

export function getPost(slug: string, { includeDrafts = false }: { includeDrafts?: boolean } = {}): Post | null {
  if (!SLUG_RE.test(slug)) return null
  const file = `${slug}.md`
  if (!postFiles().includes(file)) return null
  const { meta, body } = parseFile(file)
  if (meta.draft && !includeDrafts) return null
  return { ...meta, html: renderMarkdown(body) }
}

// ── Markdown rendering ─────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeHref(href: string): string | null {
  const trimmed = href.trim()
  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) return trimmed
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed
  if (trimmed.startsWith('#')) return trimmed
  return null
}

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z0-9#]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Markdown to HTML for trusted-but-reviewed content. Raw HTML is escaped rather than
 * passed through, links are limited to http(s), mailto, site-relative and anchors, and
 * the body never gets an <h1> (the page title is the only one).
 */
export function renderMarkdown(markdown: string): string {
  const usedIds = new Map<string, number>()
  const marked = new Marked({
    gfm: true,
    renderer: {
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return escapeHtml(text)
      },
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens)
        const level = Math.min(Math.max(depth, 2), 4)
        const base = headingId(inner) || 'section'
        const seen = usedIds.get(base) ?? 0
        usedIds.set(base, seen + 1)
        const id = seen ? `${base}-${seen}` : base
        return `<h${level} id="${id}">${inner}</h${level}>\n`
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens)
        const url = safeHref(href)
        if (!url) return inner
        const external = /^https?:\/\//i.test(url)
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
        const rel = external ? ' rel="noopener noreferrer"' : ''
        return `<a href="${escapeHtml(url)}"${titleAttr}${rel}>${inner}</a>`
      },
      image({ href, title, text }: Tokens.Image) {
        const url = safeHref(href)
        if (!url || url.startsWith('mailto:')) return escapeHtml(text)
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
        return `<img src="${escapeHtml(url)}" alt="${escapeHtml(text)}"${titleAttr} loading="lazy" />`
      },
    },
  })
  return marked.parse(markdown, { async: false })
}
