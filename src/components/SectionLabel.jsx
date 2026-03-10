export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <span
        className="inline-block w-4 h-px bg-blue flex-shrink-0"
        style={{ boxShadow: '0 0 6px #3d7eff' }}
      />
      <span className="font-mono text-[10px] tracking-[0.22em] text-blue uppercase">
        {children}
      </span>
    </div>
  )
}
