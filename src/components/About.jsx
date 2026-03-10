import { useInView } from '../hooks/useInView'
import { about } from '../data/content'
import SectionLabel from './SectionLabel'
import pfp from "../assets/pfp2.jpg";

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-surface"
      style={{ padding: 'clamp(80px,12vw,130px) clamp(20px,5vw,64px)' }}
    >
      {/* left edge glow line */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-px pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(61,126,255,0.4), transparent)' }} />

      {/* subtle large grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(61,126,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(61,126,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div
        ref={ref}
        className="relative z-10 max-w-[1200px] mx-auto grid gap-[60px]"
        style={{ gridTemplateColumns: '1.15fr 1fr', alignItems: 'stretch' }}
      >
        {/* LEFT */}
        <div
          className="flex flex-col justify-center transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)' }}
        >
          <SectionLabel>About</SectionLabel>

          {/* Headline stack */}
          <div className="mb-9">
            {about.headlineLines.map((line, i) => (
              <div
                key={i}
                className="font-display font-black leading-[1.04] tracking-[-0.01em]"
                style={{
                  fontSize: 'clamp(20px, 3.8vw, 45px)',
                  color: i === 3 ? 'transparent' : '#dde4ff',
                  fontWeight: i === 3 ? 300 : 800,
                  WebkitTextStroke: i === 3 ? '1px rgba(61,126,255,0.28)' : 'none',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.55s ease ${0.08 * i}s, transform 0.55s ease ${0.08 * i}s`,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-[14px]">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-body font-light text-gray-400 leading-[1.82]"
                style={{
                  fontSize: '14px',
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.35 + i * 0.1}s`,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="flex flex-col gap-[14px] transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transitionDelay: '0.15s' }}
        >
          {/* Photo placeholder */}
        <div
          className=" flex items-center justify-center relative overflow-hidden flex-1 min-h-[260px] rounded-xl"
        >
          <img
            src={pfp}
            alt="profile"
            data-cursor="This is me"
            className="absolute inset-0 w-full h-full object-cover"
          />
        
          {/* crosshair lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-0 right-0 h-px"
              style={{ background: "rgba(61,126,255,0.07)" }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px"
              style={{ background: "rgba(61,126,255,0.07)" }}
            />
          </div>
        
          {/* corner brackets */}
          {[
            ["top-3 left-3", "border-t border-l"],
            ["top-3 right-3", "border-t border-r"],
            ["bottom-3 left-3", "border-b border-l"],
            ["bottom-3 right-3", "border-b border-r"],
          ].map(([pos, bdr], i) => (
            <span key={i} className={`absolute w-4 h-4 ${pos} ${bdr} border-blue/40`} />
          ))}
        
          {/* bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
            style={{ background: "linear-gradient(to top, #080a14, transparent)" }}
          />
        
          <span className="font-mono text-[9px] text-blue/25 tracking-[0.15em] relative z-10">
            photo.jpg
          </span>
        </div>
        
          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 gap-[10px]">
            {about.stats.map((stat, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[10px] p-[18px_20px] bg-card transition-all duration-200"
                style={{
                  border: '1px solid rgba(61,126,255,0.1)',
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, border-color 0.2s, box-shadow 0.2s`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61,126,255,0.35)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(61,126,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(61,126,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* corner glow */}
                <div className="absolute top-0 right-0 w-[50px] h-[50px] pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 100% 0%, rgba(61,126,255,0.14), transparent 65%)' }} />
                <div className="font-display font-black text-[28px] text-text leading-none mb-1">{stat.value}</div>
                <div className="font-mono text-[15px] text-blue tracking-[0.14em] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
