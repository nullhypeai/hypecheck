import { Source } from '@/lib/types'
import SectionCard from './SectionCard'
import { domainOf, safeUrl } from './levels'

export default function Sources({ sources, number }: { sources: Source[]; number?: string }) {
  const valid = sources
    .map((s) => ({ ...s, href: safeUrl(s.url) }))
    .filter((s): s is Source & { href: string } => Boolean(s.href))
  if (valid.length === 0) return null

  return (
    <SectionCard number={number} title="Sources">
      <ol className="grid gap-2">
        {valid.map((s, i) => (
          <li key={i} className="grid grid-cols-[28px_1fr] text-[13px] leading-snug">
            <span className="font-mono text-[11px] text-faint pt-[2px]">{i + 1}.</span>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-ink-soft hover:text-accent"
            >
              <span className="underline decoration-rule-strong underline-offset-2">{s.title || domainOf(s.href)}</span>
              <span className="ml-2 font-mono text-[11px] text-faint">{domainOf(s.href)}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[12px] leading-relaxed text-faint">
        HypeCheck researches the public web at the time of the report. Check sources before making big decisions.
      </p>
    </SectionCard>
  )
}
