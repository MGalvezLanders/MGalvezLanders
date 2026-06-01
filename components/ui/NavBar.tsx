'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { navLinks } from '@/lib/data'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = logoRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (open) {
      gsap.fromTo(
        overlay,
        { clipPath: 'circle(0% at 90% 5%)' },
        { clipPath: 'circle(150% at 90% 5%)', duration: 0.7, ease: 'power3.inOut' }
      )
      gsap.fromTo(
        overlay.querySelectorAll('[data-mobile-link]'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      )
    } else {
      gsap.to(overlay, {
        clipPath: 'circle(0% at 90% 5%)',
        duration: 0.5,
        ease: 'power3.inOut',
      })
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[color:var(--color-border)] bg-bg-primary/85 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-fluid flex h-20 items-center justify-between">
          <a href="#inicio" aria-label="Inicio" className="group">
            <span
              ref={logoRef}
              className="block text-display text-2xl tracking-[0.3em] text-accent-light transition-colors duration-300 group-hover:text-accent"
              style={{ opacity: 0 }}
            >
              MGL
            </span>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm uppercase tracking-[0.2em] text-ink-secondary transition-colors duration-300 hover:text-accent-light"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a href="#contacto" className="hidden md:inline-flex btn-accent !px-5 !py-2.5 !text-xs">
            Contratame
          </a>

          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="text-accent md:hidden"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-bg-primary md:hidden"
        style={{ clipPath: 'circle(0% at 90% 5%)' }}
        aria-hidden={!open}
      >
        <div className="container-fluid flex h-20 items-center justify-end">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="text-accent"
          >
            <X size={28} />
          </button>
        </div>
        <ul className="container-fluid mt-16 flex flex-col gap-8">
          {navLinks.map((link) => (
            <li key={link.href} data-mobile-link>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-display text-4xl text-ink-primary transition-colors hover:text-accent-light"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li data-mobile-link className="mt-8">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="btn-accent inline-flex"
            >
              Contratame
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
