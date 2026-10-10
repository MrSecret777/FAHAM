alter table public.articles
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists reading_minutes int not null default 5,
  add column if not exists scheduled_at timestamptz,
  add column if not exists view_count bigint not null default 0;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_articles_updated_at on public.articles;
create trigger set_articles_updated_at
  before update on public.articles
  for each row
  execute function public.set_updated_at();

insert into storage.buckets (id, name, public)
values
  ('article-images', 'article-images', true),
  ('draft-media', 'draft-media', false),
  ('ebooks', 'ebooks', true)
on conflict (id) do nothing;

create policy "Public can read article images"
  on storage.objects for select
  using (bucket_id = 'article-images');

create policy "Public can read ebooks"
  on storage.objects for select
  using (bucket_id = 'ebooks');

create policy "Authenticated admin can manage article images"
  on storage.objects for all
  using (bucket_id = 'article-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'article-images' and auth.role() = 'authenticated');

create policy "Authenticated admin can manage draft media"
  on storage.objects for all
  using (bucket_id = 'draft-media' and auth.role() = 'authenticated')
  with check (bucket_id = 'draft-media' and auth.role() = 'authenticated');

create policy "Authenticated admin can manage ebooks"
  on storage.objects for all
  using (bucket_id = 'ebooks' and auth.role() = 'authenticated')
  with check (bucket_id = 'ebooks' and auth.role() = 'authenticated');

create or replace view public.published_articles as
select
  a.id,
  a.slug,
  a.title,
  coalesce(a.seo_title, a.title) as seo_title,
  coalesce(a.seo_description, a.excerpt) as seo_description,
  a.excerpt,
  a.content,
  a.cover_path,
  a.reading_minutes,
  a.view_count,
  a.published_at,
  c.name as category_name,
  c.slug as category_slug,
  s.title as series_title,
  s.slug as series_slug
from public.articles a
left join public.categories c on c.id = a.category_id
left join public.series s on s.id = a.series_id
where a.status = 'published'
  and a.published_at is not null
  and a.published_at <= now();
