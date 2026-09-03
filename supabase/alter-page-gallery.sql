-- Run once in the Supabase SQL editor so each book page can have its own photos.
alter table public.products
  add column if not exists page_gallery jsonb not null default '[]'::jsonb;
