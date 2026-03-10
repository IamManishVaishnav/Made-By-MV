import { useInView } from '../hooks/useInView'
import { skills } from '../data/content'
import SectionLabel from './SectionLabel'

const ACCENTS = {
  blue: { color: '#3d7eff', glow: 'rgba(61,126,255,0.12)', tagBg: 'rgba(61,126,255,0.06)', tagBorder: 'rgba(61,126,255,0.15)', tagHoverBg: 'rgba(61,126,255,0.15)', tagHoverBorder: 'rgba(61,126,255,0.45)', panelBorder: 'rgba(61,126,255,0.35)', divider: 'rgba(61,126,255,0.35)' },
  cyan: { color: '#00e5ff', glow: 'rgba(0,229,255,0.08)',  tagBg: 'rgba(0,229,255,0.04)',  tagBorder: 'rgba(0,229,255,0.12)', tagHoverBg: 'rgba(0,229,255,0.12)', tagHoverBorder: 'rgba(0,229,255,0.4)',  panelBorder: 'rgba(0,229,255,0.3)',  divider: 'rgba(0,229,255,0.25)' },
}

function Panel({ data, inView, delay }) {
  const a = ACCENTS[data.accent]
  return (
    <div
      className="flex-1 relative overflow-hidden rounded-[14px] p-9 bg-card transition-all duration-300"
      style={{
        border: '1px solid rgba(255,255,255,0.05)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s, border-color 0.3s`,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = a.panelBorder}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
    >
      {/* corner radial glow */}
      <div className="absolute top-0 left-0 w-[220px] h-[220px] pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 0%, ${a.glow}, transparent 65%)` }} />

      <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-[6px]" style={{ color: a.color }}>{data.tag}</span>
      <div className="font-display font-black leading-[0.9] tracking-[-0.025em] text-text mb-6"
        style={{ fontSize: 'clamp(34px, 4.5vw, 52px)' }}>
        {data.label}
      </div>

      {/* divider */}
      <div className="h-px mb-[22px]" style={{ background: `linear-gradient(90deg, ${a.divider}, transparent)` }} />

      {/* tags */}
      <div className="flex flex-wrap gap-2">
        {data.items.map((name, i) => (
          <div
            key={i}
            data-cursor="SKILL"
            className="font-body text-[12px] text-text rounded-[5px] transition-all duration-200"
            style={{
              padding: '7px 13px',
              background: a.tagBg,
              border: `1px solid ${a.tagBorder}`,
              opacity: inView ? 1 : 0,
              animation: inView ? `fadeIn 0.4s ease ${delay + 0.04 * i}s both` : 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = a.tagHoverBg; e.currentTarget.style.borderColor = a.tagHoverBorder; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 16px ${a.glow}` }}
            onMouseLeave={e => { e.currentTarget.style.background = a.tagBg; e.currentTarget.style.borderColor = a.tagBorder; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView()

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-bg"
      style={{ padding: 'clamp(80px,12vw,130px) clamp(20px,5vw,64px)' }}
    >
      {/* top + bottom border lines */}
      {['top-0','bottom-0'].map(pos => (
        <div key={pos} className={`absolute ${pos} left-0 right-0 h-px pointer-events-none`}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.18), rgba(0,229,255,0.1), transparent)' }} />
      ))}

      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-12" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <div>
            <SectionLabel>Skills & Tools</SectionLabel>
            <h2 className="font-display font-black text-text tracking-[-0.01em] leading-none" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
              What I work with
            </h2>
          </div>
        </div>

        <div className="flex gap-5 items-stretch">
          <Panel data={skills.design} inView={inView} delay={0.1} />
          <Panel data={skills.dev}    inView={inView} delay={0.25} />
        </div>
      </div>
    </section>
  )
}
