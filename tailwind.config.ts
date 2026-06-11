import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FFFFFF',   // pure white
          secondary: '#F4F7FB', // very light blue-gray
          card: '#FFFFFF',      // white cards
        },
        accent: {
          DEFAULT: '#2563EB',  // blue-600
          primary: '#2563EB',
          light: '#60A5FA',    // blue-400 (hover, secondary)
          muted: '#93C5FD',    // blue-300 (decorative)
        },
        ink: {
          primary: '#0B1220',   // near-black, cool tone
          secondary: '#475569', // slate-600
          muted: '#94A3B8',     // slate-400
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Geist', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.3em',
      },
      animation: {
        'bounce-slow': 'bounce 2.4s infinite',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 60%, #1D4ED8 100%)',
        'accent-line': 'linear-gradient(90deg, transparent 0%, #3B82F6 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

export default config
