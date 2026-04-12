import { RiskFactor, ThreatLevel } from '@/lib/types'
import SectionCard from './SectionCard'

function SeverityLabel({ severity }: { severity: ThreatLevel }) {
  const styles = {
    Low: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',
    Medium: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
    High: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30',
  }
  return (
    <span
      className={`
        inline-flex rounded-full border px-2 py-0.5
        text-[11px] font-semibold shrink-0 ${styles[severity]}
      `}
    >
      {severity}
    </span>
  )
}

function RiskRow({ factor }: { factor: RiskFactor }) {
  return (
    <div className="border-b border-[#1A1A1A] pb-4 last:border-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[14px] font-semibold text-[#F5F5F5]">
          {factor.factor}
        </p>
        <SeverityLabel severity={factor.severity} />
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[#888888]">
        <span className="text-[#555555]">Mitigation → </span>
        {factor.mitigation}
      </p>
    </div>
  )
}

export default function ExecutionRisk({
  factors,
  overallRiskLevel,
}: {
  factors: RiskFactor[]
  overallRiskLevel: ThreatLevel
}) {
  return (
    <SectionCard title="Execution Risk">
      <div className="flex flex-col gap-4">
        {factors.map((f, i) => (
          <RiskRow key={i} factor={f} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <p className="text-[11px] uppercase tracking-wider text-[#555555]">
          Overall Risk Level
        </p>
        <SeverityLabel severity={overallRiskLevel} />
      </div>
    </SectionCard>
  )
}
