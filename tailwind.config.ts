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
          primary: '#F5F2F7',   // warm off-white with subtle violet tint
          secondary: '#EAE5EC', // Redoyanul's cream
          card: '#FFFFFF',      // pure white for cards to pop
        },
        accent: {
          DEFAULT: '#5CFFAB',  // mint green, primary
          primary: '#5CFFAB',
          light: '#A5FF7C',    // lime (hover, secondary)
          muted: '#B9FFA4',    // soft lime (decorative)
        },
        ink: {
          primary: '#0B080C',   // deep near-black with violet tint (echo of Redoyanul bg)
          secondary: '#4A464F', // warm dark gray
          muted: '#8B8590',     // warm light gray
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
        'accent-gradient': 'linear-gradient(135deg, #A5FF7C 0%, #5CFFAB 60%, #2DDF8A 100%)',
        'accent-line': 'linear-gradient(90deg, transparent 0%, #5CFFAB 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

export default config
