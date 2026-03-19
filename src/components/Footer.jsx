import { useInView } from '../hooks/useInView'
import { meta } from '../data/content'

const BG     = '#1a3aff'
const TEXT   = '#f0f4ff'
const MUTED  = 'rgba(240,244,255,0.6)'
const DIMMED = 'rgba(240,244,255,0.35)'
const BORDER = 'rgba(240,244,255,0.15)'

export default function Footer() {
  const { ref, inView } = useInView(0.1)

  const waLink = `https://wa.me/917976536393?text=${encodeURIComponent('Hi Manish, I saw your portfolio and wanted to connect.')}`

  const socials = [
    {
      href: `mailto:${meta.email}`,
      label: 'Email',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
    },
    {
      href: meta.linkedin,
      label: 'LinkedIn',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      href: meta.github,
      label: 'GitHub',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
    },
    {
      href: waLink,
      label: 'WhatsApp',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.12 1.523 5.854L.054 23.5l5.793-1.52A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.8a9.8 9.8 0 0 1-5.002-1.373l-.36-.213-3.43.9.916-3.348-.234-.374A9.763 9.763 0 0 1 2.2 12C2.2 6.587 6.587 2.2 12 2.2S21.8 6.587 21.8 12 17.413 21.8 12 21.8z"/>
        </svg>
      ),
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: BG }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize:  '30px 30px',
          opacity:         0.6,
        }}
      />

      {/* top-left radial */}
      <div
        className="absolute top-0 left-0 w-[600px] h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 30%, rgba(255,255,255,0.08), transparent 65%)' }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto flex flex-col transition-all duration-700"
        style={{
          padding:   'clamp(40px,8vw,80px) clamp(16px,5vw,72px)',
          minHeight: 'clamp(300px,50vw,400px)',
          opacity:   inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(28px)',
        }}
      >
        {/* main row */}
        <div
          className="flex flex-1"
          style={{
            gap:            'clamp(24px,5vw,48px)',
            flexWrap:       'wrap',
            justifyContent: 'space-between',
            alignItems:     'flex-start',
          }}
        >
          {/* LEFT — headline */}
          <div style={{ flex: '1 1 280px' }}>
            <h2
              className="font-display font-black uppercase"
              style={{
                fontSize:      'clamp(40px,10vw,120px)',
                lineHeight:    '0.88',
                letterSpacing: '-0.03em',
                color:         TEXT,
              }}
            >
              Let's build
              <br />
              something
              <br />
              great.
            </h2>
          </div>

          {/* RIGHT — name block pinned to bottom on desktop, below headline on mobile */}
          <div
            style={{
              flex:      '0 1 auto',
              textAlign: 'right',
              alignSelf: 'flex-end',
            }}
          >
            <div className="flex flex-col gap-[5px]">
              <div
                className="font-display font-black uppercase mb-1"
                style={{ fontSize: 'clamp(14px,1.8vw,20px)', color: TEXT, letterSpacing: '0.02em' }}
              >
                {meta.name}
              </div>
              <span className="font-mono" style={{ fontSize: 'clamp(10px,1.2vw,11px)', color: MUTED }}>
                {meta.location}
              </span>
              <a
                href={`mailto:${meta.email}`}
                className="font-mono transition-colors duration-200"
                style={{ fontSize: 'clamp(10px,1.2vw,11px)', color: MUTED, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = TEXT}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              >
                {meta.email}
              </a>
              <a
                href={`tel:${meta.phone}`}
                className="font-mono transition-colors duration-200"
                style={{ fontSize: 'clamp(10px,1.2vw,11px)', color: MUTED, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = TEXT}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              >
                {meta.phone}
              </a>
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <div
          className="flex items-center justify-between flex-wrap"
          style={{
            marginTop:   'clamp(28px,5vw,48px)',
            paddingTop:  'clamp(16px,3vw,24px)',
            borderTop:   `1px solid ${BORDER}`,
            gap:         '12px',
          }}
        >
          {/* social icons */}
          <div className="flex gap-[10px] flex-wrap">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                aria-label={s.label}
                className="flex items-center justify-center rounded-[8px] transition-all duration-200"
                style={{
                  width:          'clamp(36px,5vw,42px)',
                  height:         'clamp(36px,5vw,42px)',
                  background:     'rgba(255,255,255,0.08)',
                  border:         `1px solid ${BORDER}`,
                  color:          TEXT,
                  textDecoration: 'none',
                  flexShrink:     0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
                  e.currentTarget.style.transform  = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow  = '0 8px 20px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform  = 'translateY(0)'
                  e.currentTarget.style.boxShadow  = 'none'
                }}
              >
                {s.svg}
              </a>
            ))}
          </div>

          <span
            className="font-mono uppercase"
            style={{ fontSize: 'clamp(8px,1vw,9px)', letterSpacing: '0.1em', color: DIMMED }}
          >
            © {new Date().getFullYear()} · Designed & Built by Manish Vaishnav
          </span>
        </div>

      </div>
    </section>
  )
}