import { Competitor, ThreatLevel } from '@/lib/types'
import SectionCard from './SectionCard'

function ThreatBadge({ level }: { level: ThreatLevel }) {
  const styles = {
    Low: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30',
    Medium: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30',
    High: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30',
  }
  return (
    <span
      className={`
        inline-flex items-center rounded-full border px-2 py-0.5
        text-[11px] font-semibold ${styles[level]}
      `}
    >
      {level}
    </span>
  )
}

function CompetitorRow({ competitor }: { competitor: Competitor }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#1A1A1A] pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-[14px] font-semibold text-[#F5F5F5]">
          {competitor.name}
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-[#888888]">
          {competitor.description}
        </p>
      </div>
      <div className="shrink-0 pt-0.5">
        <ThreatBadge level={competitor.threatLevel} />
      </div>
    </div>
  )
}

export default function CompetitiveLandscape({
  competitors,
  competitiveAdvantage,
}: {
  competitors: Competitor[]
  competitiveAdvantage: string
}) {
  return (
    <SectionCard title="Competitive Landscape">
      <div className="flex flex-col gap-4">
        {competitors.map((c, i) => (
          <CompetitorRow key={i} competitor={c} />
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-[#7C3AED]/20 bg-[#7C3AED]/5 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7C3AED]">
          Your Edge
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-[#888888]">
          {competitiveAdvantage}
        </p>
      </div>
    </SectionCard>
  )
}
