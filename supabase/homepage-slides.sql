-- Homepage hero + discount (CTA) sliders. Run once in the Supabase SQL editor.

create table if not exists public.homepage_slides (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('hero', 'cta')),
  title text not null,
  label text not null default '',
  image text not null default '',
  link_type text not null default 'product' check (link_type in ('product', 'category', 'discounts')),
  product_id uuid references public.products (id) on delete set null,
  category_id text references public.categories (id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists homepage_slides_kind_sort_idx
  on public.homepage_slides (kind, sort_order);

alter table public.homepage_slides enable row level security;

drop policy if exists "public read homepage slides" on public.homepage_slides;
drop policy if exists "admin write homepage slides" on public.homepage_slides;

create policy "public read homepage slides"
  on public.homepage_slides for select
  using (true);

create policy "admin write homepage slides"
  on public.homepage_slides for all
  to authenticated
  using (true)
  with check (true);

-- Seed hero slides from published books when the table is empty.
insert into public.homepage_slides (kind, title, label, image, link_type, product_id, sort_order)
select
  'hero',
  p.title,
  'Volume ' || trim(to_char(p.volume_number, 'RN')),
  coalesce(nullif(p.cover_image, ''), ''),
  'product',
  p.id,
  row_number() over (order by c.title, p.volume_number, p.title) - 1
from public.products p
join public.categories c on c.id = p.category_id
where p.is_available = true
  and not exists (select 1 from public.homepage_slides where kind = 'hero');

-- Seed one discount slide pointing at /discounts when CTA is empty.
insert into public.homepage_slides (kind, title, label, image, link_type, product_id, category_id, sort_order)
select
  'cta',
  'Discounted books',
  '-20%',
  coalesce(nullif(p.cover_image, ''), ''),
  'discounts',
  null,
  null,
  0
from public.products p
where p.is_on_sale = true
  and not exists (select 1 from public.homepage_slides where kind = 'cta')
order by p.updated_at desc
limit 1;
