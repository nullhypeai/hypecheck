import { createClient as createServiceClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
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

function getAdminEmails(): string[] {
  return (process.env.HYPECHECK_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
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
    <div className="rounded-lg border border-[#222222] bg-[#111111] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#666666]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tabular-nums text-[#F5F5F5]">
        {value}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#888888]">{detail}</p>
    </div>
  )
}

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const adminEmails = getAdminEmails()
  const userEmail = user.email?.toLowerCase()

  if (!userEmail || !adminEmails.includes(userEmail)) {
    redirect('/check')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] px-4 py-12">
        <div className="mx-auto max-w-[720px] rounded-lg border border-[#2A2A2A] bg-[#111111] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#666666]">
            Admin
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#F5F5F5]">
            Missing Supabase service role key
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#999999]">
            Add SUPABASE_SERVICE_ROLE_KEY in the server environment to load private
            aggregate metrics.
          </p>
        </div>
      </main>
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
    <main className="min-h-screen bg-[#0A0A0A] px-4 py-12">
      <div className="mx-auto flex max-w-[960px] flex-col gap-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#555555]">
              NullHype AI
            </p>
            <h1 className="text-2xl font-semibold text-[#F5F5F5]">
              HypeCheck Metrics
            </h1>
            <p className="max-w-[620px] text-[14px] leading-relaxed text-[#888888]">
              The tiny founder dashboard: signups, report usage, free-limit pressure,
              and remaining paid credits.
            </p>
          </div>
          <Link
            href="/reports"
            className="rounded-lg border border-[#2A2A2A] px-4 py-2 text-center text-[13px] font-semibold text-[#F5F5F5] transition-colors hover:border-[#2563EB] hover:text-[#60A5FA]"
          >
            My reports
          </Link>
        </div>

        {hasQueryError && (
          <div className="rounded-lg border border-[#7F1D1D] bg-[#1A0F0F] px-5 py-4 text-[14px] leading-relaxed text-[#FCA5A5]">
            Some metrics could not be loaded. Check Supabase table permissions and
            column names before relying on these numbers.
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        <section className="rounded-lg border border-[#222222] bg-[#111111] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#666666]">
            Launch funnel
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-semibold tabular-nums text-[#F5F5F5]">
                {formatNumber(totalSignups)}
              </p>
              <p className="mt-1 text-[13px] text-[#888888]">Signed up</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-[#F5F5F5]">
                {formatNumber(usersWithReports)}
              </p>
              <p className="mt-1 text-[13px] text-[#888888]">Generated report</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-[#F5F5F5]">
                {formatNumber(usersAtFreeLimit)}
              </p>
              <p className="mt-1 text-[13px] text-[#888888]">Hit free limit</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-[#F5F5F5]">
                {formatNumber(usersWithCredits)}
              </p>
              <p className="mt-1 text-[13px] text-[#888888]">Has paid credits</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
