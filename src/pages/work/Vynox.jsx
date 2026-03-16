import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const ACCENT = '#a78bfa'
const ACCENT_DIM = 'rgba(167,139,250,0.12)'
const ACCENT_BORDER = 'rgba(167,139,250,0.25)'
const ACCENT_GLOW = 'rgba(167,139,250,0.08)'

const SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'problem',   label: 'Problem'   },
  { id: 'process',   label: 'Process'   },
  { id: 'screens',   label: 'Screens'   },
  { id: 'outcome',   label: 'Outcome'   },
]

function SideNav({ active }) {
  return (
    <div
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5"
    >
      {SECTIONS.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="flex items-center gap-3 group transition-all duration-200"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="transition-all duration-300"
            style={{
              width:     active === s.id ? '20px' : '8px',
              height:    '1.5px',
              background: active === s.id ? ACCENT : 'rgba(255,255,255,0.15)',
              boxShadow:  active === s.id ? `0 0 8px ${ACCENT}` : 'none',
            }}
          />
          <span
            className="font-mono text-[9px] tracking-[0.16em] uppercase transition-all duration-200"
            style={{
              color:   active === s.id ? ACCENT : 'rgba(255,255,255,0.2)',
              opacity: active === s.id ? 1 : 0,
            }}
          >
            {s.label}
          </span>
        </a>
      ))}
    </div>
  )
}

function Tag({ children }) {
  return (
    <span
      className="font-mono text-[10px] tracking-[0.1em] uppercase rounded-[5px]"
      style={{ padding: '5px 12px', background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}
    >
      {children}
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="inline-block w-4 h-px flex-shrink-0" style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{children}</span>
    </div>
  )
}

function MockupPlaceholder({ label, height = '460px', tilt = false }) {
  return (
    <div
      className="relative overflow-hidden rounded-[12px] w-full flex items-center justify-center"
      style={{
        height,
        background: 'linear-gradient(135deg, #0d0a1a, #0a0814)',
        border: `1px solid ${ACCENT_BORDER}`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 40px ${ACCENT_GLOW}`,
        transform: tilt ? 'rotate(-1deg)' : 'none',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(167,139,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 30%, ${ACCENT_GLOW}, transparent 60%)` }} />
      {/* corner brackets */}
      {[['top-3 left-3','border-t border-l'],['top-3 right-3','border-t border-r'],['bottom-3 left-3','border-b border-l'],['bottom-3 right-3','border-b border-r']].map(([pos, bdr], i) => (
        <span key={i} className={`absolute w-4 h-4 ${pos} ${bdr}`} style={{ borderColor: ACCENT_BORDER }} />
      ))}
      <span className="font-mono text-[9px] tracking-[0.15em] relative z-10" style={{ color: `${ACCENT}44` }}>{label}</span>
    </div>
  )
}

export default function VynoxCaseStudy() {
  const [activeSection, setActiveSection] = useState('overview')
  const sectionRefs = useRef({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.35 }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bg" style={{ background: '#020208' }}>

      {/* grain */}
      <div className="fixed inset-0 pointer-events-none z-[9000]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '160px', opacity: 0.028, mixBlendMode: 'overlay',
        }}
      />

      <SideNav active={activeSection} />

      {/* back nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{ padding: '20px clamp(20px,5vw,64px)', background: 'rgba(2,2,8,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Link to="/" data-cursor="GO" className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          ← Back
        </Link>
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          madebymv
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: ACCENT }}>Vynox Media</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ padding: 'clamp(120px,15vw,160px) clamp(20px,5vw,64px) clamp(60px,8vw,100px)' }}>

        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(167,139,250,0.18) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
            maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)',
          }}
        />
        {/* purple glow top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 0%, rgba(167,139,250,0.1), transparent 60%)' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          {/* label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-4 h-px" style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Case Study · UI/UX</span>
          </div>

          {/* title */}
          <h1
            className="font-display font-black text-white leading-[0.88] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(56px,10vw,120px)' }}
          >
            Vynox<br />
            <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${ACCENT_BORDER}`, fontWeight: 300 }}>Media</span>
          </h1>

          {/* one liner */}
          <p className="font-body font-light mb-10"
            style={{ fontSize: 'clamp(15px,2vw,20px)', color: 'rgba(255,255,255,0.45)', maxWidth: '560px', lineHeight: 1.6 }}>
            Redesigning a generic influencer marketing agency website into something that actually looks like it belongs in 2025.
          </p>

          {/* meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Tag>UI Design</Tag>
            <Tag>Development</Tag>
            <Tag>Figma</Tag>
            <Tag>React</Tag>
            <span className="font-mono text-[10px] text-dim ml-2">2024</span>
          </div>

          {/* scroll hint */}
          <div className="flex items-center gap-3">
            <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${ACCENT}, transparent)` }} />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ── HERO MOCKUP ── */}
      <div style={{ padding: '0 clamp(20px,5vw,64px)', marginTop: '-40px', marginBottom: 'clamp(80px,12vw,130px)' }}>
        <div className="max-w-[1200px] mx-auto">
          <MockupPlaceholder label="vynox-hero-screen.png" height="560px" />
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      <section id="overview" style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>Overview</SectionLabel>
          <div className="grid gap-16" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
            <div>
              <h2 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
                A brand that needed to look as good as the results it delivers.
              </h2>
              <p className="font-body font-light leading-[1.8] mb-4" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)' }}>
                Vynox Media is an influencer marketing agency — they connect brands with creators and run campaigns. Their work is modern, fast, and results-driven. Their website wasn't.
              </p>
              <p className="font-body font-light leading-[1.8]" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)' }}>
                The brief was to redesign the website from scratch — keeping the dark theme but making it feel intentional, editorial, and premium rather than template-generated.
              </p>
            </div>

            {/* details grid */}
            <div className="flex flex-col gap-4">
              {[
                { label: 'Role',     value: 'UI Designer & Developer' },
                { label: 'Tools',    value: 'Figma, React, Node.js, VS Code' },
                { label: 'Type',     value: 'Website Redesign' },
                { label: 'Year',     value: '2024' },
                { label: 'Status',   value: 'In Progress' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start py-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.label}</span>
                  <span className="font-body text-[13px] text-right" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '200px' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)', background: '#05060e' }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>Problem</SectionLabel>

          <h2 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] mb-16"
            style={{ fontSize: 'clamp(28px,4vw,48px)', maxWidth: '700px' }}>
            Looked like every other agency site. Nothing to remember.
          </h2>

          {/* before mockup */}
          <div className="mb-12">
            <p className="font-mono text-[9px] tracking-[0.16em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Before</p>
            <MockupPlaceholder label="vynox-before.png" height="400px" />
          </div>

          {/* pain points */}
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { n: '01', title: 'Generic layout', body: 'Hero → services → about → contact. Zero personality, maximum template energy.' },
              { n: '02', title: 'No visual hierarchy', body: 'Everything competed for attention. Nothing landed. The eye had nowhere to go.' },
              { n: '03', title: 'Inconsistent type', body: 'Mixed fonts, random weights, no system. Felt unfinished rather than designed.' },
            ].map((p, i) => (
              <div key={i} className="rounded-[10px] p-6"
                style={{ background: '#080a14', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="font-mono text-[10px] block mb-3" style={{ color: ACCENT_BORDER }}>/{p.n}</span>
                <div className="font-display font-bold text-white text-[16px] mb-2">{p.title}</div>
                <p className="font-body font-light text-[13px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>Process</SectionLabel>

          <h2 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] mb-16"
            style={{ fontSize: 'clamp(28px,4vw,48px)', maxWidth: '600px' }}>
            Research first. Design second. Code third.
          </h2>

          {/* steps */}
          <div className="flex flex-col gap-20">

            {/* step 1 */}
            <div className="grid gap-12 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-4" style={{ color: ACCENT }}>Step 01 — Research</span>
                <h3 className="font-display font-bold text-white text-[22px] mb-4 leading-[1.2]">Understanding the influencer marketing space</h3>
                <p className="font-body font-light text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Audited 12 competitor agency websites. Identified patterns — most relied on stock photography, generic copy, and identical section layouts. The opportunity was clear: go editorial, go dark, go opinionated.
                </p>
              </div>
              <MockupPlaceholder label="research-audit.png" height="280px" />
            </div>

            {/* step 2 */}
            <div className="grid gap-12 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <MockupPlaceholder label="wireframes.png" height="280px" />
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-4" style={{ color: ACCENT }}>Step 02 — Wireframes</span>
                <h3 className="font-display font-bold text-white text-[22px] mb-4 leading-[1.2]">Breaking the template pattern</h3>
                <p className="font-body font-light text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Explored asymmetric layouts, editorial typography, and full-bleed sections. Tested 3 directions — minimal dark, bold cinematic, and clean typographic. Client aligned on the cinematic dark direction.
                </p>
              </div>
            </div>

            {/* step 3 */}
            <div className="grid gap-12 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-4" style={{ color: ACCENT }}>Step 03 — Design</span>
                <h3 className="font-display font-bold text-white text-[22px] mb-4 leading-[1.2]">Building the system in Figma</h3>
                <p className="font-body font-light text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Established a design system — purple accent on near-black, Space Grotesk for display, Inter for body. Every component built as a reusable Figma variant. Interactions prototyped before handing off to dev.
                </p>
              </div>
              <MockupPlaceholder label="figma-system.png" height="280px" />
            </div>

          </div>
        </div>
      </section>

      {/* ── SCREENS ── */}
      <section id="screens" style={{ padding: 'clamp(80px,10vw,120px) 0', background: '#05060e' }}>
        <div style={{ padding: '0 clamp(20px,5vw,64px)', marginBottom: '48px' }}>
          <div className="max-w-[1200px] mx-auto">
            <SectionLabel>Screens</SectionLabel>
            <h2 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              Final designs
            </h2>
          </div>
        </div>

        {/* full bleed */}
        <div style={{ padding: '0 clamp(20px,5vw,64px)', marginBottom: '16px' }}>
          <MockupPlaceholder label="homepage-final.png" height="600px" />
        </div>

        {/* 2 col */}
        <div className="grid gap-4" style={{ padding: '0 clamp(20px,5vw,64px)', gridTemplateColumns: '1fr 1fr', marginBottom: '16px' }}>
          <MockupPlaceholder label="services-page.png" height="380px" />
          <MockupPlaceholder label="about-page.png" height="380px" />
        </div>

        {/* full bleed */}
        <div style={{ padding: '0 clamp(20px,5vw,64px)', marginBottom: '16px' }}>
          <MockupPlaceholder label="contact-page.png" height="480px" />
        </div>

        {/* 3 col mobile */}
        <div className="grid gap-4" style={{ padding: '0 clamp(20px,5vw,64px)', gridTemplateColumns: 'repeat(3,1fr)' }}>
          <MockupPlaceholder label="mobile-home.png" height="300px" />
          <MockupPlaceholder label="mobile-services.png" height="300px" />
          <MockupPlaceholder label="mobile-contact.png" height="300px" />
        </div>
      </section>

      {/* ── OUTCOME ── */}
      <section id="outcome" style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>Outcome</SectionLabel>

          <h2 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] mb-12"
            style={{ fontSize: 'clamp(28px,4vw,48px)', maxWidth: '640px' }}>
            From generic to something worth remembering.
          </h2>

          <div className="grid gap-4 mb-16" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[
              { value: 'In Progress', label: 'Current Status' },
              { value: '5 Pages',     label: 'Screens Designed' },
              { value: 'Dark Cinematic', label: 'Design Direction' },
            ].map((s, i) => (
              <div key={i} className="rounded-[10px] p-6 relative overflow-hidden"
                style={{ background: '#080a14', border: `1px solid ${ACCENT_BORDER}` }}>
                <div className="absolute top-0 right-0 w-[80px] h-[80px]"
                  style={{ background: `radial-gradient(circle at 100% 0%, ${ACCENT_DIM}, transparent 65%)` }} />
                <div className="font-display font-black text-white mb-1" style={{ fontSize: 'clamp(22px,3vw,32px)' }}>{s.value}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <h3 className="font-display font-bold text-white text-[18px] mb-3">What worked</h3>
              <ul className="flex flex-col gap-3">
                {[
                  'Editorial layout broke the template mold immediately',
                  'Purple on dark felt premium without being loud',
                  'Full-bleed sections created breathing room and hierarchy',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[6px] flex-shrink-0" style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}`, display: 'inline-block' }} />
                    <span className="font-body font-light text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.45)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-[18px] mb-3">What I learned</h3>
              <ul className="flex flex-col gap-3">
                {[
                  'Client trust is built faster with wireframes than mood boards',
                  'Dark themes need more whitespace than you think',
                  'Typography system decisions early save hours in dev',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[6px] flex-shrink-0" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
                    <span className="font-body font-light text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.45)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <section style={{ background: '#05060e', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link
          to="/work/autotext"
          data-cursor="VIEW"
          className="block transition-all duration-300"
          style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.03)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8">
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>Next Project</span>
              <div className="font-display font-black text-white leading-none tracking-[-0.02em]"
                style={{ fontSize: 'clamp(32px,6vw,72px)' }}>
                AutoText UI
              </div>
            </div>
            <span className="font-mono text-[32px] flex-shrink-0" style={{ color: ACCENT }}>↗</span>
          </div>
        </Link>
      </section>

    </div>
  )
}