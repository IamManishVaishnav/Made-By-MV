# madebymv — Manish Vaishnav Portfolio

## Stack
- React 18 + Vite
- Tailwind CSS v3 (proper install)
- React Router v6
- Google Fonts: Bricolage Grotesque / Manrope / Geist Mono

## Setup

```bash
npm install
npm run dev
```

Open → http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Structure
```
src/
├── components/
│   ├── Cursor.jsx          # Label cursor with lerp
│   ├── DotGrid.jsx         # Reusable dot grid bg
│   ├── SectionLabel.jsx    # Section label with glow line
│   ├── Loader/             # Word cycle loader
│   ├── Navbar/             # Frosted glass navbar
│   ├── Hero/               # Beam + magnetic letters + ticker
│   ├── About/              # 2-col with stats
│   ├── Skills/             # Design + Dev panels
│   ├── Experience/         # Timeline
│   ├── Projects/           # 3-col cards
│   ├── Community/          # Awards + bento grid
│   ├── TheShelf/           # Books + quote
│   └── Footer/             # Blue inverted contact
├── pages/
│   ├── Home.jsx
│   ├── Archive.jsx         # Filterable project archive
│   └── Quotes.jsx          # Fullscreen quote viewer
├── data/
│   └── content.js          # ALL copy — edit here only
├── hooks/
│   ├── useInView.js        # Scroll reveal
│   └── useCursor.js        # Cursor logic
└── styles/
    └── globals.css         # Tailwind base + grain + keyframes
```

## Customisation
- All content → `src/data/content.js`
- Colors → `tailwind.config.js` under `theme.extend.colors`
- Add your photo → replace `public/photo.jpg` and update About component
- Add resume → drop `public/resume.pdf`
