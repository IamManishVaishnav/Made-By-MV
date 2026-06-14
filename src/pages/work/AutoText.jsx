import { useEffect, useRef, useState } from "react";

// ── Image imports from assets ─────────────────────────────────────────────────
// Place your files in /src/assets/autotext/ and these will resolve automatically
import beforeDashboard   from "../../assets/autotext/before-dashboard.png";
import beforeQuickPost   from "../../assets/autotext/before-quickpost.png";
import afterChat         from "../../assets/autotext/after-chat.png";
import afterChatExpanded from "../../assets/autotext/after-chat-expanded.png";
import afterMediaGen     from "../../assets/autotext/after-mediagen.png";
import wireframe1        from "../../assets/autotext/wireframe-1.jpg";
import wireframe2        from "../../assets/autotext/wireframe-2.jpg";

// ── Figma link — update this ──────────────────────────────────────────────────
const FIGMA_URL = "https://www.figma.com/design/nXruSVWkKwJ9gRpLGv5mBY/Autotext-AI-Revamp?node-id=0-1&t=NDKRH71nlwRWuGNa-1";

// ── Design tokens ─────────────────────────────────────────────────────────────
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

// ── Helpers ───────────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.72s ease ${delay}s, transform 0.72s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

const Eyebrow = ({ children, color = T.mid }) => (
  <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: 20, fontWeight: 500 }}>{children}</p>
);

const Heading = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: T.display, fontWeight: 700, color: T.text, fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.15, letterSpacing: "-0.025em", margin: "0 0 20px", ...style }}>{children}</h2>
);

const Body = ({ children, style = {} }) => (
  <p style={{ fontFamily: T.body, fontSize: 16, lineHeight: 1.82, color: T.mid, margin: 0, ...style }}>{children}</p>
);

const Chip = ({ children }) => (
  <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.06em", color: T.mid, border: `1px solid ${T.dim}`, borderRadius: 100, padding: "5px 14px", display: "inline-block" }}>{children}</span>
);

const Divider = () => (
  <div style={{ maxWidth: 1100, margin: "0 auto", height: 1, background: T.dim, opacity: 0.35 }} />
);

const Section = ({ children, style = {} }) => (
  <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px", ...style }}>{children}</section>
);

// ── Annotation dot ────────────────────────────────────────────────────────────
const Dot = ({ n, top, left, label }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "absolute", top, left, zIndex: 10 }}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{ width: 28, height: 28, borderRadius: "50%", background: "#ef4444", border: "2px solid rgba(255,255,255,0.9)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, cursor: "default", boxShadow: "0 2px 14px rgba(239,68,68,0.55)" }}
      >{n}</div>
      {open && (
        <div style={{ position: "absolute", top: 34, left: 0, width: 196, background: "#0d0f1c", border: `1px solid ${T.dim}`, borderRadius: 10, padding: "10px 14px", fontFamily: T.body, fontSize: 13, color: T.text, lineHeight: 1.55, boxShadow: "0 12px 32px rgba(0,0,0,0.6)", whiteSpace: "normal" }}>{label}</div>
      )}
    </div>
  );
};

// ── Scroll progress bar ───────────────────────────────────────────────────────
const ProgressBar = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9999, background: T.dim }}>
      <div style={{ height: "100%", width: `${pct}%`, background: T.blueB, transition: "width 0.1s linear" }} />
    </div>
  );
};

// ── Figma button (reusable) ───────────────────────────────────────────────────
const FigmaBtn = ({ style = {}, onRef }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      ref={onRef}
      href={FIGMA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "12px 22px", borderRadius: 8,
        border: `1px solid ${hov ? T.blueB : T.dim}`,
        color: hov ? T.text : T.mid,
        fontFamily: T.body, fontSize: 14, textDecoration: "none",
        transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
        background: T.card,
        boxShadow: hov ? `0 0 20px rgba(107,159,255,0.15)` : "none",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill={T.blueB}/>
        <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19Z" fill="#0acf83"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#a259ff"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#f24e1e"/>
        <path d="M19 0V19h9.5a9.5 9.5 0 1 0 0-19Z" fill="#ff7262"/>
      </svg>
      Explore in Figma ↗
    </a>
  );
};

// ── Floating Figma button — docks into footer when user reaches it ─────────────
const FloatingFigmaBtn = ({ footerRef }) => {
  const [docked, setDocked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      // Show after 400px scroll
      setVisible(scrollY > 400);

      if (!footerRef.current) return;
      const footerTop = footerRef.current.getBoundingClientRect().top;
      // Dock when footer CTA buttons row is visible
      setDocked(footerTop < window.innerHeight - 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [footerRef]);

  if (docked) return null; // footer takes over

  return (
    <div style={{
      position: "fixed", bottom: 32, right: 36, zIndex: 500,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <FigmaBtn style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(107,159,255,0.12)",
        border: `1px solid rgba(107,159,255,0.25)`,
      }} />
    </div>
  );
};

// ── Screen image — falls back to placeholder if src fails ─────────────────────
const ScreenImg = ({ src, alt, aspect = "16/9", radius = 14 }) => {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div style={{ aspectRatio: aspect, width: "100%", borderRadius: radius, border: `1px dashed ${T.dim}`, background: T.card, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: T.mono, fontSize: 12, color: "#3a4060", letterSpacing: "0.04em" }}>{alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setErr(true)} style={{ width: "100%", borderRadius: radius, border: `1px solid ${T.dim}`, display: "block", objectFit: "cover" }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AutoTextCaseStudy() {
  const footerRef = useRef(null);

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
      <nav style={{ padding: "22px 48px", borderBottom: `1px solid rgba(30,36,64,0.5)`, position: "sticky", top: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/"
            style={{ fontFamily: T.mono, fontSize: 13, color: T.mid, letterSpacing: "0.06em", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = T.text}
            onMouseLeave={e => e.currentTarget.style.color = T.mid}
          >← madebymv</a>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>Case Study · AutoText AI</span>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <Section style={{ paddingTop: 100, paddingBottom: 80 }}>
        <FadeIn>
          <Eyebrow>UI/UX Case Study · AutoText AI · 2024</Eyebrow>
          <h1 style={{ fontFamily: T.display, fontWeight: 700, color: T.text, fontSize: "clamp(46px,7vw,92px)", lineHeight: 1.05, letterSpacing: "-0.035em", margin: "0 0 24px" }}>
            The dashboard<br />
            was the problem.<br />
            <span style={{ color: T.blueB }}>So I removed it.</span>
          </h1>
          <Body style={{ fontSize: 18, maxWidth: 560, marginBottom: 36 }}>
            Redesigning an AI social media platform from a fragmented dashboard
            into a chat-first interface where users create from the very first second.
          </Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 72 }}>
            {["UI/UX Design", "User Research", "Wireframing", "Figma Prototype", "Internship", "4 Months"].map(c => <Chip key={c}>{c}</Chip>)}
          </div>
        </FadeIn>

        {/* Before / After hero split */}
        <FadeIn delay={0.18}>
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
        </FadeIn>
      </Section>

      <Divider />

      {/* ══════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════ */}
      <Section>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 72, alignItems: "start" }}>
            <div>
              <Eyebrow>The Product</Eyebrow>
              <Heading>What is<br />AutoText AI?</Heading>
            </div>
            <div style={{ paddingTop: 4 }}>
              <Body style={{ marginBottom: 16 }}>
                AutoText AI is an AI-powered social media marketing platform built for
                freelancers, agencies, and brands. It generates content, designs visuals,
                and auto-schedules posts across Instagram, Facebook, and LinkedIn —
                all from a single workspace. Over <strong style={{ color: T.text, fontWeight: 500 }}>10,000+ users</strong> rely on it daily.
              </Body>
              <Body>
                I joined as a UI/UX Design Intern and was tasked with diagnosing why
                users weren't completing core flows — and redesigning the platform
                from the ground up.
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
          <Body style={{ maxWidth: 640, marginBottom: 48, fontSize: 17 }}>
            The original interface forced users through a chain of decisions — platform,
            content type, parameters — before ever reaching the AI prompt. By the time
            they got there, the moment was gone. Drop-off happened before a single word was written.
          </Body>
        </FadeIn>

        {/* Flow steps */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 10 }}>
            {["Land on Dashboard", "Navigate to Quick Post", "Open AutoDesign", "Set parameters", "Finally — the prompt"].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.red, fontWeight: 700 }}>0{i + 1}</span>
                <span style={{ fontFamily: T.body, fontSize: 13, color: T.text, background: T.card, border: `1px solid ${T.dim}`, padding: "7px 16px", borderRadius: 7 }}>{step}</span>
                {i < 4 && <span style={{ color: T.dim, fontSize: 16 }}>→</span>}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: T.mono, fontSize: 12, color: T.red, letterSpacing: "0.04em", marginTop: 6 }}>
            5 steps to reach what should be step 1.
          </p>
        </FadeIn>

        {/* Annotated before screenshots */}
        <FadeIn delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 52 }}>
            {[
              {
                label: "Dashboard — Entry point", src: beforeDashboard, alt: "before-dashboard",
                dots: [
                  { n: 1, top: "16%", left: "6%",  label: "Sidebar forces navigation — users must decide where to go before they can do anything" },
                  { n: 2, top: "40%", left: "28%", label: "Metric cards show zeroes on a fresh session — no value, just noise" },
                  { n: 3, top: "68%", left: "18%", label: "Empty queue table gives new users zero direction on what to do next" },
                ],
              },
              {
                label: "Quick Post — 2 clicks deep", src: beforeQuickPost, alt: "before-quickpost",
                dots: [
                  { n: 1, top: "18%", left: "52%", label: "Preview pane competes with the writing area for attention" },
                  { n: 2, top: "74%", left: "88%",  label: "Upload vs AutoDesign forces yet another split decision" },
                ],
              },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.mid, marginBottom: 12 }}>{s.label}</p>
                <div style={{ position: "relative" }}>
                  <ScreenImg src={s.src} alt={s.alt} aspect="16/9" />
                  {s.dots.map(d => <Dot key={d.n} {...d} />)}
                </div>
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
          <Body style={{ maxWidth: 640, marginBottom: 52, fontSize: 17 }}>
            Before wireframes, I mapped the existing user journey end-to-end and identified
            every decision point. Then I asked: which of these does the user actually want to make?
            Most didn't. They were system decisions masquerading as user choices.
          </Body>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {[
              { n: "01", title: "Navigation ≠ Value",      body: "Every sidebar click was a task the user didn't come to do. They came to create content — not navigate to it." },
              { n: "02", title: "Prompt is the product",   body: "The AI prompt was the core action. Platform, tone, image — all of that is a parameter of the prompt, not a pre-step." },
              { n: "03", title: "Chat is the pattern",     body: "Claude, ChatGPT, Gemini — users already understand this model. Meeting them there removes the learning curve entirely." },
            ].map(ins => (
              <div key={ins.n} style={{ background: T.card, border: `1px solid ${T.dim}`, borderRadius: 14, padding: "28px 24px" }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.blueB, letterSpacing: "0.12em", display: "block", marginBottom: 14 }}>{ins.n}</span>
                <h3 style={{ fontFamily: T.display, fontWeight: 600, fontSize: 16, color: T.text, marginBottom: 10 }}>{ins.title}</h3>
                <Body style={{ fontSize: 14 }}>{ins.body}</Body>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Hand-drawn wireframes */}
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.mid, marginTop: 60, marginBottom: 16 }}>
            Early exploration — hand-drawn wireframes
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <ScreenImg src={wireframe1} alt="Wireframe 1" aspect="4/3" radius={12} />
            <ScreenImg src={wireframe2} alt="Wireframe 2" aspect="4/3" radius={12} />
          </div>
        </FadeIn>
      </Section>

      {/* ══════════════════════════════════════════
          PULL QUOTE
      ══════════════════════════════════════════ */}
      <div style={{ background: T.surface, borderTop: `1px solid rgba(30,36,64,0.5)`, borderBottom: `1px solid rgba(30,36,64,0.5)`, padding: "88px 48px", textAlign: "center" }}>
        <FadeIn>
          <Eyebrow color={T.blueB}>The Reframe</Eyebrow>
          <blockquote style={{ fontFamily: T.display, fontWeight: 600, color: T.text, fontSize: "clamp(24px,3.2vw,44px)", lineHeight: 1.35, letterSpacing: "-0.022em", maxWidth: 760, margin: "0 auto", fontStyle: "normal" }}>
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
          <Body style={{ maxWidth: 620, marginBottom: 8, fontSize: 17 }}>
            The new interface puts users directly in creation mode from the moment they log in.
            No navigation. No setup. The prompt is centered — the way it should be — with platform
            toggles, model selection, and suggestions all within the same context.
          </Body>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 72, marginTop: 56 }}>
          {[
            { tag: "01 — Home · Chat Interface",      caption: "Users land directly on the prompt. No dashboard, no cards, no sidebar decisions. The AutoText logo anchors the experience and suggestion cards guide without forcing a choice.", src: afterChat,         alt: "After — chat interface" },
            { tag: "02 — Platform Selection — inline", caption: "Platform, tone, and image options expand contextually inside the chat bar itself. Zero navigation. The decision happens at the exact point of creation.",                       src: afterChatExpanded, alt: "After — platform selection" },
            { tag: "03 — Media Generator — redesigned",caption: "The image and video generation tool was rebuilt with the same design language — prompt-first, parameters secondary. Tabs replaced the layered modal stack.",                 src: afterMediaGen,     alt: "After — media generator" },
          ].map((item, i) => (
            <FadeIn key={i} delay={0.06 * i}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: T.blueB, display: "block", marginBottom: 8 }}>{item.tag}</span>
                  <Body style={{ maxWidth: 520, fontSize: 15 }}>{item.caption}</Body>
                </div>
                <ScreenImg src={item.src} alt={item.alt} aspect="16/8" radius={16} />
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
          <Body style={{ maxWidth: 620, marginBottom: 52, fontSize: 17 }}>
            Both the platform UI and the AutoText marketing landing page were revamped
            based on this direction. The dev team implemented the new interface — cutting
            the path to first content creation from 5 steps down to 1.
          </Body>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {[
              { stat: "5 → 1", label: "Steps to reach the prompt" },
              { stat: "2",     label: "Major surfaces redesigned — platform UI & landing page" },
              { stat: "4 mo",  label: "Research · Wireframes · Figma prototype · Handoff" },
            ].map((o, i) => (
              <div key={i} style={{ background: T.card, border: `1px solid ${T.dim}`, borderRadius: 14, padding: "32px 28px" }}>
                <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 44, color: T.blueB, letterSpacing: "-0.03em", display: "block", marginBottom: 10, lineHeight: 1 }}>{o.stat}</span>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, marginTop: 10 }}>
            {[
              { title: "Navigation is a symptom.",      body: "When users are lost, the instinct is to add better navigation. The real question is: why are they navigating at all?" },
              { title: "Familiar patterns earn trust.", body: "Chat-first wasn't a trend choice — it was a trust choice. Users already knew the model. Designing with it removed onboarding entirely." },
              { title: "The handoff is part of design.",body: "A prototype means nothing if the intent isn't documented. I learned to write design rationale, not just deliver files." },
            ].map((l, i) => (
              <div key={i} style={{ borderTop: `1px solid ${T.dim}`, paddingTop: 24 }}>
                <h3 style={{ fontFamily: T.display, fontWeight: 600, fontSize: 16, color: T.text, marginBottom: 10 }}>{l.title}</h3>
                <Body style={{ fontSize: 14 }}>{l.body}</Body>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ══════════════════════════════════════════
          FOOTER CTA  ← ref anchors the floating btn
      ══════════════════════════════════════════ */}
      <div ref={footerRef} style={{ borderTop: `1px solid rgba(30,36,64,0.5)`, textAlign: "center", padding: "96px 48px 80px" }}>
        <FadeIn>
          <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: T.dim, marginBottom: 20 }}>
            That's a wrap on this one.
          </p>
          <h2 style={{ fontFamily: T.display, fontWeight: 700, fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.025em", color: T.text, marginBottom: 48 }}>
            Want to see what else I've built?
          </h2>

          {/* The 3 footer buttons — Figma joins here when floating btn docks */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/"
              style={{ display: "inline-block", padding: "14px 28px", background: T.blue, color: "#fff", borderRadius: 8, fontFamily: T.body, fontSize: 15, fontWeight: 500, boxShadow: "0 0 28px rgba(26,58,255,0.45)", transition: "box-shadow 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 48px rgba(26,58,255,0.65)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 28px rgba(26,58,255,0.45)"}
            >← Back to Portfolio</a>

            <FigmaBtn />

            <a href="mailto:manish@graphicmoron.com"
              style={{ display: "inline-block", padding: "14px 28px", border: `1px solid ${T.dim}`, color: T.mid, borderRadius: 8, fontFamily: T.body, fontSize: 15, transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.blueB; e.currentTarget.style.color = T.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.dim; e.currentTarget.style.color = T.mid; }}
            >Get in touch</a>
          </div>
        </FadeIn>
      </div>

    </div>
  );
}