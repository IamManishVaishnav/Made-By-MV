export default function DotGrid({ fade = true, opacity = 0.22 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(61,126,255,${opacity}) 1px, transparent 1px)`,
        backgroundSize: '38px 38px',
        maskImage: fade
          ? 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)'
          : undefined,
      }}
    />
  )
}
