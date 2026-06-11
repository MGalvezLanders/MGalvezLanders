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
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cat,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
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
          subtitle="Herramientas y tecnologías con las que construyo aplicaciones de punta a punta."
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
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    data-skill
                    className="border border-[color:var(--color-border)] bg-bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-secondary transition-colors duration-300 hover:border-accent hover:text-accent-light"
                  >
                    {skill}
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
