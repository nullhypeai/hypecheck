import { DemandSignal, ScoreStrength } from '@/lib/types'
import SectionCard from './SectionCard'
import { safeUrl, StrengthMeter } from './levels'

function SignalQuote({ signal }: { signal: DemandSignal }) {
  const url = safeUrl(signal.url)
  return (
    <figure className="border-l-2 border-rule-strong pl-4">
      <blockquote className="font-serif text-[18px] italic leading-snug text-ink">
        &ldquo;{signal.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="uppercase tracking-[0.08em]">{signal.platform}</span>
        <span className="mx-1.5 text-faint">/</span>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline decoration-rule-strong underline-offset-2 hover:text-accent"
          >
            {signal.source} ↗
          </a>
        ) : (
          signal.source
        )}
      </figcaption>
    </figure>
  )
}

export default function DemandSignals({
  signals,
  summary,
  overallDemandStrength,
  number,
}: {
  signals: DemandSignal[]
  summary?: string
  overallDemandStrength: ScoreStrength
  number?: string
}) {
  return (
    <SectionCard
      number={number}
      title="Demand signals"
      aside={<StrengthMeter strength={overallDemandStrength} label="demand" />}
    >
      {summary && <p className="mb-5 text-[15px] leading-relaxed text-ink">{summary}</p>}
      {signals.length > 0 ? (
        <div className="flex flex-col gap-5">
          {signals.map((s, i) => (
            <SignalQuote key={i} signal={s} />
          ))}
        </div>
      ) : (
        <p className="border border-dashed border-rule-strong px-4 py-3 text-[13px] text-muted">
          No first-hand quotes from people with this problem turned up in public discussion. Treat that as a finding,
          not a gap in the report.
        </p>
      )}
    </SectionCard>
  )
}
