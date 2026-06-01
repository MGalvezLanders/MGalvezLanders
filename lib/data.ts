export type SkillLevel = 'Básico' | 'Básico-Intermedio' | 'Intermedio' | 'Intermedio-Avanzado' | 'Avanzado'

export type Skill = {
  name: string
  level: SkillLevel
  percent: number
}

export type SkillCategory = {
  title: string
  skills: Skill[]
}

const levelToPercent = (level: SkillLevel): number => {
  switch (level) {
    case 'Básico':
      return 35
    case 'Básico-Intermedio':
      return 50
    case 'Intermedio':
      return 65
    case 'Intermedio-Avanzado':
      return 78
    case 'Avanzado':
      return 90
  }
}

const s = (name: string, level: SkillLevel): Skill => ({
  name,
  level,
  percent: levelToPercent(level),
})

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      s('JavaScript (ES6+)', 'Avanzado'),
      s('TypeScript', 'Avanzado'),
      s('React 18', 'Avanzado'),
      s('HTML5 / CSS3', 'Avanzado'),
      s('TailwindCSS', 'Avanzado'),
      s('Vite', 'Intermedio'),
    ],
  },
  {
    title: 'Backend',
    skills: [
      s('Node.js', 'Intermedio-Avanzado'),
      s('Express.js', 'Intermedio-Avanzado'),
      s('PHP', 'Básico-Intermedio'),
      s('REST APIs', 'Avanzado'),
    ],
  },
  {
    title: 'Base de datos',
    skills: [
      s('PostgreSQL', 'Intermedio'),
      s('Firebase / Firestore', 'Intermedio'),
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      s('AWS S3', 'Básico-Intermedio'),
      s('Vercel', 'Avanzado'),
      s('Git / GitHub', 'Avanzado'),
    ],
  },
  {
    title: 'Herramientas',
    skills: [
      s('VS Code', 'Avanzado'),
      s('React Testing Library', 'Intermedio'),
      s('Vitest', 'Intermedio'),
    ],
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
}

export const projects: Project[] = [
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
    badge: 'Proyecto más complejo',
    featured: true,
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
  {
    slug: 'paleta-colores',
    title: 'Paleta de Colores',
    description:
      'Herramienta interactiva para explorar y generar paletas de colores. Primer proyecto — el punto de partida del camino.',
    stack: ['JavaScript Vanilla', 'HTML', 'CSS'],
    liveUrl: 'https://mgalvezlanders.github.io/ProyectoM1_MaximoGalvezLanders/',
    badge: 'Primer proyecto',
    badgeNote: 'En 5 meses, de acá a La Gauchada.',
  },
]

export const stats = [
  { value: '5', suffix: ' meses', label: 'de desarrollo intensivo' },
  { value: '5', suffix: '+', label: 'proyectos en producción' },
  { value: 'C2', suffix: '', label: 'Inglés certificado (EF SET)' },
  { value: '13', suffix: ' años', label: 'de rugby competitivo' },
]

export const contact = {
  email: 'galvezlandersmaximo@gmail.com',
  linkedin: 'https://linkedin.com/in/maximo-galvez-landers-2487352b8',
  github: 'https://github.com/MGalvezLanders',
  location: 'Tucumán, Argentina (disponible remoto)',
}

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#skills', label: 'Skills' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]
