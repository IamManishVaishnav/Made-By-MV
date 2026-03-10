import { useInView } from '../hooks/useInView'
import { shelf } from '../data/content'
import SectionLabel from './SectionLabel'

const SPINE_COLORS = ['rgba(61,126,255,0.7)', 'rgba(0,229,255,0.55)', 'rgba(107,159,255,0.5)']

export default function TheShelf() {
  const { ref, inView } = useInView()

  return (
    <section
      id="shelf"
      ref={ref}
      className="relative bg-bg"
      style={{ padding: 'clamp(80px,12vw,130px) clamp(20px,5vw,64px)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.18), rgba(0,229,255,0.1), transparent)' }} />

      <div className="max-w-[1200px] mx-auto">
        <div style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease', marginBottom: '48px' }}>
          <SectionLabel>The Shelf</SectionLabel>
          <h2 className="font-display font-black text-text tracking-[-0.01em] leading-none" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            What I read & think
          </h2>
        </div>

        <div className="grid gap-12" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
          {/* Books */}
          <div
            className="flex flex-col gap-[14px] transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
          >
            {shelf.books.map((book, i) => (
              <div
                key={i}
                className="flex overflow-hidden rounded-[10px] bg-surface transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.05)',
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, border-color 0.2s`,
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(61,126,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              >
                {/* spine */}
                <div className="w-2 flex-shrink-0" style={{ background: SPINE_COLORS[i], boxShadow: `4px 0 12px ${SPINE_COLORS[i]}` }} />
                <div style={{ padding: '16px 18px' }}>
                  <div className="font-body text-[13px] font-semibold text-text mb-[2px]">{book.title}</div>
                  <div className="font-mono text-[9px] text-dim tracking-[0.08em] mb-2">{book.author}</div>
                  <div className="font-body text-[12px] font-light text-mid italic">"{book.reaction}"</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div
            className="flex flex-col gap-4 transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '0.2s' }}
          >
            {/* Quote */}
            <div className="relative overflow-hidden rounded-r-[10px]" style={{ padding: '24px', background: '#07080f', borderLeft: '2px solid #3d7eff', borderTop: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="absolute top-0 left-0 w-[120px] h-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 0%, rgba(61,126,255,0.08), transparent 70%)' }} />
              <p className="font-display font-medium italic text-text leading-[1.55] mb-3 relative" style={{ fontSize: 'clamp(15px,2vw,18px)' }}>
                "{shelf.quote.text}"
              </p>
              <span className="font-mono text-[9px] text-dim tracking-[0.12em]">— {shelf.quote.by}</span>
            </div>

            {/* Fun fact */}
            <div className="rounded-[10px]" style={{ padding: '18px 20px', background: 'rgba(61,126,255,0.04)', border: '1px solid rgba(61,126,255,0.1)' }}>
              <span className="font-mono text-[9px] text-blue tracking-[0.15em] uppercase block mb-[7px]">Fun fact</span>
              <p className="font-body font-light text-[13px] text-mid leading-[1.6]">{shelf.funFact}</p>
            </div>

            {/* Interests */}
            <div className="flex flex-wrap gap-2">
              {shelf.interests.map((item, i) => (
                <span key={i} className="font-body text-[11px] text-mid rounded-full"
                  style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {item}
                </span>
              ))}
            </div>

            <a
              href="/quotes"
              data-cursor="READ"
              className="font-mono text-[10px] text-blue tracking-[0.12em] uppercase self-start transition-colors duration-200 hover:text-text"
            >
              More quotes →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
