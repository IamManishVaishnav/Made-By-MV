import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { meta, navLinks } from '../data/content'

const MOBILE_TABS = [
  { label: 'Work',    href: '/#projects', icon: '◈' },
  { label: 'About',   href: '/#about',    icon: '◎' },
  { label: 'Archive', href: '/archive',   icon: '⊞' },
  { label: 'Contact', href: '/#contact',  icon: '◇' },
]

const DOT = ({ size = 7, color = '#5a9fff', glow = true }) => (
  <span
    style={{
      display:      'inline-block',
      width:        size,
      height:       size,
      borderRadius: '50%',
      background:   color,
      flexShrink:   0,
      boxShadow:    glow ? `0 0 8px ${color}` : 'none',
      animation:    glow ? 'glowPulse 2.5s infinite' : 'none',
    }}
  />
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location                = useLocation()
  const navigate                = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollToHash = useCallback((hash) => {
    // small delay so DOM is ready after navigation
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }, [])

  const handleHashNav = useCallback((e, href) => {
    e.preventDefault()
    const hash = href.split('#')[1]
    if (!hash) return
    if (location.pathname !== '/') {
      navigate('/')
      // wait for home page to mount then scroll
      setTimeout(() => scrollToHash(hash), 120)
    } else {
      scrollToHash(hash)
    }
  }, [location.pathname, navigate, scrollToHash])

  const isHash     = (href) => href.includes('#')
  const isActive   = (href) => {
    if (href === '/archive') return location.pathname === '/archive'
    if (href === '/quotes')  return location.pathname === '/quotes'
    return false
  }

  // renders either a hash anchor or a router Link
  const NavLink = ({ href, children, className, style, onMouseEnter, onMouseLeave, dataCursor }) => {
    const shared = { className, style, 'data-cursor': dataCursor }
    if (isHash(href)) {
      return (
        <a href={href} onClick={e => handleHashNav(e, href)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...shared}>
          {children}
        </a>
      )
    }
    return (
      <Link to={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...shared}>
        {children}
      </Link>
    )
  }

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[64px] hidden md:flex items-center justify-between transition-all duration-300"
        style={{
          padding:        '0 clamp(20px,5vw,64px)',
          background:     scrolled ? 'rgba(2,2,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.6)' : 'none',
          borderBottom:   scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          data-cursor="HOME"
          className="font-display font-bold text-[15px] flex items-center gap-[10px]"
          style={{ textDecoration: 'none', color: '#dde4ff' }}
        >
          <DOT />
          {meta.name}
        </Link>

        {/* Desktop links */}
        <div className="flex items-center gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.label}
              href={link.href}
              dataCursor="GO"
              className="font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            >
              {link.label}
            </NavLink>
          ))}

          {/* CTA */}
          <NavLink
            href="/#contact"
            dataCursor="MAIL"
            className="flex items-center gap-[8px] font-mono text-[10px] tracking-[0.12em] uppercase font-semibold transition-all duration-200"
            style={{
              padding:        '9px 18px',
              background:     '#5a9fff',
              borderRadius:   '7px',
              color:          '#020208',
              boxShadow:      '0 0 20px rgba(90,159,255,0.4)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(90,159,255,0.65)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(90,159,255,0.4)';  e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <DOT size={5} color="#00ff88" glow={false} />
            Open to Work
          </NavLink>
        </div>
      </nav>

      {/* ── MOBILE TOP BAR ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between h-[52px]"
        style={{
          padding:        '0 16px',
          background:     scrolled ? 'rgba(2,2,8,0.92)' : 'rgba(2,2,8,0.65)',
          backdropFilter: 'blur(20px)',
          borderBottom:   '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Link
          to="/"
          className="font-display font-bold text-[14px] flex items-center gap-2"
          style={{ textDecoration: 'none', color: '#dde4ff' }}
        >
          <DOT size={6} />
          {meta.name}
        </Link>

        <NavLink
          href="/#contact"
          className="flex items-center gap-[6px] font-mono text-[9px] tracking-[0.1em] uppercase font-semibold"
          style={{
            padding:        '7px 14px',
            background:     '#5a9fff',
            borderRadius:   '5px',
            color:          '#020208',
            boxShadow:      '0 0 14px rgba(90,159,255,0.4)',
            textDecoration: 'none',
          }}
        >
          <DOT size={4} color="#00ff88" glow={false} />
          Hire Me
        </NavLink>
      </div>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
        style={{
          height:         '60px',
          background:     'rgba(3,4,14,0.96)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          borderTop:      '1px solid rgba(255,255,255,0.07)',
          paddingBottom:  'env(safe-area-inset-bottom)',
        }}
      >
        {MOBILE_TABS.map((tab, i) => {
          const active = isActive(tab.href)
          return (
            <NavLink
              key={i}
              href={tab.href}
              style={{
                textDecoration: 'none',
                flex:           1,
                height:         '100%',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="flex flex-col items-center justify-center gap-[3px] relative w-full h-full"
                style={{ padding: '8px 0' }}
              >
                {/* active top indicator */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
                  style={{
                    width:      active ? '24px' : '0px',
                    height:     '2px',
                    background: '#5a9fff',
                    boxShadow:  active ? '0 0 8px #5a9fff' : 'none',
                    opacity:    active ? 1 : 0,
                  }}
                />
                <span style={{
                  fontSize:   '15px',
                  lineHeight: 1,
                  color:      active ? '#5a9fff' : 'rgba(255,255,255,0.3)',
                  transition: 'color 0.2s',
                }}>
                  {tab.icon}
                </span>
                <span
                  className="font-mono tracking-[0.08em] uppercase"
                  style={{
                    fontSize:   '8px',
                    color:      active ? '#5a9fff' : 'rgba(255,255,255,0.25)',
                    transition: 'color 0.2s',
                  }}
                >
                  {tab.label}
                </span>
              </div>
            </NavLink>
          )
        })}
      </div>

      {/* mobile spacer — prevents content hiding under top bar */}
      <div className="block md:hidden" style={{ height: '52px' }} />
    </>
  )
}