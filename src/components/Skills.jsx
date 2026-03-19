import { useInView } from '../hooks/useInView'
import { skills } from '../data/content'
import SectionLabel from './SectionLabel'
import claudeIcon from "../assets/icons/claude.png";
import midjourneyIcon from "../assets/icons/midjourney.png";
import v0Icon from "../assets/icons/v0.png";
import cursorIcon from "../assets/icons/cursor.png";


const DEVICONS = {
  'Figma':             'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'Adobe Suite':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
  'React.js':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js':           'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'TypeScript':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Tailwind CSS':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js':           'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'SQL':               'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Claude':            claudeIcon,
  'Midjourney':        midjourneyIcon,
  'v0':                v0Icon,
  'Cursor AI':         cursorIcon,
}

const WHITE_ICONS = new Set(['Express.js', 'Adobe Suite'])

const FALLBACK = {
  'User Research':     '🔍',
  'Wireframing':       '✏️',
  'Prototyping':       '⚡',
  'Design Systems':    '◈',
  'Usability Testing': '◎',
  'Accessibility':     '◇',
}

function Tile({ name, accent, delay, inView }) {
  const isBlue  = accent === 'blue'
  const isAmber = accent === 'amber'

  const color     = isBlue ? '#5a9fff' : isAmber ? '#f59e0b' : '#00e5ff'
  const nameColor = isBlue ? '#a8c8ff' : isAmber ? '#fcd34d' : '#7fe8f5'
  const bg        = isBlue ? 'rgba(90,159,255,0.06)'  : isAmber ? 'rgba(245,158,11,0.06)'  : 'rgba(0,229,255,0.04)'
  const border    = isBlue ? 'rgba(90,159,255,0.12)'  : isAmber ? 'rgba(245,158,11,0.12)'  : 'rgba(0,229,255,0.1)'
  const hBg       = isBlue ? 'rgba(90,159,255,0.15)'  : isAmber ? 'rgba(245,158,11,0.15)'  : 'rgba(0,229,255,0.12)'
  const hBorder   = isBlue ? 'rgba(90,159,255,0.4)'   : isAmber ? 'rgba(245,158,11,0.4)'   : 'rgba(0,229,255,0.35)'

  const icon     = DEVICONS[name]
  const fallback = FALLBACK[name]
  const white    = WHITE_ICONS.has(name)

  return (
    <div
      data-cursor="SKILL"
      className="flex flex-col items-center gap-[10px] rounded-[14px] transition-all duration-200 flex-shrink-0"
      style={{
        padding:    '16px 12px',
        background: bg,
        border:     `1px solid ${border}`,
        width:      '88px',
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)',
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${delay}s, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = hBg
        e.currentTarget.style.borderColor = hBorder
        e.currentTarget.style.transform   = 'translateY(-4px) scale(1.04)'
        e.currentTarget.style.boxShadow   = '0 8px 24px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = bg
        e.currentTarget.style.borderColor = border
        e.currentTarget.style.transform   = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      <div
        className="rounded-[10px] flex items-center justify-center"
        style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.03)' }}
      >
        {icon
          ? <img src={icon} alt={name} style={{ width: '32px', height: '32px', filter: white ? 'brightness(0) invert(1)' : 'none' }} />
          : <span style={{ fontSize: '26px', lineHeight: 1, color }}>{fallback || '◆'}</span>
        }
      </div>
      <span style={{ fontSize: '10px', color: nameColor, textAlign: 'center', fontFamily: 'Manrope, sans-serif', lineHeight: 1.3 }}>
        {name}
      </span>
    </div>
  )
}

function Row({ data, inView, baseDelay }) {
  const isBlue  = data.accent === 'blue'
  const isAmber = data.accent === 'amber'
  const color     = isBlue ? '#5a9fff' : isAmber ? '#f59e0b' : '#00e5ff'
  const gradColor = isBlue ? 'rgba(90,159,255,0.2)' : isAmber ? 'rgba(245,158,11,0.2)' : 'rgba(0,229,255,0.15)'

  return (
    <div>
      {/* row label */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase flex-shrink-0"
          style={{ color }}
        >
          {data.label}
        </span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${gradColor}, transparent)` }} />
      </div>

      {/* tiles — centered, wraps on mobile */}
      <div
        className="flex flex-wrap justify-center gap-[8px]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {data.items.map((name, i) => (
          <Tile
            key={i}
            name={name}
            accent={data.accent}
            inView={inView}
            delay={baseDelay + i * 0.05}
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView(0.15)

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-bg"
      style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)' }}
    >
      {/* top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(90,159,255,0.18), rgba(0,229,255,0.1), transparent)' }}
      />

      <div className="max-w-[1000px] mx-auto">

        {/* header */}
        <div
          className="text-center mb-10 transition-all duration-700"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="flex justify-center mb-3">
            <SectionLabel>Skills & Tools</SectionLabel>
          </div>
          <h2
            className="font-display font-black text-text leading-none tracking-[-0.02em]"
            style={{ fontSize: 'clamp(28px,4vw,44px)' }}
          >
            What I work with
          </h2>
        </div>

        {/* tray */}
        <div
          className="rounded-[20px] transition-all duration-700"
          style={{
            background: 'rgba(6,7,18,0.9)',
            border:     '1px solid rgba(255,255,255,0.07)',
            padding:    'clamp(20px,3vw,36px)',
            boxShadow:  '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
            opacity:    inView ? 1 : 0,
            transform:  inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s',
          }}
        >
          <div className="flex flex-col gap-6">
            <Row data={skills.design} inView={inView} baseDelay={0.2} />
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            <Row data={skills.dev}    inView={inView} baseDelay={0.5} />
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            <Row data={skills.ai}     inView={inView} baseDelay={0.8} />
          </div>
        </div>
      </div>

      {/* bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(90,159,255,0.18), rgba(0,229,255,0.1), transparent)' }}
      />
    </section>
  )
}