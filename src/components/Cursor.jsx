import { useCursor } from '../hooks/useCursor'

export default function Cursor() {
  const { dotRef, labelRef } = useCursor()

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '5px', height: '5px', borderRadius: '50%',
          background: '#3d7eff',
          boxShadow: '0 0 8px #3d7eff, 0 0 18px rgba(61,126,255,0.5)',
          pointerEvents: 'none', zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
      <div
        ref={labelRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          fontFamily: '"Geist Mono", monospace',
          fontSize: '9px', letterSpacing: '0.15em',
          color: '#00e5ff', textTransform: 'uppercase',
          pointerEvents: 'none', zIndex: 99999,
          opacity: 0, transition: 'opacity 0.15s',
          willChange: 'transform', whiteSpace: 'nowrap',
        }}
      />
    </>
  )
}
