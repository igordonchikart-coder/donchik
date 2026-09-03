-- Igor Donchik Art — run this once in the Supabase SQL editor.
-- Then: Authentication → Users should already contain the admin account.
-- Storage → create a public bucket named `product-images` if the insert below is skipped.

create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text not null default '',
  image text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null default '',
  description text not null default '',
  price numeric not null default 0,
  original_price numeric,
  currency text not null default 'EUR',
  cover_image text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  page_gallery jsonb not null default '[]'::jsonb,
  category_id text not null references public.categories (id) on delete restrict,
  stock integer not null default 0,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  is_on_sale boolean not null default false,
  sale_label text,
  delivery_note text,
  condition_note text,
  status text not null default 'available' check (status in ('available', 'coming-soon')),
  volume_number integer not null default 1,
  features jsonb not null default '[]'::jsonb,
  chapters jsonb not null default '[]'::jsonb,
  release_year integer,
  has_video boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products
  add column if not exists page_gallery jsonb not null default '[]'::jsonb;

create table if not exists public.orders (
  id text primary key,
  customer jsonb not null,
  items jsonb not null,
  total_price numeric not null,
  currency text not null default 'EUR',
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_slug_idx on public.products (slug);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "public read categories" on public.categories;
drop policy if exists "admin write categories" on public.categories;
drop policy if exists "public read products" on public.products;
drop policy if exists "admin write products" on public.products;
drop policy if exists "public insert orders" on public.orders;
drop policy if exists "admin read orders" on public.orders;
drop policy if exists "admin update orders" on public.orders;

create policy "public read categories"
  on public.categories for select
  using (true);

create policy "admin write categories"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

create policy "public read products"
  on public.products for select
  using (true);

create policy "admin write products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

create policy "public insert orders"
  on public.orders for insert
  with check (true);

create policy "admin read orders"
  on public.orders for select
  to authenticated
  using (true);

create policy "admin update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public read product images" on storage.objects;
drop policy if exists "admin upload product images" on storage.objects;
drop policy if exists "admin update product images" on storage.objects;
drop policy if exists "admin delete product images" on storage.objects;

create policy "public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "admin upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "admin update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

create policy "admin delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

insert into public.categories (id, slug, title, description)
values
  (
    'series-panzer-camouflage',
    'panzer-camouflage',
    'Panzer Camouflage',
    'Illustrated reference volumes on camouflage patterns of armored units.'
  ),
  (
    'series-military-symbols',
    'german-military-symbols',
    'German Military Symbols',
    'Tactical symbols and markings used by German forces in WWII.'
  ),
  (
    'series-unit-insignia',
    'german-military-unit-insignia',
    'German Military Unit Insignia',
    'Encyclopedia of unit insignia for modelers and historical researchers.'
  )
on conflict (id) do nothing;
