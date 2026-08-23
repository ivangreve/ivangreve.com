import type { ResumeData } from './types';

export const en: ResumeData = {
  lang: 'en',
  altLang: { code: 'es', label: 'Español', href: '/es/' },

  meta: {
    title: 'Iván Greve — Frontend Engineer',
    description:
      'Frontend Engineer with 8+ years building products end to end. React, React Native, Angular and TypeScript at CookUnity. Based in Bariloche, Argentina — working remotely.',
  },

  name: 'Iván Greve',
  role: 'Frontend Engineer',
  location: 'San Carlos de Bariloche, Argentina — remote',

  intro: [
    'I build products end to end. For the last three years that has meant React, React Native and TypeScript at CookUnity, where I led a backoffice platform from scratch, designed the React design system the internal tools run on, and shipped the chef app to the App Store and Google Play.',
    'Before that: Technical Lead on an Angular monolith in agribusiness, five years co-founding a Big Data and IoT product, and four years of .NET full stack. The frontend is where I do my best work — but I have shipped every layer under it, and it shows in the decisions I make.',
  ],


  email: 'ivangreve@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivan-greve/', handle: 'in/ivan-greve' },
    { label: 'GitHub', href: 'https://github.com/ivangreve', handle: '@ivangreve' },
  ],

  ui: {
    skipToContent: 'Skip to content',
    toggleTheme: 'Toggle colour theme',
    printResume: 'Print / save as PDF',
    concurrent: 'alongside full-time work',
    newTab: '(opens in a new tab)',
    privateSource: 'Private source',
    lastUpdated: 'Last updated',
    carousel: {
      previous: 'Previous image',
      next: 'Next image',
      goToSlide: 'Go to image',
      slideOf: 'of',
    },
  },

  sections: {
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
  },

  jobs: [
    {
      company: 'CookUnity',
      logo: '/logos/cookunity.webp',
      href: 'https://www.cookunity.com',
      location: 'United States — remote',
      period: 'Apr 2023 — Present',
      roles: [{ title: 'Full Stack Engineer', period: 'Apr 2023 — Present' }],
      summary:
        'Chef-facing platform at a US meal-delivery marketplace, across two squads: Chef OS and Chef Marketing.',
      highlights: [
        'Led the build of a custom backoffice platform from scratch for managing chefs and vendors — media uploads, marketing tooling and chef administration.',
        'Designed and implemented a custom React design system, giving every internal tool a consistent and scalable UI foundation.',
        'Built the web and React Native app chefs use to track their stats, performance and kitchen progress in real time.',
        'Owned iOS and Android releases end to end, including the Fastlane CI/CD pipeline that ships to the App Store and Google Play.',
        'Migrated chef data to a microservices architecture, decoupling the system and making it easier to scale and maintain.',
        'Shipped UnityPass Hub — a gamified membership system where members earn and redeem points — plus an interactive trivia game with rewards, both aimed at engagement and retention.',
        'Replaced manual promotion workflows with internal tooling, and built the analytics dashboards chefs use to make decisions on their own numbers.',
      ],
      stack: [
        'React',
        'React Native',
        'Next.js',
        'TypeScript',
        'Node.js',
        'NestJS',
        'PostgreSQL',
        'MySQL',
        'Docker',
        'AWS',
        'Fastlane',
      ],
    },
    {
      company: 'Agree.Ag',
      logo: '/logos/agree.webp',
      href: 'https://agree.ag',
      location: 'Buenos Aires, Argentina',
      period: 'Feb 2022 — Apr 2023',
      roles: [
        { title: 'Technical Lead', period: 'Nov 2022 — Apr 2023' },
        { title: 'Frontend Developer', period: 'Feb 2022 — Nov 2022' },
      ],
      summary: 'Digital trading and credit platform for the Argentine agribusiness sector.',
      highlights: [
        'Built an identity verification flow for credit pre-approval, turning a manual review into an automated step and cutting operational time.',
        'Developed a quota management system for agricultural producers to handle electronic credit limits.',
        'Led an Angular version upgrade and a deep refactor of the monolith, improving its performance and making it possible to keep building on it.',
        'Promoted to Technical Lead after nine months on the team.',
      ],
      stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'HTML5', 'Docker'],
    },
    {
      company: 'Kelawar',
      location: 'Argentina — remote',
      period: 'Apr 2018 — Apr 2023',
      concurrent: true,
      roles: [{ title: 'Co-founder', period: 'Apr 2018 — Apr 2023' }],
      summary:
        'Big Data and IoT product analysing in-store client behaviour. Co-founded and run alongside full-time work.',
      highlights: [
        'Owned the full product lifecycle — from the initial idea through to deployment and operation.',
        'Built a distributed data processing network on Raspberry Pi devices.',
        'Reverse-engineered the IEEE 802.11 protocol to build a passive WiFi device detection system.',
        'Wrote the .NET Core APIs and the Vue.js frontends that consumed them.',
      ],
      stack: ['Vue.js', '.NET Core', 'C#', 'Python', 'PostgreSQL', 'MongoDB', 'Raspberry Pi'],
    },
    {
      company: 'Axum Sistemas Inteligentes',
      logo: '/logos/axum.webp',
      location: 'Greater Buenos Aires, Argentina',
      period: 'Oct 2017 — Feb 2022',
      roles: [
        { title: 'Software Engineer', period: 'Dec 2018 — Feb 2022' },
        { title: 'Full Stack .NET Developer', period: 'Oct 2017 — Dec 2018' },
      ],
      summary:
        'Retail software used by multinational clients including PepsiCo, Unilever and Quilmes.',
      highlights: [
        'Designed, built and maintained the applications those clients ran their retail operations on.',
        'Led the web team, owning the technical decisions on stack and ways of working.',
        'Worked across the whole stack — .NET Core and .NET Framework APIs, MSSQL and PostgreSQL, and Vue.js, React and JavaScript on the client.',
      ],
      stack: ['.NET Core', '.NET Framework', 'C#', 'Vue.js', 'React', 'MSSQL', 'PostgreSQL', 'MongoDB'],
    },
  ],

  projectsLede:
    'All three read the physical world I live in: a mountain full of ski instructors, a house running off the grid, a maize field seen from orbit.',

  projects: [
    {
      name: 'SnowRide',
      tagline: 'Book ski, snowboard and kitesurf lessons in Argentina and Chile',
      description:
        'A two-sided marketplace: riders find an instructor on the map, filter by discipline, check the profile and book in seconds; instructors manage their calendar, sync it with Google Calendar and get paid. Expo app for both sides, plus a landing site.',
      stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'TanStack Query'],
      shots: [
        { src: '/projects/snowride-1.webp', alt: 'Explore map with instructors around Bariloche, beside an instructor profile showing rate, disciplines and reviews' },
        { src: '/projects/snowride-2.webp', alt: 'A rider\u2019s bookings list and the chat thread with their instructor' },
        { src: '/projects/snowride-3.webp', alt: 'The instructor side: upcoming classes and the public profile they manage' },
        { src: '/projects/snowride-4.webp', alt: 'Class detail with the student and location, next to the alerts screen' },
        { src: '/projects/snowride-5.webp', alt: 'Calendar sync settings and the resulting Google Calendar entries' },
      ],
      links: [],
      privateSource: true,
    },
    {
      name: 'solar-fs',
      tagline: 'Off-grid solar monitoring dashboard',
      description:
        'A dashboard for Felicity Solar off-grid installations that keeps its own time-series database — 5-minute telemetry plus daily rollups — so it can answer what the vendor cloud cannot: real self-sufficiency, how much energy the backup generator actually contributed, battery charge balance and estimated fuel cost. Multi-user, with per-owner isolation.',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'TypeORM', 'ECharts', 'Vercel'],
      shots: [
        { src: '/projects/solar-fs-1.webp', alt: 'Daily overview: generation, self-sufficiency and the intraday power curves for PV, generator, load and battery charge' },
        { src: '/projects/solar-fs-2.webp', alt: 'Devices view with the system diagram \u2014 inverter and battery bank with live state of charge' },
        { src: '/projects/solar-fs-3.webp', alt: 'Energy view: source mix and the daily Sankey diagram of kWh per node' },
        { src: '/projects/solar-fs-4.webp', alt: 'Plant home with live power and the day\u2019s running totals' },
      ],
      links: [
        { label: 'Live', href: 'https://solar-fs.vercel.app' },
        { label: 'GitHub', href: 'https://github.com/ivangreve/solar-fs' },
      ],
    },
    {
      name: 'Agro Alerta Plagas',
      tagline: 'Satellite-read pest risk, ranked by field',
      description:
        'No orbital sensor can resolve a 3 mm insect. So instead of detecting pests, this answers the question an agronomist actually opens the week with — which field do I walk first? — by combining crop phenology measured from Sentinel-2, thermal accumulation from climate reanalysis, and trap counts from the monitoring network. Every number traces back to an image you can look at, on the date the model read it.',
      stack: ['Python', 'Sentinel-2', 'STAC', 'NDVI / NDRE', 'Savitzky–Golay', 'Time series'],
      shots: [
        { src: '/projects/agro-1.webp', alt: 'Fields outlined on a satellite mosaic with risk scores, and a field card explaining why it scored 74' },
        { src: '/projects/agro-2.webp', alt: 'Single-field report: the season\u2019s greenness curve and the sectors flagged as anomalous' },
        { src: '/projects/agro-3.webp', alt: 'Portfolio table ranking every field by risk, area and days to the next emergence window' },
        { src: '/projects/agro-4.webp', alt: 'Drawing a new field on the map, and the sign-in screen' },
      ],
      links: [],
      privateSource: true,
    },
  ],

  skills: [
    {
      label: 'Frontend',
      items: [
        'React',
        'Next.js',
        'Angular',
        'React Native',
        'Expo',
        'TypeScript',
        'JavaScript',
        'RxJS',
        'Vue.js',
        'Design systems',
        'Tailwind CSS',
        'SCSS',
        'Astro',
      ],
    },
    {
      label: 'Backend',
      items: [
        'Node.js',
        'NestJS',
        'Go',
        '.NET Core',
        'C#',
        'REST APIs',
        'Microservices',
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'TypeORM',
        'Drizzle',
      ],
    },
    {
      label: 'Platform & delivery',
      items: [
        'AWS (Lambda, API Gateway)',
        'Docker',
        'CI/CD',
        'Fastlane',
        'App Store & Google Play releases',
        'Vercel',
        'Git',
      ],
    },
    {
      label: 'Ways of working',
      items: ['Technical leadership', 'Agile / Scrum', 'Code review', 'Mentoring', 'Design patterns'],
    },
    { label: 'Languages', items: ['Spanish — native', 'English — professional working proficiency'] },
  ],

  education: [
    {
      institution: 'Universidad Nacional de La Matanza',
      degree: 'Computer Engineering',
      period: '2013 — 2018',
      note: 'GPA 7.56 / 10',
    },
    {
      institution: 'Universidad Nacional de La Matanza',
      degree: 'Software Engineering Technician',
      period: '2013 — 2016',
    },
    {
      institution: 'Instituto Madero',
      degree: 'Electronics Technician',
      period: '2007 — 2012',
    },
  ],

  certifications: [
    { name: 'Programming with Google Go — Specialization', issuer: 'UC Irvine / Coursera', year: '2022' },
    { name: 'Introduction to Serverless Computing with AWS Lambda', issuer: 'Coursera', year: '2022' },
  ],

  contact: {
    heading: 'Let’s talk',
    cta: 'Send me an email',
  },

  footer: 'Built with Astro. No trackers, no cookie banner, no analytics.',
};
