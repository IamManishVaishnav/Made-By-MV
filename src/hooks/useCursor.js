import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef   = useRef(null)
  const labelRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const cur = useRef({ x: -200, y: -200 })
  const raf = useRef(null)

  useEffect(() => {
    const dot   = dotRef.current
    const label = labelRef.current
    if (!dot || !label) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const target = e.target.closest('[data-cursor]')
      const type   = target ? target.dataset.cursor : ''
      label.textContent = type
      label.style.opacity = type ? '1' : '0'
      dot.style.width  = type ? '7px' : '5px'
      dot.style.height = type ? '7px' : '5px'
    }

    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.11
      cur.current.y += (pos.current.y - cur.current.y) * 0.11
      dot.style.transform   = `translate(${cur.current.x - 3}px, ${cur.current.y - 3}px)`
      label.style.transform = `translate(${cur.current.x + 12}px, ${cur.current.y - 8}px)`
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return { dotRef, labelRef }
}
