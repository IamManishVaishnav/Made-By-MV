import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const cur     = useRef({ x: -200, y: -200 })
  const hovEl   = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      hovEl.current = e.target.closest('[data-cursor]') || null
    }

    let raf
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1
      cur.current.y += (pos.current.y - cur.current.y) * 0.1

      // dot snaps to mouse
      dot.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`
      // ring lerps behind
      ring.style.transform = `translate(${cur.current.x - 18}px, ${cur.current.y - 18}px)`

      if (hovEl.current) {
        // ring stays same size, just fills — mix-blend on a small circle only inverts a small area
        ring.style.background = '#e8e8e8'
        ring.style.border     = 'none'
        dot.style.opacity     = '0'
      } else {
        ring.style.background = 'transparent'
        ring.style.border     = '1.5px solid rgba(255,255,255,0.5)'
        dot.style.opacity     = '1'
      }

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { dotRef, ringRef }
}