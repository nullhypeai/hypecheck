'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HypeCheckReport } from '@/lib/types'
import ReportView from '@/components/report/ReportView'

export default function ReportPage() {
  const [report] = useState<HypeCheckReport | null>(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const stored = sessionStorage.getItem('hypecheckReport')
    if (!stored) {
      return null
    }

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  })
  const router = useRouter()

  useEffect(() => {
    if (!report) {
      router.push('/check')
    }
  }, [report, router])

  if (!report) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="kicker animate-hc-pulse">Loading your report</p>
      </main>
    )
  }

  return (
    <main className="px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-[760px] flex-col gap-6">
        <button
          onClick={() => router.push('/check')}
          className="self-start font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
        >
          ← Check another idea
        </button>

        <ReportView report={report} />
      </div>
    </main>
  )
}
