create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Admin FAHAM',
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  cover_path text,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id),
  category_id uuid references public.categories(id),
  series_id uuid references public.series(id),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb not null default '{}'::jsonb,
  cover_path text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  uploaded_by uuid references public.profiles(id),
  storage_path text not null,
  alt_text text,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.series enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;
alter table public.media_assets enable row level security;

create policy "Public can read published articles"
  on public.articles for select
  using (status = 'published');

create policy "Admin can manage articles"
  on public.articles for all
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Public can read taxonomy"
  on public.categories for select using (true);
create policy "Public can read tags"
  on public.tags for select using (true);
create policy "Public can read series"
  on public.series for select using (true);

create policy "Admin can manage categories"
  on public.categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can manage tags"
  on public.tags for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can manage series"
  on public.series for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can manage media"
  on public.media_assets for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create index articles_status_published_at_idx on public.articles(status, published_at desc);
create index articles_slug_idx on public.articles(slug);
