# Ferdous Rahman Fakir — Premium Fashion Portfolio

A black/red editorial-style Next.js portfolio with a protected Supabase admin area, responsive motion design, structured SEO, upload-ready storage, and content schema.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Connect Supabase
1. Create a Supabase project and put its URL/anon key in `.env.local`.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL editor.
3. Create an email/password account under **Authentication → Users**, then sign in at `/admin/login`.
4. Add `SUPABASE_SERVICE_ROLE_KEY` only for trusted server-only operations. Never expose it to the browser.

Database tables cover site settings, skills, projects, media galleries, certificates, and messages. The `portfolio` storage bucket accepts images/PDFs; RLS restricts uploads and edits to authenticated users.

## Deploy
Deploy on Vercel; add all environment variables and set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS site. Add your production and localhost dashboard URLs to Supabase Auth redirect URLs. Run `npm run build` before deploying.

## Structure
- `app/` App Router routes, SEO, APIs
- `components/portfolio.tsx` public animated interface
- `app/admin/` authenticated content studio
- `lib/` helpers, data, Supabase clients
- `supabase/schema.sql` database/RLS/storage

Replace stock visuals, example contact details, and demo certificate data before publishing.
Admin dashboard deployment update.
