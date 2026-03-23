import { useEffect, useRef, useState } from 'react'
import { meta } from '../data/content'
import pfp from '../assets/img.jpg'
import Resume from '../assets/Resume.pdf'

export default function Hero() {
  const [scrollY, setScrollY]   = useState(0)
  const [hovered, setHovered]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const progress = Math.min(scrollY / 500, 1)
  const opacity  = Math.max(1 - progress * 1.2, 0)
  const blur     = progress * 8

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#030408' }}
    >
      {/* dot dissolve overlay — appears on scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:     5,
          opacity:    progress * 0.85,
          background: `radial-gradient(circle, rgba(90,159,255,${progress * 0.4}) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(50,70,160,0.18), transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 15% 50%, rgba(60,80,180,0.1), transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 85% 50%, rgba(60,80,180,0.08), transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 30% at 50% 10%, rgba(90,159,255,0.07), transparent 60%)' }} />

      {/* content */}
      <div
        className="relative flex flex-col items-center justify-center text-center flex-1"
        style={{
          zIndex:     1,
          padding:    'clamp(8px,4vw,140px) clamp(20px,5vw,64px) clamp(40px,6vw,100px)',
          opacity,
          filter:     `blur(${blur}px)`,
          transform:  hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: `transform ${hovered ? '0.6s' : '0.8s'} cubic-bezier(0.22,1,0.36,1)`,
          willChange: 'transform, opacity, filter',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* headline */}
        <div
          className="font-body font-black animate-fade-up flex flex-wrap items-center justify-center"
          style={{
            fontSize:       'clamp(30px,6.5vw,82px)',
            color:          '#dde4ff',
            letterSpacing:  '-0.03em',
            lineHeight:     1,
            animationDelay: '0.1s',
            gap:            'clamp(6px,1.2vw,18px)',
            marginBottom:   'clamp(10px,1.5vw,14px)',
          }}
        >
          <span>Designer</span>

          {/* inline photo — sm+ only */}
          <span
            className="hidden sm:inline-block relative overflow-hidden flex-shrink-0"
            style={{
              width:         'clamp(40px,6vw,80px)',
              height:        'clamp(54px,7.8vw,102px)',
              borderRadius:  'clamp(8px,1.2vw,16px)',
              border:        '1px solid rgba(90,159,255,0.28)',
              boxShadow:     `0 0 20px rgba(90,159,255,0.15), 0 ${hovered ? '18px' : '10px'} 32px rgba(0,0,0,0.55)`,
              verticalAlign: 'middle',
              position:      'relative',
              top:           '-2px',
              transition:    'box-shadow 0.6s ease',
            }}
          >
            <img
              src={pfp}
              alt={meta.name}
              style={{
                width:          '100%',
                height:         '100%',
                objectFit:      'cover',
                objectPosition: 'top center',
                filter:         'brightness(0.88) saturate(0.8)',
              }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(20,40,110,0.18), rgba(8,16,50,0.38))' }} />
          </span>

          <span>&amp; Developer</span>
        </div>

        {/* subline */}
        <p
          className="font-body animate-fade-up"
          style={{
            fontSize:       'clamp(13px,2.8vw,36px)',
            fontWeight:     700,
            letterSpacing:  '-0.01em',
            lineHeight:     1.25,
            animationDelay: '0.18s',
            marginBottom:   'clamp(12px,2.5vw,32px)',
            maxWidth:       'min(700px, 90vw)',
          }}
        >
          <span style={{ color: 'rgba(221,228,255,0.28)' }}>Most devs can't design. Most designers can't code.{' '}</span>
          <span style={{ color: '#5a9fff' }}>I do both.</span>
        </p>

        {/* bracketed intent line */}
        <p
          className="font-mono animate-fade-in"
          style={{
            fontSize:       'clamp(15px,1.2vw,20px)',
            color:          'white',
            letterSpacing:  '0.04em',
            animationDelay: '0.3s',
            marginBottom:   'clamp(20px,4vw,52px)',
            maxWidth:       'min(800px, 200vw)',
            lineHeight:     1.6,
          }}
        >
          [ I'm Manish — a designer who codes with intent ]
        </p>

        {/* CTAs */}
        <div
          className="flex gap-3 flex-wrap justify-center animate-fade-in"
          style={{ animationDelay: '0.42s' }}
        >
          <a
            href="#projects"
            data-cursor="VIEW"
            className="font-body font-semibold uppercase transition-all duration-200"
            style={{
              fontSize:       'clamp(10px,1.2vw,12px)',
              letterSpacing:  '0.08em',
              padding:        'clamp(9px,1.6vw,14px) clamp(18px,3vw,36px)',
              background:     '#5a9fff',
              borderRadius:   '8px',
              color:          '#020208',
              boxShadow:      '0 0 18px rgba(90,159,255,0.28)',
              textDecoration: 'none',
              whiteSpace:     'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(90,159,255,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(90,159,255,0.28)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            View Work
          </a>
          <a
            href={Resume}
            download = "Resume.pdf"
            data-cursor="READ"
            className="font-body font-medium uppercase transition-all duration-200"
            style={{
              fontSize:       'clamp(10px,1.2vw,12px)',
              letterSpacing:  '0.08em',
              padding:        'clamp(9px,1.6vw,14px) clamp(18px,3vw,36px)',
              background:     'transparent',
              border:         '1px solid rgba(255,255,255,0.1)',
              borderRadius:   '8px',
              color:          'rgba(221,228,255,0.4)',
              textDecoration: 'none',
              whiteSpace:     'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(90,159,255,0.4)'; e.currentTarget.style.color = '#dde4ff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(221,228,255,0.4)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Resume ↗
          </a>
        </div>

      </div>
    </section>
  )
}