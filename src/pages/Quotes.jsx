import { useState } from 'react'

const QUOTES = [
  { text: 'Design is not just what it looks like and feels like. Design is how it works.', by: 'Steve Jobs' },
  { text: "You can't use up creativity. The more you use, the more you have.", by: 'Maya Angelou' },
  { text: 'Simplicity is the ultimate sophistication.', by: 'Leonardo da Vinci' },
  { text: 'The details are not the details. They make the design.', by: 'Charles Eames' },
  { text: 'Good design is as little design as possible.', by: 'Dieter Rams' },
  { text: 'Everything is designed. Few things are designed well.', by: 'Brian Reed' },
]

export default function Quotes() {
  const [idx, setIdx]     = useState(0)
  const [fading, setFading] = useState(false)

  const next = () => {
    if (fading) return
    setFading(true)
    setTimeout(() => { setIdx(p => (p + 1) % QUOTES.length); setFading(false) }, 350)
  }

  const q = QUOTES[idx]

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(61,126,255,0.15) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(61,126,255,0.07), transparent 65%)' }} />

      <a href="/" className="absolute top-7 left-7 font-mono text-[10px] text-blue tracking-[0.15em] uppercase z-10 hover:text-text transition-colors">← Back</a>

      <div
        className="max-w-[700px] text-center relative z-10 transition-all duration-350"
        style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(12px)' : 'translateY(0)' }}
      >
        <span className="font-mono text-[9px] text-dim tracking-[0.2em] block mb-7">
          {String(idx + 1).padStart(2, '0')} / {String(QUOTES.length).padStart(2, '0')}
        </span>
        <p className="font-display font-bold text-text leading-[1.2] tracking-[-0.01em] mb-6"
          style={{ fontSize: 'clamp(22px,5vw,46px)' }}>
          "{q.text}"
        </p>
        <span className="font-mono text-[11px] text-blue tracking-[0.12em] uppercase">— {q.by}</span>
      </div>

      <button
        onClick={next}
        className="mt-14 font-mono text-[10px] text-blue tracking-[0.12em] uppercase relative z-10 transition-all duration-200 rounded-[6px]"
        style={{ padding: '11px 26px', background: 'rgba(61,126,255,0.08)', border: '1px solid rgba(61,126,255,0.2)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(61,126,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(61,126,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(61,126,255,0.15)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(61,126,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(61,126,255,0.2)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        Next quote →
      </button>
    </div>
  )
}
