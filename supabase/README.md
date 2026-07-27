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

## Live Admin: Supabase + Vercel setup

This version has a working content dashboard. Follow these steps before opening `/admin/login`:

1. In **Supabase → SQL Editor**, open `supabase/schema.sql`, copy all of it, and click **Run**.
2. Go to **Authentication → Users → Add user**. Set your admin email/password. Keep this password private.
3. In **Project Settings → API**, copy the Project URL and the `anon`/publishable key. Do not share your `service_role` key.
4. In **Vercel → Project → Settings → Environment Variables**, add these for Production, Preview, and Development:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_SITE_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
```

5. Redeploy from Vercel's Deployments page. Visit `https://YOUR-VERCEL-DOMAIN/admin/login` and use the account from step 2.

Profile, contact details, CV links, skills, projects, gallery uploads, and certificates save in Supabase. The public homepage reads that content on load.
