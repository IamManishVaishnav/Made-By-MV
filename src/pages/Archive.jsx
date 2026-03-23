import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/content'

import moodsyImg   from '../assets/moodsy.png'
import mentalxpImg from '../assets/mentalxp.png'
import autotextImg from '../assets/autotext.png'
import vynoxImg    from '../assets/vynox.png'
import tarqaImg    from '../assets/tarqa.png'
import feedbackImg from '../assets/feedback.png'
import graphicsImg from '../assets/graphics.png'

const PROJECT_IMAGES = {
  'Moodsy':            moodsyImg,
  'MentalXP':          mentalxpImg,
  'AutoText UI':       autotextImg,
  'Vynox Media':       vynoxImg,
  'Tarqa AI':          tarqaImg,
  'Feedback Analyzer': feedbackImg,
  'Graphic Design':    graphicsImg,
}

const CATS = ['All', 'UI/UX', 'Development', 'Graphics']

export default function Archive() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="min-h-screen bg-bg relative" style={{ padding: 'clamp(80px,10vw,130px) clamp(16px,5vw,64px)' }}>

      {/* bg glow */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(90,159,255,0.06), transparent 60%)' }} />

      <div className="max-w-[1200px] mx-auto relative z-10">

        <Link to="/" className="font-mono text-[10px] text-blue tracking-[0.15em] uppercase inline-block mb-10 transition-colors hover:text-text"
          style={{ textDecoration: 'none' }}>
          ← Back
        </Link>

        <h1 className="font-display font-black text-text tracking-[-0.025em] mb-10"
          style={{ fontSize: 'clamp(40px,8vw,88px)', lineHeight: 0.92 }}>
          All Work
        </h1>

        {/* filters */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-200 rounded-[5px]"
              style={{
                padding:    '7px 16px',
                background: active === cat ? '#5a9fff' : 'transparent',
                border:     `1px solid ${active === cat ? '#5a9fff' : 'rgba(255,255,255,0.08)'}`,
                color:      active === cat ? '#020208' : '#5a6490',
                boxShadow:  active === cat ? '0 0 16px rgba(90,159,255,0.3)' : 'none',
                cursor:     'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
{filtered.map((p, i) => {
  const image   = PROJECT_IMAGES[p.title]
  const isExt   = p.type === 'external'
  const isInter = p.type === 'casestudy' || p.type === 'archive'

  const cardContent = (
    <div
      className="bg-surface rounded-[12px] overflow-hidden transition-all duration-200 h-full"
      style={{ border: '1px solid rgba(255,255,255,0.05)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(90,159,255,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* image area */}
      <div className="h-[180px] relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080c1a, #080a14)' }}>
        {image ? (
          <>
            <img src={image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(6,7,15,0.7))' }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(90,159,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90,159,255,0.05) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[9px] relative z-10" style={{ color: 'rgba(90,159,255,0.2)' }}>mockup</span>
            </div>
          </>
        )}
      </div>

      {/* content */}
      <div className="p-[18px]">
        <div className="font-display font-bold text-text mb-[4px]" style={{ fontSize: 'clamp(15px,2vw,17px)' }}>{p.title}</div>
        <div className="font-mono tracking-[0.1em] mb-[10px]" style={{ fontSize: '11px', color: '#7eb8ff' }}>{p.subtitle}</div>
        <p className="font-body font-light text-mid leading-[1.6] mb-3" style={{ fontSize: '12px' }}>{p.description}</p>
        <div className="flex gap-[5px] flex-wrap">
          {p.tags.map((t, j) => (
            <span key={j} className="font-mono rounded-[3px]"
              style={{ fontSize: '9px', padding: '3px 7px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div key={i} data-cursor="VIEW" style={{ cursor: 'none' }}>
      {isExt ? (
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          {cardContent}
        </a>
      ) : isInter ? (
        <Link to={p.link} style={{ textDecoration: 'none', display: 'block' }}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  )
})}
        </div>
      </div>
    </div>
  )
}