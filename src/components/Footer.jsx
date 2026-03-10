import { useInView } from '../hooks/useInView'
import { meta } from '../data/content'

export default function Footer() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#1a3aff', padding: 'clamp(64px,10vw,110px) clamp(20px,5vw,64px) clamp(36px,5vw,56px)' }}
    >
      {/* dot grid on blue */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.4 }} />
      {/* top-left radial */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1), transparent 60%)' }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid gap-16 mb-[72px]" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>

          {/* Left CTA */}
          <div
            className="transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)' }}
          >
            <h2 className="font-display font-black text-[#020208] leading-[0.92] tracking-[-0.02em] mb-9"
              style={{ fontSize: 'clamp(36px,6vw,72px)' }}>
              Let's build something real.
            </h2>
            <div className="flex gap-3 flex-wrap">
              <a
                href={`mailto:${meta.email}`}
                data-cursor="MAIL"
                className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-text transition-all duration-200"
                style={{ padding: '13px 28px', background: '#020208', borderRadius: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)' }}
              >
                Email Me
              </a>
              <a
                href={meta.linkedin}
                target="_blank"
                data-cursor="OPEN"
                className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#020208] transition-all duration-200"
                style={{ padding: '13px 28px', background: 'rgba(2,2,8,0.15)', border: '1px solid rgba(2,2,8,0.25)', borderRadius: '8px' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(2,2,8,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(2,2,8,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right info */}
          <div
            className="transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transitionDelay: '0.15s' }}
          >
            <div className="font-display font-black text-[#020208] leading-none tracking-[-0.01em] mb-5"
              style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              {meta.name}
            </div>
            <div className="flex flex-col gap-[6px] mb-6">
              {[meta.location, meta.email, meta.phone].map((v, i) => (
                <span key={i} className="font-mono text-[11px] font-light tracking-[0.04em]" style={{ color: 'rgba(2,2,8,0.5)' }}>{v}</span>
              ))}
            </div>
            <div className="flex gap-[10px]">
              {[{ l: 'GH', h: meta.github, c: 'CODE' }, { l: 'LI', h: meta.linkedin, c: 'OPEN' }, { l: '@', h: `mailto:${meta.email}`, c: 'MAIL' }].map((s, i) => (
                <a
                  key={i}
                  href={s.h}
                  target="_blank"
                  data-cursor={s.c}
                  className="w-9 h-9 flex items-center justify-center font-mono text-[10px] font-medium text-[#020208] rounded-[8px] transition-all duration-200"
                  style={{ background: 'rgba(2,2,8,0.12)', border: '1px solid rgba(2,2,8,0.18)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(2,2,8,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(2,2,8,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {s.l}
                </a>
              ))}
            </div>
          </div>
        </div>

        
        <div className="flex justify-between flex-wrap gap-2 pt-5" style={{ borderTop: '1px solid rgba(2,2,8,0.15)' }}>
          <span className="font-mono text-[10px] tracking-[0.05em]" style={{ color: 'rgba(2,2,8,0.4)' }}>© {new Date().getFullYear()} Manish Vaishnav</span>
          <span className="font-mono text-[10px] tracking-[0.05em]" style={{ color: 'rgba(2,2,8,0.4)' }}>Designed & Built by Manish Vaishnav</span>
        </div>
      </div>
    </section>
  )
}
