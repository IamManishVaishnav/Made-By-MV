import { useEffect, useRef } from 'react'
import { meta, heroLine, tickerWords } from '../data/content'
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
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave) }
  }, [])

  const doubled = [...tickerWords, ...tickerWords]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-bg" style={{ padding: '0 clamp(20px,5vw,64px)' }}>

      {/* Dot grid */}
      <DotGrid />

      {/* Beam */}
      {/* <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
        style={{
          height: '58vh',
          background: 'linear-gradient(to bottom, rgba(61,126,255,1), rgba(0,229,255,0.5) 55%, transparent)',
          boxShadow: '0 0 18px rgba(61,126,255,0.7), 0 0 50px rgba(61,126,255,0.3)',
        }}
      /> */}
      {/* Beam glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '520px', height: '340px', background: 'radial-gradient(ellipse at 50% 0%, rgba(61,126,255,0.13) 0%, transparent 65%)' }}
      />

      {/* Horizontal accent lines */}
      {[16, 84].map(top => (
        <div
          key={top}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${top}%`, background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.07), rgba(0,229,255,0.06), transparent)' }}
        />
      ))}

      {/* Name label */}
      <div className="flex items-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <em className="block w-7 h-px not-italic flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, #3d7eff)', boxShadow: '0 0 6px #3d7eff' }} />
        <span className="font-mono text-[10px] tracking-[0.28em] text-blue uppercase">{meta.name}</span>
        <em className="block w-7 h-px not-italic flex-shrink-0" style={{ background: 'linear-gradient(90deg, #3d7eff, transparent)', boxShadow: '0 0 6px #3d7eff' }} />
      </div>

      {/* Role — magnetic */}
      <div
        ref={roleRef}
        className="font-display font-black leading-none tracking-[-0.03em] mb-7 select-none animate-fade-up"
        style={{ fontSize: 'clamp(58px, 11.5vw, 130px)', animationDelay: '0.2s' }}
      >
        {'Designer & Developer'.split('').map((char, i) => (
          <span
            key={i}
            className="mag inline-block"
            style={{
              transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
              color: char === '&' ? 'transparent' : '#dde4ff',
              WebkitTextStroke: char === '&' ? '1.5px rgba(61,126,255,0.65)' : '0',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Subline */}
      <p
        className="font-body font-light text-mid leading-relaxed max-w-[480px] mb-12 animate-fade-in"
        style={{ fontSize: 'clamp(13px,1.7vw,17px)', animationDelay: '0.45s' }}
      >
        {heroLine}
      </p>

      {/* CTAs */}
      <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <a
          href="#projects"
          data-cursor="VIEW"
          className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-white transition-all duration-200"
          style={{ padding: '12px 28px', background: '#3d7eff', borderRadius: '7px', boxShadow: '0 0 28px rgba(61,126,255,0.45), 0 4px 16px rgba(61,126,255,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 48px rgba(61,126,255,0.7), 0 6px 24px rgba(61,126,255,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(61,126,255,0.45), 0 4px 16px rgba(61,126,255,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          View Work
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          data-cursor="READ"
          className="font-mono text-[10px] font-light tracking-[0.12em] uppercase text-mid transition-all duration-200"
          style={{ padding: '12px 28px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61,126,255,0.45)'; e.currentTarget.style.color = '#dde4ff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#5a6490'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Resume ↗
        </a>
      </div>

      {/* Ticker */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ borderTop: '1px solid rgba(61,126,255,0.1)', padding: '13px 0', background: 'rgba(2,2,8,0.75)', backdropFilter: 'blur(4px)' }}
      >
        <div className="flex gap-11 w-max animate-ticker">
          {doubled.map((word, i) => (
            <span key={i} className="font-mono text-[9px] font-light text-dim tracking-[0.22em] uppercase whitespace-nowrap">
              {word}
              <span className="ml-11 text-blue opacity-55">✦</span>
            </span>
          ))}
        </div>
      </div> */}
    </section>
  )
}
