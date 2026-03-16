import { useCursor } from '../hooks/useCursor'

export default function Cursor() {
  const { dotRef, ringRef, labelRef } = useCursor()

  const base = {
    position:      'fixed',
    top:           0,
    left:          0,
    pointerEvents: 'none',
    zIndex:        99999,
    willChange:    'transform',
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          ...base,
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   'white',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...base,
          width:        '36px',
          height:       '36px',
          borderRadius: '50%',
          border:       '1.5px solid rgba(255,255,255,0.5)',
          mixBlendMode: 'exclusion',
          transition:   'background 0.15s ease, border 0.15s ease',
        }}
      />
      <div
        ref={labelRef}
        style={{
          ...base,
          fontFamily:    '"Geist Mono", monospace',
          fontSize:      '9px',
          letterSpacing: '0.18em',
          color:         '#5a9fff',
          textTransform: 'uppercase',
          opacity:       0,
          transition:    'opacity 0.15s ease',
          whiteSpace:    'nowrap',
        }}
      />
    </>
  )
}