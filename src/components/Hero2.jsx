import { useEffect, useRef } from 'react'
import { meta } from '../data/content'
import DotGrid from './DotGrid'

export default function Hero2() {
  const leftPanel   = useRef(null)
  const rightPanel  = useRef(null)
  const dividerRef  = useRef(null)
  const leftLabel   = useRef(null)
  const rightLabel  = useRef(null)

  useEffect(() => {
    let target  = 50
    let current = 50
    let rafId

    const onMove = (e) => {
      // Inverted — cursor left → split moves right
      target = 100 - (e.clientX / window.innerWidth) * 100
    }

    const tick = () => {
      current += (target - current) * 0.06
      const pct = current.toFixed(3)

      // Update image clip paths
      if (leftPanel.current)  leftPanel.current.style.clipPath  = `inset(0 ${(100 - current).toFixed(3)}% 0 0)`
      if (rightPanel.current) rightPanel.current.style.clipPath = `inset(0 0 0 ${pct}%)`
      if (dividerRef.current) dividerRef.current.style.left     = `${pct}%`

      // current low = left image dominant = left label bright, right fades
      // current high = right image dominant = right label bright, left fades
      const t = current / 100
      const leftFinal  = Math.min(1, Math.max(0.08, 1 - t * 1.6 + 0.3))
      const rightFinal = Math.min(1, Math.max(0.08, t * 1.6 - 0.3))
      // swap so correct side fades
      if (leftLabel.current)  leftLabel.current.style.opacity  = rightFinal
      if (rightLabel.current) rightLabel.current.style.opacity = leftFinal



      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">

      {/* Dot grid */}
      <DotGrid />

      {/* ── LEFT IMAGE — designer ── */}
      <div
        ref={leftPanel}
        className="absolute inset-0 w-full h-full "
        style={{ clipPath: 'inset(0 50% 0 0)', paddingTop: '80px' }}
      >
        <img
          src="/src/assets/left.png"
          alt="Designer"
          className="w-full h-full object-contain object-center pointer-events-none select-none" style={{ maxHeight: "70vh", maxWidth: "45vw", margin: "auto" }}
        />
      </div>

      {/* ── RIGHT IMAGE — developer ── */}
      <div
        ref={rightPanel}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: 'inset(0 0 0 50%)', paddingTop: '80px' }}
      >
        <img
          src="/src/assets/right.png"
          alt="Developer"
          className="w-full h-full object-contain object-center pointer-events-none select-none" style={{ maxHeight: "70vh", maxWidth: "45vw", margin: "auto" }}
        />
      </div>

      {/* ── DIVIDER LINE ── */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: '50%',
          width: '1px',
          background: 'rgba(255,255,255,0.2)',
          mixBlendMode: 'difference',
          zIndex: 10,
        }}
      />

      {/* ── LEFT LABEL — Designer ── */}
      <div
        ref={leftLabel}
        className="absolute left-0 bottom-48 w-1/2 flex flex-col items-start pointer-events-none"
        style={{
          padding: '0 clamp(24px,5vw,64px)',
          zIndex: 20,
          opacity: 0.5,
          transition: 'opacity 0.05s linear',
        }}
      >
        <span
          className="font-display font-black uppercase leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(28px,4vw,100px)', color: '#ffffff', letterSpacing: '-0.02em' }}
        >
          Designer
        </span>
        <p
          className="font-body font-light leading-relaxed"
          style={{ fontSize: 'clamp(10px,1vw,12px)', color: 'rgba(255,255,255,0.45)', maxWidth: '280px' }}
        >
          Crafting interfaces people feel, not just use.
        </p>
      </div>

      {/* ── RIGHT LABEL — Developer ── */}
      <div
        ref={rightLabel}
        className="absolute right-0 bottom-48 w-1/2 flex flex-col items-end pointer-events-none"
        style={{
          padding: '0 clamp(24px,5vw,64px)',
          zIndex: 20,
          opacity: 0.5,
          transition: 'opacity 0.05s linear',
        }}
      >
        <span
          className="font-display font-black uppercase leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(28px,4vw,100px)', color: '#ffffff', letterSpacing: '-0.02em' }}
        >
          Developer
        </span>
        <p
          className="font-body font-light leading-relaxed text-right"
          style={{ fontSize: 'clamp(10px,1vw,12px)', color: 'rgba(255,255,255,0.45)', maxWidth: '280px' }}
        >
          Writing clean code that brings ideas to life.
        </p>
      </div>

      {/* ── NAME — centered top ── */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center items-center pointer-events-none"
        style={{ paddingTop: 'clamp(32px,6vh,72px)', zIndex: 20 }}
      >
        <div className="flex items-center gap-3">
          <em
            className="block w-7 h-px not-italic flex-shrink-0"
            style={{ background: 'linear-gradient(90deg, transparent, #3d7eff)', boxShadow: '0 0 6px #3d7eff' }}
          />
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: '#3d7eff' }}>
            {meta.name}
          </span>
          <em
            className="block w-7 h-px not-italic flex-shrink-0"
            style={{ background: 'linear-gradient(90deg, #3d7eff, transparent)', boxShadow: '0 0 6px #3d7eff' }}
          />
        </div>
      </div>

      {/* ── BOTTOM DARK FADE ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '220px',
          background: 'linear-gradient(to bottom, transparent, var(--color-bg, #060810) 90%)',
          zIndex: 15,
        }}
      />

    </section>
  )
}