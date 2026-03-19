import { useInView } from '../hooks/useInView'
import { shelf } from '../data/content'
import SectionLabel from './SectionLabel'
import { Link } from 'react-router-dom'

const SPINE_COLORS = [
  { bg: '#5a9fff', glow: 'rgba(90,159,255,0.6)'  },
  { bg: '#00e5ff', glow: 'rgba(0,229,255,0.5)'   },
  { bg: '#a78bfa', glow: 'rgba(167,139,250,0.5)' },
]

export default function TheShelf() {
  const { ref, inView } = useInView()

  return (
    <section
      id="shelf"
      ref={ref}
      className="relative bg-bg"
      style={{ padding: 'clamp(60px,10vw,130px) clamp(16px,5vw,64px)' }}
    >
      {/* top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(90,159,255,0.18), rgba(0,229,255,0.1), transparent)' }}
      />

      <div className="max-w-[1200px] mx-auto">

        {/* header */}
        <div
          className="mb-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <SectionLabel>The Shelf</SectionLabel>
          <h2
            className="font-display font-black text-text tracking-[-0.01em] leading-none"
            style={{ fontSize: 'clamp(24px,4vw,44px)' }}
          >
            What I read &amp; think
          </h2>
        </div>

        {/* grid — stacks on mobile */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'start' }}
        >

          {/* LEFT — books */}
          <div
            className="flex flex-col gap-3 transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
          >
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Currently reading
            </p>
            {shelf.books.map((book, i) => (
              <div
                key={i}
                className="flex overflow-hidden rounded-[10px] transition-all duration-200"
                style={{
                  background: '#07080f',
                  border:     '1px solid rgba(255,255,255,0.06)',
                  opacity:    inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, border-color 0.2s, box-shadow 0.2s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `rgba(90,159,255,0.25)`
                  e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.boxShadow   = 'none'
                }}
              >
                {/* spine */}
                <div
                  className="flex-shrink-0"
                  style={{
                    width:     '4px',
                    background: SPINE_COLORS[i].bg,
                    boxShadow: `4px 0 16px ${SPINE_COLORS[i].glow}`,
                  }}
                />
                <div style={{ padding: 'clamp(14px,2vw,18px) clamp(14px,2vw,18px)' }}>
                  <div
                    className="font-body font-semibold text-text leading-[1.3] mb-1"
                    style={{ fontSize: 'clamp(13px,1.6vw,14px)' }}
                  >
                    {book.title}
                  </div>
                  <div
                    className="font-mono tracking-[0.08em] mb-2"
                    style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}
                  >
                    {book.author}
                  </div>
                  <div
                    className="font-body font-light italic"
                    style={{ fontSize: 'clamp(11px,1.4vw,12px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}
                  >
                    "{book.reaction}"
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — quote, fun fact, interests */}
          <div
            className="flex flex-col gap-4 transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '0.15s' }}
          >
            {/* Quote */}
            <div
              className="relative overflow-hidden rounded-[10px]"
              style={{
                padding:    'clamp(18px,3vw,24px)',
                background: '#07080f',
                borderLeft: '2px solid #5a9fff',
                border:     '1px solid rgba(255,255,255,0.06)',
                borderLeft: '2px solid #5a9fff',
              }}
            >
              <div
                className="absolute top-0 left-0 w-[140px] h-[140px] pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 0%, rgba(90,159,255,0.08), transparent 70%)' }}
              />
              <p
                className="font-display font-medium italic text-text relative leading-[1.6] mb-3"
                style={{ fontSize: 'clamp(14px,2vw,17px)', color: '#dde4ff' }}
              >
                "{shelf.quote.text}"
              </p>
              <span
                className="font-mono tracking-[0.12em]"
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}
              >
                — {shelf.quote.by}
              </span>
            </div>

            {/* Fun fact */}
            <div
              className="rounded-[10px]"
              style={{
                padding:    'clamp(14px,2vw,18px) clamp(16px,2vw,20px)',
                background: 'rgba(90,159,255,0.04)',
                border:     '1px solid rgba(90,159,255,0.1)',
              }}
            >
              <span
                className="font-mono tracking-[0.15em] uppercase block mb-2"
                style={{ fontSize: '9px', color: '#5a9fff' }}
              >
                Fun fact
              </span>
              <p
                className="font-body font-light leading-[1.7]"
                style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.55)' }}
              >
                {shelf.funFact}
              </p>
            </div>

            {/* Interests */}
            <div>
              <p
                className="font-mono tracking-[0.16em] uppercase mb-3"
                style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}
              >
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {shelf.interests.map((item, i) => (
                  <span
                    key={i}
                    className="font-body rounded-full"
                    style={{
                      fontSize:   'clamp(10px,1.3vw,11px)',
                      padding:    '5px 13px',
                      background: 'rgba(255,255,255,0.03)',
                      border:     '1px solid rgba(255,255,255,0.07)',
                      color:      'rgba(255,255,255,0.5)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* More quotes link */}
            <Link
              to="/quotes"
              data-cursor="READ"
              className="font-mono tracking-[0.12em] uppercase self-start transition-colors duration-200"
              style={{ fontSize: '10px', color: '#5a9fff', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#dde4ff'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a9fff'}
            >
              More quotes →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}