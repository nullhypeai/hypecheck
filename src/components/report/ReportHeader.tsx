import { Verdict } from '@/lib/types'
import { scoreTone, verdictStyles } from './levels'

interface ReportHeaderProps {
  ideaTitle: string
  hypeScore: number
  verdict: Verdict
  oneLinerSummary: string
  keyAssumption?: string
  sourceCount?: number
}

function ScoreScale({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score))
  return (
    <div className="mt-3 w-full" aria-hidden>
      <div className="relative h-[6px] w-full">
        <div className="absolute inset-y-0 left-0 w-[40%] bg-nobuild/25" />
        <div className="absolute inset-y-0 left-[40%] w-[30%] bg-validate/25" />
        <div className="absolute inset-y-0 left-[70%] right-0 bg-build/25" />
        <div
          className="absolute -top-[5px] h-[16px] w-[3px] bg-ink"
          style={{ left: `calc(${clamped}% - 1.5px)` }}
        />
      </div>
      <div className="relative mt-1.5 h-3 font-mono text-[11px] leading-none text-faint">
        <span className="absolute left-0">0</span>
        <span className="absolute left-[40%] -translate-x-1/2">40</span>
        <span className="absolute left-[70%] -translate-x-1/2">70</span>
        <span className="absolute right-0">100</span>
      </div>
    </div>
  )
}

export default function ReportHeader({
  ideaTitle,
  hypeScore,
  verdict,
  oneLinerSummary,
  keyAssumption,
  sourceCount,
}: ReportHeaderProps) {
  const v = verdictStyles[verdict] ?? verdictStyles['Validate First']

  return (
    <header className="pb-2">
      <div className="flex items-center justify-between gap-4 border-b border-ink pb-3">
        <p className="kicker">HypeCheck report</p>
        {sourceCount ? (
          <p className="kicker text-right">
            <span className="hidden sm:inline">Researched across </span>
            {sourceCount} source{sourceCount === 1 ? '' : 's'}
          </p>
        ) : null}
      </div>

      <h1 className="mt-7 font-serif text-[34px] font-medium leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px]">
        {ideaTitle}
      </h1>

      <div className="mt-7 grid gap-6 border-y border-rule py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
        <div>
          <p className="kicker">Hype score</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className={`font-serif text-[72px] font-medium leading-none tracking-[-0.03em] ${scoreTone(hypeScore)}`}>
              {hypeScore}
            </span>
            <span className="font-mono text-[13px] text-faint">/100</span>
          </p>
          <ScoreScale score={hypeScore} />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <p className="kicker">Verdict</p>
          <span
            className={`inline-flex w-fit items-center border-2 px-3 py-1 font-mono text-[13px] font-semibold uppercase tracking-[0.12em] ${v.text} ${v.border} ${v.bg}`}
          >
            {v.label}
          </span>
          <p className="font-serif text-[19px] leading-snug text-ink-soft">{oneLinerSummary}</p>
        </div>
      </div>

      {keyAssumption && (
        <div className="mt-6 border-l-2 border-accent pl-4">
          <p className="kicker text-accent!">The bet you&apos;re making</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{keyAssumption}</p>
        </div>
      )}
    </header>
  )
}
