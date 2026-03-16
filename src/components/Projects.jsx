import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/content'
import SectionLabel from './SectionLabel'

const CAT = {
  'UI/UX':       { color: '#6eb3ff', bg: 'rgba(61,126,255,0.06)',  border: 'rgba(61,126,255,0.18)',  glow: 'rgba(61,126,255,0.07)'  },
  'Development': { color: '#6eb3ff', bg: 'rgba(0,229,255,0.05)',   border: 'rgba(0,229,255,0.15)',   glow: 'rgba(0,229,255,0.05)'   },
  'Graphics':    { color: '#6eb3ff', bg: 'rgba(167,139,250,0.05)', border: 'rgba(167,139,250,0.15)', glow: 'rgba(167,139,250,0.05)' },
}

const TYPE_LABEL = {
  casestudy: 'Case Study ↗',
  external:  'Live Project ↗',
  archive:   'View All ↗',
}

function ProjectRow({ project, i, inView }) {
  const [hovered, setHovered] = useState(false)
  const cat = CAT[project.category] || CAT['UI/UX']

  const inner = (
    <div
      className="relative overflow-hidden"
      style={{
        borderTop:  '1px solid rgba(255,255,255,0.05)',
        padding:    `${hovered ? 28 : 20}px clamp(20px,5vw,64px)`,
        background: hovered
          ? `radial-gradient(ellipse 70% 120% at 55% 50%, ${cat.glow}, transparent 70%)`
          : 'transparent',
        transition: 'padding 0.35s cubic-bezier(0.22,1,0.36,1), background 0.4s ease',
      }}
    >
      {/* left accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, transparent, ${cat.color}, transparent)`,
          opacity:    hovered ? 1 : 0,
          boxShadow:  hovered ? `2px 0 10px ${cat.color}` : 'none',
        }}
      />

      <div className="relative z-10 flex items-center gap-8">

        {/* index */}
        <span
          className="font-mono flex-shrink-0 transition-all duration-300"
          style={{
            fontSize:   '11px',
            color:      hovered ? cat.color : 'rgba(255,255,255,0.28)',
            width:      '26px',
            fontWeight: hovered ? 900 : 500,
          }}
        >
          {project.index}
        </span>

        {/* title + tags */}
        <div className="flex-1 min-w-0">
          <span
            className="font-display font-black leading-none tracking-[-0.02em] block"
            style={{
              color:      hovered ? cat.color : 'white',
              fontSize:   hovered ? 'clamp(26px,3.5vw,70px)' : 'clamp(20px,2.6vw,50px)',
              transition: 'font-size 0.35s cubic-bezier(0.22,1,0.36,1), color 0.3s ease',
            }}
          >
            {project.title}
          </span>
          <div className="flex flex-wrap gap-[6px] mt-[8px]">
            {project.tags.map((tag, j) => (
              <span
                key={j}
                className="font-mono text-[9px] tracking-[0.08em] rounded-[4px] transition-all duration-300"
                style={{
                  padding:    '3px 9px',
                  background: hovered ? cat.bg    : 'rgba(255,255,255,0.02)',
                  border:     `1px solid ${hovered ? cat.border : 'rgba(255,255,255,0.04)'}`,
                  color:      hovered ? cat.color : '#5a6490',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* image overlay */}
        <div
          className="absolute pointer-events-none"
          style={{
            left:         '45%',
            top:          '50%',
            transform:    hovered ? 'translate(-50%, -50%) scale(1) rotate(-4deg)' : 'translate(-50%, -50%) scale(0.92) rotate(-4deg)',
            width:        '420px',
            height:       '220px',
            opacity:      hovered ? 1 : 0,
            transition:   'opacity 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            borderRadius: '8px',
            overflow:     'hidden',
            border:       `3px solid ${cat.border}`,
            boxShadow:    `0 16px 80px rgba(0,0,0,0.8), 0 0 50px ${cat.glow}, 0 0 100px ${cat.glow}`,
            zIndex:       20,
          }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #080c1a, #060810)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(61,126,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,126,255,0.06) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, ${cat.glow}, transparent 60%)` }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[8px] tracking-[0.15em]" style={{ color: `${cat.color}44` }}>mockup.png</span>
          </div>
        </div>

        {/* right — year + type badge + cta */}
        <div className="flex items-center gap-4 flex-shrink-0">

          {/* type badge — always visible */}
          <span
            className="font-mono text-[8px] tracking-[0.1em] uppercase rounded-[4px] hidden md:block transition-all duration-300"
            style={{
              padding:    '3px 8px',
              background: hovered ? cat.bg    : 'transparent',
              border:     `1px solid ${hovered ? cat.border : 'rgba(255,255,255,0.06)'}`,
              color:      hovered ? cat.color : '#1e2440',
            }}
          >
            {project.type === 'casestudy' ? 'Case Study' : project.type === 'external' ? 'Live' : 'Gallery'}
          </span>

          <span className="font-mono text-[10px] hidden md:block" style={{ color: '#8892b0' }}>{project.year}</span>

          {/* CTA on hover */}
          <div
            style={{
              opacity:    hovered ? 1 : 0,
              transform:  hovered ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span
              className="font-mono text-[9px] tracking-[0.1em] uppercase rounded-[5px] flex items-center gap-2"
              style={{
                padding:    '7px 14px',
                background: cat.color,
                color:      '#020208',
                whiteSpace: 'nowrap',
              }}
            >
              {TYPE_LABEL[project.type]}
            </span>
          </div>

          {/* arrow default */}
          <span
            className="font-mono text-[20px] flex-shrink-0 transition-all duration-300"
            style={{
              color:     hovered ? 'transparent' : '#8892b0',
              transform: hovered ? 'translate(3px,-3px)' : 'translate(0,0)',
            }}
          >
            ↗
          </span>
        </div>
      </div>
    </div>
  )

  const sharedProps = {
    'data-cursor': 'VIEW',
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: { display: 'block', textDecoration: 'none' },
  }

  // route based on type
  if (project.type === 'external') {
    return (
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(18px)', transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s` }}>
        <a href={project.link} target="_blank" rel="noopener noreferrer" {...sharedProps}>{inner}</a>
      </div>
    )
  }

  if (project.type === 'archive') {
    return (
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(18px)', transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s` }}>
        <Link to="/archive" {...sharedProps}>{inner}</Link>
      </div>
    )
  }

  // casestudy
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(18px)', transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s` }}>
      <Link to={project.link} {...sharedProps}>{inner}</Link>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView()
  const featured = projects.filter(p => p.featured)

  return (
    <section id="projects" ref={ref} className="relative bg-bg" style={{ padding: 'clamp(80px,12vw,130px) 0' }}>
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.18), rgba(0,229,255,0.1), transparent)' }} />

      <div
        className="flex items-end justify-between mb-10 flex-wrap gap-4"
        style={{ padding: '0 clamp(20px,5vw,64px)', opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <div>
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="font-display font-black text-text tracking-[-0.01em] leading-none" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Projects
          </h2>
        </div>
        <Link
          to="/archive"
          data-cursor="EXPLORE"
          className="font-mono text-[10px] text-blue tracking-[0.1em] uppercase transition-all duration-200"
          style={{ padding: '9px 18px', border: '1px solid rgba(61,126,255,0.2)', borderRadius: '6px' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(61,126,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(61,126,255,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(61,126,255,0.2)' }}
        >
          View All ↗
        </Link>
      </div>

      <div>
        {featured.map((p, i) => <ProjectRow key={i} project={p} i={i} inView={inView} />)}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
      </div>
    </section>
  )
}