insert into public.categories (name, slug, description)
values
  ('Pemikiran', 'pemikiran', 'Penulisan tentang idea, makna dan kefahaman.'),
  ('Kehidupan', 'kehidupan', 'Penulisan tentang pengalaman dan realiti hidup.'),
  ('Masyarakat', 'masyarakat', 'Penulisan tentang manusia dan hubungan sosial.'),
  ('Sejarah', 'sejarah', 'Penulisan tentang masa lalu dan pengajaran.'),
  ('Ekonomi', 'ekonomi', 'Penulisan tentang ekonomi dan kehidupan.'),
  ('Agama', 'agama', 'Penulisan tentang fitrah, iman dan kefahaman.')
on conflict (slug) do nothing;

insert into public.tags (name, slug)
values
  ('Demo', 'demo'),
  ('Makna', 'makna'),
  ('Fitrah', 'fitrah')
on conflict (slug) do nothing;

insert into public.series (title, slug, description, cover_path)
values
  ('Manusia dan Kehidupan', 'manusia-dan-kehidupan', 'Siri demo tentang manusia dan persoalan kehidupan.', '/images/mountain.svg'),
  ('Fitrah dan Masyarakat', 'fitrah-dan-masyarakat', 'Siri demo tentang fitrah dan masyarakat.', '/images/arch.svg'),
  ('Sejarah dan Pengajaran', 'sejarah-dan-pengajaran', 'Siri demo tentang sejarah dan pengajaran.', '/images/desert.svg')
on conflict (slug) do nothing;
