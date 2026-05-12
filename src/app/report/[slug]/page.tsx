import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { HypeCheckReport } from '@/lib/types'
import ReportView from '@/components/report/ReportView'
import ShareButton from '@/components/report/ShareButton'
import { sanitizeDashes } from '@/lib/sanitizeText'

interface ReportResult {
  report: HypeCheckReport
  userId: string
}

const getReportBySlug = cache(async (slug: string): Promise<ReportResult | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reports')
    .select('report_data, user_id')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return {
    report: data.report_data as HypeCheckReport,
    userId: data.user_id as string,
  }
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getReportBySlug(slug)

  if (!result) {
    return { title: 'Report not found · HypeCheck' }
  }

  const { report } = result
  const ideaTitle = sanitizeDashes(report.ideaTitle)
  const oneLinerSummary = sanitizeDashes(report.oneLinerSummary)

  return {
    title: `${ideaTitle} - Hype Score ${report.hypeScore}/100 · HypeCheck`,
    description: oneLinerSummary,
    openGraph: {
      title: `${ideaTitle} - Hype Score ${report.hypeScore}/100`,
      description: oneLinerSummary,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ideaTitle} - Hype Score ${report.hypeScore}/100`,
      description: oneLinerSummary,
    },
  }
}

export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getReportBySlug(slug)

  if (!result) {
    notFound()
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { report, userId } = result
  const isOwner = user?.id === userId

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-4 py-12">
      <div className="mx-auto flex max-w-[720px] flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/check"
            className="rounded-lg border border-[#2563EB]/30 bg-[#2563EB]/10 px-3 py-2 text-[13px] font-semibold text-[#60A5FA] transition-colors hover:border-[#2563EB]/50 hover:bg-[#2563EB]/20 hover:text-[#93C5FD]"
          >
            {isOwner ? '⚡ Validate another idea' : '✨ Validate your idea →'}
          </Link>
          <ShareButton ideaTitle={sanitizeDashes(report.ideaTitle)} hypeScore={report.hypeScore} />
        </div>

        <ReportView report={report} />
      </div>
    </main>
  )
}
