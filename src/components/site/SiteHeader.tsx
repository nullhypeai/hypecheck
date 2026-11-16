import Link from 'next/link'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-serif text-[22px] font-semibold leading-none tracking-[-0.02em] text-ink">
        HypeCheck
      </span>
      <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint sm:inline">
        by NullHype
      </span>
    </Link>
  )
}

// Shared top bar. `children` replaces the default right-hand links (e.g. signed-in nav).
export default function SiteHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="border-b border-rule bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75 sticky top-0 z-40">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Wordmark />
        <nav className="flex items-center gap-4 text-[13px] sm:gap-6">
          {children ?? (
            <>
              <Link href="/blog" className="text-muted transition-colors hover:text-ink">
                Blog
              </Link>
              <Link href="/login" className="text-muted transition-colors hover:text-ink">
                Sign in
              </Link>
              <Link
                href="/check"
                className="bg-ink px-3.5 py-2 font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                Check an idea
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
