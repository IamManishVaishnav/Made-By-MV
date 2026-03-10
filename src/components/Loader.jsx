import { useState, useEffect } from 'react'
import { loaderWords, meta } from '../data/content'

export default function Loader({ onDone }) {
  const [idx, setIdx]         = useState(0)
  const [phase, setPhase]     = useState('in')
  const [progress, setProgress] = useState(0)
  const [showName, setShowName] = useState(false)
  const [exiting, setExiting]   = useState(false)

  useEffect(() => {
    let t
    const WD = 820, FD = 280
    const total = loaderWords.length

    const cycle = (i) => {
      if (i >= total) {
        setShowName(true)
        t = setTimeout(() => { setExiting(true); setTimeout(onDone, 650) }, 950)
        return
      }
      setIdx(i); setPhase('in')
      t = setTimeout(() => {
        setPhase('out')
        t = setTimeout(() => cycle(i + 1), FD)
      }, WD)
    }
    cycle(0)

    let start = null
    const totalMs = total * WD + 950
    const tick = (ts) => {
      if (!start) start = ts
      setProgress(Math.min(((ts - start) / totalMs) * 100, 100))
      if (ts - start < totalMs) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[5000] bg-bg flex flex-col items-center justify-center"
      style={{ opacity: exiting ? 0 : 1, transition: 'opacity 0.65s ease', pointerEvents: exiting ? 'none' : 'all' }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(61,126,255,0.2) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />

      {/* corner brackets */}
      {[['top-5 left-5','border-t border-l'],['top-5 right-5','border-t border-r'],['bottom-5 left-5','border-b border-l'],['bottom-5 right-5','border-b border-r']].map(([pos, bdr], i) => (
        <span key={i} className={`absolute w-5 h-5 ${pos} ${bdr} border-blue/40`} />
      ))}

      {/* scanline */}
      <div
        className="absolute left-0 right-0 h-px anim-scan pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.7), rgba(0,229,255,0.5), transparent)', boxShadow: '0 0 8px #3d7eff' }}
      />

      {/* sys label */}
      <p className="font-mono text-[9px] tracking-[0.25em] text-blue/40 mb-12 animate-fade-in">
        SYS::INIT — PORTFOLIO_v3
      </p>

      {/* word */}
      <div className="h-24 flex items-center justify-center overflow-hidden">
        {!showName ? (
          <span
            key={idx}
            className={`font-display font-black tracking-[0.12em] text-text block ${phase === 'in' ? 'anim-slide-up' : 'anim-slide-down'}`}
            style={{ fontSize: 'clamp(48px, 10vw, 88px)' }}
          >
            {loaderWords[idx]}
          </span>
        ) : (
          <span
            className="font-mono font-light tracking-[0.35em] text-text/40 uppercase animate-fade-in"
            style={{ fontSize: 'clamp(11px, 1.6vw, 15px)' }}
          >
            {meta.name}
          </span>
        )}
      </div>

      {/* progress */}
      <div className="mt-12 w-[min(320px,55vw)]">
        <div className="h-px bg-white/5 rounded overflow-hidden">
          <div
            className="h-full rounded"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3d7eff, #00e5ff)',
              boxShadow: '0 0 10px #3d7eff, 0 0 20px rgba(61,126,255,0.5)',
              transition: 'width 0.08s linear',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[9px] text-blue/40 tracking-[0.1em]">LOADING</span>
          <span className="font-mono text-[9px] text-blue/40">{String(Math.round(progress)).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
