'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Github, MapPin, Phone, Send, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { gsap } from '@/lib/gsap'
import SectionTitle from '@/components/ui/SectionTitle'
import { contact } from '@/lib/data'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Freelance',
    message: '',
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-info] > *',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-contact-info]', start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      gsap.fromTo(
        '[data-contact-field]',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-contact-form]', start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    const t = toast.loading('Enviando mensaje…', {
      style: { background: '#FFFFFF', color: '#0B1220', border: '1px solid rgba(37,99,235,0.5)' },
    })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'No se pudo enviar el mensaje.')
      }

      toast.success('¡Mensaje enviado! Te respondo pronto.', {
        id: t,
        style: { background: '#FFFFFF', color: '#0B1220', border: '1px solid rgba(37,99,235,0.7)' },
        iconTheme: { primary: '#2563EB', secondary: '#FFFFFF' },
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: 'Freelance', message: '' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al enviar.'
      toast.error(msg, {
        id: t,
        style: { background: '#FFFFFF', color: '#0B1220', border: '1px solid #d63b34' },
      })
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-[color:var(--color-border)] bg-bg-card px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted transition-colors duration-300 focus:border-accent focus:outline-none'

  return (
    <section
      id="contacto"
      ref={rootRef}
      className="relative w-full bg-bg-secondary py-32"
    >
      <div className="container-fluid">
        <SectionTitle
          eyebrow="06 / Contacto"
          title="Trabajemos juntos"
          subtitle="Estoy disponible para proyectos freelance y posiciones full-time."
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div data-contact-info className="flex flex-col gap-8">
            <ContactRow
              icon={<Mail size={18} />}
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <ContactRow
              icon={<Phone size={18} />}
              label="Teléfono"
              value={contact.phone}
              href={contact.phoneHref}
            />
            <ContactRow
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="maximo-galvez-landers"
              href={contact.linkedin}
            />
            <ContactRow
              icon={<Github size={18} />}
              label="GitHub"
              value="MGalvezLanders"
              href={contact.github}
            />
            <ContactRow
              icon={<MapPin size={18} />}
              label="Ubicación"
              value={contact.location}
            />

            <div className="mt-4 border border-[color:var(--color-border)] bg-bg-card p-6">
              <p className="text-display text-2xl leading-tight">
                Respondo en menos de <span className="text-accent-light">24 horas</span>.
              </p>
              <p className="mt-2 text-sm text-ink-secondary">
                Si es urgente, escribime directo por LinkedIn.
              </p>
            </div>
          </div>

          <form
            data-contact-form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 border border-[color:var(--color-border)] bg-bg-card p-8 md:p-10"
          >
            <div data-contact-field className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Nombre completo *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Tu nombre"
              />
            </div>

            <div data-contact-field className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Email *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>

            <div data-contact-field className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Asunto
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass}
              >
                <option>Freelance</option>
                <option>Trabajo full-time</option>
                <option>Consulta</option>
                <option>Otro</option>
              </select>
            </div>

            <div data-contact-field className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Mensaje *
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Contame en qué puedo ayudarte…"
              />
            </div>

            <button
              data-contact-field
              type="submit"
              disabled={status === 'loading'}
              className="btn-accent mt-2 self-start disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  Enviar mensaje
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="group flex items-start gap-4 border-b border-[color:var(--color-border)] pb-6">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-border)] text-accent transition-colors duration-300 group-hover:border-accent">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-secondary">
          {label}
        </span>
        <span className="break-all text-base text-ink-primary transition-colors duration-300 group-hover:text-accent-light md:text-lg">
          {value}
        </span>
      </div>
    </div>
  )
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  )
}
