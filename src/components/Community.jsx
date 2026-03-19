import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { community } from '../data/content'
import SectionLabel from './SectionLabel'

import photo1 from '../assets/WIT Conf Jaipur 2024.jpg'
import photo2 from '../assets/AWS Community Day Rajasthan 2024.jpg'
import photo3 from '../assets/API Day Jaipur 2023.jpg'
import photo4 from '../assets/AWS Community Day Rajasthan 2023.jpg'

const PHOTOS = [photo1, photo2, photo3, photo4]

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
      style={{ padding: 'clamp(60px,10vw,130px) clamp(16px,5vw,64px)' }}
    >
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 100%, rgba(90,159,255,0.05), transparent 60%)' }} />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* header */}
        <div
          className="mb-12 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <SectionLabel>Community</SectionLabel>
          <h2 className="font-display font-black text-text tracking-[-0.01em] leading-none" style={{ fontSize: 'clamp(24px,4vw,44px)' }}>
            Beyond the screen
          </h2>
        </div>

        {/* main grid — stacks on mobile */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'stretch' }}
        >
          {/* LEFT — awards + events */}
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
                    style={{ padding: 'clamp(12px,2vw,14px) clamp(14px,2vw,18px)', border: '1px solid rgba(90,159,255,0.12)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(90,159,255,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(90,159,255,0.12)'}
                  >
                    <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: 'rgba(90,159,255,0.1)', border: '1px solid rgba(90,159,255,0.2)' }}>🏆</div>
                    <div>
                      <div className="font-body font-semibold text-text" style={{ fontSize: 'clamp(12px,1.5vw,13px)' }}>{a.title}</div>
                      <div className="font-mono text-dim tracking-[0.06em]" style={{ fontSize: '9px' }}>{a.org} · {a.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="flex flex-col flex-1">
              <p className="font-mono text-[9px] text-dim tracking-[0.18em] uppercase mb-3">Events & Roles</p>
              <div className="flex-1 rounded-[10px] bg-card overflow-y-auto" style={{ border: '1px solid rgba(255,255,255,0.05)', scrollbarWidth: 'none', maxHeight: '260px' }}>
                {community.events.map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 transition-colors duration-150"
                    style={{ padding: 'clamp(8px,1.5vw,10px) clamp(12px,2vw,16px)', borderBottom: i < community.events.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(90,159,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ color: 'rgba(90,159,255,0.4)', fontSize: '8px' }}>◈</span>
                    <span className="font-body text-mid" style={{ fontSize: 'clamp(11px,1.4vw,12px)' }}>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — photo bento grid */}
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
                  border:     `1px solid ${active === i ? 'rgba(90,159,255,0.45)' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow:   active === i ? '0 0 20px rgba(90,159,255,0.12)' : 'none',
                  transition:  'border-color 0.5s, box-shadow 0.5s',
                }}
              >
                <img
                  src={PHOTOS[i]}
                  alt={photo.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transition: 'transform 0.5s ease', transform: active === i ? 'scale(1.04)' : 'scale(1)' }}
                />
                {/* overlay */}
                <div className="absolute inset-0" style={{ background: 'rgba(2,2,8,0.25)' }} />
                {/* bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ background: 'linear-gradient(to top, rgba(2,2,8,0.92), transparent)', padding: '20px 10px 10px' }}
                >
                  <span
                    className="font-body font-medium block"
                    style={{ fontSize: 'clamp(8px,1vw,9px)', color: active === i ? '#dde4ff' : '#5a6490', transition: 'color 0.4s' }}
                  >
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