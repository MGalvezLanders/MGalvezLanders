'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight, Github, Rocket, Clock } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import SectionTitle from '@/components/ui/SectionTitle'
import { projects, type Project } from '@/lib/data'

export default function Projects() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.04,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section
      id="proyectos"
      ref={rootRef}
      className="relative w-full bg-bg-primary py-32"
    >
      <div className="container-fluid">
        <SectionTitle
          eyebrow="03 / Trabajo"
          title="Proyectos"
          subtitle="Construidos, deployados, en producción."
        />

        <div className="flex flex-col gap-8">
          {featured && <FeaturedCard project={featured} />}
          <div className="grid gap-8 md:grid-cols-2">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article
      data-project-card
      className="card-elevated group relative overflow-hidden p-8 md:p-12"
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Featured
            </span>
            {project.badge && (
              <span className="border border-accent/40 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-light">
                {project.badge}
              </span>
            )}
          </div>

          <h3 className="text-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            {project.title}
          </h3>

          <p className="max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-[color:var(--color-border)] bg-bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-secondary"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap gap-4">
            {project.comingSoon ? (
              <span className="btn-ghost cursor-default opacity-80">
                <Clock size={16} />
                Deploy próximamente
              </span>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-accent"
              >
                Ver en vivo
                <ArrowUpRight size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                GitHub
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden border border-[color:var(--color-border)] transition-colors duration-300 group-hover:border-accent">
          {project.comingSoon ? (
            <ComingSoonPreview title={project.title} />
          ) : (
            <iframe
              src={project.liveUrl}
              title={project.title}
              className="pointer-events-none absolute inset-0 h-full w-full"
              loading="lazy"
              style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '143%', height: '143%' }}
            />
          )}
        </div>
      </div>
    </article>
  )
}

function ComingSoonPreview({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-secondary p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center border border-accent/40 bg-accent/5 text-accent">
        <Rocket size={22} />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        En despliegue
      </p>
      <p className="text-display text-xl leading-tight text-ink-primary md:text-2xl">
        {title}
      </p>
      <p className="max-w-xs text-sm text-ink-secondary">
        Deploy en Vercel próximamente — el código y la arquitectura ya están listos.
      </p>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      data-project-card
      className="card-elevated group relative flex flex-col overflow-hidden p-8"
    >
      {project.badge && (
        <span className="mb-4 inline-flex w-fit border border-accent/40 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-light">
          {project.badge}
        </span>
      )}

      <h3 className="text-display text-3xl leading-tight md:text-4xl">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-ink-secondary md:text-base">
        {project.description}
      </p>

      {project.badgeNote && (
        <p className="mt-3 italic text-xs text-accent-light/80">
          {project.badgeNote}
        </p>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border border-[color:var(--color-border)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-secondary"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent transition-all duration-300 hover:text-accent-light"
        >
          Ver proyecto
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  )
}
