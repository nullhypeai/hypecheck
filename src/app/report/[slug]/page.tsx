import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { HypeCheckReport } from '@/lib/types'
import ReportView from '@/components/report/ReportView'
import ShareButton from '@/components/report/ShareButton'
import { sanitizeDashes } from '@/lib/sanitizeText'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

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
    <div className="flex min-h-screen flex-col">
      <SiteHeader>
        <Link href="/check" className="bg-ink px-3.5 py-2 font-medium text-paper transition-colors hover:bg-ink-soft">
          {isOwner ? 'Check another idea' : 'Check your own idea'}
        </Link>
      </SiteHeader>
      <main className="mx-auto w-full max-w-[760px] flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 flex justify-end">
          <ShareButton ideaTitle={sanitizeDashes(report.ideaTitle)} hypeScore={report.hypeScore} />
        </div>
        <ReportView report={report} />
        {!isOwner && (
          <div className="mt-14 border-t border-ink pt-6 text-center">
            <p className="font-serif text-[22px] text-ink">Have an idea of your own?</p>
            <p className="mt-1 text-[14px] text-muted">3 free reports. No subscription.</p>
            <Link
              href="/check"
              className="mt-4 inline-block bg-ink px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              Run a HypeCheck
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
