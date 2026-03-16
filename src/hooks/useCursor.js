import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const labelRef = useRef(null)
  const pos      = useRef({ x: -200, y: -200 })
  const cur      = useRef({ x: -200, y: -200 })
  const hovEl    = useRef(null)

  useEffect(() => {
    const dot   = dotRef.current
    const ring  = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      hovEl.current = e.target.closest('[data-cursor]') || null
      const type = hovEl.current?.dataset.cursor || ''
      label.textContent = type
      label.style.opacity = type ? '1' : '0'
    }

    let raf
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1
      cur.current.y += (pos.current.y - cur.current.y) * 0.1

      dot.style.transform   = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`
      ring.style.transform  = `translate(${cur.current.x - 18}px, ${cur.current.y - 18}px)`
      label.style.transform = `translate(${cur.current.x + 22}px, ${cur.current.y + 22}px)`

      if (hovEl.current) {
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

  return { dotRef, ringRef, labelRef }
}