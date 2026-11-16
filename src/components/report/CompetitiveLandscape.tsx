import { Competitor } from '@/lib/types'
import SectionCard from './SectionCard'
import { domainOf, LevelTag, safeUrl } from './levels'

function CompetitorRow({ competitor, index }: { competitor: Competitor; index: number }) {
  const url = safeUrl(competitor.url)
  return (
    <li className="grid grid-cols-[28px_1fr] gap-x-2 border-b border-rule py-4 first:pt-0 last:border-0 last:pb-0">
      <span className="font-mono text-[12px] text-faint pt-[3px]">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-[15px] font-semibold text-ink">
            {competitor.name}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="ml-2 font-mono text-[11px] font-normal text-muted underline decoration-rule-strong underline-offset-2 hover:text-accent"
              >
                {domainOf(url)} ↗
              </a>
            )}
          </p>
          <LevelTag level={competitor.threatLevel} suffix="threat" />
        </div>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{competitor.description}</p>
      </div>
    </li>
  )
}

export default function CompetitiveLandscape({
  competitors,
  competitiveAdvantage,
  number,
}: {
  competitors: Competitor[]
  competitiveAdvantage: string
  number?: string
}) {
  return (
    <SectionCard number={number} title="Competitive landscape">
      <ol>
        {competitors.map((c, i) => (
          <CompetitorRow key={i} competitor={c} index={i} />
        ))}
      </ol>
      <div className="mt-5 bg-surface px-4 py-3 ring-1 ring-rule">
        <p className="kicker">Where the opening is</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{competitiveAdvantage}</p>
      </div>
    </SectionCard>
  )
}
