# OutfitIQ — Your Wardrobe. Reimagined.

Premium product website for **OutfitIQ**, a fashion-technology brand focused on smart wardrobe management and intelligent outfit recommendations.

> **Important:** Hardware capabilities (automated washing, drying, ironing) are presented as **proposed product vision**. The website implements a fully functional **digital wardrobe**, authentication, early-access registration, and a **rule-based** recommendation engine. No physical hardware or external AI API is claimed as live.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 6, TypeScript, Tailwind CSS 4, React Router 7, Lucide React |
| Backend | Vercel Serverless Functions (`/api`) |
| Database | Neon Serverless PostgreSQL + Drizzle ORM |
| Auth | Session cookies, bcrypt password hashing |
| Deploy | GitHub → Vercel + Neon |

## Project structure

```
outfitiq-app/
├── api/                    # Vercel serverless API routes
│   ├── auth/               # register, login, logout, me
│   ├── wardrobe/           # CRUD clothing items
│   ├── outfits/            # save/list/delete outfits
│   ├── early-access.ts
│   ├── recommend.ts
│   └── _lib/               # shared helpers
├── server/
│   ├── db/                 # schema, client, migrate
│   ├── services/           # auth, recommend engine
│   └── validators/         # Zod schemas
├── src/
│   ├── components/         # UI, layout, home sections
│   ├── pages/              # route pages
│   ├── hooks/              # useAuth
│   ├── services/           # frontend API client
│   ├── types/
│   └── utils/
├── drizzle/                # generated migrations (after db:generate)
├── public/
├── package.json
├── vite.config.ts
├── drizzle.config.ts
├── vercel.json
└── .env.example
```

## Local setup

### 1. Install dependencies

```bash
cd outfitiq-app
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
SESSION_SECRET=generate-a-long-random-string-at-least-32-chars
APP_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Create Neon database

1. Go to [console.neon.tech](https://console.neon.tech) and create a project.
2. Copy the connection string into `DATABASE_URL`.
3. Push the schema:

```bash
# Option A — Drizzle push (quick, good for first setup)
npx drizzle-kit push

# Option B — Generate + migrate
npm run db:generate
npm run db:migrate
```

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:5173

> **API note:** Vercel serverless routes under `/api` run on Vercel. For local API testing, either:
> - Use `vercel dev` (recommended after linking the project), or
> - Deploy to a Vercel preview and point the frontend at it.

For pure frontend development, pages and UI work without the API; auth and wardrobe require the API + Neon.

### 5. Tests

```bash
npm test
npm run lint
npm run build
```

## Deployment (GitHub + Vercel + Neon)

### A. GitHub

```bash
cd outfitiq-app
git init
git add .
git commit -m "Initial OutfitIQ website"
# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USER/outfitiq.git
git branch -M main
git push -u origin main
```

**Never commit `.env`.** It is listed in `.gitignore`.

### B. Neon

1. Create a Neon project and database.
2. Copy the pooled or direct connection string.
3. Run migrations against production:

```bash
DATABASE_URL="your-neon-url" npx drizzle-kit push
```

### C. Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite**.
3. Add environment variables in Project Settings → Environment Variables:

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon connection string |
| `SESSION_SECRET` | Long random secret |
| `APP_URL` | `https://your-project.vercel.app` |
| `NODE_ENV` | `production` |

4. Deploy. Vercel will build with `npm run build` and serve serverless functions from `/api`.

5. After first deploy, confirm:
   - Homepage loads
   - Early access form submits
   - Register / login works
   - Wardrobe CRUD works
   - Recommendations return data when items exist

### D. Custom domain (optional)

Add a domain in Vercel → Settings → Domains. Update `APP_URL` and sitemap URLs if needed.

## Features implemented

### Public site
- Responsive homepage with hero, problem/solution, features, how-it-works, interactive outfit preview, benefits, FAQ, early-access form
- How It Works, Features, About, Privacy, Terms pages
- SEO: titles, meta, Open Graph, robots.txt, sitemap

### Auth
- Register / login / logout
- bcrypt password hashing
- HttpOnly session cookies (14-day expiry)
- Protected wardrobe routes (server-side session check)

### Digital wardrobe
- Add items (name, category, colour, season, occasion, optional image URL)
- Grid view with filters
- Delete items
- Rule-based outfit suggestions (occasion + weather)
- Empty and loading states

### Early access
- Name, email, interest category, consent
- Duplicate email handling
- Stored in Neon `early_access_signups`

## Design system

- Background: near-black (`#0a0a0a`)
- Text: off-white (`#f5f5f0`)
- Accent: electric lime (`#b8f200`)
- Cards: subtle borders, soft glass, restrained radii
- Typography: Outfit (display) + Inter (body)
- Fully responsive; reduced-motion respected

## Manual QA checklist

- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds
- [ ] `npm test` passes
- [ ] Neon schema applied
- [ ] Register new user → redirected to wardrobe
- [ ] Login / logout
- [ ] Add / filter / delete clothing items
- [ ] Generate recommendations with ≥2 items
- [ ] Early access form success + duplicate email error
- [ ] Mobile nav works
- [ ] Keyboard focus visible on controls

## Licence

Private / all rights reserved for the OutfitIQ brand concept. Code provided for deployment of this project.
