interface SectionCardProps {
  number?: string
  title: string
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
}

// A memo section: numbered kicker, hairline rule, no card chrome.
export default function SectionCard({ number, title, aside, children, className = '' }: SectionCardProps) {
  return (
    <section className={`border-t border-ink pt-5 ${className}`}>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="flex items-baseline gap-3">
          {number && <span className="font-mono text-[12px] text-accent">{number}</span>}
          <span className="font-serif text-[22px] font-medium leading-tight tracking-[-0.01em] text-ink">
            {title}
          </span>
        </h2>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
      {children}
    </section>
  )
}
