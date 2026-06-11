export type SkillCategory = {
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React 18',
      'HTML5',
      'CSS3',
      'TailwindCSS',
      'Vite',
    ],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'PHP'],
  },
  {
    title: 'Bases de datos',
    skills: ['PostgreSQL', 'Firebase (Firestore)'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS S3', 'Vercel', 'Git', 'GitHub', 'CI/CD'],
  },
  {
    title: 'Testing',
    skills: ['Vitest', 'React Testing Library'],
  },
]

export type Project = {
  slug: string
  title: string
  description: string
  stack: string[]
  liveUrl: string
  githubUrl?: string
  badge?: string
  badgeNote?: string
  featured?: boolean
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    slug: 'latampay',
    title: 'LatamPay — Billetera Digital Multi-moneda',
    description:
      'Proyecto Final Full Stack de Henry. Billetera digital multi-moneda (ARS, COP, VES) con compra, venta e intercambio de divisas aplicando tasas reales vía ExchangeRate-API con caching. Backend Express + TypeScript con PostgreSQL en Railway, autenticación JWT y transacciones atómicas append-only siguiendo principios SOLID. Emails de confirmación automáticos por transacción con AWS SES sobre Vercel Functions, chatbot asistente con Gemini (gemini-2.5-flash) con mitigación de prompt injection y suite de tests con Vitest sobre lógica crítica.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Express',
      'PostgreSQL',
      'Railway',
      'Vercel',
      'JWT',
      'AWS SES',
      'Gemini API',
      'Vitest',
    ],
    liveUrl: 'https://latam-pay-frontend.vercel.app/',
    badge: 'Proyecto Final',
    featured: true,
  },
  {
    slug: 'la-gauchada',
    title: 'La Gauchada Mates',
    description:
      'E-commerce completo de productos de mate. Catálogo, carrito de compras, autenticación con email/password y Google, y gestión de imágenes en AWS S3.',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'TailwindCSS v4',
      'Context API + useReducer',
      'Firebase Auth',
      'Cloud Firestore',
      'AWS S3',
      'Vercel Serverless',
      'Vitest',
      'React Testing Library',
    ],
    liveUrl: 'https://proyecto-m5-maximo-galvez-landers.vercel.app/',
    githubUrl: 'https://github.com/MGalvezLanders',
  },
  {
    slug: 'listarg',
    title: 'ListARG — TODO App',
    description:
      'Aplicación de gestión de tareas con TypeScript puro. CRUD completo, filtros por estado y persistencia en localStorage.',
    stack: ['TypeScript', 'CSS'],
    liveUrl: 'https://proyecto-m4-maximo-galvez-landers.vercel.app/',
  },
  {
    slug: 'chatbot',
    title: 'Chat Bot Fast & Furious',
    description:
      'Chatbot temático de la saga Rápido y Furioso. Respuestas predefinidas con lógica de conversación y UI animada.',
    stack: ['JavaScript', 'CSS', 'HTML'],
    liveUrl: 'https://proyecto-m3-maximo-galvez-landers-c.vercel.app/',
  },
]

export const stats = [
  { value: '800', suffix: '+ hs', label: 'de formación intensiva en Henry' },
  { value: '5', suffix: '+', label: 'proyectos en producción' },
  { value: 'C2', suffix: '', label: 'Inglés certificado (EF SET)' },
  { value: '13', suffix: ' años', label: 'de rugby competitivo' },
]

export type Education = {
  title: string
  institution: string
  period: string
  description: string
  status?: string
}

export const education: Education[] = [
  {
    title: 'Desarrollador Full Stack — Bootcamp Full Time',
    institution: 'Henry',
    period: 'Feb 2026 – Jun 2026',
    status: 'En curso',
    description:
      'Programa intensivo de +800 horas. Desarrollo de aplicaciones web con JavaScript, TypeScript, React, Node.js, Express y PostgreSQL. Metodologías ágiles y trabajo en equipo.',
  },
  {
    title: 'Programador Universitario',
    institution: 'Universidad Nacional de Tucumán',
    period: '2024',
    description:
      'Fundamentos de programación, estructuras de datos, bases de datos relacionales y desarrollo de software.',
  },
]

export type Certification = {
  name: string
  issuer: string
  detail: string
  url?: string
}

export const certifications: Certification[] = [
  {
    name: 'EF SET — Inglés C2 Proficiente',
    issuer: 'EF Standard English Test',
    detail: '71/100 — Nivel C2 (Proficiente)',
    url: 'https://cert.efset.org/es/y19puv',
  },
]

export type RugbyMilestone = {
  year: string
  title: string
  description: string
}

export const rugby = {
  yearsCompetitive: 13,
  currentTeam: 'Tucumán Rugby Club',
  currentDivision: 'Primera División',
  milestones: [
    {
      year: '2022 – 2023',
      title: 'PLADAR — Plan de Alto Rendimiento',
      description:
        'Seleccionado para el programa de elite nacional de la Unión Argentina de Rugby (UAR).',
    },
    {
      year: 'Actualidad',
      title: 'Primera División — Tucumán Rugby Club',
      description:
        'Compitiendo al máximo nivel del rugby tucumano mientras avanzo en mi carrera como desarrollador.',
    },
  ] as RugbyMilestone[],
}

export const contact = {
  email: 'galvezlandersmaximo@gmail.com',
  phone: '+54 381 587-1791',
  phoneHref: 'tel:+543815871791',
  linkedin: 'https://linkedin.com/in/maximo-galvez-landers-2487352b8',
  github: 'https://github.com/MGalvezLanders',
  location: 'Tucumán, Argentina (disponible remoto)',
  efSetUrl: 'https://cert.efset.org/es/y19puv',
}

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#skills', label: 'Skills' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#educacion', label: 'Educación' },
  { href: '#rugby', label: 'Rugby' },
  { href: '#contacto', label: 'Contacto' },
]
