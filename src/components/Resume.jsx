import { Link } from 'react-router-dom'

const meta = {
  name:     'Manish Vaishnav',
  role:     'UI/UX Product Designer',
  email:    'manish.uiux02@gmail.com',
  phone:    '+91 79765 36393',
  location: 'Jaipur',
  github:   'IamManishVaishnav',
  linkedin: 'Manish Vaishnav',
  portfolio:'madebymv',
}

const ACCENT  = '#5a9fff'
const BG      = '#020208'
const SURFACE = '#06070f'
const CARD    = '#08090f'
const BORDER  = 'rgba(255,255,255,0.06)'
const TEXT    = '#dde4ff'
const MUTED   = 'rgba(221,228,255,0.5)'
const DIMMED  = 'rgba(221,228,255,0.28)'

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>{title}</span>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${ACCENT}44, transparent)` }} />
      </div>
      {children}
    </div>
  )
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily:   'Geist Mono, monospace',
      fontSize:     '9px',
      padding:      '3px 9px',
      borderRadius: '4px',
      background:   'rgba(90,159,255,0.07)',
      border:       '1px solid rgba(90,159,255,0.15)',
      color:        ACCENT,
      whiteSpace:   'nowrap',
    }}>
      {children}
    </span>
  )
}

export default function Resume() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Manrope, sans-serif' }}>

      {/* top bar */}
      <div style={{
        position:       'sticky',
        top:            0,
        zIndex:         50,
        background:     'rgba(2,2,8,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom:   `1px solid ${BORDER}`,
        padding:        '14px clamp(16px,5vw,64px)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            '12px',
        flexWrap:       'wrap',
      }}>
        <Link to="/" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none' }}>
          ← Back to Portfolio
        </Link>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '10px', color: DIMMED, letterSpacing: '0.1em' }}>
            Manish Vaishnav — Resume
          </span>
          <a
            href="/resume.pdf"
            download
            style={{
              fontFamily:     'Manrope, sans-serif',
              fontSize:       '11px',
              fontWeight:     600,
              letterSpacing:  '0.06em',
              textTransform:  'uppercase',
              padding:        '8px 20px',
              background:     ACCENT,
              borderRadius:   '6px',
              color:          '#020208',
              textDecoration: 'none',
              boxShadow:      '0 0 16px rgba(90,159,255,0.3)',
              whiteSpace:     'nowrap',
            }}
          >
            Download PDF ↓
          </a>
        </div>
      </div>

      {/* main */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(16px,5vw,48px)' }}>

        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', paddingBottom: '28px', borderBottom: `1px solid ${BORDER}` }}>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, color: TEXT, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: '6px' }}>
            {meta.name}
          </h1>
          <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
            {meta.role}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 16px', fontFamily: 'Geist Mono, monospace', fontSize: '10px', color: MUTED }}>
            <a href={`https://madebymv.xyz`} style={{ color: ACCENT, textDecoration: 'none' }}>madebymv.xyz</a>
            <span>·</span>
            <a href={`https://github.com/IamManishVaishnav`} target="_blank" rel="noopener noreferrer" style={{ color: MUTED, textDecoration: 'none' }}>github/IamManishVaishnav</a>
            <span>·</span>
            <a href={`https://linkedin.com/in/manish-vaishnav`} target="_blank" rel="noopener noreferrer" style={{ color: MUTED, textDecoration: 'none' }}>linkedin/manish-vaishnav</a>
            <span>·</span>
            <a href="mailto:manish.uiux02@gmail.com" style={{ color: MUTED, textDecoration: 'none' }}>{meta.email}</a>
            <span>·</span>
            <span>{meta.phone}</span>
            <span>·</span>
            <span>{meta.location}</span>
          </div>
        </div>

        {/* summary */}
        <Section title="Summary">
          <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, maxWidth: '720px' }}>
            Final-year CSE student bridging UI/UX design and frontend development, with expertise in React.js, Next.js, Node.js, and Tailwind CSS. Proven experience delivering user-centric web applications in collaborative, real-world environments.
          </p>
        </Section>

        {/* two col */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '0 40px' }}>

          {/* LEFT */}
          <div>

            {/* experience */}
            <Section title="Professional Experience">
              {[
                {
                  role:    'UI/UX Design Trainee',
                  company: 'AutoText AI',
                  period:  'June 2025 – Oct 2025',
                  points:  [
                    'Transformed the outdated dashboard into a modern, chat-first AI interface, enhancing navigation, usability, and task flow by adopting familiar messaging-based interactions.',
                    'Conducted user interviews and usability testing to identify navigation pain points and iterate on design solutions.',
                  ],
                },
                {
                  role:    'Product Design Intern',
                  company: 'Growwth Media',
                  period:  'Mar 2024 – Jan 2025',
                  points:  [
                    'Designed visually consistent social media creatives aligned with each brand\'s identity, values, and tone, focusing on performance-driven storytelling across Instagram.',
                    'Contributed to a 50% increase in audience engagement and a 35% boost in ad reach, supporting digital growth for businesses.',
                  ],
                },
              ].map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px', padding: '16px 18px', background: CARD, borderRadius: '10px', border: `1px solid ${BORDER}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: TEXT }}>{exp.role}</span>
                      <span style={{ fontSize: '13px', color: ACCENT, marginLeft: '8px' }}>@ {exp.company}</span>
                    </div>
                    <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', color: DIMMED }}>{exp.period}</span>
                  </div>
                  <ul style={{ paddingLeft: '14px', margin: 0 }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ fontSize: '12px', color: MUTED, lineHeight: 1.75, marginBottom: '4px' }}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            {/* projects */}
            <Section title="Selected Projects">
              {[
                {
                  title:  'Feedback Analyzer',
                  sub:    'AI Sentiment Dashboard',
                  stack:  'React.js · Node.js · Express · Chart.js',
                  points: [
                    'Developed a full-stack dashboard that analyzes and visualizes customer sentiment using AI, helping businesses prioritize key feedback.',
                    'Reduced manual feedback analysis time by 40%, enabling faster decisions with clear data-driven insights.',
                  ],
                },
                {
                  title:  'Moodsy',
                  sub:    'Chrome Extension',
                  stack:  'JavaScript · Chrome API · HTML/CSS',
                  points: [
                    'Built Moodsy to solve the problem of managing inspirations from multiple platforms by saving and organizing them in folders.',
                    'Developed an integrated Moodboard generator to curate and export collections, streamlining the creative process.',
                  ],
                },
                {
                  title:  'ArtPilot',
                  sub:    'Text-to-Illustration Generator',
                  stack:  'React.js · Tailwind CSS · OpenAI API · Vite',
                  points: [
                    'Built a frontend web app that converts user prompts into AI-generated illustrations with clean UI and smooth interaction.',
                    'Achieved an 85% task success rate in user testing by implementing a clean UI, fast loading, and mobile-first experience.',
                  ],
                },
              ].map((proj, i) => (
                <div key={i} style={{ marginBottom: '16px', padding: '14px 16px', background: CARD, borderRadius: '10px', border: `1px solid ${BORDER}` }}>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: TEXT }}>{proj.title}</span>
                    <span style={{ fontSize: '11px', color: MUTED, marginLeft: '8px' }}>{proj.sub}</span>
                  </div>
                  <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', color: DIMMED, marginBottom: '8px', letterSpacing: '0.04em' }}>{proj.stack}</p>
                  <ul style={{ paddingLeft: '14px', margin: 0 }}>
                    {proj.points.map((p, j) => (
                      <li key={j} style={{ fontSize: '12px', color: MUTED, lineHeight: 1.7, marginBottom: '3px' }}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

          </div>

          {/* RIGHT */}
          <div>

            {/* skills */}
            <Section title="Skills">
              {[
                { label: 'Design & UX',           items: ['User Research', 'Wireframing', 'User Flows', 'Prototyping', 'Usability Testing', 'Design Systems', 'Accessibility'] },
                { label: 'Design Tools',           items: ['Figma', 'Adobe Suite'] },
                { label: 'Frontend',               items: ['React.js', 'Next.js', 'Tailwind CSS'] },
                { label: 'Backend & Databases',    items: ['Node.js', 'Express.js', 'SQL'] },
                { label: 'Programming Languages',  items: ['JavaScript', 'Python', 'C++', 'Java'] },
              ].map((group, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', color: DIMMED, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>{group.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {group.items.map((item, j) => <Tag key={j}>{item}</Tag>)}
                  </div>
                </div>
              ))}
            </Section>

            {/* education */}
            <Section title="Education">
              {[
                { degree: 'B.Tech (CSE)', inst: 'Poornima Institute of Engineering & Technology, Jaipur', year: '2022–2026', score: '9.1 / 10.0' },
                { degree: 'Senior Secondary (XII)', inst: 'Apna Vidhyalaya, Jodhpur', year: '2021', score: '98.83%' },
              ].map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px', padding: '12px 16px', background: CARD, borderRadius: '8px', border: `1px solid ${BORDER}` }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: TEXT, marginBottom: '3px' }}>{edu.degree}</div>
                  <div style={{ fontSize: '11px', color: MUTED, marginBottom: '6px', lineHeight: 1.5 }}>{edu.inst}</div>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', color: DIMMED }}>{edu.year}</span>
                    <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', color: ACCENT }}>{edu.score}</span>
                  </div>
                </div>
              ))}
            </Section>

            {/* achievements */}
            <Section title="Achievements">
              {['AWS Community Award 2023 — Above & Beyond', 'AWS Community Award 2024 — Best Contributor'].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color: ACCENT, fontSize: '10px' }}>🏆</span>
                  <span style={{ fontSize: '12px', color: MUTED }}>{a}</span>
                </div>
              ))}
            </Section>

            {/* volunteer */}
            <Section title="Volunteer / Extra-Curricular">
              {['WIT Conf Jaipur 2024', 'AWS Community Day Rajasthan 2023 & 2024', 'API Day Jaipur 2023', "Students' Council Captain", 'GDSC PCE Core Team Member', 'IDEA Lab Ambassador / Advisory'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
                  <span style={{ color: 'rgba(90,159,255,0.4)', fontSize: '8px' }}>◈</span>
                  <span style={{ fontSize: '12px', color: MUTED }}>{item}</span>
                </div>
              ))}
            </Section>

            {/* additional */}
            <Section title="Additional">
              <div style={{ fontSize: '12px', color: MUTED, lineHeight: 1.8 }}>
                <div><span style={{ color: DIMMED, fontFamily: 'Geist Mono, monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Languages</span><br />English, Hindi</div>
                <div style={{ marginTop: '8px' }}><span style={{ color: DIMMED, fontFamily: 'Geist Mono, monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Interests</span><br />Digital Art, Travel and Culture</div>
              </div>
            </Section>

          </div>
        </div>

        {/* bottom */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '9px', color: DIMMED }}>© 2025 Manish Vaishnav</span>
          <a
            href="/resume.pdf"
            download
            style={{
              fontFamily:     'Manrope, sans-serif',
              fontSize:       '11px',
              fontWeight:     600,
              letterSpacing:  '0.06em',
              textTransform:  'uppercase',
              padding:        '8px 20px',
              background:     ACCENT,
              borderRadius:   '6px',
              color:          '#020208',
              textDecoration: 'none',
              boxShadow:      '0 0 16px rgba(90,159,255,0.3)',
            }}
          >
            Download PDF ↓
          </a>
        </div>

      </div>
    </div>
  )
}