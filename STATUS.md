# FAHAM Versi 1.0 Status

## Completed

- Static frontend deployed through GitHub Pages.
- Next.js App Router scaffold created.
- Tailwind theme matches FAHAM identity.
- Public pages scaffolded: home, writing list, article, series, archive.
- Admin mockup pages scaffolded: dashboard, login, editor.
- Vercel config added.
- Supabase client helpers added.
- Supabase database migrations added.
- Supabase storage bucket migration added.
- API smoke endpoints added: `/api/health`, `/api/articles`.
- SEO routes added: `/sitemap.xml`, `/robots.txt`.
- Admin login server action added.
- Middleware route protection added for `/admin`.
- Admin session endpoint added at `/api/admin/session`.
- Admin RLS hardening migration added.

## Pending

- Real Vercel deployment verification.
- Real Supabase project setup.
- Real Supabase project setup and first admin profile row.
- Verify Admin Auth login flow against live Supabase credentials.
- Database-backed article rendering.
- Working autosave editor.
- Draft, preview, publish and schedule actions.
- Category, tag, series and collection management UI.
- Media upload to Supabase Storage.
- Google Docs import.
- Google Drive archive and backup.
- Google Apps Script automation.
- End-to-end testing.
- Production domain setup for `faham.vercel.app`, if available.

## Next Recommended Task

Deploy this Next.js project to Vercel and verify `/api/health`, then connect the Supabase project environment variables.
