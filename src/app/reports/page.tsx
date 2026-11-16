import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { HypeCheckReport, Verdict } from '@/lib/types'
import { scoreTone, verdictStyles } from '@/components/report/levels'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

interface ReportRow {
  slug: string
  created_at: string
  report_data: HypeCheckReport
}

function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}

export default async function ReportsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: rows, error } = await supabase
    .from('reports')
    .select('slug, created_at, report_data')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const reports: ReportRow[] = error ? [] : (rows ?? [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader>
        <Link href="/check" className="bg-ink px-3.5 py-2 font-medium text-paper transition-colors hover:bg-ink-soft">
          New report
        </Link>
      </SiteHeader>
      <main className="mx-auto w-full max-w-[760px] flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex items-end justify-between gap-4 border-b border-ink pb-3">
          <h1 className="font-serif text-[36px] font-medium leading-none tracking-[-0.02em] text-ink">My reports</h1>
          {reports.length > 0 && (
            <p className="kicker">
              {reports.length} report{reports.length === 1 ? '' : 's'}
            </p>
          )}
        </div>

        {reports.length === 0 && (
          <div className="py-16">
            <p className="font-serif text-[22px] text-ink">No reports yet.</p>
            <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-ink-soft">
              Describe an idea and HypeCheck will research it and tell you whether it is worth building, and what to test
              first.
            </p>
            <Link
              href="/check"
              className="mt-6 inline-block bg-ink px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              Run your first HypeCheck
            </Link>
          </div>
        )}

        {reports.length > 0 && (
          <ul>
            {reports.map((row) => {
              const { ideaTitle, hypeScore, verdict } = row.report_data
              const v = verdictStyles[verdict as Verdict] ?? verdictStyles['Validate First']
              return (
                <li key={row.slug} className="border-b border-rule">
                  <Link
                    href={`/report/${row.slug}`}
                    className="group grid grid-cols-[56px_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-surface sm:px-2"
                  >
                    <span className={`font-serif text-[30px] font-medium leading-none tabular-nums ${scoreTone(hypeScore)}`}>
                      {hypeScore}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-medium text-ink group-hover:underline group-hover:decoration-rule-strong group-hover:underline-offset-4">
                        {truncate(ideaTitle, 80)}
                      </span>
                      <span className={`mt-1 inline-block font-mono text-[10.5px] uppercase tracking-[0.1em] ${v.text}`}>
                        {v.label}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-faint">{formatRelativeDate(row.created_at)}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
