import { NextResponse } from 'next/server'

type Payload = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const escape = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export async function POST(request: Request) {
  let body: Payload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const subject = (body.subject ?? 'Consulta').trim()
  const message = (body.message ?? '').trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Faltan campos requeridos (nombre, email, mensaje).' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Email no válido.' },
      { status: 400 }
    )
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: 'Mensaje demasiado largo.' },
      { status: 400 }
    )
  }

  const to = process.env.CONTACT_EMAIL_TO || 'galvezlandersmaximo@gmail.com'
  const html = buildEmailHtml({ name, email, subject, message })
  const text = buildEmailText({ name, email, subject, message })

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const from = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev'

      const { error } = await resend.emails.send({
        from: `Portfolio <${from}>`,
        to: [to],
        replyTo: email,
        subject: `[Portfolio] ${subject} — ${name}`,
        html,
        text,
      })
      if (error) throw new Error(error.message)
      return NextResponse.json({ ok: true })
    }

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      await transporter.sendMail({
        from: `Portfolio <${process.env.GMAIL_USER}>`,
        to,
        replyTo: email,
        subject: `[Portfolio] ${subject} — ${name}`,
        html,
        text,
      })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json(
      {
        error:
          'El servicio de email no está configurado. Definí RESEND_API_KEY o GMAIL_USER/GMAIL_APP_PASSWORD.',
      },
      { status: 500 }
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

function buildEmailHtml(p: Required<Pick<Payload, 'name' | 'email' | 'subject' | 'message'>>) {
  return `<!doctype html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#F4F7FB;font-family:Geist,system-ui,sans-serif;color:#0B1220;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FB;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid rgba(15,23,42,0.08);">
        <tr><td style="padding:32px 40px 16px;border-bottom:1px solid rgba(15,23,42,0.08);">
          <h1 style="margin:0;font-family:Geist,system-ui,sans-serif;font-weight:500;color:#2563EB;font-size:24px;letter-spacing:-0.01em;">Nuevo mensaje del portfolio</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.3em;color:#2563EB;text-transform:uppercase;">De</p>
          <p style="margin:0 0 24px;font-size:16px;color:#0B1220;">${escape(p.name)} &lt;${escape(p.email)}&gt;</p>

          <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.3em;color:#2563EB;text-transform:uppercase;">Asunto</p>
          <p style="margin:0 0 24px;font-size:16px;color:#0B1220;">${escape(p.subject)}</p>

          <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.3em;color:#2563EB;text-transform:uppercase;">Mensaje</p>
          <div style="padding:16px;background:#F4F7FB;border-left:2px solid #2563EB;font-size:15px;line-height:1.6;color:#0B1220;white-space:pre-wrap;">${escape(p.message)}</div>
        </td></tr>
        <tr><td style="padding:16px 40px;border-top:1px solid rgba(15,23,42,0.08);">
          <p style="margin:0;font-size:11px;color:#94A3B8;">Enviado desde maximogalvez.dev</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function buildEmailText(p: Required<Pick<Payload, 'name' | 'email' | 'subject' | 'message'>>) {
  return `Nuevo mensaje del portfolio

De: ${p.name} <${p.email}>
Asunto: ${p.subject}

${p.message}

—
Enviado desde maximogalvez.dev`
}
