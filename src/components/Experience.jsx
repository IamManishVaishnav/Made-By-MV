import { useInView } from '../hooks/useInView'
import { experience } from '../data/content'
import SectionLabel from './SectionLabel'

export default function Experience() {
  const { ref, inView } = useInView()

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-surface"
      style={{ padding: 'clamp(80px,12vw,130px) clamp(20px,5vw,64px)' }}
    >
      {/* top-right corner glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 0%, rgba(61,126,255,0.06), transparent 60%)' }} />

      <div ref={ref} className="max-w-[860px] mx-auto relative z-10">
        <div style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease', marginBottom: '52px' }}>
          <SectionLabel>Experience</SectionLabel>
          <h2 className="font-display font-black text-text tracking-[-0.01em] leading-none" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Where I've worked
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute top-0 bottom-0 left-[1px] w-px pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(61,126,255,0.5), rgba(61,126,255,0.08) 85%, transparent)' }} />

          <div className="flex flex-col">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="relative pl-9"
                style={{
                  paddingBottom: i < experience.length - 1 ? '44px' : 0,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
                }}
              >
                {/* dot */}
                {exp.active ? (
                  <div
                    className="absolute rounded-full animate-glow-pulse"
                    style={{
                      width: '12px', height: '12px', left: '-6px', top: '2px',
                      background: '#3d7eff',
                      border: '2px solid rgba(61,126,255,0.4)',
                      boxShadow: '0 0 14px rgba(61,126,255,0.8), 0 0 28px rgba(61,126,255,0.4)',
                    }}
                  />
                ) : (
                  <div className="absolute rounded-full bg-dim" style={{ width: '7px', height: '7px', left: '-4px', top: '6px' }} />
                )}

                {/* card */}
                <div
                  className="rounded-[10px] bg-card transition-all duration-200"
                  style={{ padding: '20px 24px', border: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61,126,255,0.2)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(61,126,255,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <span className="font-display font-bold text-[17px] text-text">{exp.role}</span>
                      <span className="font-body text-[13px] text-blue ml-2">@ {exp.company}</span>
                    </div>
                    <span className="font-mono text-[9px] text-dim tracking-[0.07em]">{exp.period}</span>
                  </div>
                  <p className="font-body font-light text-[13px] text-mid leading-[1.7] mb-3">{exp.point}</p>
                  <div className="flex flex-wrap gap-[6px]">
                    {exp.tags.map((tag, j) => (
                      <span key={j} className="font-mono text-[9px] text-blue tracking-[0.08em] rounded-[4px]"
                        style={{ padding: '3px 8px', background: 'rgba(61,126,255,0.07)', border: '1px solid rgba(61,126,255,0.15)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
