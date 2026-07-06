# CV Creator Pro

A modern, ATS-friendly online resume builder. Users enter their information once, watch a live A4 preview update as they type, switch between premium templates without losing data, and export a polished PDF.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase**.

---

## Features

- **Landing page** — hero, how-it-works, features, CTA (server-rendered, SEO-friendly)
- **Authentication** — Google OAuth + email magic links via Supabase Auth
- **Dashboard** — create, rename, duplicate, and delete resumes
- **Builder** — 6 guided steps with progress bar (Personal → Summary → Skills & Languages → Experience → Education & Certifications → Finish)
- **Live preview** — real A4 page that re-renders on every keystroke, with zoom controls
- **5 templates** — Modern, Sidebar, Minimal, Classic, Executive; switching preserves all data
- **Customization** — 6 accent colors, 3 font styles, show/hide any section
- **Profile photo** — uploaded to Supabase Storage, rendered per-template
- **Autosave** — debounced writes to Postgres with a save-state indicator
- **AI assist (optional)** — improve/rewrite the summary in professional, concise, or executive tone via the Anthropic API
- **PDF export** — print-based export with exact-layout print CSS (`@page A4`)
- **Security** — Row Level Security on every table; users can only ever read/write their own rows

## Project structure

```
cv-creator-pro/
├── middleware.ts                 # Session refresh + protects /dashboard and /builder
├── supabase/
│   └── schema.sql                # Tables, RLS policies, triggers, storage bucket
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout, fonts, metadata
│   │   ├── globals.css           # Tailwind + print CSS
│   │   ├── login/page.tsx        # Google OAuth + magic link
│   │   ├── auth/callback/route.ts# Exchanges auth code for session
│   │   ├── dashboard/page.tsx    # My resumes (server component)
│   │   ├── builder/[id]/page.tsx # Builder entry (server component)
│   │   └── api/ai/route.ts       # AI writing assistant (Anthropic)
│   ├── components/
│   │   ├── ui.tsx                # Btn, Field, Area, Card, Logo
│   │   ├── DashboardClient.tsx   # Resume grid + CRUD
│   │   ├── builder/BuilderShell.tsx  # Steps, autosave, preview, photo upload
│   │   └── templates/index.tsx   # 5 resume templates + registry
│   └── lib/
│       ├── types.ts              # ResumeData model, constants, helpers
│       ├── sample-data.ts        # One-click demo resume
│       └── supabase/             # Browser + server clients (@supabase/ssr)
```

## Setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**. This creates the `profiles` and `resumes` tables, RLS policies, triggers, and the public `photos` storage bucket.
3. **Authentication → Providers**: enable **Email** (magic links work out of the box). To enable **Google**, add your OAuth client ID/secret (create one in Google Cloud Console; set the authorized redirect URI to `https://YOUR-PROJECT.supabase.co/auth/v1/callback`).
4. **Authentication → URL Configuration**: add your site URL(s) to the redirect allow-list, e.g. `http://localhost:3000/**` and `https://your-domain.com/**`.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `ANTHROPIC_API_KEY` | *(optional)* console.anthropic.com — enables the AI assistant |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally; your production URL when deployed |

### 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Sign in, create a resume, click **Load sample data** in the builder to see a fully populated resume instantly.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In [vercel.com](https://vercel.com) → **Add New Project** → import the repo. Vercel auto-detects Next.js; no build settings needed.
3. Add the four environment variables from `.env.local` (set `NEXT_PUBLIC_SITE_URL` to your production URL).
4. Deploy, then add the production URL to Supabase's auth redirect allow-list (step 1.4 above).

## PDF export — how it works and how to upgrade

The MVP exports via the browser print dialog with a dedicated print stylesheet: only the A4 resume node (`#cvp-page`) is visible, at 100% scale, with `@page { size: A4; margin: 0 }`. Because the preview and the export are the *same HTML*, layout is preserved exactly — this is the same approach several commercial builders started with.

For server-generated PDFs (needed for DOCX-style background exports or emailing PDFs), the standard Vercel-compatible upgrade is:

1. Add a public, token-guarded print route (e.g. `/print/[id]?token=…`).
2. Add an API route using `puppeteer-core` + `@sparticuz/chromium` (or a hosted service like Browserless) that loads that route and calls `page.pdf({ format: "A4" })`.

## Extending toward the full product spec

The codebase is structured so the remaining roadmap items slot in cleanly:

- **More templates** — add a component to `src/components/templates/` and register it in `TEMPLATE_MAP` + `TEMPLATES`. That's the whole process.
- **More sections (projects, awards, volunteer, custom)** — extend `ResumeData` in `types.ts`, add a step, render in templates. The JSONB `data` column needs no migration.
- **ATS score** — pure client-side function over `ResumeData` (keyword density, action verbs, length checks).
- **Billing / plans** — the `profiles.plan` column is already there; add Stripe checkout + a webhook route that flips it to `premium`, and gate template/AI access on it.
- **Admin panel** — add an `is_admin` flag to profiles plus service-role API routes.
- **DOCX export** — generate server-side with the `docx` npm package from the same `ResumeData`.

## Security notes

- All resume/profile access is enforced by **Postgres RLS** — even a leaked anon key cannot read other users' data.
- Storage policies restrict uploads/updates/deletes to the user's own folder (`{user_id}/…`).
- The AI route requires an authenticated session and caps input length.
- Protected routes are also gated in `middleware.ts` for defense in depth.
