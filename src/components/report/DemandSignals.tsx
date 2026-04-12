import { DemandSignal, ScoreStrength } from '@/lib/types'
import SectionCard from './SectionCard'

function PlatformLabel({ platform }: { platform: DemandSignal['platform'] }) {
  const styles = {
    Reddit: 'text-[#FF4500]',
    X: 'text-[#888888]',
    General: 'text-[#555555]',
  }
  return (
    <span className={`text-[11px] font-semibold ${styles[platform]}`}>
      {platform === 'Reddit' ? 'Reddit · ' : platform === 'X' ? '𝕏 · ' : `${platform} · `}
    </span>
  )
}

function SignalBlock({ signal }: { signal: DemandSignal }) {
  return (
    <div className="rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-3">
      <p className="text-[14px] italic leading-relaxed text-[#F5F5F5]">
        &ldquo;{signal.quote}&rdquo;
      </p>
      <p className="mt-2 text-[12px] text-[#555555]">
        <PlatformLabel platform={signal.platform} />
        {signal.source}
      </p>
    </div>
  )
}

function StrengthBar({ strength }: { strength: ScoreStrength }) {
  const label =
    strength === 'strong'
      ? 'Strong demand'
      : strength === 'moderate'
      ? 'Moderate demand'
      : 'Weak demand'
  const colour =
    strength === 'strong' ? '#22C55E' : strength === 'moderate' ? '#F59E0B' : '#EF4444'
  const width =
    strength === 'strong' ? 'w-full' : strength === 'moderate' ? 'w-2/3' : 'w-1/3'

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[11px] uppercase tracking-wider text-[#555555]">
          Overall Demand Strength
        </p>
        <p className="text-[12px] font-semibold" style={{ color: colour }}>
          {label}
        </p>
      </div>
      <div className="h-1 w-full rounded-full bg-[#2A2A2A]">
        <div
          className={`h-1 rounded-full ${width} transition-all`}
          style={{ backgroundColor: colour }}
        />
      </div>
    </div>
  )
}

export default function DemandSignals({
  signals,
  overallDemandStrength,
}: {
  signals: DemandSignal[]
  overallDemandStrength: ScoreStrength
}) {
  return (
    <SectionCard title="Demand Signals">
      <div className="flex flex-col gap-3">
        {signals.map((s, i) => (
          <SignalBlock key={i} signal={s} />
        ))}
      </div>
      <StrengthBar strength={overallDemandStrength} />
    </SectionCard>
  )
}
