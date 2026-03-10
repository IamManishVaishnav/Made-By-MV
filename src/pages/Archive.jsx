import { useState } from 'react'
import { projects } from '../data/content'

const CATS = ['All', 'UI/UX', 'Development', 'Graphics']

export default function Archive() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="min-h-screen bg-bg relative" style={{ padding: 'clamp(100px,12vw,130px) clamp(20px,5vw,64px)' }}>
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(61,126,255,0.15) 1px, transparent 1px)', backgroundSize: '38px 38px', maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%)' }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <a href="/" className="font-mono text-[10px] text-blue tracking-[0.15em] uppercase inline-block mb-12 hover:text-text transition-colors">← Back</a>
        <h1 className="font-display font-black text-text tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(44px,8vw,88px)', lineHeight: 0.92 }}>All Work</h1>

        <div className="flex gap-2 mb-12 flex-wrap">
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-200 rounded-[5px]"
              style={{
                padding: '7px 16px',
                background: active === cat ? '#3d7eff' : 'transparent',
                border: `1px solid ${active === cat ? '#3d7eff' : 'rgba(255,255,255,0.08)'}`,
                color: active === cat ? '#fff' : '#5a6490',
                boxShadow: active === cat ? '0 0 16px rgba(61,126,255,0.3)' : 'none',
              }}
            >{cat}</button>
          ))}
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filtered.map((p, i) => (
            <div key={i} className="bg-surface rounded-[12px] overflow-hidden transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61,126,255,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="h-[180px] relative overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #080c1a, #080a14)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(61,126,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(61,126,255,0.05) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
                <span className="font-mono text-[9px] text-blue/25 relative z-10">mockup</span>
              </div>
              <div className="p-[18px]">
                <div className="font-display font-bold text-[17px] text-text mb-[3px]">{p.title}</div>
                <div className="font-mono text-[9px] text-blue tracking-[0.1em] mb-[10px]">{p.subtitle}</div>
                <p className="font-body font-light text-[12px] text-mid leading-[1.6] mb-3">{p.description}</p>
                <div className="flex gap-[5px] flex-wrap">
                  {p.tags.map((t, j) => <span key={j} className="font-mono text-[8px] text-dim rounded-[3px]" style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
