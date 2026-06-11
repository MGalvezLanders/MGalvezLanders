'use client'

import { useEffect, useRef } from 'react'
import { GraduationCap, Award, ExternalLink } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import SectionTitle from '@/components/ui/SectionTitle'
import { education, certifications } from '@/lib/data'

export default function Education() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-edu-item]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-edu-list]',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '[data-cert-item]',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-cert-list]',
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
      id="educacion"
      ref={rootRef}
      className="relative w-full bg-bg-secondary py-32"
    >
      <div className="container-fluid">
        <SectionTitle
          eyebrow="04 / Formación"
          title="Educación"
          subtitle="Formación técnica formal e intensiva, complementada con certificaciones verificables."
        />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div data-edu-list className="flex flex-col gap-6">
            <h3 className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden />
              Formación
            </h3>

            {education.map((edu) => (
              <article
                key={edu.title}
                data-edu-item
                className="card-elevated relative p-6 md:p-8"
              >
                <div className="absolute -left-px top-0 h-12 w-px bg-accent" aria-hidden />
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-border)] text-accent">
                    <GraduationCap size={18} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="text-display text-xl leading-tight md:text-2xl">
                        {edu.title}
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-secondary">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-accent-light md:text-base">
                      {edu.institution}
                      {edu.status && (
                        <span className="ml-2 inline-flex items-center border border-accent/40 bg-accent/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-light">
                          {edu.status}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-secondary md:text-base">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div data-cert-list className="flex flex-col gap-6">
            <h3 className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden />
              Certificaciones
            </h3>

            {certifications.map((cert) => {
              const content = (
                <article
                  data-cert-item
                  className="card-elevated group relative p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-border)] text-accent">
                      <Award size={18} />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <h4 className="text-display text-lg leading-tight md:text-xl">
                        {cert.name}
                      </h4>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-secondary">
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-ink-secondary md:text-base">
                        {cert.detail}
                      </p>
                      {cert.url && (
                        <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 group-hover:text-accent-light">
                          Ver certificado
                          <ExternalLink size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )

              return cert.url ? (
                <a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={cert.name}>{content}</div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
