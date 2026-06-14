import { useEffect, useRef, useState } from "react";

// ─── Image imports ────────────────────────────────────────────────────────────
// Drop your actual screenshot files into /src/assets/autotext/ and update these paths.
// Before screens (old dashboard)
import beforeDashboard from "../../assets/autotext/before-dashboard.png";
import beforeQuickPost from "../../assets/autotext/before-quickpost.png";
import beforeAutoDesign from "../../assets/autotext/before-autodesign.png";
// After screens (your redesign)
import afterChat from "../../assets/autotext/after-chat.png";
import afterChatExpanded from "../../assets/autotext/after-chat-expanded.png";
import afterMediaGen from "../../assets/autotext/after-mediagen.png";
// Process (hand-drawn wireframes)
import wireframe1 from "../../assets/autotext/wireframe-1.png";
import wireframe2 from "../../assets/autotext/wireframe-2.png";

// ─── Placeholder component (remove once real images are added) ────────────────
const Placeholder = ({ label, aspect = "16/9", dim = false }) => (
  <div
    style={{
      aspectRatio: aspect,
      background: dim ? "#111118" : "#16161f",
      border: "1px solid #23232e",
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <span style={{ color: "#3a3a50", fontSize: 13, fontFamily: "monospace", letterSpacing: "0.05em" }}>
      {label}
    </span>
  </div>
);

// ─── Chip / Tag ───────────────────────────────────────────────────────────────
const Chip = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      padding: "5px 14px",
      borderRadius: 100,
      border: "1px solid #2a2a38",
      fontSize: 12,
      color: "#888",
      letterSpacing: "0.04em",
      fontFamily: "'Inter', sans-serif",
    }}
  >
    {children}
  </span>
);

// ─── Section label (eyebrow) ──────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <p
    style={{
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "#555",
      fontFamily: "'Inter', sans-serif",
      marginBottom: 20,
      fontWeight: 500,
    }}
  >
    {children}
  </p>
);

// ─── Callout annotation dot ───────────────────────────────────────────────────
const Dot = ({ n, top, left, label }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "absolute", top, left, zIndex: 10 }}>
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "#e84040",
          border: "2px solid #fff",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          cursor: "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "0 2px 12px rgba(232,64,64,0.4)",
        }}
      >
        {n}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 0,
            background: "#1a1a24",
            border: "1px solid #2a2a38",
            borderRadius: 8,
            padding: "8px 12px",
            width: 180,
            fontSize: 12,
            color: "#ccc",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.5,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            whiteSpace: "normal",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ─── Fade-in on scroll ────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AutoTextCaseStudy() {
  const S = styles;

  return (
    <div style={S.page}>

      {/* ── Nav back ── */}
      <nav style={S.nav}>
        <a href="/" style={S.navLink}>
          <span style={{ marginRight: 6 }}>←</span> madebymv
        </a>
      </nav>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section style={S.hero}>
        <FadeIn>
          <p style={S.heroEyebrow}>UI/UX Case Study · AutoText AI · 2024</p>
          <h1 style={S.heroHeadline}>
            The dashboard<br />
            was the problem.<br />
            <span style={S.heroAccent}>So I removed it.</span>
          </h1>
          <p style={S.heroSub}>
            Redesigning an AI social media platform from a fragmented dashboard experience
            into a chat-first interface where users create from the very first second.
          </p>
          <div style={S.chipRow}>
            <Chip>UI/UX Design</Chip>
            <Chip>Research</Chip>
            <Chip>Figma Prototype</Chip>
            <Chip>Internship</Chip>
            <Chip>4 Months</Chip>
          </div>
        </FadeIn>

        {/* Hero split — before/after teaser */}
        <FadeIn delay={0.15}>
          <div style={S.heroSplit}>
            <div style={S.heroSplitItem}>
              <span style={S.splitLabel}>Before</span>
              {/* Replace with: <img src={beforeDashboard} alt="Old dashboard" style={S.splitImg} /> */}
              <Placeholder label="before-dashboard.png" aspect="16/10" />
            </div>
            <div style={S.heroDivider}>→</div>
            <div style={S.heroSplitItem}>
              <span style={S.splitLabel}>After</span>
              {/* Replace with: <img src={afterChat} alt="New chat interface" style={S.splitImg} /> */}
              <Placeholder label="after-chat.png" aspect="16/10" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════════ */}
      <section style={S.section}>
        <FadeIn>
          <div style={S.twoCol}>
            <div>
              <Eyebrow>The Product</Eyebrow>
              <h2 style={S.sectionTitle}>What is AutoText AI?</h2>
            </div>
            <div>
              <p style={S.body}>
                AutoText AI is an AI-powered social media marketing platform built for
                freelancers, agencies, and brands. It generates content, designs visuals,
                and schedules posts across Instagram, Facebook, and LinkedIn — all from
                a single workspace. Over 10,000 users rely on it to run their social presence.
              </p>
              <p style={S.body} style={{ marginTop: 16 }}>
                I joined as a UI/UX Design Intern and was tasked with diagnosing
                why users weren't converting, and redesigning the core creation flow.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div style={S.divider} />

      {/* ══════════════════════════════════════════════
          THE PROBLEM
      ══════════════════════════════════════════════ */}
      <section style={S.section}>
        <FadeIn>
          <Eyebrow>The Problem</Eyebrow>
          <h2 style={S.sectionTitle}>
            Users had to navigate before<br />they could create.
          </h2>
          <p style={S.bodyWide}>
            The original interface forced users through a series of decisions — platform, content type,
            parameters — before ever reaching the actual AI prompt. By the time they got there,
            the friction had already done its damage. Drop-off happened before a single word was written.
          </p>
        </FadeIn>

        {/* Old flow steps */}
        <FadeIn delay={0.1}>
          <div style={S.flowSteps}>
            {["Land on Dashboard", "Navigate to Quick Post", "Open AutoDesign", "Set parameters", "Finally — the prompt"].map((step, i) => (
              <div key={i} style={S.flowStep}>
                <span style={S.flowNum}>0{i + 1}</span>
                <span style={S.flowText}>{step}</span>
                {i < 4 && <span style={S.flowArrow}>→</span>}
              </div>
            ))}
          </div>
          <p style={{ ...S.body, color: "#e84040", marginTop: 12, fontSize: 13 }}>
            5 steps to reach what should be step 1.
          </p>
        </FadeIn>

        {/* Annotated before screenshots */}
        <FadeIn delay={0.15}>
          <div style={S.screenshotGrid}>
            <div>
              <p style={S.screenshotLabel}>Dashboard — Entry point</p>
              <div style={{ position: "relative" }}>
                {/* Replace with: <img src={beforeDashboard} style={S.screenImg} alt="Before dashboard" /> */}
                <Placeholder label="before-dashboard.png" aspect="16/9" />
                <Dot n="1" top="18%" left="8%" label="Sidebar forces navigation before creation" />
                <Dot n="2" top="42%" left="30%" label="Metric cards with zero data on a fresh session" />
                <Dot n="3" top="70%" left="20%" label="Queue table — empty, no direction for new users" />
              </div>
            </div>
            <div>
              <p style={S.screenshotLabel}>Quick Post — 2 clicks in</p>
              <div style={{ position: "relative" }}>
                {/* Replace with: <img src={beforeQuickPost} style={S.screenImg} alt="Before quick post" /> */}
                <Placeholder label="before-quickpost.png" aspect="16/9" />
                <Dot n="1" top="20%" left="55%" label="Preview pane crowds the writing area" />
                <Dot n="2" top="75%" left="10%" label="Upload / AutoDesign split forces another choice" />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <div style={S.divider} />

      {/* ══════════════════════════════════════════════
          RESEARCH & PROCESS
      ══════════════════════════════════════════════ */}
      <section style={S.section}>
        <FadeIn>
          <Eyebrow>Research & Process</Eyebrow>
          <h2 style={S.sectionTitle}>Finding the real friction.</h2>
          <p style={S.bodyWide}>
            Before wireframes, I mapped the existing user journey end-to-end, identified
            every decision point, and asked: which of these does the user actually want to make?
            Most didn't. They were system decisions masquerading as user choices.
          </p>
        </FadeIn>

        {/* Insights */}
        <FadeIn delay={0.1}>
          <div style={S.insightGrid}>
            {[
              { n: "01", title: "Navigation ≠ Value", body: "Every sidebar click was a task the user didn't come here to do. They came to create content." },
              { n: "02", title: "Prompt is the product", body: "The AI prompt box was the core action. Everything else — platform, tone, image — is a parameter of that action." },
              { n: "03", title: "Chat is the pattern", body: "Claude, ChatGPT, Gemini — users already understand the chat-first model. Meeting them there removes learning curve entirely." },
            ].map((ins) => (
              <div key={ins.n} style={S.insightCard}>
                <span style={S.insightNum}>{ins.n}</span>
                <h3 style={S.insightTitle}>{ins.title}</h3>
                <p style={S.insightBody}>{ins.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Hand-drawn wireframes */}
        <FadeIn delay={0.1}>
          <p style={{ ...S.screenshotLabel, marginTop: 56 }}>Early exploration — hand-drawn wireframes</p>
          <div style={S.wireframeGrid}>
            {/* Replace with: <img src={wireframe1} style={S.wireImg} alt="Wireframe 1" /> */}
            <Placeholder label="wireframe-1.jpg  (add your hand-drawn scan here)" aspect="4/3" dim />
            {/* Replace with: <img src={wireframe2} style={S.wireImg} alt="Wireframe 2" /> */}
            <Placeholder label="wireframe-2.jpg  (add your hand-drawn scan here)" aspect="4/3" dim />
          </div>
        </FadeIn>
      </section>

      <div style={S.divider} />

      {/* ══════════════════════════════════════════════
          THE INSIGHT / PIVOT
      ══════════════════════════════════════════════ */}
      <section style={S.insightBreak}>
        <FadeIn>
          <p style={S.insightBreakEyebrow}>The Reframe</p>
          <blockquote style={S.pullQuote}>
            "What if the prompt was the product?<br />
            Everything else is just a parameter."
          </blockquote>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          THE REDESIGN
      ══════════════════════════════════════════════ */}
      <section style={S.section}>
        <FadeIn>
          <Eyebrow>The Redesign</Eyebrow>
          <h2 style={S.sectionTitle}>Chat-first. Everything within reach.</h2>
          <p style={S.bodyWide}>
            The new interface puts users directly in creation mode the moment they log in.
            No navigation. No setup. The prompt bar is centered — the way it should be —
            with platform toggles, model selection, and quick suggestions all within the chat context.
          </p>
        </FadeIn>

        {/* After screens — full width, stacked with captions */}
        <FadeIn delay={0.1}>
          <div style={S.afterStack}>

            <div style={S.afterItem}>
              <div style={S.afterMeta}>
                <span style={S.afterTag}>Home · Chat Interface</span>
                <p style={S.afterCaption}>
                  Users land directly on the prompt. The AutoText logo centers the experience.
                  Suggestion cards below guide first-time users without forcing a choice.
                </p>
              </div>
              {/* Replace with: <img src={afterChat} style={S.afterImg} alt="New chat interface" /> */}
              <Placeholder label="after-chat.png" aspect="16/8" />
            </div>

            <div style={S.afterItem}>
              <div style={S.afterMeta}>
                <span style={S.afterTag}>Platform Selection — inline</span>
                <p style={S.afterCaption}>
                  Platform, tone, and image options expand contextually inside the chat bar.
                  Zero navigation required. The decision happens at the point of creation.
                </p>
              </div>
              {/* Replace with: <img src={afterChatExpanded} style={S.afterImg} alt="Chat expanded with platform options" /> */}
              <Placeholder label="after-chat-expanded.png" aspect="16/8" />
            </div>

            <div style={S.afterItem}>
              <div style={S.afterMeta}>
                <span style={S.afterTag}>Media Generator — redesigned</span>
                <p style={S.afterCaption}>
                  The image and video generation tool was rebuilt to match the same language —
                  prompt-first, parameters secondary. Tabs replaced the modal stack.
                </p>
              </div>
              {/* Replace with: <img src={afterMediaGen} style={S.afterImg} alt="Redesigned media generator" /> */}
              <Placeholder label="after-mediagen.png" aspect="16/8" />
            </div>

          </div>
        </FadeIn>
      </section>

      <div style={S.divider} />

      {/* ══════════════════════════════════════════════
          OUTCOME
      ══════════════════════════════════════════════ */}
      <section style={S.section}>
        <FadeIn>
          <Eyebrow>Outcome</Eyebrow>
          <h2 style={S.sectionTitle}>Shipped. Implemented.</h2>
          <p style={S.bodyWide}>
            The redesigned platform UI and the AutoText marketing landing page were both
            revamped based on this direction. The dev team implemented the new interface,
            reducing the path to first content creation from 5 steps to 1.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={S.outcomeGrid}>
            <div style={S.outcomeCard}>
              <span style={S.outcomeStat}>5 → 1</span>
              <p style={S.outcomeLabel}>Steps to reach the prompt</p>
            </div>
            <div style={S.outcomeCard}>
              <span style={S.outcomeStat}>2</span>
              <p style={S.outcomeLabel}>Major surfaces redesigned — platform UI & landing page</p>
            </div>
            <div style={S.outcomeCard}>
              <span style={S.outcomeStat}>4 mo</span>
              <p style={S.outcomeLabel}>Research → wireframes → Figma prototype → handoff</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div style={S.divider} />

      {/* ══════════════════════════════════════════════
          LEARNINGS
      ══════════════════════════════════════════════ */}
      <section style={S.section}>
        <FadeIn>
          <Eyebrow>What I learnt</Eyebrow>
          <div style={S.learningsGrid}>
            {[
              { title: "Navigation is a symptom.", body: "When users are lost, the instinct is to add better navigation. The real question is: why are they navigating at all?" },
              { title: "Familiar patterns earn trust.", body: "Chat-first wasn't a trend choice — it was a trust choice. Users already knew the model. Designing with it removed onboarding entirely." },
              { title: "The handoff is part of design.", body: "Shipping this taught me that a prototype means nothing if the intent isn't documented. I learned to write design rationale, not just deliver files." },
            ].map((l, i) => (
              <div key={i} style={S.learningItem}>
                <h3 style={S.learningTitle}>{l.title}</h3>
                <p style={S.learningBody}>{l.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════════════ */}
      <section style={S.footerCta}>
        <FadeIn>
          <p style={S.footerEyebrow}>That's a wrap on this one.</p>
          <h2 style={S.footerTitle}>Want to see what else I've built?</h2>
          <div style={S.footerLinks}>
            <a href="/" style={S.ctaBtn}>← Back to Portfolio</a>
            <a href="mailto:manish@example.com" style={S.ctaGhost}>Get in touch</a>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    background: "#09090f",
    color: "#e8e8e8",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, sans-serif",
    WebkitFontSmoothing: "antialiased",
  },

  // Nav
  nav: {
    padding: "24px 48px",
    borderBottom: "1px solid #14141c",
  },
  navLink: {
    color: "#555",
    textDecoration: "none",
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.02em",
    transition: "color 0.2s",
  },

  // Hero
  hero: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "96px 48px 80px",
  },
  heroEyebrow: {
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#444",
    fontFamily: "'Inter', sans-serif",
    marginBottom: 28,
  },
  heroHeadline: {
    fontSize: "clamp(42px, 6vw, 80px)",
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: "#f0f0ee",
    margin: "0 0 24px",
    fontFamily: "'Inter', sans-serif",
  },
  heroAccent: {
    color: "#3B6BF7",
  },
  heroSub: {
    fontSize: 18,
    lineHeight: 1.65,
    color: "#888",
    maxWidth: 600,
    margin: "0 0 36px",
    fontFamily: "'Inter', sans-serif",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 64,
  },
  heroSplit: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: 20,
    alignItems: "center",
  },
  heroSplitItem: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  splitLabel: {
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#444",
    fontFamily: "'Inter', sans-serif",
  },
  splitImg: {
    width: "100%",
    borderRadius: 12,
    border: "1px solid #1e1e2a",
  },
  heroDivider: {
    fontSize: 28,
    color: "#2a2a38",
    fontWeight: 300,
    padding: "0 8px",
    marginTop: 24,
  },

  // Sections
  section: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "80px 48px",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 3.5vw, 48px)",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    color: "#f0f0ee",
    lineHeight: 1.15,
    margin: "0 0 24px",
    fontFamily: "'Inter', sans-serif",
  },
  body: {
    fontSize: 16,
    lineHeight: 1.75,
    color: "#888",
    fontFamily: "'Inter', sans-serif",
    margin: 0,
  },
  bodyWide: {
    fontSize: 17,
    lineHeight: 1.75,
    color: "#888",
    maxWidth: 680,
    fontFamily: "'Inter', sans-serif",
    marginBottom: 52,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: 64,
    alignItems: "start",
  },

  // Divider
  divider: {
    maxWidth: 1100,
    margin: "0 auto",
    height: 1,
    background: "#13131b",
  },

  // Flow steps
  flowSteps: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    margin: "36px 0 8px",
  },
  flowStep: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  flowNum: {
    fontSize: 10,
    color: "#e84040",
    fontFamily: "monospace",
    fontWeight: 700,
  },
  flowText: {
    fontSize: 14,
    color: "#ccc",
    fontFamily: "'Inter', sans-serif",
    background: "#13131c",
    border: "1px solid #1e1e2a",
    padding: "6px 14px",
    borderRadius: 6,
  },
  flowArrow: {
    color: "#2a2a38",
    fontSize: 16,
  },

  // Screenshot grid
  screenshotGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 28,
    marginTop: 48,
  },
  screenshotLabel: {
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#444",
    fontFamily: "'Inter', sans-serif",
    marginBottom: 12,
  },
  screenImg: {
    width: "100%",
    borderRadius: 12,
    border: "1px solid #1e1e2a",
    display: "block",
  },

  // Insight cards
  insightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 48,
  },
  insightCard: {
    background: "#0f0f17",
    border: "1px solid #1a1a24",
    borderRadius: 12,
    padding: "28px 24px",
  },
  insightNum: {
    display: "block",
    fontSize: 10,
    color: "#3B6BF7",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#e8e8e8",
    fontFamily: "'Inter', sans-serif",
    margin: "0 0 10px",
  },
  insightBody: {
    fontSize: 14,
    lineHeight: 1.65,
    color: "#666",
    fontFamily: "'Inter', sans-serif",
    margin: 0,
  },

  // Wireframe grid
  wireframeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  wireImg: {
    width: "100%",
    borderRadius: 12,
    border: "1px solid #1e1e2a",
  },

  // Pull quote break
  insightBreak: {
    background: "#0c0c14",
    borderTop: "1px solid #13131b",
    borderBottom: "1px solid #13131b",
    padding: "80px 48px",
    textAlign: "center",
  },
  insightBreakEyebrow: {
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#3B6BF7",
    fontFamily: "'Inter', sans-serif",
    marginBottom: 24,
  },
  pullQuote: {
    fontSize: "clamp(22px, 3vw, 38px)",
    fontWeight: 600,
    color: "#e8e8e8",
    lineHeight: 1.4,
    letterSpacing: "-0.02em",
    fontFamily: "'Inter', sans-serif",
    fontStyle: "normal",
    margin: "0 auto",
    maxWidth: 700,
  },

  // After screens
  afterStack: {
    display: "flex",
    flexDirection: "column",
    gap: 64,
    marginTop: 16,
  },
  afterItem: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  afterMeta: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  afterTag: {
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#3B6BF7",
    fontFamily: "'Inter', sans-serif",
  },
  afterCaption: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "#666",
    fontFamily: "'Inter', sans-serif",
    maxWidth: 560,
    margin: 0,
  },
  afterImg: {
    width: "100%",
    borderRadius: 14,
    border: "1px solid #1e1e2a",
    display: "block",
  },

  // Outcome
  outcomeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 48,
  },
  outcomeCard: {
    background: "#0f0f17",
    border: "1px solid #1a1a24",
    borderRadius: 12,
    padding: "32px 28px",
  },
  outcomeStat: {
    display: "block",
    fontSize: 40,
    fontWeight: 700,
    color: "#3B6BF7",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.03em",
    marginBottom: 8,
  },
  outcomeLabel: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#666",
    fontFamily: "'Inter', sans-serif",
    margin: 0,
  },

  // Learnings
  learningsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 40,
  },
  learningItem: {
    borderTop: "1px solid #1a1a24",
    paddingTop: 24,
  },
  learningTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#e0e0e0",
    fontFamily: "'Inter', sans-serif",
    margin: "0 0 10px",
  },
  learningBody: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#666",
    fontFamily: "'Inter', sans-serif",
    margin: 0,
  },

  // Footer CTA
  footerCta: {
    textAlign: "center",
    padding: "100px 48px 80px",
    borderTop: "1px solid #13131b",
  },
  footerEyebrow: {
    fontSize: 13,
    color: "#444",
    fontFamily: "'Inter', sans-serif",
    marginBottom: 16,
    letterSpacing: "0.04em",
  },
  footerTitle: {
    fontSize: "clamp(28px, 4vw, 52px)",
    fontWeight: 700,
    color: "#f0f0ee",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.025em",
    margin: "0 0 40px",
  },
  footerLinks: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaBtn: {
    display: "inline-block",
    padding: "14px 28px",
    background: "#3B6BF7",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
  },
  ctaGhost: {
    display: "inline-block",
    padding: "14px 28px",
    border: "1px solid #2a2a38",
    color: "#888",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
  },
};