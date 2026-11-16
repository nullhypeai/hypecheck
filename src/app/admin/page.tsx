import { createClient as createServiceClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import { redirect } from 'next/navigation'
import { isAdminEmail } from '@/lib/admin'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Metrics | HypeCheck',
  robots: {
    index: false,
    follow: false,
  },
}

interface ReportMetricRow {
  user_id: string
  created_at: string
}

interface CreditMetricRow {
  report_credits: number | null
}

interface MetricCardProps {
  label: string
  value: string
  detail: string
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '0%'
  return `${Math.round(value)}%`
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

function getSevenDaysAgoIso(): string {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
}

function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="border-t border-rule py-5">
      <p className="kicker">
        {label}
      </p>
      <p className="mt-3 font-mono text-3xl tabular-nums tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{detail}</p>
    </div>
  )
}

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  if (!isAdminEmail(user.email)) {
    redirect('/check')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return (
      <div className="flex min-h-screen flex-col bg-paper text-ink">
        <SiteHeader />
        <main className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-[720px] border-t border-ink pt-5">
            <p className="kicker">
              Admin
            </p>
            <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink">
              Missing Supabase service role key
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              Add SUPABASE_SERVICE_ROLE_KEY in the server environment to load private
              aggregate metrics.
            </p>
          </div>
        </main>
      </div>
    )
  }

  const adminSupabase = createServiceClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const sevenDaysAgo = getSevenDaysAgoIso()
  const sevenDaysAgoTime = new Date(sevenDaysAgo).getTime()

  const [
    totalSignupsResult,
    recentSignupsResult,
    totalReportsResult,
    reportRowsResult,
    creditRowsResult,
  ] = await Promise.all([
    adminSupabase.from('profiles').select('*', { count: 'exact', head: true }),
    adminSupabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo),
    adminSupabase.from('reports').select('*', { count: 'exact', head: true }),
    adminSupabase
      .from('reports')
      .select('user_id, created_at')
      .order('created_at', { ascending: false })
      .range(0, 9999),
    adminSupabase.from('profiles').select('report_credits').range(0, 9999),
  ])

  const totalSignups = totalSignupsResult.count ?? 0
  const recentSignups = recentSignupsResult.count ?? 0
  const totalReports = totalReportsResult.count ?? 0
  const reportRows = (reportRowsResult.data ?? []) as ReportMetricRow[]
  const creditRows = (creditRowsResult.data ?? []) as CreditMetricRow[]

  const reportsByUser = new Map<string, number>()
  let reportsLast7Days = 0

  for (const row of reportRows) {
    reportsByUser.set(row.user_id, (reportsByUser.get(row.user_id) ?? 0) + 1)

    if (new Date(row.created_at).getTime() >= sevenDaysAgoTime) {
      reportsLast7Days += 1
    }
  }

  const usersWithReports = reportsByUser.size
  const usersAtFreeLimit = [...reportsByUser.values()].filter((count) => count >= 3).length
  const activationRate = totalSignups > 0 ? (usersWithReports / totalSignups) * 100 : 0
  const freeLimitRate = usersWithReports > 0 ? (usersAtFreeLimit / usersWithReports) * 100 : 0
  const creditsRemaining = creditRows.reduce(
    (sum, row) => sum + Math.max(row.report_credits ?? 0, 0),
    0
  )
  const usersWithCredits = creditRows.filter((row) => (row.report_credits ?? 0) > 0).length

  const hasQueryError =
    totalSignupsResult.error ||
    recentSignupsResult.error ||
    totalReportsResult.error ||
    reportRowsResult.error ||
    creditRowsResult.error

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteHeader />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-[960px] flex-col gap-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="kicker">
                NullHype AI
              </p>
              <h1 className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                HypeCheck Metrics
              </h1>
              <p className="max-w-[620px] text-[14px] leading-relaxed text-muted">
                The tiny founder dashboard: signups, report usage, free-limit pressure,
                and remaining paid credits.
              </p>
            </div>
            <Link
              href="/reports"
              className="shrink-0 text-[13px] text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
            >
              My reports
            </Link>
          </div>
  
          {hasQueryError && (
            <div className="border-l-2 border-accent bg-surface px-5 py-4 text-[14px] leading-relaxed text-ink-soft">
              Some metrics could not be loaded. Check Supabase table permissions and
              column names before relying on these numbers.
            </div>
          )}
  
          <section className="grid gap-x-8 border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              label="Total signups"
              value={formatNumber(totalSignups)}
              detail={`${formatNumber(recentSignups)} in the last 7 days`}
            />
            <MetricCard
              label="Reports generated"
              value={formatNumber(totalReports)}
              detail={`${formatNumber(reportsLast7Days)} in the last 7 days`}
            />
            <MetricCard
              label="Activated users"
              value={formatNumber(usersWithReports)}
              detail={`${formatPercent(activationRate)} of signups generated a report`}
            />
            <MetricCard
              label="Free limit reached"
              value={formatNumber(usersAtFreeLimit)}
              detail={`${formatPercent(freeLimitRate)} of activated users generated 3+ reports`}
            />
            <MetricCard
              label="Credits remaining"
              value={formatNumber(creditsRemaining)}
              detail={`${formatNumber(usersWithCredits)} users currently hold paid credits`}
            />
            <MetricCard
              label="Avg reports per signup"
              value={totalSignups > 0 ? (totalReports / totalSignups).toFixed(1) : '0.0'}
              detail="Useful after launch traffic starts landing"
            />
          </section>
  
          <section className="border-t border-ink py-5">
            <p className="kicker">
              Launch funnel
            </p>
            <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <p className="font-mono text-2xl tabular-nums tracking-tight text-ink">
                  {formatNumber(totalSignups)}
                </p>
                <p className="mt-1 text-[13px] text-muted">Signed up</p>
              </div>
              <div>
                <p className="font-mono text-2xl tabular-nums tracking-tight text-ink">
                  {formatNumber(usersWithReports)}
                </p>
                <p className="mt-1 text-[13px] text-muted">Generated report</p>
              </div>
              <div>
                <p className="font-mono text-2xl tabular-nums tracking-tight text-ink">
                  {formatNumber(usersAtFreeLimit)}
                </p>
                <p className="mt-1 text-[13px] text-muted">Hit free limit</p>
              </div>
              <div>
                <p className="font-mono text-2xl tabular-nums tracking-tight text-ink">
                  {formatNumber(usersWithCredits)}
                </p>
                <p className="mt-1 text-[13px] text-muted">Has paid credits</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
