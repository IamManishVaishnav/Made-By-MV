import { useEffect, useRef, useState } from "react";

// ── Image imports ─────────────────────────────────────────────────────────────
import beforeDashboard   from "../../assets/autotext/before-dashboard.png";
import beforeQuickPost   from "../../assets/autotext/before-quickpost.png";
import afterChat         from "../../assets/autotext/after-chat.png";
import afterChatExpanded from "../../assets/autotext/after-chat-expanded.png";
import afterMediaGen     from "../../assets/autotext/after-mediagen.png";
import wireframe1        from "../../assets/autotext/wireframe-1.jpg";
import wireframe2        from "../../assets/autotext/wireframe-2.jpg";

const FIGMA_URL = "https://www.figma.com/design/nXruSVWkKwJ9gRpLGv5mBY/Autotext-AI-Revamp?node-id=0-1&t=NDKRH71nlwRWuGNa-1";

// ── Tokens ────────────────────────────────────────────────────────────────────
const T = {
  bg:      "#000000",
  surface: "#05060e",
  card:    "#080a14",
  blue:    "#1a3aff",
  blueB:   "#6b9fff",
  text:    "#dde4ff",
  mid:     "#5a6490",
  dim:     "#1e2440",
  red:     "#f87171",
  display: '"Bricolage Grotesque", sans-serif',
  body:    '"Manrope", sans-serif',
  mono:    '"Geist Mono", monospace',
};

// ── useMediaQuery ─────────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
};

// ── FadeIn ────────────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

// ── Primitives ────────────────────────────────────────────────────────────────
const Eyebrow = ({ children, color = T.mid }) => (
  <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: 18, fontWeight: 500 }}>{children}</p>
);

const Heading = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: T.display, fontWeight: 700, color: T.text, fontSize: "clamp(26px,3.5vw,46px)", lineHeight: 1.15, letterSpacing: "-0.025em", margin: "0 0 18px", ...style }}>{children}</h2>
);

const Body = ({ children, style = {} }) => (
  <p style={{ fontFamily: T.body, fontSize: 16, lineHeight: 1.82, color: T.mid, margin: 0, ...style }}>{children}</p>
);

const Chip = ({ children }) => (
  <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.06em", color: T.mid, border: `1px solid ${T.dim}`, borderRadius: 100, padding: "5px 14px", display: "inline-block" }}>{children}</span>
);

const Divider = () => (
  <div style={{ maxWidth: 1100, margin: "0 auto 0", height: 1, background: T.dim, opacity: 0.35 }} />
);

// ── Responsive section wrapper ────────────────────────────────────────────────
const Section = ({ children, style = {} }) => {
  const mob = useIsMobile();
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: mob ? "56px 20px" : "80px 48px", ...style }}>
      {children}
    </section>
  );
};

// ── Annotation dot ────────────────────────────────────────────────────────────
const Dot = ({ n, top, left, label }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "absolute", top, left, zIndex: 10 }}>
      <div
        onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(o => !o)}
        style={{ width: 26, height: 26, borderRadius: "50%", background: "#ef4444", border: "2px solid rgba(255,255,255,0.85)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, cursor: "pointer", boxShadow: "0 2px 14px rgba(239,68,68,0.5)" }}
      >{n}</div>
      {open && (
        <div style={{ position: "absolute", top: 32, left: 0, width: 180, background: "#0d0f1c", border: `1px solid ${T.dim}`, borderRadius: 10, padding: "9px 13px", fontFamily: T.body, fontSize: 13, color: T.text, lineHeight: 1.55, boxShadow: "0 12px 32px rgba(0,0,0,0.65)", whiteSpace: "normal", zIndex: 20 }}>{label}</div>
      )}
    </div>
  );
};

// ── Scroll progress bar ───────────────────────────────────────────────────────
const ProgressBar = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9999, background: T.dim }}>
      <div style={{ height: "100%", width: `${pct}%`, background: T.blueB, transition: "width 0.1s linear" }} />
    </div>
  );
};

// ── Figma button — filled ─────────────────────────────────────────────────────
const FigmaBtn = ({ style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={FIGMA_URL} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "13px 22px", borderRadius: 8,
        background: hov ? "#2a4aff" : T.blue,
        color: "#fff",
        fontFamily: T.body, fontSize: 14, fontWeight: 500,
        textDecoration: "none",
        boxShadow: hov ? "0 0 32px rgba(26,58,255,0.6)" : "0 0 20px rgba(26,58,255,0.35)",
        transition: "background 0.2s, box-shadow 0.2s",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="white" fillOpacity="0.9"/>
        <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19Z" fill="white" fillOpacity="0.75"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="white" fillOpacity="0.75"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="white" fillOpacity="0.75"/>
        <path d="M19 0V19h9.5a9.5 9.5 0 1 0 0-19Z" fill="white" fillOpacity="0.75"/>
      </svg>
      Explore in Figma ↗
    </a>
  );
};

// ── Floating Figma button ─────────────────────────────────────────────────────
const FloatingFigmaBtn = ({ footerRef }) => {
  const [docked, setDocked] = useState(false);
  const [visible, setVisible] = useState(false);
  const mob = useIsMobile();

  useEffect(() => {
    const fn = () => {
      setVisible(window.scrollY > 400);
      if (!footerRef.current) return;
      setDocked(footerRef.current.getBoundingClientRect().top < window.innerHeight - 40);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [footerRef]);

  if (docked) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: mob ? 20 : 32,
      right: mob ? 16 : 36,
      zIndex: 500,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <FigmaBtn style={{ fontSize: mob ? 13 : 14, padding: mob ? "11px 16px" : "13px 22px" }} />
    </div>
  );
};

// ── Screen image with fallback ────────────────────────────────────────────────
const ScreenImg = ({ src, alt, aspect = "16/9", radius = 14 }) => {
  const [err, setErr] = useState(false);
  if (err || !src) return (
    <div style={{ aspectRatio: aspect, width: "100%", borderRadius: radius, border: `1px dashed ${T.dim}`, background: T.card, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: T.mono, fontSize: 12, color: "#3a4060", letterSpacing: "0.04em", padding: "0 20px", textAlign: "center" }}>{alt}</span>
    </div>
  );
  return <img src={src} alt={alt} onError={() => setErr(true)} style={{ width: "100%", borderRadius: radius, border: `1px solid ${T.dim}`, display: "block", objectFit: "cover" }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function AutoTextCaseStudy() {
  const footerRef = useRef(null);
  const mob = useIsMobile();

  const px = mob ? "20px" : "48px";
  const sectionPad = mob ? "56px 20px" : "80px 48px";

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: T.body, WebkitFontSmoothing: "antialiased", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Manrope:wght@300;400;500&family=Geist+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-track{background:#000;}
        ::-webkit-scrollbar-thumb{background:#1e2440;border-radius:2px;}
        ::selection{background:rgba(61,126,255,0.35);color:#fff;}
        a{text-decoration:none;}
      `}</style>

      <ProgressBar />
      <FloatingFigmaBtn footerRef={footerRef} />

      {/* ── Nav ── */}
      <nav style={{ padding: `18px ${px}`, borderBottom: `1px solid rgba(30,36,64,0.5)`, position: "sticky", top: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ fontFamily: T.mono, fontSize: 13, color: T.mid, letterSpacing: "0.06em", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = T.text}
            onMouseLeave={e => e.currentTarget.style.color = T.mid}
          >← madebymv</a>
          {!mob && <span style={{ fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>Case Study · AutoText AI</span>}
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: mob ? "64px 20px 56px" : "100px 48px 80px" }}>
        <FadeIn>
          <Eyebrow>UI/UX Case Study · AutoText AI · 2024</Eyebrow>
          <h1 style={{ fontFamily: T.display, fontWeight: 700, color: T.text, fontSize: mob ? "clamp(38px,11vw,56px)" : "clamp(46px,7vw,92px)", lineHeight: 1.05, letterSpacing: "-0.035em", margin: "0 0 20px" }}>
            The dashboard<br />
            was the problem.<br />
            <span style={{ color: T.blueB }}>So I removed it.</span>
          </h1>
          <Body style={{ fontSize: mob ? 16 : 18, maxWidth: 560, marginBottom: 32 }}>
            Redesigning an AI social media platform from a fragmented dashboard
            into a chat-first interface where users create from the very first second.
          </Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: mob ? 48 : 72 }}>
            {["UI/UX Design", "User Research", "Wireframing", "Figma Prototype", "Internship", "4 Months"].map(c => <Chip key={c}>{c}</Chip>)}
          </div>
        </FadeIn>

        {/* Before / After — stacks on mobile */}
        <FadeIn delay={0.18}>
          {mob ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.mid }}>Before</span>
                <ScreenImg src={beforeDashboard} alt="Old dashboard" aspect="16/10" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 1, background: T.dim, opacity: 0.5 }} />
                <span style={{ fontSize: 20, color: T.dim }}>↓</span>
                <div style={{ flex: 1, height: 1, background: T.dim, opacity: 0.5 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.mid }}>After</span>
                <ScreenImg src={afterChat} alt="New chat interface" aspect="16/10" />
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 20, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.mid }}>Before</span>
                <ScreenImg src={beforeDashboard} alt="Old dashboard" aspect="16/10" />
              </div>
              <span style={{ fontSize: 26, color: T.dim, padding: "0 4px", marginTop: 28 }}>→</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.mid }}>After</span>
                <ScreenImg src={afterChat} alt="New chat interface" aspect="16/10" />
              </div>
            </div>
          )}
        </FadeIn>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════ */}
      <Section>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1.6fr", gap: mob ? 24 : 72, alignItems: "start" }}>
            <div>
              <Eyebrow>The Product</Eyebrow>
              <Heading>What is<br />AutoText AI?</Heading>
            </div>
            <div style={{ paddingTop: mob ? 0 : 4 }}>
              <Body style={{ marginBottom: 16 }}>
                AutoText AI is an AI-powered social media marketing platform built for freelancers,
                agencies, and brands. It generates content, designs visuals, and auto-schedules
                posts across Instagram, Facebook, and LinkedIn — all from one workspace.
                Over <strong style={{ color: T.text, fontWeight: 500 }}>10,000+ users</strong> rely on it daily.
              </Body>
              <Body>
                I joined as a UI/UX Design Intern and was tasked with diagnosing why users
                weren't completing core flows — and redesigning the platform from the ground up.
              </Body>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Divider />

      {/* ══════════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════════ */}
      <Section>
        <FadeIn>
          <Eyebrow>The Problem</Eyebrow>
          <Heading>Users had to navigate<br />before they could create.</Heading>
          <Body style={{ maxWidth: 640, marginBottom: 40, fontSize: 17 }}>
            The original interface forced users through a chain of decisions — platform,
            content type, parameters — before ever reaching the AI prompt. By the time
            they got there, the moment was gone.
          </Body>
        </FadeIn>

        {/* Flow steps — wraps naturally on mobile */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 10 }}>
            {["Land on Dashboard", "Navigate to Quick Post", "Open AutoDesign", "Set parameters", "Finally — the prompt"].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.red, fontWeight: 700 }}>0{i + 1}</span>
                <span style={{ fontFamily: T.body, fontSize: mob ? 12 : 13, color: T.text, background: T.card, border: `1px solid ${T.dim}`, padding: "6px 14px", borderRadius: 7 }}>{step}</span>
                {i < 4 && <span style={{ color: T.dim, fontSize: 14 }}>→</span>}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: T.mono, fontSize: 12, color: T.red, letterSpacing: "0.04em", marginTop: 8 }}>
            5 steps to reach what should be step 1.
          </p>
        </FadeIn>

        {/* Annotated screenshots — single col on mobile */}
        <FadeIn delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 32 : 28, marginTop: 48 }}>
            {[
              {
                label: "Dashboard — Entry point", src: beforeDashboard, alt: "before-dashboard",
                dots: [
                  { n: 1, top: "16%", left: "6%",  label: "Sidebar forces navigation before any creation" },
                  { n: 2, top: "40%", left: "28%", label: "Metric cards show zeroes — no value for new users" },
                  { n: 3, top: "68%", left: "18%", label: "Empty queue table gives zero direction" },
                ],
              },
              {
                label: "Quick Post — 2 clicks deep", src: beforeQuickPost, alt: "before-quickpost",
                dots: [
                  { n: 1, top: "18%", left: "52%", label: "Preview pane competes with the writing area" },
                  { n: 2, top: "74%", left: "8%",  label: "Upload vs AutoDesign forces another split decision" },
                ],
              },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.mid, marginBottom: 12 }}>{s.label}</p>
                <div style={{ position: "relative" }}>
                  <ScreenImg src={s.src} alt={s.alt} aspect="16/9" />
                  {!mob && s.dots.map(d => <Dot key={d.n} {...d} />)}
                </div>
                {/* On mobile show callouts as a list below the image */}
                {mob && (
                  <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.dots.map(d => (
                      <li key={d.n} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono }}>{d.n}</span>
                        <span style={{ fontFamily: T.body, fontSize: 13, color: T.mid, lineHeight: 1.55, paddingTop: 2 }}>{d.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Divider />

      {/* ══════════════════════════════════════════
          RESEARCH
      ══════════════════════════════════════════ */}
      <Section>
        <FadeIn>
          <Eyebrow>Research & Process</Eyebrow>
          <Heading>Finding the real friction.</Heading>
          <Body style={{ maxWidth: 640, marginBottom: 48, fontSize: 17 }}>
            Before wireframes, I mapped the existing user journey end-to-end and identified
            every decision point. Then I asked: which of these does the user actually want to make?
            Most didn't. They were system decisions masquerading as user choices.
          </Body>
        </FadeIn>

        {/* Insight cards — single col on mobile */}
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 16 }}>
            {[
              { n: "01", title: "Navigation ≠ Value",    body: "Every sidebar click was a task the user didn't come to do. They came to create content — not navigate to it." },
              { n: "02", title: "Prompt is the product", body: "The AI prompt was the core action. Platform, tone, image — all of that is a parameter of the prompt, not a pre-step." },
              { n: "03", title: "Chat is the pattern",   body: "Claude, ChatGPT, Gemini — users already understand this model. Meeting them there removes the learning curve." },
            ].map(ins => (
              <div key={ins.n} style={{ background: T.card, border: `1px solid ${T.dim}`, borderRadius: 14, padding: mob ? "22px 20px" : "28px 24px" }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.blueB, letterSpacing: "0.12em", display: "block", marginBottom: 12 }}>{ins.n}</span>
                <h3 style={{ fontFamily: T.display, fontWeight: 600, fontSize: 15, color: T.text, marginBottom: 8 }}>{ins.title}</h3>
                <Body style={{ fontSize: 14 }}>{ins.body}</Body>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Wireframes */}
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.mid, marginTop: 56, marginBottom: 14 }}>
            Early exploration — AI-generated wireframes
          </p>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16 }}>
            <ScreenImg src={wireframe1} alt="Wireframe 1 — Chat interface concepts" aspect="4/3" radius={12} />
            <ScreenImg src={wireframe2} alt="Wireframe 2 — Media generator layout" aspect="4/3" radius={12} />
          </div>
        </FadeIn>
      </Section>

      {/* ══════════════════════════════════════════
          PULL QUOTE
      ══════════════════════════════════════════ */}
      <div style={{ background: T.surface, borderTop: `1px solid rgba(30,36,64,0.5)`, borderBottom: `1px solid rgba(30,36,64,0.5)`, padding: mob ? "64px 20px" : "88px 48px", textAlign: "center" }}>
        <FadeIn>
          <Eyebrow color={T.blueB}>The Reframe</Eyebrow>
          <blockquote style={{ fontFamily: T.display, fontWeight: 600, color: T.text, fontSize: mob ? "clamp(22px,6vw,30px)" : "clamp(24px,3.2vw,44px)", lineHeight: 1.35, letterSpacing: "-0.02em", maxWidth: 760, margin: "0 auto", fontStyle: "normal" }}>
            "What if the prompt was the product?<br />
            Everything else is just a parameter."
          </blockquote>
        </FadeIn>
      </div>

      {/* ══════════════════════════════════════════
          REDESIGN
      ══════════════════════════════════════════ */}
      <Section>
        <FadeIn>
          <Eyebrow>The Redesign</Eyebrow>
          <Heading>Chat-first.<br />Everything within reach.</Heading>
          <Body style={{ maxWidth: 620, fontSize: 17 }}>
            The new interface puts users directly in creation mode from the moment they log in.
            No navigation. No setup. The prompt is centered — the way it should be.
          </Body>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: mob ? 48 : 72, marginTop: 48 }}>
          {[
            { tag: "01 — Home · Chat Interface",       caption: "Users land directly on the prompt. No dashboard, no cards, no sidebar decisions. Suggestion cards guide without forcing a choice.", src: afterChat,         alt: "After — chat interface" },
            { tag: "02 — Platform Selection — inline",  caption: "Platform, tone, and image options expand contextually inside the chat bar. Zero navigation. The decision happens at the point of creation.", src: afterChatExpanded, alt: "After — platform selection" },
            { tag: "03 — Media Generator — redesigned", caption: "Rebuilt with the same design language — prompt-first, parameters secondary. Tabs replaced the layered modal stack.", src: afterMediaGen, alt: "After — media generator" },
          ].map((item, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: T.blueB, display: "block", marginBottom: 8 }}>{item.tag}</span>
                  <Body style={{ maxWidth: 520, fontSize: 15 }}>{item.caption}</Body>
                </div>
                <ScreenImg src={item.src} alt={item.alt} aspect="16/8" radius={mob ? 12 : 16} />
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ══════════════════════════════════════════
          OUTCOME
      ══════════════════════════════════════════ */}
      <Section>
        <FadeIn>
          <Eyebrow>Outcome</Eyebrow>
          <Heading>Shipped. Implemented.</Heading>
          <Body style={{ maxWidth: 620, marginBottom: 44, fontSize: 17 }}>
            Both the platform UI and the AutoText marketing landing page were revamped
            based on this direction. The dev team implemented the new interface — cutting
            the path to first content creation from 5 steps down to 1.
          </Body>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(3,1fr)", gap: 14 }}>
            {[
              { stat: "5 → 1", label: "Steps to reach the prompt" },
              { stat: "2",     label: "Major surfaces redesigned" },
              { stat: "4 mo",  label: "Research to handoff" },
            ].map((o, i) => (
              <div key={i} style={{ background: T.card, border: `1px solid ${T.dim}`, borderRadius: 14, padding: mob ? "24px 18px" : "32px 28px", gridColumn: mob && i === 2 ? "1 / -1" : "auto" }}>
                <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: mob ? 34 : 44, color: T.blueB, letterSpacing: "-0.03em", display: "block", marginBottom: 8, lineHeight: 1 }}>{o.stat}</span>
                <Body style={{ fontSize: 14 }}>{o.label}</Body>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Divider />

      {/* ══════════════════════════════════════════
          LEARNINGS
      ══════════════════════════════════════════ */}
      <Section>
        <FadeIn>
          <Eyebrow>What I Learnt</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: mob ? 24 : 32, marginTop: 8 }}>
            {[
              { title: "Navigation is a symptom.",      body: "When users are lost, the instinct is to add better navigation. The real question is: why are they navigating at all?" },
              { title: "Familiar patterns earn trust.", body: "Chat-first wasn't a trend choice — it was a trust choice. Users already knew the model. Designing with it removed onboarding entirely." },
              { title: "The handoff is part of design.",body: "A prototype means nothing if the intent isn't documented. I learned to write design rationale, not just deliver files." },
            ].map((l, i) => (
              <div key={i} style={{ borderTop: `1px solid ${T.dim}`, paddingTop: 22 }}>
                <h3 style={{ fontFamily: T.display, fontWeight: 600, fontSize: 15, color: T.text, marginBottom: 9 }}>{l.title}</h3>
                <Body style={{ fontSize: 14 }}>{l.body}</Body>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ══════════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════════ */}
      <div ref={footerRef} style={{ borderTop: `1px solid rgba(30,36,64,0.5)`, textAlign: "center", padding: mob ? "72px 20px 60px" : "96px 48px 80px" }}>
        <FadeIn>
          <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: T.dim, marginBottom: 16 }}>
            That's a wrap on this one.
          </p>
          <h2 style={{ fontFamily: T.display, fontWeight: 700, fontSize: mob ? "clamp(26px,7vw,38px)" : "clamp(28px,4vw,56px)", letterSpacing: "-0.025em", color: T.text, marginBottom: 40 }}>
            Want to see what else I've built?
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/"
              style={{ display: "inline-block", padding: mob ? "12px 20px" : "14px 28px", background: T.card, border: `1px solid ${T.dim}`, color: T.mid, borderRadius: 8, fontFamily: T.body, fontSize: 15, transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.blueB; e.currentTarget.style.color = T.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.dim; e.currentTarget.style.color = T.mid; }}
            >← Back to Portfolio</a>

            <FigmaBtn />

            <a href="mailto:manish@graphicmoron.com"
              style={{ display: "inline-block", padding: mob ? "12px 20px" : "14px 28px", border: `1px solid ${T.dim}`, color: T.mid, borderRadius: 8, fontFamily: T.body, fontSize: 15, transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.blueB; e.currentTarget.style.color = T.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.dim; e.currentTarget.style.color = T.mid; }}
            >Get in touch</a>
          </div>
        </FadeIn>
      </div>

    </div>
  );
}


