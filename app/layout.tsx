import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'react-hot-toast'
import SmoothScroll from '@/components/ui/SmoothScroll'
import '../styles/globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://maximogalvez.dev'),
  title: 'Maximo Galvez Landers — Full Stack Developer',
  description:
    'Desarrollador Full Stack de Tucumán, Argentina. Especializado en React, TypeScript, Next.js y Node.js. Disponible para proyectos freelance y posiciones remotas.',
  keywords: [
    'Full Stack Developer',
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Argentina',
    'Tucumán',
    'Freelance',
    'Maximo Galvez Landers',
  ],
  authors: [{ name: 'Maximo Galvez Landers' }],
  creator: 'Maximo Galvez Landers',
  openGraph: {
    title: 'Maximo Galvez Landers — Full Stack Developer',
    description:
      'Portfolio profesional de Maximo Galvez Landers — desarrollador Full Stack.',
    url: 'https://maximogalvez.dev',
    siteName: 'Maximo Galvez Landers',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Maximo Galvez Landers — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maximo Galvez Landers — Full Stack Developer',
    description:
      'Portfolio profesional de Maximo Galvez Landers — desarrollador Full Stack.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#F5F2F7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${jetbrains.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#0B080C',
              border: '1px solid rgba(92,255,171,0.45)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
