# Maximo Galvez Landers — Portfolio

Portfolio web profesional construido con **Next.js 14**, **TypeScript**, **TailwindCSS** y **GSAP**.

## Stack

- Next.js 14 (App Router)
- TypeScript estricto
- TailwindCSS v3
- GSAP 3 + ScrollTrigger
- Resend (con fallback Nodemailer/Gmail) para el formulario de contacto
- Lucide React para iconografía
- React Hot Toast para notificaciones

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto basado en `.env.example`:

```env
# Opción 1 (recomendada) — Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=galvezlandersmaximo@gmail.com
CONTACT_EMAIL_FROM=onboarding@resend.dev

# Opción 2 (fallback) — Gmail con App Password
GMAIL_USER=tucorreo@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

> Conseguí tu API key gratis en [resend.com](https://resend.com).
> Para Gmail, generá una [App Password](https://myaccount.google.com/apppasswords) (requiere 2FA habilitado).

Si ninguna de las dos está configurada, el formulario devolverá un error 500.

## Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Estructura

```
/app
  /api/contact/route.ts   API del formulario
  /layout.tsx             Metadata SEO + fuentes + cursor
  /page.tsx               Página principal
/components
  /sections               Hero, About, Skills, Projects, Contact, Footer
  /ui                     CustomCursor, NavBar, SectionTitle, GoldDivider
/lib
  /gsap.ts                GSAP + ScrollTrigger setup
  /data.ts                Toda la data del portfolio
/styles/globals.css       Variables CSS, design tokens, scrollbar
/public                   Assets estáticos (poner aquí og-image.png, cv.pdf)
```

## CV y assets

Colocar en `/public`:

- `cv-maximo-galvez-landers.pdf` — referenciado por el botón "Descargar CV"
- `og-image.png` (1200×630) — usado por Open Graph / Twitter

## Deploy

Optimizado para Vercel. Push a GitHub y conectar el repo en [vercel.com](https://vercel.com).
Configurar las variables de entorno en el dashboard de Vercel antes del primer deploy.
