# FAHAM Deployment Checklist

## Current Target

Move FAHAM from static GitHub Pages to a production-ready Next.js app on Vercel, then connect Supabase.

## Vercel

1. Push the full Next.js project to GitHub.
2. Import the repository in Vercel.
3. Framework should be detected as Next.js.
4. Build command: `pnpm build`
5. Install command: `pnpm install`
6. Output directory: leave empty.
7. Add environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://faham.vercel.app
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` must only be used in server-only code.

## Supabase

Run migrations in order:

```text
supabase/migrations/0001_faham_v1.sql
supabase/migrations/0002_publish_workflow_storage.sql
supabase/migrations/0003_admin_auth_policies.sql
```

Optional demo seed:

```text
supabase/seed/demo.sql
```

Create one admin user in Supabase Auth, then add the matching profile row in `public.profiles`.

Example profile insert after creating the Auth user:

```sql
insert into public.profiles (id, display_name, role)
values ('AUTH_USER_UUID', 'Admin FAHAM', 'admin');
```

## Smoke Tests

After Vercel deploy:

```text
/api/health
/api/articles
/api/admin/session
/sitemap.xml
/robots.txt
/admin/login
```

Expected `/api/health` before Supabase env is configured:

```json
{
  "ok": true,
  "app": "FAHAM",
  "supabaseConfigured": false
}
```

Expected after Supabase env is configured:

```json
{
  "ok": true,
  "app": "FAHAM",
  "supabaseConfigured": true
}
```
