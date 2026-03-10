import { useInView } from '../hooks/useInView'
import { projects } from '../data/content'
import SectionLabel from './SectionLabel'

function ProjectCard({ project, i, inView }) {
  return (
    <div
      data-cursor="VIEW"
      className="bg-card rounded-[14px] overflow-hidden flex flex-col transition-all duration-250"
      style={{
        border: '1px solid rgba(255,255,255,0.05)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s, border-color 0.25s, box-shadow 0.25s`,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61,126,255,0.3)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.5), 0 0 40px rgba(61,126,255,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Image */}
      <div className="h-[200px] relative overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #080c1a, #080a14)' }}>
        {/* grid texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(61,126,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,126,255,0.06) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }} />
        {/* center glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(61,126,255,0.09), transparent 65%)' }} />
        <span className="font-mono text-[9px] text-blue/25 tracking-[0.15em] relative z-10">mockup</span>
        <span
          className="absolute top-3 right-3 font-mono text-[8px] tracking-[0.12em] uppercase text-cyan z-10"
          style={{ padding: '3px 9px', background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '4px' }}
        >
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-[22px] flex flex-col flex-1">
        <h3 className="font-display font-bold text-[19px] text-text leading-[1.2]">{project.title}</h3>
        <p className="font-mono text-[9px] text-blue tracking-[0.1em] mt-[3px] mb-3">{project.subtitle}</p>
        <p className="font-body font-light text-[13px] text-mid leading-[1.65] flex-1 mb-[18px]">{project.description}</p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-[5px]">
            {project.tags.map((tag, j) => (
              <span key={j} className="font-mono text-[8px] text-dim rounded-[3px]"
                style={{ padding: '2px 7px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            data-cursor="OPEN"
            className="font-mono text-[10px] text-blue tracking-[0.08em] flex-shrink-0 transition-colors duration-200 hover:text-text"
          >
            View ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView()

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-bg"
      style={{ padding: 'clamp(80px,12vw,130px) clamp(20px,5vw,64px)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.18), rgba(0,229,255,0.1), transparent)' }} />

      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="font-display font-black text-text tracking-[-0.01em] leading-none" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>Projects</h2>
          </div>
          <a
            href="/archive"
            data-cursor="EXPLORE"
            className="font-mono text-[10px] text-blue tracking-[0.1em] uppercase transition-all duration-200"
            style={{ padding: '9px 18px', border: '1px solid rgba(61,126,255,0.2)', borderRadius: '6px' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(61,126,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(61,126,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(61,126,255,0.2)' }}
          >
            Explore All ↗
          </a>
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {projects.map((p, i) => <ProjectCard key={i} project={p} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}
