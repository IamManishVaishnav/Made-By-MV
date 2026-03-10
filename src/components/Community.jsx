import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { community } from '../data/content'
import SectionLabel from './SectionLabel'

const PHOTO_TINTS = ['#0a1830', '#0a1a14', '#141a0a', '#1a0a1a']

export default function Community() {
  const { ref, inView } = useInView()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % community.photos.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="community"
      ref={ref}
      className="relative overflow-hidden bg-surface"
      style={{ padding: 'clamp(80px,12vw,130px) clamp(20px,5vw,64px)' }}
    >
      {/* bottom-left glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 100%, rgba(61,126,255,0.05), transparent 60%)' }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease', marginBottom: '48px' }}>
          <SectionLabel>Community</SectionLabel>
          <h2 className="font-display font-black text-text tracking-[-0.01em] leading-none" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Beyond the screen
          </h2>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
          {/* LEFT */}
          <div
            className="flex flex-col gap-4 transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
          >
            {/* Awards */}
            <div>
              <p className="font-mono text-[9px] text-blue tracking-[0.18em] uppercase mb-3">Awards</p>
              <div className="flex flex-col gap-[10px]">
                {community.awards.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-[14px] rounded-[10px] bg-card transition-all duration-200"
                    style={{ padding: '14px 18px', border: '1px solid rgba(61,126,255,0.12)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(61,126,255,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(61,126,255,0.12)'}
                  >
                    <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: 'rgba(61,126,255,0.1)', border: '1px solid rgba(61,126,255,0.2)' }}>🏆</div>
                    <div>
                      <div className="font-body text-[13px] font-semibold text-text">{a.title}</div>
                      <div className="font-mono text-[9px] text-dim tracking-[0.06em]">{a.org} · {a.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events scrollable */}
            <div className="flex flex-col flex-1">
              <p className="font-mono text-[9px] text-dim tracking-[0.18em] uppercase mb-3">Events & Roles</p>
              <div className="flex-1 rounded-[10px] bg-card overflow-y-auto" style={{ border: '1px solid rgba(255,255,255,0.05)', scrollbarWidth: 'none' }}>
                {community.events.map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 transition-colors duration-150"
                    style={{ padding: '10px 16px', borderBottom: i < community.events.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(61,126,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span className="text-blue/40 text-[8px]">◈</span>
                    <span className="font-body text-[12px] text-mid">{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — bento grid */}
          <div
            className="grid grid-cols-2 gap-3 transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '0.2s' }}
          >
            {community.photos.map((photo, i) => (
              <div
                key={i}
                className="relative rounded-[10px] overflow-hidden"
                style={{
                  aspectRatio: '1',
                  background: PHOTO_TINTS[i],
                  border: `1px solid ${active === i ? 'rgba(61,126,255,0.45)' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: active === i ? '0 0 20px rgba(61,126,255,0.12)' : 'none',
                  transition: 'border-color 0.5s, box-shadow 0.5s',
                }}
              >
                {/* inner grid */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(61,126,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,126,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[8px] text-blue/18 tracking-[0.1em]">photo</span>
                </div>
                {/* bottom label */}
                <div className="absolute bottom-0 left-0 right-0" style={{ background: 'linear-gradient(to top, rgba(2,2,8,0.92), transparent)', padding: '20px 10px 10px' }}>
                  <span className="font-body text-[9px] font-medium block" style={{ color: active === i ? '#dde4ff' : '#5a6490', transition: 'color 0.4s' }}>
                    {photo.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
