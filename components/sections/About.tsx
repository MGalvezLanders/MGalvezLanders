'use client'

import { useEffect, useRef } from 'react'
import { MapPin, CheckCircle2, Globe, ExternalLink } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionTitle from '@/components/ui/SectionTitle'
import { stats, contact } from '@/lib/data'

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-paragraph]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-about-text]', start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      gsap.fromTo(
        '[data-about-stat]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-about-stats]', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      // Counter animation for numeric stats
      document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
        const target = parseFloat(el.dataset.counter || '0')
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString()
          },
        })
      })

      gsap.fromTo(
        '[data-about-badge]',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-about-badges]', start: 'top 90%', toggleActions: 'play none none none' },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="sobre-mi"
      ref={rootRef}
      className="relative w-full bg-bg-primary py-32"
    >
      <div className="container-fluid">
        <SectionTitle eyebrow="01 / Sobre mí" title="Quién soy" />

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div data-about-text className="flex flex-col gap-6">
            <p
              data-about-paragraph
              className="text-lg leading-relaxed text-ink-primary md:text-xl"
            >
              Soy <span className="text-accent-light">Maximo Galvez Landers</span>,
              desarrollador Full Stack de Tucumán, Argentina. Actualmente en
              formación intensiva en el bootcamp <strong>Henry</strong> (Full Time,
              Feb–Jun 2026), donde construyo aplicaciones reales con React,
              TypeScript, Node.js y PostgreSQL.
            </p>
            <p
              data-about-paragraph
              className="text-lg leading-relaxed text-ink-secondary md:text-xl"
            >
              Lo que me diferencia: <span className="text-accent-light">aprendo rápido</span>.
              En menos de 5 meses pasé de cero a construir e-commerces full stack
              con autenticación, base de datos en tiempo real y deploy en
              producción. Vengo del rugby de alto rendimiento — fui parte del{' '}
              <span className="text-ink-primary">Plan de Alto Rendimiento de la UAR</span>{' '}
              (Unión Argentina de Rugby) — y esa disciplina la aplico al código:
              entrega en tiempo y forma, trabajo en equipo, y nunca bajar los brazos.
            </p>
            <p
              data-about-paragraph
              className="text-lg leading-relaxed text-ink-secondary md:text-xl"
            >
              <a
                href={contact.efSetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-light underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
              >
                Inglés C2 certificado (EF SET) <ExternalLink size={14} />
              </a>
              . Disponible para trabajo remoto y proyectos freelance.
            </p>

            <div data-about-badges className="mt-6 flex flex-wrap gap-3">
              <span data-about-badge className="inline-flex items-center gap-2 border border-[color:var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink-secondary">
                <MapPin size={14} className="text-accent" /> Tucumán, AR
              </span>
              <span data-about-badge className="inline-flex items-center gap-2 border border-[color:var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink-secondary">
                <CheckCircle2 size={14} className="text-accent" /> Disponible para trabajar
              </span>
              <span data-about-badge className="inline-flex items-center gap-2 border border-[color:var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink-secondary">
                <Globe size={14} className="text-accent" /> Open to remote
              </span>
            </div>
          </div>

          <div
            data-about-stats
            className="card-elevated relative p-8 md:p-10"
          >
            <div className="absolute -left-px top-0 h-12 w-px bg-accent" aria-hidden />
            <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              En números
            </h3>
            <ul className="flex flex-col gap-8">
              {stats.map((stat, i) => {
                const numeric = /^\d+$/.test(stat.value)
                return (
                  <li key={i} data-about-stat className="flex items-baseline gap-4 border-b border-[color:var(--color-border)] pb-6 last:border-b-0 last:pb-0">
                    <div className="text-display text-5xl text-accent-gradient md:text-6xl">
                      {numeric ? (
                        <span data-counter={stat.value}>0</span>
                      ) : (
                        stat.value
                      )}
                      <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                    </div>
                    <p className="text-sm text-ink-secondary md:text-base">
                      {stat.label}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
