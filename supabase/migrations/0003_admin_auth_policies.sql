create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop policy if exists "Admin can manage articles" on public.articles;
drop policy if exists "Admin can manage categories" on public.categories;
drop policy if exists "Admin can manage tags" on public.tags;
drop policy if exists "Admin can manage series" on public.series;
drop policy if exists "Admin can manage media" on public.media_assets;

create policy "Admin can read own profile"
  on public.profiles for select
  using (id = auth.uid());

create policy "Admin can update own profile"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = 'admin');

create policy "Admin can manage articles"
  on public.articles for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin can manage categories"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin can manage tags"
  on public.tags for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin can manage series"
  on public.series for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin can manage article tags"
  on public.article_tags for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin can manage media"
  on public.media_assets for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Authenticated admin can manage article images" on storage.objects;
drop policy if exists "Authenticated admin can manage draft media" on storage.objects;
drop policy if exists "Authenticated admin can manage ebooks" on storage.objects;

create policy "Admin can manage article images"
  on storage.objects for all
  using (bucket_id = 'article-images' and public.is_admin())
  with check (bucket_id = 'article-images' and public.is_admin());

create policy "Admin can manage draft media"
  on storage.objects for all
  using (bucket_id = 'draft-media' and public.is_admin())
  with check (bucket_id = 'draft-media' and public.is_admin());

create policy "Admin can manage ebooks"
  on storage.objects for all
  using (bucket_id = 'ebooks' and public.is_admin())
  with check (bucket_id = 'ebooks' and public.is_admin());
