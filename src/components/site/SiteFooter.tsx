import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-3 px-4 py-8 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-serif text-[15px] text-ink">HypeCheck</span>
          <span className="mx-2 text-faint">/</span>
          Built by NullHype AI. Powered by Claude.
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <a
            href="https://github.com/nullhypeai/hypecheck"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Open source
          </a>
          <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
        </nav>
      </div>
    </footer>
  )
}
