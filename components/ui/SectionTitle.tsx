'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('[data-anim]')
    const tween = gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`mb-16 flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start'}`}
    >
      {eyebrow && (
        <span
          data-anim
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          {eyebrow}
        </span>
      )}
      <h2
        data-anim
        className="text-display text-4xl leading-tight md:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-anim
          className="max-w-2xl text-base text-ink-secondary md:text-lg"
        >
          {subtitle}
        </p>
      )}
      <div data-anim className="accent-line mt-2 w-24" aria-hidden />
    </div>
  )
}
