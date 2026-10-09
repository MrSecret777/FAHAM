# FAHAM Versi 1.0

Independent digital publication in Bahasa Melayu, built with Next.js, Tailwind CSS and Supabase.

## Identity

- Name: FAHAM
- Tagline: Lebih Daripada Sekadar Tahu.
- Concept: Light Minimalist Editorial
- Colors: Warm White `#FAFAF7`, Charcoal `#242424`, Forest Green `#285943`
- Target domain: `faham.vercel.app` subject to availability

## Pages

- `/` homepage with featured writing, latest writing, topics and series
- `/penulisan` article listing with category and search UI
- `/penulisan/[slug]` reading page with sharing and related articles
- `/siri-koleksi` series and special collections
- `/arkib` archive by year and month
- `/admin` dashboard prototype
- `/admin/login` admin login prototype

All sample writing is demo content and should be replaced before production launch.

## Local Development

```bash
pnpm install
pnpm dev
```

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=server-only-never-public
```

Do not import `SUPABASE_SERVICE_ROLE_KEY` into client components.

## Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/0001_faham_v1.sql`.
3. Create a private storage bucket for draft media and a public bucket for published article images.
4. Add one admin user through Supabase Auth.
5. Insert the matching row in `public.profiles`.

## Vercel Deployment

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Set the environment variables from `.env.example`.
4. Deploy.
5. Add `faham.vercel.app` or a custom domain when available.

## GitHub Pages Deployment

This project includes a GitHub Actions workflow for GitHub Pages.

1. Push the source code to a repository named `FAHAM`.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Push to the `main` branch again if needed.

The workflow builds a static export with the `/FAHAM` base path, so the site can load at:

```text
https://mrsecret777.github.io/FAHAM/
```

## Mockup Reference

The agreed FAHAM mockup has been copied to `public/images/faham-mockup-reference.png` for design reference.
