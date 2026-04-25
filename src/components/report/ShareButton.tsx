'use client'

import { useState } from 'react'

export default function ShareButton({
  ideaTitle,
  hypeScore,
}: {
  ideaTitle: string
  hypeScore: number
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail in non-HTTPS or some browser contexts.
      // Silently no-op — the X share button still works as a fallback.
    }
  }

  const handleShareOnX = () => {
    const text = `Got a Hype Score of ${hypeScore}/100 for my idea: "${ideaTitle}"\n\nValidate yours:`
    const url = window.location.href
    const intent = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(intent, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex gap-2 self-end">
      <button
        onClick={handleCopy}
        className="rounded-md border border-[#2A2A2A] bg-[#161616] px-3 py-1.5 text-[13px] text-[#F5F5F5] hover:border-[#7C3AED] transition-colors"
      >
        {copied ? '✓ Copied' : 'Copy link'}
      </button>
      <button
        onClick={handleShareOnX}
        className="rounded-md bg-[#7C3AED] px-3 py-1.5 text-[13px] text-white hover:bg-[#6D28D9] transition-colors"
      >
        Share on 𝕏
      </button>
    </div>
  )
}