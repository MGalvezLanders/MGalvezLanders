'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type Props = {
  className?: string
  align?: 'left' | 'center' | 'right'
  width?: string
}

export default function AccentDivider({
  className = '',
  align = 'center',
  width = '100%',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const origin = align === 'left' ? 'left center' : align === 'right' ? 'right center' : 'center center'
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: origin },
      {
        scaleX: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      }
    )
    return () => ScrollTrigger.getAll().forEach((t) => t.vars.trigger === el && t.kill())
  }, [align])

  return (
    <div
      ref={ref}
      className={`accent-line ${className}`}
      style={{ width }}
      aria-hidden
    />
  )
}
