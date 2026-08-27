import type { ResumeData } from './types';

export const es: ResumeData = {
  lang: 'es',
  altLang: { code: 'en', label: 'English', href: '/' },

  meta: {
    title: 'Iván Greve · Ingeniero Frontend',
    description:
      'Ingeniero Frontend con más de 8 años construyendo productos de punta a punta. React, React Native, Angular y TypeScript en CookUnity. Radicado en Bariloche, Argentina, trabajo remoto.',
  },

  name: 'Iván Greve',
  role: 'Ingeniero Frontend',
  location: 'San Carlos de Bariloche, Argentina · remoto',

  intro: [
    'Construyo productos de punta a punta. Hoy eso significa React, React Native y TypeScript en CookUnity, en la plataforma con la que los chefs manejan su cocina y su negocio. Web y mobile por igual.',
    'Antes: Angular en agronegocios, una startup propia de Big Data e IoT, y años de full stack .NET. El frontend es donde mejor trabajo, pero puse en producción cada capa que hay debajo, y eso se nota en las decisiones que tomo.',
  ],


  email: 'ivangreve@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivan-greve/', handle: 'in/ivan-greve' },
    { label: 'GitHub', href: 'https://github.com/ivangreve', handle: '@ivangreve' },
  ],

  ui: {
    skipToContent: 'Ir al contenido',
    toggleTheme: 'Cambiar tema de color',
    printResume: 'Imprimir / guardar en PDF',
    concurrent: 'en paralelo al trabajo full time',
    newTab: '(se abre en una pestaña nueva)',
    privateSource: 'Código privado',
    lastUpdated: 'Última actualización',
    carousel: {
      previous: 'Imagen anterior',
      next: 'Imagen siguiente',
      goToSlide: 'Ir a la imagen',
      slideOf: 'de',
    },
  },

  sections: {
    experience: 'Experiencia',
    projects: 'Proyectos',
    skills: 'Tecnologías',
    education: 'Formación',
    contact: 'Contacto',
  },

  jobs: [
    {
      company: 'CookUnity',
      logo: '/logos/cookunity.webp',
      href: 'https://www.cookunity.com',
      location: 'Estados Unidos · remoto',
      period: 'abr 2023 — Actualidad',
      roles: [{ title: 'Ingeniero Full Stack', period: 'abr 2023 — Actualidad' }],
      summary:
        'Plataforma para chefs en un marketplace estadounidense de comida a domicilio, en dos squads: Chef OS y Chef Marketing.',
      highlights: [
        'Lideré la construcción desde cero de una plataforma de backoffice para administrar chefs y proveedores: carga de media, herramientas de marketing y administración de chefs.',
        'Diseñé e implementé un design system propio en React, que le dio a todas las herramientas internas una base de UI consistente y escalable.',
        'Construí la aplicación web y la app en React Native que usan los chefs para seguir sus métricas, su rendimiento y el estado de su cocina en tiempo real.',
        'Me hice cargo de los releases de iOS y Android de punta a punta, incluido el pipeline de CI/CD con Fastlane que publica en la App Store y en Google Play.',
        'Migré los datos de chefs a una arquitectura de microservicios, desacoplando el sistema y volviéndolo más fácil de escalar y mantener.',
        'Implementé UnityPass Hub, un sistema de membresía gamificado donde los miembros acumulan y canjean puntos, y un juego de trivia interactivo con recompensas, ambos orientados a engagement y retención.',
        'Reemplacé flujos manuales de gestión de promociones por herramientas internas, y construí los dashboards de analytics con los que los chefs toman decisiones sobre sus propios números.',
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
      period: 'feb 2022 — abr 2023',
      roles: [
        { title: 'Líder Técnico', period: 'nov 2022 — abr 2023' },
        { title: 'Desarrollador Frontend', period: 'feb 2022 — nov 2022' },
      ],
      summary: 'Plataforma digital de comercio y crédito para el sector agroindustrial argentino.',
      highlights: [
        'Construí un sistema de verificación de identidad para preaprobación de créditos, convirtiendo una revisión manual en un paso automático y reduciendo los tiempos operativos.',
        'Desarrollé un sistema de gestión de cupos para productores agropecuarios, para administrar límites de crédito electrónicos.',
        'Lideré la actualización de versión de Angular y una refactorización profunda del monolito, mejorando su rendimiento y volviendo viable seguir construyendo sobre él.',
        'Promovido a Technical Lead a los nueve meses de entrar al equipo.',
      ],
      stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'HTML5', 'Docker'],
    },
    {
      company: 'Kelawar',
      location: 'Argentina · remoto',
      period: 'abr 2018 — abr 2023',
      concurrent: true,
      roles: [{ title: 'Cofundador', period: 'abr 2018 — abr 2023' }],
      summary:
        'Producto de Big Data e IoT para analizar el comportamiento de clientes en el punto de venta. Cofundado y llevado adelante en paralelo al trabajo full time.',
      highlights: [
        'Me hice cargo del ciclo de vida completo del producto: de la idea inicial al despliegue y la operación.',
        'Construí una red distribuida de procesamiento de datos sobre dispositivos Raspberry Pi.',
        'Analicé el protocolo IEEE 802.11 para desarrollar un sistema pasivo de detección de dispositivos WiFi.',
        'Escribí las APIs en .NET Core y los frontends en Vue.js que las consumían.',
      ],
      stack: ['Vue.js', '.NET Core', 'C#', 'Python', 'PostgreSQL', 'MongoDB', 'Raspberry Pi'],
    },
    {
      company: 'Axum Sistemas Inteligentes',
      logo: '/logos/axum.webp',
      location: 'Gran Buenos Aires, Argentina',
      period: 'oct 2017 — feb 2022',
      roles: [
        { title: 'Ingeniero de Software', period: 'dic 2018 — feb 2022' },
        { title: 'Desarrollador Full Stack .NET', period: 'oct 2017 — dic 2018' },
      ],
      summary:
        'Software para retail usado por clientes multinacionales como PepsiCo, Unilever y Quilmes.',
      highlights: [
        'Diseñé, construí y mantuve las aplicaciones sobre las que esos clientes operaban su negocio de retail.',
        'Lideré el equipo web, con la responsabilidad sobre las decisiones técnicas de stack y de forma de trabajo.',
        'Trabajé sobre todo el stack: APIs en .NET Core y .NET Framework, MSSQL y PostgreSQL, y Vue.js, React y JavaScript del lado del cliente.',
      ],
      stack: ['.NET Core', '.NET Framework', 'C#', 'Vue.js', 'React', 'MSSQL', 'PostgreSQL', 'MongoDB'],
    },
  ],

  projectsLede:
    'Los tres leen el mundo físico donde vivo: una montaña llena de instructores de ski, una casa que anda fuera de la red, un lote de maíz visto desde órbita.',

  projects: [
    {
      name: 'SnowRide',
      tagline: 'Reservá clases de ski, snowboard y kitesurf en Argentina y Chile',
      description:
        'Un marketplace de dos lados: el rider encuentra instructores en el mapa, filtra por disciplina, mira el perfil y reserva en segundos; el instructor administra su calendario, lo sincroniza con Google Calendar y cobra. App en Expo para ambos lados, más el sitio de la landing.',
      stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'TanStack Query'],
      shots: [
        { src: '/projects/snowride-1.webp', alt: 'La home del rider con el clima y la base de nieve de Portillo, junto a la lista de instructores con tarifas, puntajes y qui\u00e9n est\u00e1 disponible hoy' },
        { src: '/projects/snowride-2.webp', alt: 'El perfil verificado de un instructor con tarifa, experiencia y rese\u00f1as, al lado de la pantalla de reservas con clases confirmadas y sus precios' },
        { src: '/projects/snowride-3.webp', alt: 'La home del instructor: ingresos de la semana, solicitudes pendientes para aceptar o rechazar, junto a la agenda con la disponibilidad del d\u00eda' },
        { src: '/projects/snowride-4.webp', alt: 'Tarifas por disciplina y cantidad de alumnos, y el mapa de pistas del Cerro Catedral' },
      ],
      links: [],
      privateSource: true,
    },
    {
      name: 'solar-fs',
      tagline: 'Dashboard de monitoreo solar off-grid',
      description:
        'Un dashboard para instalaciones off-grid de Felicity Solar que mantiene su propia base de series temporales (telemetría cada 5 minutos más consolidados diarios), para responder lo que la nube del fabricante no responde: autosuficiencia real, cuánta energía aportó de verdad el generador de respaldo, balance de carga de las baterías y costo estimado de combustible. Multiusuario, con aislamiento por dueño.',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'TypeORM', 'ECharts', 'Vercel'],
      shots: [
        { src: '/projects/solar-fs-1.webp', alt: 'Resumen diario: generaci\u00f3n, autosuficiencia y las curvas de potencia del d\u00eda para paneles, generador, consumo y carga de bater\u00edas' },
        { src: '/projects/solar-fs-2.webp', alt: 'Vista de dispositivos con el diagrama del sistema: inversor y banco de bater\u00edas con su carga en vivo' },
        { src: '/projects/solar-fs-3.webp', alt: 'Vista de energ\u00eda: mezcla de fuentes y el diagrama Sankey diario de kWh por nodo' },
        { src: '/projects/solar-fs-4.webp', alt: 'Inicio de la planta con la potencia en vivo y los acumulados del d\u00eda' },
      ],
      links: [
        { label: 'En vivo', href: 'https://solar-fs.vercel.app' },
        { label: 'GitHub', href: 'https://github.com/ivangreve/solar-fs' },
      ],
    },
    {
      name: 'Agro Alerta Plagas',
      tagline: 'Riesgo de plagas por lote, leído desde el satélite',
      description:
        'Ningún sensor orbital resuelve un insecto de 3 mm. Así que en vez de detectar plagas, esto responde la pregunta con la que un asesor abre la semana: ¿qué lote recorro primero? Combina fenología del cultivo medida por Sentinel-2, acumulación térmica de reanálisis climático y capturas de las trampas de la red de monitoreo. Cada número se puede rastrear hasta una imagen que se puede mirar, en la fecha exacta en que el modelo la leyó.',
      stack: ['Python', 'Sentinel-2', 'STAC', 'NDVI / NDRE', 'Savitzky–Golay', 'Series temporales'],
      shots: [
        { src: '/projects/agro-1.webp', alt: 'El panel: once lotes marcados sobre un mosaico Sentinel-2 con sus puntajes de riesgo, los an\u00e1lisis recientes y la curva de verdor del portafolio' },
        { src: '/projects/agro-2.webp', alt: 'Un lote en detalle: riesgo 42 de 100, sectores an\u00f3malos dibujados sobre la imagen satelital, la l\u00ednea de tiempo de la campa\u00f1a y un recorrido por 49 capturas sin nubes' },
        { src: '/projects/agro-3.webp', alt: 'El resumen de campa\u00f1a en palabras simples, y la tabla del portafolio ordenando cada lote por riesgo con su curva de campa\u00f1a' },
        { src: '/projects/agro-4.webp', alt: 'La vista de mapa: todo el portafolio marcado sobre el mosaico Sentinel-2 sin nubes de la Pampa h\u00fameda' },
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
        'APIs REST',
        'Microservicios',
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'TypeORM',
        'Drizzle',
      ],
    },
    {
      label: 'Plataforma y entrega',
      items: [
        'AWS (Lambda, API Gateway)',
        'Docker',
        'CI/CD',
        'Fastlane',
        'Releases en App Store y Google Play',
        'Vercel',
        'Git',
      ],
    },
    {
      label: 'IA',
      items: [
        'Claude Code',
        'OpenAI Codex',
        'Creación y uso de MCPs',
        'Flujos multiagente',
        'Prompt engineering',
        'Code review con IA',
        'Spec-driven development',
      ],
    },
    {
      label: 'Forma de trabajo',
      items: ['Liderazgo técnico', 'Agile / Scrum', 'Code review', 'Mentoría', 'Patrones de diseño'],
    },
    { label: 'Idiomas', items: ['Español (nativo)', 'Inglés (nivel profesional de trabajo)'] },
  ],

  education: [
    {
      institution: 'Universidad Nacional de La Matanza',
      degree: 'Ingeniería en Informática',
      period: '2013 — 2018',
      note: 'Promedio 7,56 / 10',
    },
    {
      institution: 'Universidad Nacional de La Matanza',
      degree: 'Técnico en Ingeniería de Software',
      period: '2013 — 2016',
    },
    {
      institution: 'Instituto Madero',
      degree: 'Técnico Electrónico',
      period: '2007 — 2012',
    },
  ],


  contact: {
    heading: 'Hablemos',
    cta: 'Escribime un mail',
  },

  footer: 'Hecho con Astro. Sin trackers, sin cartel de cookies, sin analytics.',
};
