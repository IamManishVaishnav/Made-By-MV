import { useCursor } from '../hooks/useCursor'

export default function Cursor() {
  const { dotRef, ringRef } = useCursor()

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
      {/* small dot — snaps instantly */}
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
      {/* ring — lerps, fills + inverts on hover */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width:        '36px',
          height:       '36px',
          borderRadius: '50%',
          border:       '1.5px solid rgba(255,255,255,0.5)',
          mixBlendMode: "color-dodge" ,
          transition:   'width 0.2s cubic-bezier(0.22,1,0.36,1), height 0.2s cubic-bezier(0.22,1,0.36,1), border-radius 0.2s cubic-bezier(0.22,1,0.36,1), background 0.15s ease, border 0.15s ease',
        }}
      />
    </>
  )
}