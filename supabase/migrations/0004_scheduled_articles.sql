alter table public.articles
  drop constraint if exists articles_status_check;

alter table public.articles
  add constraint articles_status_check
  check (status in ('draft', 'published', 'scheduled', 'archived'));

create index if not exists articles_scheduled_at_idx
  on public.articles(status, scheduled_at)
  where status = 'scheduled';
