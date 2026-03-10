import { useState, useEffect } from "react"
import { meta, navLinks } from "../data/content"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between transition-all duration-400"
      style={{
        padding: "0 clamp(20px, 5vw, 64px)",
        background: scrolled ? "rgba(2,2,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(61,126,255,0.1)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 1px 40px rgba(61,126,255,0.05)"
          : "none",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        data-cursor="HOME"
        className="font-display font-bold text-[15px] text-text flex items-center gap-[10px]"
      >
        <span
          className="w-[7px] h-[7px] rounded-full bg-blue flex-shrink-0 animate-glow-pulse"
          style={{
            boxShadow: "0 0 8px #3d7eff, 0 0 18px rgba(61,126,255,0.6)",
          }}
        />
        {meta.name}
      </Link>

      {/* Links */}
      <div className="flex items-center gap-7">
        {navLinks.map((link) =>
          link.href.startsWith("#") ? (
            <a
              key={link.label}
              href={link.href}
              data-cursor="GO"
              className="font-mono text-[10px] text-mid tracking-[0.12em] uppercase transition-colors duration-200 hover:text-text"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              data-cursor="GO"
              className="font-mono text-[10px] text-mid tracking-[0.12em] uppercase transition-colors duration-200 hover:text-text"
            >
              {link.label}
            </Link>
          )
        )}

        {/* Open to Work */}
        <a
          href={`mailto:${meta.email}`}
          data-cursor="MAIL"
          className="flex items-center gap-[7px] font-mono text-[9px] tracking-[0.12em] uppercase transition-all duration-200"
          style={{
            padding: "7px 15px",
            background: "rgba(61,126,255,0.1)",
            border: "1px solid rgba(61,126,255,0.28)",
            borderRadius: "6px",
            color: "#6b9fff",
            boxShadow: "0 0 16px rgba(61,126,255,0.07)",
          }}
        >
          <span
            className="w-[5px] h-[5px] rounded-full flex-shrink-0 animate-pulse-dot"
            style={{
              background: "#00ff88",
              boxShadow: "0 0 6px rgba(0,255,136,0.9)",
            }}
          />
          Open to Work
        </a>
      </div>
    </nav>
  )
}
