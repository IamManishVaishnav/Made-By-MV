/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#020208',
        surface: '#05060e',
        card:    '#080a14',
        blue:    '#6eb3ff',
        'blue-b':'#6b9fff',
        cyan:    '#00e5ff',
        green:   '#00ff88',
        text:    '#dde4ff',
        mid:     '#5a6490',
        dim:     '#1e2440',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body:    ['Manrope', 'sans-serif'],
        mono:    ['"Geist Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 16px rgba(61,126,255,0.35)',
        'glow':    '0 0 28px rgba(61,126,255,0.45), 0 4px 16px rgba(61,126,255,0.3)',
        'glow-lg': '0 0 48px rgba(61,126,255,0.65), 0 6px 24px rgba(61,126,255,0.4)',
        'card':    '0 20px 48px rgba(0,0,0,0.5), 0 0 40px rgba(61,126,255,0.08)',
      },
      animation: {
        'fade-up':   'fadeUp .7s ease both',
        'fade-in':   'fadeIn .8s ease both',
        'ticker':    'ticker 28s linear infinite',
        'pulse-dot': 'pulseDot 2s infinite',
        'glow-pulse':'glowPulse 2.5s infinite',
        'scan':      'scan 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp:    { from:{ opacity:'0', transform:'translateY(30px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:    { from:{ opacity:'0' }, to:{ opacity:'1' } },
        ticker:    { from:{ transform:'translateX(0)' }, to:{ transform:'translateX(-50%)' } },
        pulseDot:  { '0%,100%':{ opacity:'1', transform:'scale(1)' }, '50%':{ opacity:'.35', transform:'scale(.6)' } },
        glowPulse: { '0%,100%':{ opacity:'.5' }, '50%':{ opacity:'1' } },
        scan:      { from:{ top:'-2px' }, to:{ top:'100%' } },
        slideUp:   { from:{ opacity:'0', transform:'translateY(48px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        slideDown: { from:{ opacity:'1', transform:'translateY(0)' }, to:{ opacity:'0', transform:'translateY(-48px)' } },
      },
    },
  },
  plugins: [],
}
