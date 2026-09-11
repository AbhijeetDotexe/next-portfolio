# Abhijeet Rana — portfolio

Personal site for [abhijeetrana.com](https://abhijeetrana.com): selected work, case studies, and engineering notes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy these into `.env.local` when you want the contact and subscribe forms to send real mail:

```bash
RESEND_API_KEY=re_...
# Optional. Defaults to Resend's onboarding sender (dev only).
RESEND_FROM=Portfolio <hello@abhijeetrana.com>
```

Without `RESEND_API_KEY`, local requests succeed in simulation. Production returns 503 so the UI does not pretend mail was sent.

## Content

- Projects: `src/data/projects.ts` (home, `/projects`, and `/projects/[slug]` case studies)
- Essays: `src/content/blog.ts` (list, `/blog/[slug]`, sitemap, RSS at `/feed.xml`)
- Résumé: `src/data/resume.ts` → `/resume` (print-friendly; use browser Save as PDF)

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```
