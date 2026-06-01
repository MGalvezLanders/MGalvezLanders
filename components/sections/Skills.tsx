'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import SectionTitle from '@/components/ui/SectionTitle'
import { skillCategories } from '@/lib/data'

export default function Skills() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-skill-category]').forEach((cat) => {
        gsap.fromTo(
          cat.querySelectorAll('[data-skill]'),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cat,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )

        cat.querySelectorAll<HTMLElement>('[data-skill-bar]').forEach((bar) => {
          const target = parseFloat(bar.dataset.percent || '0')
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: target / 100,
              duration: 0.8,
              ease: 'power2.out',
              transformOrigin: 'left center',
              scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative w-full bg-bg-secondary py-32"
    >
      <div className="container-fluid">
        <SectionTitle
          eyebrow="02 / Capacidades"
          title="Stack Tecnológico"
          subtitle="Herramientas y tecnologías con las que trabajo a diario. Niveles autoevaluados con honestidad."
        />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              data-skill-category
              className="card-elevated p-6 md:p-8"
            >
              <h3 className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden />
                {cat.title}
              </h3>
              <ul className="flex flex-col gap-5">
                {cat.skills.map((skill) => (
                  <li key={skill.name} data-skill className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-ink-primary md:text-base">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-secondary">
                        {skill.level}
                      </span>
                    </div>
                    <div className="relative h-px w-full bg-[color:var(--color-border)]">
                      <div
                        data-skill-bar
                        data-percent={skill.percent}
                        className="absolute inset-y-0 left-0 w-full origin-left bg-accent-gradient"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
