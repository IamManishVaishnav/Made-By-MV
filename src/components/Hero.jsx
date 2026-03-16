import { useEffect, useRef } from 'react'
import { heroLine, tickerWords } from '../data/content'
import DotGrid from './DotGrid'

export default function Hero() {
  const roleRef = useRef(null)

  useEffect(() => {
    const container = roleRef.current
    if (!container) return
    const letters = container.querySelectorAll('.mag')

    const onMove = (e) => {
      letters.forEach(l => {
        const r    = l.getBoundingClientRect()
        const dx   = e.clientX - (r.left + r.width / 2)
        const dy   = e.clientY - (r.top + r.height / 2)
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 90) {
          const f = (90 - dist) / 90
          l.style.transform = `translate(${-dx * f * 0.45}px, ${-dy * f * 0.45}px)`
        } else {
          l.style.transform = 'translate(0,0)'
        }
      })
    }
    const onLeave = () => letters.forEach(l => (l.style.transform = 'translate(0,0)'))
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const doubled = [...tickerWords, ...tickerWords]

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-bg"
      style={{ padding: 'clamp(80px,10vw,120px) clamp(16px,5vw,64px) clamp(80px,10vw,120px)' }}
    >
      <DotGrid />

      {/* beam glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width:      'min(520px,90vw)',
          height:     '340px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(90,159,255,0.13) 0%, transparent 65%)',
        }}
      />

      {/* horizontal accent lines */}
      {[16, 84].map(top => (
        <div
          key={top}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${top}%`, background: 'linear-gradient(90deg, transparent, rgba(90,159,255,0.07), rgba(0,229,255,0.06), transparent)' }}
        />
      ))}

      {/* Role — magnetic, splits to 2 lines on mobile */}
      <div
        ref={roleRef}
        className="font-display font-black leading-[0.92] tracking-[-0.03em] mb-6 select-none animate-fade-up w-full"
        style={{ fontSize: 'clamp(44px,11.5vw,130px)', animationDelay: '0.2s' }}
      >
        {/* on mobile split Designer / & Developer to avoid overflow */}
        <span className="block sm:hidden">
          {'Designer'.split('').map((char, i) => (
            <span key={`d${i}`} className="mag inline-block"
              style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)', color: '#dde4ff' }}>
              {char}
            </span>
          ))}
        </span>
        <span className="block sm:hidden" style={{ fontSize: '0.7em' }}>
          <span className="mag inline-block" style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)', color: 'transparent', WebkitTextStroke: '1.5px rgba(90,159,255,0.65)' }}>&</span>
          {' Developer'.split('').map((char, i) => (
            <span key={`v${i}`} className="mag inline-block"
              style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)', color: '#dde4ff' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>

        {/* desktop — single line */}
        <span className="hidden sm:inline">
          {'Designer & Developer'.split('').map((char, i) => (
            <span
              key={i}
              className="mag inline-block"
              style={{
                transition:       'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                color:            char === '&' ? 'transparent' : '#dde4ff',
                WebkitTextStroke: char === '&' ? '1.5px rgba(90,159,255,0.65)' : '0',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </div>

      {/* Subline — highlighted card */}
      <div
        className="relative mb-10 animate-fade-in w-full"
        style={{ animationDelay: '0.45s', maxWidth: 'min(560px,88vw)' }}
      >
        <div
          className="absolute inset-0 rounded-[8px] pointer-events-none"
          style={{
            background: 'rgba(90,159,255,0.05)',
            border:     '1px solid rgba(90,159,255,0.14)',
            boxShadow:  '0 0 30px rgba(90,159,255,0.05)',
          }}
        />
        <p
          className="relative font-body leading-relaxed"
          style={{
            fontSize:      'clamp(13px,1.8vw,18px)',
            fontWeight:    500,
            color:         '#dde4ff',
            padding:       'clamp(10px,2vw,16px) clamp(14px,3vw,28px)',
            letterSpacing: '-0.01em',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Most devs can't design. Most designers can't code. </span>
          <span style={{ color: '#dde4ff', fontWeight: 700 }}>I do both.</span>
        </p>
      </div>

      {/* CTAs */}
      <div
        className="flex gap-3 animate-fade-in flex-wrap justify-center"
        style={{ animationDelay: '0.6s' }}
      >
        <a
          href="#projects"
          data-cursor="VIEW"
          className="font-mono font-medium tracking-[0.12em] uppercase text-white transition-all duration-200"
          style={{
            fontSize:     'clamp(9px,1.2vw,10px)',
            padding:      'clamp(10px,1.5vw,12px) clamp(20px,3vw,28px)',
            background:   '#5a9fff',
            borderRadius: '7px',
            boxShadow:    '0 0 28px rgba(90,159,255,0.45), 0 4px 16px rgba(90,159,255,0.3)',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 48px rgba(90,159,255,0.7), 0 6px 24px rgba(90,159,255,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(90,159,255,0.45), 0 4px 16px rgba(90,159,255,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          View Work
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          data-cursor="READ"
          className="font-mono font-light tracking-[0.12em] uppercase text-mid transition-all duration-200"
          style={{
            fontSize:     'clamp(9px,1.2vw,10px)',
            padding:      'clamp(10px,1.5vw,12px) clamp(20px,3vw,28px)',
            background:   'transparent',
            border:       '1px solid rgba(255,255,255,0.1)',
            borderRadius: '7px',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(90,159,255,0.45)'; e.currentTarget.style.color = '#dde4ff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#5a6490'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Resume ↗
        </a>
      </div>

      {/* Ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{
          borderTop:      '1px solid rgba(90,159,255,0.12)',
          padding:        '11px 0',
          background:     'rgba(2,2,8,0.8)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="flex w-max animate-ticker" style={{ gap: 'clamp(24px,4vw,44px)' }}>
          {doubled.map((word, i) => (
            <span
              key={i}
              className="font-mono font-light tracking-[0.18em] uppercase whitespace-nowrap"
              style={{ fontSize: 'clamp(9px,1vw,10px)', color: 'rgba(255,255,255,0.35)' }}
            >
              {word}
              <span style={{ marginLeft: 'clamp(24px,4vw,44px)', color: '#5a9fff', opacity: 0.7 }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}