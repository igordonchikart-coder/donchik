-- Discount-bundle catalog group for multi-book combos.
-- Run once in the Supabase SQL editor.

insert into public.categories (id, slug, title, description, image)
values (
  'series-discount-bundles',
  'discount-bundles',
  'Discount bundle',
  'Multi-book combos sold on the Discounts page only.',
  ''
)
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  description = excluded.description,
  updated_at = now();

update public.products
set
  category_id = 'series-discount-bundles',
  volume_number = 0,
  updated_at = now()
where slug in (
  'complete-bundle-7-books',
  'german-military-symbols-double-combo',
  'panzer-camouflage-4x1-super-combo'
)
or volume_number <= 0;
