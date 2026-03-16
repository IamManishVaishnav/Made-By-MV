import { useInView } from '../hooks/useInView'
import { about } from '../data/content'
import SectionLabel from './SectionLabel'
import pfp from '../assets/pfp2.jpg'

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-surface"
      style={{ padding: 'clamp(60px,10vw,130px) clamp(16px,5vw,64px)' }}
    >
      {/* left edge glow line */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-px pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(90,159,255,0.4), transparent)' }} />

      {/* subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(90,159,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(90,159,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-[1200px] mx-auto"
        style={{
          display:               'grid',
          gridTemplateColumns:   'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap:                   'clamp(24px,4vw,48px)',
          alignItems:            'stretch',
        }}
      >
        {/* LEFT — text + stats */}
        <div
          className="flex flex-col transition-all duration-700"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <SectionLabel>About</SectionLabel>

          {/* Headline */}
          <div className="mb-8">
            {about.headlineLines.map((line, i) => (
              <div
                key={i}
                className="font-display leading-[1.04] tracking-[-0.01em]"
                style={{
                  fontSize:         'clamp(22px,3.8vw,46px)',
                  color:            i === 3 ? 'transparent' : '#dde4ff',
                  fontWeight:       i === 3 ? 300 : 800,
                  WebkitTextStroke: i === 3 ? '1px rgba(90,159,255,0.28)' : 'none',
                  opacity:          inView ? 1 : 0,
                  transform:        inView ? 'translateY(0)' : 'translateY(16px)',
                  transition:       `opacity 0.55s ease ${0.08 * i}s, transform 0.55s ease ${0.08 * i}s`,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-[12px] mb-8">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-body font-light text-mid leading-[1.82]"
                style={{
                  fontSize:   'clamp(13px,1.6vw,14px)',
                  opacity:    inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.35 + i * 0.1}s`,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Stats — pushed to bottom */}
          <div className="grid grid-cols-2 gap-[10px] mt-auto">
            {about.stats.map((stat, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[10px] bg-card transition-all duration-200"
                style={{
                  padding:    'clamp(14px,2vw,18px) clamp(14px,2vw,20px)',
                  border:     '1px solid rgba(90,159,255,0.1)',
                  opacity:    inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, border-color 0.2s, box-shadow 0.2s`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(90,159,255,0.35)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(90,159,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(90,159,255,0.1)';  e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="absolute top-0 right-0 w-[50px] h-[50px] pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 100% 0%, rgba(90,159,255,0.14), transparent 65%)' }} />
                <div className="font-display font-black text-text leading-none mb-1"
                  style={{ fontSize: 'clamp(22px,3vw,28px)' }}>
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] text-blue tracking-[0.14em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image fills full height */}
        <div
          className="transition-all duration-700"
          style={{
            opacity:         inView ? 1 : 0,
            transform:       inView ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '0.15s',
            minHeight:       'clamp(400px,50vw,600px)',
          }}
        >
          <div className="relative overflow-hidden rounded-xl w-full h-full">
            <img
              src={pfp}
              alt="Manish Vaishnav"
              data-cursor="This is me"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />

            {/* crosshair */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'rgba(90,159,255,0.07)' }} />
              <div className="absolute left-1/2 top-0 bottom-0 w-px"  style={{ background: 'rgba(90,159,255,0.07)' }} />
            </div>

            {/* corner brackets */}
            {[['top-3 left-3','border-t border-l'],['top-3 right-3','border-t border-r'],['bottom-3 left-3','border-b border-l'],['bottom-3 right-3','border-b border-r']].map(([pos, bdr], i) => (
              <span key={i} className={`absolute w-4 h-4 ${pos} ${bdr} border-blue/40`} />
            ))}

            {/* bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
              style={{ background: 'linear-gradient(to top, #05060e, transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}