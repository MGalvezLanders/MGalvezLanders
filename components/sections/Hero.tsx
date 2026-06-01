'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, Download } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const typewriterRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-line-top]',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }
      )
        .fromTo(
          '[data-hero-first] [data-letter]',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.035 },
          '-=0.35'
        )
        .fromTo(
          '[data-hero-second] [data-letter]',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.03 },
          '-=0.55'
        )
        .fromTo(
          '[data-hero-line-mid]',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
          '-=0.35'
        )
        .add(() => runTypewriter(), '-=0.2')
        .fromTo(
          '[data-hero-line-bot]',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.5, ease: 'power3.inOut' },
          '+=0.5'
        )
        .fromTo(
          '[data-hero-bio]',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          '-=0.3'
        )
        .fromTo(
          '[data-hero-cta]',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.4'
        )
        .fromTo(
          '[data-hero-scroll]',
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45 },
          '-=0.15'
        )

      // Parallax on text wrapper
      gsap.to('[data-hero-parallax]', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  // Typewriter for "Full Stack Developer"
  const runTypewriter = () => {
    const el = typewriterRef.current
    if (!el) return
    const text = 'Full Stack Developer'
    el.textContent = ''
    const cursor = document.createElement('span')
    cursor.textContent = '▍'
    cursor.style.color = '#2DDF8A'
    cursor.style.marginLeft = '4px'
    cursor.style.animation = 'blink 1s steps(1) infinite'
    el.appendChild(cursor)

    let i = 0
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval)
        return
      }
      const char = document.createTextNode(text[i])
      el.insertBefore(char, cursor)
      i++
    }, 50)
  }

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []
    const COUNT = 38

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.4 + 0.4,
          o: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45, 223, 138, ${p.o * 0.5})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const onResize = () => {
      cancelAnimationFrame(raf)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      resize()
      init()
      draw()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Local keyframes for typewriter cursor blink
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `@keyframes blink { 50% { opacity: 0 } }`
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const renderLetters = (text: string, prefix: string) =>
    text.split('').map((char, i) => (
      <span
        key={`${prefix}-${i}`}
        data-letter
        className="inline-block"
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ))

  return (
    <section
      id="inicio"
      ref={rootRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-bg-primary"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />
      {/* Background radial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(92,255,171,0.20) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div data-hero-parallax className="container-fluid relative z-10 py-32">
        <div
          data-hero-line-top
          className="accent-line-solid mb-10 w-full origin-left"
          aria-hidden
        />

        <h1 className="text-display leading-[0.9] tracking-tightest">
          <span
            data-hero-first
            className="block overflow-hidden text-6xl sm:text-7xl md:text-8xl lg:text-[10rem]"
          >
            {renderLetters('MAXIMO', 'a')}
          </span>
          <span
            data-hero-second
            className="block overflow-hidden text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] text-ink-primary"
          >
            {renderLetters('GALVEZ LANDERS', 'b')}
          </span>
        </h1>

        <div
          data-hero-line-mid
          className="accent-line-solid my-10 w-full origin-left"
          aria-hidden
        />

        <p className="font-mono text-lg uppercase tracking-[0.4em] text-ink-primary md:text-2xl">
          <span ref={typewriterRef} />
        </p>

        <div
          data-hero-line-bot
          className="accent-line my-10 w-2/3 origin-left md:w-1/2"
          aria-hidden
        />

        <p
          data-hero-bio
          className="max-w-2xl text-display text-xl leading-relaxed text-ink-secondary md:text-2xl"
        >
          &ldquo;Apasionado por construir aplicaciones web modernas, escalables y con
          atención obsesiva al detalle. Cada línea de código tiene un propósito.&rdquo;
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a data-hero-cta href="#proyectos" className="btn-accent">
            Ver proyectos
            <ArrowDown size={16} />
          </a>
          <a
            data-hero-cta
            href="/cv-maximo-galvez-landers.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            Descargar CV
            <Download size={16} />
          </a>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#sobre-mi"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-accent animate-bounce-slow"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  )
}
