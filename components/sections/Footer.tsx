'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import AccentDivider from '@/components/ui/AccentDivider'
import { contact } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="relative w-full bg-bg-primary pt-16 pb-10">
      <div className="container-fluid">
        <AccentDivider align="left" />

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-display text-3xl text-accent-light md:text-4xl">
              Maximo Galvez Landers
            </h3>
            <p className="mt-4 max-w-md text-sm text-ink-secondary">
              Desarrollado con Next.js, TypeScript &amp; GSAP.
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              © {new Date().getFullYear()} — Tucumán, Argentina
            </p>
          </div>

          <ul className="flex gap-3">
            <li>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-12 w-12 items-center justify-center border border-[color:var(--color-border)] text-ink-secondary transition-all duration-300 hover:border-accent hover:text-accent-light"
              >
                <Github size={18} />
              </a>
            </li>
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-12 w-12 items-center justify-center border border-[color:var(--color-border)] text-ink-secondary transition-all duration-300 hover:border-accent hover:text-accent-light"
              >
                <Linkedin size={18} />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="inline-flex h-12 w-12 items-center justify-center border border-[color:var(--color-border)] text-ink-secondary transition-all duration-300 hover:border-accent hover:text-accent-light"
              >
                <Mail size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
