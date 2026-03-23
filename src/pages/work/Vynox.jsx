import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import heroImg         from '../../assets/vynox/hero.png'
import howItWorksImg   from '../../assets/vynox/how-it-works.png'
import solutionsImg    from '../../assets/vynox/solutions.png'
import creatorsImg     from '../../assets/vynox/creators.png'
import numbersImg      from '../../assets/vynox/numbers.png'
import apartImg        from '../../assets/vynox/apart.png'
import campaignsImg    from '../../assets/vynox/campaigns.png'
import testimonialsImg from '../../assets/vynox/testimonials.png'
import ctaImg          from '../../assets/vynox/cta.png'
import footerImg       from '../../assets/vynox/footer.png'
import oldVynoxImg     from '../../assets/vynox/oldVynox.png'

const ACCENT        = '#a78bfa'
const ACCENT_DIM    = 'rgba(167,139,250,0.1)'
const ACCENT_BORDER = 'rgba(167,139,250,0.22)'
const ACCENT_GLOW   = 'rgba(167,139,250,0.07)'
const BG            = '#020208'
const SURFACE       = '#05060e'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem',  label: 'Problem'  },
  { id: 'process',  label: 'Process'  },
  { id: 'screens',  label: 'Screens'  },
  { id: 'outcome',  label: 'Outcome'  },
]

function SideNav({ active }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5">
      {SECTIONS.map(s => (
        <a key={s.id} href={`#${s.id}`} style={{ textDecoration: 'none' }} className="flex items-center gap-3 transition-all duration-200">
          <div style={{ width: active === s.id ? '20px' : '8px', height: '1.5px', background: active === s.id ? ACCENT : 'rgba(255,255,255,0.15)', boxShadow: active === s.id ? `0 0 8px ${ACCENT}` : 'none', transition: 'all 0.3s' }} />
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: active === s.id ? ACCENT : 'rgba(255,255,255,0.2)', opacity: active === s.id ? 1 : 0, transition: 'all 0.2s' }}>{s.label}</span>
        </a>
      ))}
    </div>
  )
}

function Label({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
      <span style={{ display: 'inline-block', width: '16px', height: '1px', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}`, flexShrink: 0 }} />
      <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT }}>{children}</span>
    </div>
  )
}

function Tag({ children }) {
  return (
    <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '5px', background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
      {children}
    </span>
  )
}

function Img({ src, alt, style = {} }) {
  return (
    <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${ACCENT_BORDER}`, boxShadow: `0 24px 80px rgba(0,0,0,0.55), 0 0 40px ${ACCENT_GLOW}`, ...style }}>
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
    </div>
  )
}

function ScreenLabel({ children }) {
  return (
    <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '10px' }}>
      {children}
    </p>
  )
}

export default function VynoxCaseStudy() {
  const [active, setActive] = useState('overview')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25 }
    )
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const pad = 'clamp(20px,5vw,64px)'
  const sec = `clamp(64px,10vw,110px) ${pad}`

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#dde4ff', fontFamily: 'Manrope, sans-serif' }}>

      {/* grain */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9000, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '160px', opacity: 0.025, mixBlendMode: 'overlay' }} />

      <SideNav active={active} />

      {/* top nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between flex-wrap gap-3" style={{ padding: `16px ${pad}`, background: 'rgba(2,2,8,0.75)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Link to="/" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >← Back</Link>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.18)' }}>madebymv</span>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT }}>Vynox Media</span>
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', padding: `clamp(100px,14vw,150px) ${pad} clamp(48px,7vw,80px)`, position: 'relative' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(167,139,250,0.15) 1px, transparent 1px)', backgroundSize: '38px 38px', maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)' }} />
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 'min(600px,80vw)', height: 'min(600px,80vw)', background: 'radial-gradient(circle at 100% 0%, rgba(167,139,250,0.09), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '16px', height: '1px', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT }}>Case Study · UI/UX</span>
          </div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(48px,10vw,120px)', fontWeight: 800, color: '#dde4ff', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            Vynox<br />
            <span style={{ color: 'rgba(167,139,250,0.55)', fontWeight: 300 }}>Media</span>

          </h1>
          <p style={{ fontSize: 'clamp(14px,2vw,19px)', color: 'rgba(255,255,255,0.4)', maxWidth: '560px', lineHeight: 1.65, marginBottom: '28px', fontWeight: 300 }}>
            Redesigning a generic influencer marketing agency website into something that actually looks like it belongs in 2025.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {['UI Design', 'Development', 'Figma', 'React'].map(t => <Tag key={t}>{t}</Tag>)}
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.25)', alignSelf: 'center', marginLeft: '4px' }}>2024</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '1px', height: '48px', background: `linear-gradient(to bottom, ${ACCENT}, transparent)` }} />
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* hero mockup */}
      <div style={{ padding: `0 ${pad}`, marginTop: '-32px', marginBottom: 'clamp(64px,10vw,110px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Img src={heroImg} alt="Vynox homepage hero section" />
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      <section id="overview" style={{ padding: sec }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Label>Overview</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))', gap: 'clamp(24px,5vw,64px)' }}>
            <div>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#dde4ff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                A brand that needed to look as good as the results it delivers.
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, marginBottom: '14px', fontWeight: 300 }}>
                Vynox Media is an influencer marketing agency — they connect brands with creators and run campaigns. Their work is modern, fast, and results-driven. Their website wasn't.
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, fontWeight: 300 }}>
                The brief was to redesign the website from scratch — keeping the dark theme but making it feel intentional, editorial, and premium rather than template-generated.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Role',   value: 'UI Designer & Developer'        },
                { label: 'Tools',  value: 'Figma, React, Node.js, VS Code' },
                { label: 'Type',   value: 'Website Redesign'               },
                { label: 'Year',   value: '2024'                           },
                { label: 'Status', value: 'In Progress'                    },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', gap: '16px' }}>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" style={{ padding: sec, background: SURFACE }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Label>Problem</Label>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(22px,4vw,44px)', fontWeight: 800, color: '#dde4ff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '40px', maxWidth: '640px' }}>
            Looked like every other agency site. Nothing to remember.
          </h2>
          <div style={{ marginBottom: '40px' }}>
            <ScreenLabel>Before — Old Vynox Website</ScreenLabel>
            <Img src={oldVynoxImg} alt="Old Vynox website before redesign" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,240px), 1fr))', gap: '12px' }}>
            {[
              { n: '01', title: 'Generic layout',      body: 'Hero → services → about → contact. Zero personality, maximum template energy.' },
              { n: '02', title: 'No visual hierarchy', body: 'Everything competed for attention. Nothing landed. The eye had nowhere to go.' },
              { n: '03', title: 'Inconsistent type',   body: 'Mixed fonts, random weights, no system. Felt unfinished rather than designed.' },
            ].map((p, i) => (
              <div key={i} style={{ padding: '20px', background: '#080a14', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', color: ACCENT_BORDER, display: 'block', marginBottom: '10px' }}>/{p.n}</span>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '15px', color: '#dde4ff', marginBottom: '8px' }}>{p.title}</div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: sec }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Label>Process</Label>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(22px,4vw,44px)', fontWeight: 800, color: '#dde4ff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '48px', maxWidth: '560px' }}>
            Research first. Design second. Code third.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,8vw,80px)' }}>
            {[
              { step: 'Step 01 — Research',      title: 'Understanding the influencer marketing space', body: 'Audited 12 competitor agency websites. Identified patterns — most relied on stock photography, generic copy, and identical section layouts. The opportunity was clear: go editorial, go dark, go opinionated.', reverse: false },
              { step: 'Step 02 — Wireframes',    title: 'Breaking the template pattern',               body: 'Explored asymmetric layouts, editorial typography, and full-bleed sections. Tested 3 directions — minimal dark, bold cinematic, and clean typographic. Client aligned on the cinematic dark direction.',      reverse: true  },
              { step: 'Step 03 — Design System', title: 'Building the system in Figma',               body: 'Established a design system — purple accent on near-black, Space Grotesk for display, Inter for body. Every component built as a reusable Figma variant. Interactions prototyped before handing off to dev.',  reverse: false },
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px), 1fr))', gap: 'clamp(20px,4vw,48px)', alignItems: 'center' }}>

                <div>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '12px' }}>{s.step}</span>
                  <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,22px)', color: '#dde4ff', marginBottom: '14px', lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontWeight: 300 }}>{s.body}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENS ── */}
      <section id="screens" style={{ padding: `clamp(64px,10vw,110px) 0`, background: SURFACE }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: '36px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Label>Screens</Label>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(22px,4vw,44px)', fontWeight: 800, color: '#dde4ff', lineHeight: 1.05, letterSpacing: '-0.02em' }}>Final designs</h2>
          </div>
        </div>

        <div style={{ padding: `0 ${pad}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Hero — full width */}
            <div>
              <ScreenLabel>Hero Section</ScreenLabel>
              <Img src={heroImg} alt="Homepage hero section" />
            </div>

            {/* How it works + Solutions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px), 1fr))', gap: '16px' }}>
              <div><ScreenLabel>How It Works</ScreenLabel><Img src={howItWorksImg} alt="How it works section" /></div>
              <div><ScreenLabel>Solutions</ScreenLabel><Img src={solutionsImg} alt="Solutions section" /></div>
            </div>

            {/* Creators — full width */}
            <div>
              <ScreenLabel>Creators Carousel</ScreenLabel>
              <Img src={creatorsImg} alt="Creators trusted by brands" />
            </div>

            {/* Numbers — full width */}
            <div>
              <ScreenLabel>Numbers That Speak</ScreenLabel>
              <Img src={numbersImg} alt="Numbers and stats section" />
            </div>

            {/* What sets us apart — full width */}
            <div>
              <ScreenLabel>What Sets Us Apart</ScreenLabel>
              <Img src={apartImg} alt="What sets us apart section" />
            </div>

            {/* Campaigns + Testimonials */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px), 1fr))', gap: '16px' }}>
              <div><ScreenLabel>Real Campaigns</ScreenLabel><Img src={campaignsImg} alt="Real campaigns outcomes" /></div>
              <div><ScreenLabel>Testimonials</ScreenLabel><Img src={testimonialsImg} alt="Brand testimonials" /></div>
            </div>

            {/* CTA + Footer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px), 1fr))', gap: '16px' }}>
              <div><ScreenLabel>CTA Section</ScreenLabel><Img src={ctaImg} alt="Ready to go viral CTA" /></div>
              <div><ScreenLabel>Footer</ScreenLabel><Img src={footerImg} alt="Footer section" /></div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OUTCOME ── */}
      <section id="outcome" style={{ padding: sec }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Label>Outcome</Label>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(22px,4vw,44px)', fontWeight: 800, color: '#dde4ff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '40px', maxWidth: '600px' }}>
            From generic to something worth remembering.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,180px), 1fr))', gap: '12px', marginBottom: '48px' }}>
            {[
              { value: 'In Progress',    label: 'Current Status'   },
              { value: '10 Sections',    label: 'Screens Designed' },
              { value: 'Dark Cinematic', label: 'Design Direction' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '20px', background: '#080a14', borderRadius: '10px', border: `1px solid ${ACCENT_BORDER}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(circle at 100% 0%, ${ACCENT_DIM}, transparent 65%)` }} />
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(18px,3vw,28px)', color: '#dde4ff', marginBottom: '6px' }}>{s.value}</div>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px), 1fr))', gap: 'clamp(24px,4vw,48px)' }}>
            <div>
              <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '18px', color: '#dde4ff', marginBottom: '16px' }}>What worked</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Editorial layout broke the template mold immediately', 'Purple on dark felt premium without being loud', 'Full-bleed sections created breathing room and hierarchy'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}`, flexShrink: 0, marginTop: '7px', display: 'inline-block' }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '18px', color: '#dde4ff', marginBottom: '16px' }}>What I learned</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Client trust is built faster with wireframes than mood boards', 'Dark themes need more whitespace than you think', 'Typography system decisions early save hours in dev'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', flexShrink: 0, marginTop: '7px', display: 'inline-block' }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <section style={{ background: SURFACE, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/work/autotext" data-cursor="VIEW" style={{ display: 'block', textDecoration: 'none', padding: `clamp(48px,8vw,90px) ${pad}` }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.03)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: '10px' }}>Next Project</span>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,6vw,68px)', color: '#dde4ff', lineHeight: 1, letterSpacing: '-0.02em' }}>AutoText UI</div>
            </div>
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '28px', color: ACCENT, flexShrink: 0 }}>↗</span>
          </div>
        </Link>
      </section>

    </div>
  )
}