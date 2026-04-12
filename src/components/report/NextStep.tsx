import SectionCard from './SectionCard'

export default function NextStep({
  action,
  rationale,
}: {
  action: string
  rationale: string
}) {
  return (
    <SectionCard title="Recommended Next Step">
      <div className="rounded-lg border border-[#7C3AED]/30 bg-[#7C3AED]/5 px-5 py-4">
        <p className="text-[15px] font-semibold leading-relaxed text-[#F5F5F5]">
          {action}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#888888]">
          {rationale}
        </p>
      </div>
    </SectionCard>
  )
}
