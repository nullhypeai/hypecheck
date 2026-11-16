import { ScoreStrength, ThreatLevel, Verdict } from '@/lib/types'

export const verdictStyles: Record<Verdict, { text: string; bg: string; border: string; label: string }> = {
  Build: { text: 'text-build', bg: 'bg-build-soft', border: 'border-build', label: 'Build' },
  'Validate First': { text: 'text-validate', bg: 'bg-validate-soft', border: 'border-validate', label: 'Validate first' },
  "Don't Build": { text: 'text-nobuild', bg: 'bg-nobuild-soft', border: 'border-nobuild', label: "Don't build" },
}

export function scoreTone(score: number) {
  if (score >= 70) return 'text-build'
  if (score >= 40) return 'text-validate'
  return 'text-nobuild'
}

const strengthTone: Record<ScoreStrength, string> = {
  strong: 'bg-build',
  moderate: 'bg-validate',
  weak: 'bg-nobuild',
}

const strengthFilled: Record<ScoreStrength, number> = { strong: 3, moderate: 2, weak: 1 }

// Three-segment meter: reads at a glance, and the label carries the meaning for screen readers.
export function StrengthMeter({ strength, label }: { strength: ScoreStrength; label?: string }) {
  const filled = strengthFilled[strength]
  return (
    <span className="inline-flex items-center gap-2" title={`${strength} ${label ?? ''}`.trim()}>
      <span className="flex gap-[3px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-[6px] w-[14px] ${i < filled ? strengthTone[strength] : 'bg-rule'}`}
          />
        ))}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        {strength}{label ? ` ${label}` : ''}
      </span>
    </span>
  )
}

const levelTone: Record<ThreatLevel, string> = {
  High: 'text-nobuild border-nobuild/40',
  Medium: 'text-validate border-validate/40',
  Low: 'text-build border-build/40',
}

export function LevelTag({ level, suffix }: { level: ThreatLevel; suffix?: string }) {
  return (
    <span
      className={`inline-flex items-center border px-1.5 py-[1px] font-mono text-[10.5px] uppercase tracking-[0.08em] ${levelTone[level]}`}
    >
      {level}{suffix ? ` ${suffix}` : ''}
    </span>
  )
}

export function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

// Only render links the model gave us as http(s); anything else is shown as text.
export function safeUrl(url?: string | null) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.toString() : null
  } catch {
    return null
  }
}
