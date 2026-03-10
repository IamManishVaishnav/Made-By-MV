export const meta = {
  name:     'Manish Vaishnav',
  role:     'Designer & Developer',
  location: 'Jaipur, India',
  email:    'manish.uiux02@gmail.com',
  phone:    '+91 79765 36393',
  github:   'https://github.com/IamManishVaishnav',
  linkedin: 'https://linkedin.com/in/manish-vaishnav',
}

export const heroLine = "Most devs can't design. Most designers can't code. I do both."

export const loaderWords = ['DESIGN', 'CODE', 'STRATEGY', 'IMPACT']

export const about = {
  headlineLines: ['Some design.', 'Some code.', 'I do both —', 'and that changes everything.'],
  paragraphs: [
    'Final-year CSE student at Poornima Institute, Jaipur — building at the intersection of design and engineering. I care about how things look, how they work, and why they matter.',
    'My work spans user research, interaction design, and production-ready code. I have shipped real products, won community awards, and led events across Rajasthan.',
    'What sets me apart is nott the tools — it is that I take things from a rough brief all the way to a live, polished product.',
  ],
  stats: [
    { value: '3+', label: 'Internships' },
    { value: '2×', label: 'AWS Awards' },
    { value: '9.1', label: 'CGPA' },
    { value: '4+', label: 'Events Led' },
  ],
}

export const skills = {
  design: {
    label: 'Design',
    tag:   'UX & Visual',
    accent: 'blue',
    items: ['User Research','Wireframing','Prototyping','Design Systems','Usability Testing','Figma','Adobe Suite','Accessibility'],
  },
  dev: {
    label: 'Dev',
    tag:   'Frontend & Backend',
    accent: 'cyan',
    items: ['React.js','Next.js','TypeScript','Tailwind CSS','Node.js','Express.js','SQL','JavaScript'],
  },
}

export const experience = [
  {
    role:    'UI/UX Design Trainee',
    company: 'AutoText AI',
    period:  'Jun – Oct 2025',
    point:   'Redesigned the dashboard into a chat-first AI interface, improving task flow and usability.',
    tags:    ['Figma', 'User Research', 'Prototyping'],
    active:  true,
  },
  {
    role:    'Product Design Intern',
    company: 'Growwth Media',
    period:  'Mar 2024 – Jan 2025',
    point:   'Drove 50% engagement increase and 35% boost in ad reach through performance-driven design.',
    tags:    ['Social Design', 'Brand Identity', 'Figma'],
    active:  false,
  },
  {
    role:    'Graphic Designer',
    company: 'Atmedia',
    period:  '2023',
    point:   'Created brand visuals and campaign assets aligned with client identity.',
    tags:    ['Adobe Suite', 'Brand Design'],
    active:  false,
  },
  {
    role:    'Freelance Graphic Designer',
    company: 'Esports Clients',
    period:  '2021 – 2023',
    point:   'Where it started — designing for esports teams and gaming communities.',
    tags:    ['Illustration', 'Branding'],
    active:  false,
  },
]

export const projects = [
  {
    index:       '01',
    title:       'Tarqa AI',
    subtitle:    'Startup UI Design',
    description: 'End-to-end UI design for an AI startup — from blank canvas to production-ready screens.',
    tags:        ['UI/UX', 'Figma', 'Design System'],
    category:    'UI/UX',
    year:        '2025',
    link:        '/work/tarqa',
    caseStudy:   true,
    featured: true,
  },
  {
    index:       '02',
    title:       'MentalXP',
    subtitle:    'Full Stack Web App',
    description: 'Final year project — a mental health platform built full stack, live on Vercel.',
    tags:        ['React.js', 'Node.js', 'MongoDB'],
    category:    'Development',
    year:        '2025',
    link:        'https://mentalxp.vercel.app',
    caseStudy:   false,
    featured: true,
  },
  {
    index:       '03',
    title:       'Vynox Media',
    subtitle:    'UI Redesign',
    description: 'Complete visual overhaul for a media agency — before/after, systems and screens.',
    tags:        ['UI/UX', 'Figma', 'Branding'],
    category:    'UI/UX',
    year:        '2024',
    link:        '/work/vynox',
    caseStudy:   true,
    featured: true,
  },
  {
    index:       '04',
    title:       'Feedback Analyzer',
    subtitle:    'Internship Project',
    description: 'Dashboard that analyzes bulk CSV feedback data and surfaces sentiment metrics. Cut analysis time by 40%.',
    tags:        ['React.js', 'Node.js', 'Chart.js'],
    category:    'Development',
    year:        '2024',
    link:        '/work/feedback',
    caseStudy:   true,
    featured: true,
  },
  {
    index:       '05',
    title:       'Moodsy',
    subtitle:    'Chrome Extension',
    description: 'Save design inspiration from anywhere on the browser, organized into moodboards instantly.',
    tags:        ['JavaScript', 'Chrome API', 'UI/UX'],
    category:    'Development',
    year:        '2024',
    link:        '/work/moodsy',
    caseStudy:   true,
  },
  {
    index:       '06',
    title:       'AutoText UI',
    subtitle:    'UI Revamp',
    description: 'Redesigned the AutoText AI product interface — cleaner flows, better hierarchy.',
    tags:        ['UI/UX', 'Figma', 'Prototyping'],
    category:    'UI/UX',
    year:        '2025',
    link:        '/work/autotext',
    caseStudy:   true,
  },
  {
    index:       '07',
    title:       'Graphic Design',
    subtitle:    '300+ Creatives',
    description: 'Client work, event designs, esports creatives, and personal projects spanning 4 years.',
    tags:        ['Illustration', 'Branding', 'Event Design'],
    category:    'Graphics',
    year:        '2021–',
    link:        '/archive',
    caseStudy:   false,
  },
]

export const community = {
  awards: [
    { title: 'Above & Beyond',  org: 'AWS Community Award', year: '2023' },
    { title: 'Best Contributor', org: 'AWS Community Award', year: '2024' },
  ],
  events: [
    'WIT Conf Jaipur 2024',
    'AWS Community Day Rajasthan 2024',
    'AWS Community Day Rajasthan 2023',
    'API Day Jaipur 2023',
    'GDSC PCE Core Team',
    'IDEA Lab Ambassador',
    "Students' Council Captain",
  ],
  photos: [
    { label: 'AWS Community Day 2024' },
    { label: 'WIT Conf Jaipur 2024' },
    { label: 'API Day Jaipur 2023' },
    { label: 'AWS Community Day 2023' },
  ],
}

export const shelf = {
  books: [
    { title: 'The Design of Everyday Things', author: 'Don Norman',  reaction: 'Changed how I see every door handle.' },
    { title: 'Atomic Habits',                 author: 'James Clear',  reaction: 'Systems over goals. Still practicing it.' },
    { title: 'Sprint',                         author: 'Jake Knapp',  reaction: 'Five days to a prototype. Underrated.' },
  ],
  quote:   { text: 'Design is not just what it looks like and feels like. Design is how it works.', by: 'Steve Jobs' },
  funFact: 'I once designed 40 logo variations before going back to the very first one.',
  interests: ['Digital Art', 'Travel', 'Community Building', 'Esports'],
}

export const navLinks = [
  { label: 'Work',    href: '#projects' },
  { label: 'About',   href: '#about' },
  { label: 'Archive', href: '/archive' },
  { label: 'Quotes',  href: '/quotes' },
]

export const tickerWords = [
  'UI/UX Design','Frontend Dev','Figma','React.js','Prototyping',
  'Design Systems','Node.js','User Research','Next.js','Branding','TypeScript','Interaction Design',
]
