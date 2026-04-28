import { Verdict } from '@/lib/types'

export function getScoreColour(score: number): string {
  if (score >= 70) return '#2563EB'
  if (score >= 40) return '#F59E0B'
  return '#EF4444'
}

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold'
  let className: string
  if (verdict === 'Build')
    className = `${base} bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40`
  else if (verdict === "Don't Build")
    className = `${base} bg-[#EF4444]/20 text-[#FCA5A5] border border-[#EF4444]/40`
  else
    className = `${base} bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40`

  return <span className={className}>{verdict}</span>
}
