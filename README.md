# Search Modifiers — Agency Website

Production-oriented marketing site for **Search Modifiers**: Next.js (App Router), Tailwind CSS v4, Framer Motion, validated forms via API routes, and SEO (meta, Open Graph image, JSON-LD, `sitemap.xml`, `robots.txt`).

## Prerequisites

- Node.js 20+
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_SITE_URL to http://localhost:3000 for local SEO URLs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Logo

Place your `logo.png` in the `public` folder (e.g. `public/logo.png`). The header uses this path; if the file is missing, a text wordmark appears automatically.

## Forms

Contact, free audit, and quote forms POST to:

- `/api/contact`
- `/api/audit`
- `/api/quote`

Payloads are validated with Zod. Submissions are logged server-side (`console.info`); wire these routes to your CRM, email provider, or queue for production.

## Project structure (high level)

- `src/app/` — routes (core, services, locations, blog, conversion pages), API routes, `sitemap.ts`, `robots.ts`
- `src/components/` — layout (navbar, footer, WhatsApp), UI, motion, forms, service/location templates
- `src/lib/` — site config, navigation, Zod schemas, content data (services, locations, blog, case studies)

## Page count

All requested routes are implemented, including **12 service** pages, **5 location** pages, **6 blog** posts, plus core, trust, FAQ, and conversion pages (45+ routes including API and OG image).
