interface SectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function SectionCard({ title, children, className = '' }: SectionCardProps) {
  return (
    <div
      className={`
        rounded-xl border border-[#2A2A2A] bg-[#111111] p-6
        ${className}
      `}
    >
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[2px] text-[#555555]">
        {title}
      </p>
      {children}
    </div>
  )
}
