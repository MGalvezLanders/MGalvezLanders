'use client'

import { useEffect, useRef } from 'react'
import { Trophy, Users, Target } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import SectionTitle from '@/components/ui/SectionTitle'
import { rugby } from '@/lib/data'

const values = [
  {
    icon: Target,
    title: 'Disciplina',
    text: 'Entrenamientos diarios, alimentación, descanso — los mismos hábitos los aplico al código.',
  },
  {
    icon: Users,
    title: 'Trabajo en equipo',
    text: 'En la cancha y en el repo: comunicación clara, confianza y rol definido bajo presión.',
  },
  {
    icon: Trophy,
    title: 'Mejora continua',
    text: 'Revisión de video, métricas, feedback constante. Misma mentalidad para crecer como dev.',
  },
]

export default function Rugby() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-rugby-milestone]',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-rugby-timeline]',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '[data-rugby-value]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-rugby-values]',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="rugby"
      ref={rootRef}
      className="relative w-full bg-bg-primary py-32"
    >
      <div className="container-fluid">
        <SectionTitle
          eyebrow="05 / Alto Rendimiento"
          title="Rugby"
          subtitle="Más de 13 años compitiendo. Los mismos valores que traigo al desarrollo de software."
        />

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div data-rugby-timeline className="flex flex-col gap-6">
            <div className="card-elevated relative p-6 md:p-8">
              <div className="absolute -left-px top-0 h-12 w-px bg-accent" aria-hidden />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Actualmente
                </span>
                <p className="text-display text-2xl leading-tight md:text-3xl">
                  {rugby.currentDivision} —{' '}
                  <span className="text-accent-light">{rugby.currentTeam}</span>
                </p>
                <p className="mt-1 text-sm text-ink-secondary md:text-base">
                  {rugby.yearsCompetitive}+ años de rugby competitivo ininterrumpidos.
                </p>
              </div>
            </div>

            <div className="relative pl-6">
              <div
                className="absolute left-0 top-2 bottom-2 w-px bg-[color:var(--color-border)]"
                aria-hidden
              />
              <ul className="flex flex-col gap-8">
                {rugby.milestones.map((m) => (
                  <li
                    key={m.title}
                    data-rugby-milestone
                    className="relative"
                  >
                    <span
                      className="absolute -left-[27px] top-1.5 h-3 w-3 border border-accent bg-bg-primary"
                      aria-hidden
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        {m.year}
                      </span>
                      <h4 className="text-display text-xl leading-tight md:text-2xl">
                        {m.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-secondary md:text-base">
                        {m.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            data-rugby-values
            className="flex flex-col gap-4"
          >
            <h3 className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden />
              Lo que traigo al equipo
            </h3>
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  data-rugby-value
                  className="card-elevated flex items-start gap-4 p-5 md:p-6"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-border)] text-accent">
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-base font-medium text-ink-primary md:text-lg">
                      {v.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-ink-secondary">
                      {v.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
