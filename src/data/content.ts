// Every fact here comes from Hans's resume, GitHub, or Devpost. Edit freely; nothing else needs to change.

export const profile = {
  name: 'Hans Chundekad',
  // Square photo in public/; set to null to show the monogram instead.
  photo: '/profile.webp' as string | null,
  degree: 'Computer Science with Business Applications',
  school: 'UC Riverside',
  schoolUrl: 'https://www.ucr.edu/',
  gradYear: 'B.S. 2028',
  seeking: 'Currently looking for 2027 software engineering internships, in any season.',
  email: 'hanschundekad@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hanschundekad/',
  github: 'https://github.com/HansChundekad',
  devpost: 'https://devpost.com/hanschundekad',
  resume: '/HansChundekadResume.pdf',
};

// Each bullet: plain text segments and highlighted segments (hl = highlighter color).
export type Seg = string | { text: string; hl: 'sun' | 'iris' | 'mint' | 'peach' | 'rose'; href?: string };

export const bullets: Seg[][] = [
  [{ text: '3x hackathon winner', hl: 'iris', href: '#awards' }, ' at UC Berkeley AI, DeveloperWeek & RoseHack'],
  ['moved a nonprofit off paper and onto a CRM at ', { text: 'TTickle', hl: 'mint', href: '#work' }],
  ['streamed sensor data between Raspberry Pi Picos at ', { text: 'Luxcedia', hl: 'sun', href: '#work' }],
  ['building ', { text: 'Xpert AI', hl: 'peach', href: '#projects' }, ', a launch platform for first-time founders'],
  ['built ', { text: 'ClineShield', hl: 'rose', href: '#project-clineshield' }, ', which stops AI coding agents from making destructive edits'],
];

export const work = [
  {
    role: 'Software Engineer Intern',
    company: 'TTickle',
    program: 'Engineers for Good Program',
    place: 'Riverside, CA',
    dates: 'Jun 2026 – Sep 2026',
    when: "summer '26",
    tile: 'mint',
    logo: '/work/ttickle.webp',
    points: [
      'Moved a grassroots organizing nonprofit off paper and whiteboards onto a shared CRM, where ~20 staff logged 330+ assessments, meeting logs, and notes in the first month.',
      'Led requirements, schema, and wireframes as 1 of 4 engineers, working directly with the client through changing requirements to the pilot handoff.',
      'Shipped the Firebase data model and role-based security rules behind onboarding, ladder progression, and assessments. It is now the production system of record for 150 members.',
    ],
    stack: ['Firebase', 'Firestore security rules', 'Azure'],
  },
  {
    role: 'Software Engineer Intern, Embedded Systems',
    company: 'Luxcedia, Inc',
    program: 'Gesture-controlled wand',
    place: 'Riverside, CA',
    dates: 'Feb 2026 – Jun 2026',
    when: "spring '26",
    tile: 'sun',
    logo: '/work/luxcedia.webp',
    points: [
      'Sustained a 49.9 Hz accelerometer stream with 98.8% frame delivery over 13 minutes of in-motion capture, relaying 14-byte frames over TCP between two Raspberry Pi Picos.',
      'Found silently corrupted sample timing by timestamping on the sensor: a stall reported as 24.3 Hz was actually 47.6 Hz.',
      'Stopped sensor resets from hanging the base station with a 3-second silence timeout and reconnect handling.',
    ],
    stack: ['Raspberry Pi Pico', 'TCP', 'Wi-Fi access point'],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  image?: string;
  cover?: 'xpert' | 'clineshield' | 'triage';
  status?: string;
  date: string;
  award?: string;
  event?: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'xpert',
    date: "since jul '25",
    name: 'Xpert AI',
    tagline: 'An AI business-launch platform that walks first-time founders from idea to launch. Streaming replies cut time-to-first-response from 3.8s to 1.9s.',
    cover: 'xpert',
    status: 'Launching soon',
    stack: ['SSE streaming', 'LLM chat', 'Data-layer access control'],
    links: [],
  },
  {
    id: 'clineshield',
    date: "feb '26",
    name: 'ClineShield',
    tagline: 'A safety layer for agentic coding. It blocks destructive AI edits before they apply and tells the agent why.',
    cover: 'clineshield',
    award: 'Cline: Most Innovative Customization',
    event: 'DeveloperWeek 2026',
    stack: ['TypeScript', 'VS Code API', 'Cline hooks'],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/clineshield' },
      { label: 'GitHub', href: 'https://github.com/HansChundekad/ClineShield' },
    ],
  },
  {
    id: 'triage',
    date: "jun '26",
    name: 'Triage',
    tagline: 'An agent that reproduces your bugs by actually using your app: GitHub issue in, live browser repro and root cause out.',
    cover: 'triage',
    award: 'Best use of Band for agent-to-agent communication',
    event: 'UC Berkeley AI Hackathon 2026',
    stack: ['Python', 'FastAPI', 'Browserbase', 'Claude'],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/triage-y10mpq' },
      { label: 'GitHub', href: 'https://github.com/HansChundekad/Triage' },
    ],
  },
  {
    id: 'trinetra',
    date: "apr '26",
    name: 'TriNetra',
    tagline: 'Traces how a disaster cascades through the grid, hospitals, and dispatch, using satellite imagery and dependency graphs to show what to protect next.',
    image: '/projects/trinetra.webp',
    event: 'LA Hacks 2026',
    stack: ['Next.js', 'FastAPI', 'NetworkX', 'EfficientNet'],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/trinetra-qmyva2' },
      { label: 'Live', href: 'https://trinetra.vercel.app' },
    ],
  },
  {
    id: 'taproot',
    date: "jan '26",
    name: 'TapRoot',
    tagline: 'A GIS wellness map that puts community healers, farms, and green space alongside clinics, searchable by intent.',
    image: '/projects/taproot.webp',
    award: 'Social Impact Track',
    event: 'RoseHack 2026',
    stack: ['Next.js', 'Mapbox', 'Supabase PostGIS', 'Scrapy'],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/taproot' },
      { label: 'Live', href: 'https://rose-hack2026-nine.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/HansChundekad/RoseHack2026' },
    ],
  },
  {
    id: 'civicestate',
    date: "feb '26",
    name: 'Civic Estate',
    tagline: 'A Chrome extension that overlays safety, lifestyle, and investment scores directly onto Zillow listings.',
    image: '/projects/civicestate.webp',
    event: 'IrvineHacks 2026',
    stack: ['React', 'TypeScript', 'Chrome MV3', 'Gemini'],
    links: [{ label: 'Devpost', href: 'https://devpost.com/software/civicestate' }],
  },
];

export const awards = [
  { event: 'UC Berkeley AI Hackathon', year: '2026', prize: 'Best use of Band for agent-to-agent communication', project: 'Triage', href: '#project-triage' },
  { event: 'DeveloperWeek Hackathon', year: '2026', prize: 'Cline: Most Innovative Customization', project: 'ClineShield', href: '#project-clineshield' },
  { event: 'RoseHack', year: '2026', prize: 'Social Impact Track', project: 'TapRoot', href: '#project-taproot' },
];
