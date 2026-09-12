-- Bundle products for discount slider + correct slide links.
-- Run once in the Supabase SQL editor.

-- Allow volume_number 0 for combo / bundle products (shown as "Bundle").
-- (no schema change required; app maps 0 → "Bundle")

insert into public.products (
  slug,
  title,
  short_description,
  description,
  price,
  original_price,
  currency,
  cover_image,
  gallery,
  page_gallery,
  category_id,
  stock,
  is_available,
  is_featured,
  is_on_sale,
  sale_label,
  delivery_note,
  status,
  volume_number,
  features,
  chapters,
  has_video
)
values
(
  'complete-bundle-7-books',
  'Complete Bundle — 7 Books',
  'Seven reference volumes in one discounted set.',
  E'Own the core of Igor Donchik''s published reference library in a single purchase.\n\nThis complete bundle brings together seven illustrated volumes: Panzer Camouflage Vol. I–IV, German Military Symbols Vol. I–II, and German Military Unit Insignia Vol. I. Each book is built from archival photographs and hand-drawn reconstructions for modelers, historians, and collectors.\n\nSave 20% versus buying the volumes separately. Ideal if you want a ready-made foundation across camouflage, tactical symbols, and unit insignia.',
  274.00,
  343.00,
  'EUR',
  'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/50257292-a696-4e7b-84d5-7f8600fa0901.webp',
  jsonb_build_array(
    'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/50257292-a696-4e7b-84d5-7f8600fa0901.webp'
  ),
  jsonb_build_array(
    'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/50257292-a696-4e7b-84d5-7f8600fa0901.webp'
  ),
  'series-discount-bundles',
  25,
  true,
  false,
  true,
  '-20%',
  null,
  'available',
  0,
  jsonb_build_array(
    '7 illustrated reference books',
    '20% bundle discount',
    'Camouflage, symbols, and insignia',
    'Ships as one order'
  ),
  jsonb_build_array(
    jsonb_build_object(
      'title', '__page_meta__',
      'description', jsonb_build_object(
        'headline', 'Complete Bundle of Igor Donchik''s Books (7 books)',
        'seoTitle', 'Complete 7-Book Bundle | Igor Donchik Art',
        'seoDescription', 'Save 20% on seven WWII reference volumes: Panzer Camouflage I–IV, Military Symbols I–II, and Unit Insignia I.',
        'intro', jsonb_build_array(
          'Panzer Camouflage Vol. I–IV — armored camouflage patterns reconstructed plate by plate.',
          'German Military Symbols Vol. I–II — tactical markings used on maps, armor, and roads.',
          'German Military Unit Insignia Vol. I — formation badges redrawn from photographs and documents.'
        ),
        'storyTitle', 'What is included',
        'audience', jsonb_build_array(
          'Collectors building a complete Donchik reference shelf',
          'Modelers who need camouflage, symbols, and insignia together',
          'Readers who prefer one discounted order instead of seven separate purchases'
        )
      )::text
    ),
    jsonb_build_object('title', 'Panzer Camouflage Vol. I–IV', 'description', 'Four volumes on Wehrmacht division camouflage patterns in WWII.'),
    jsonb_build_object('title', 'German Military Symbols Vol. I–II', 'description', 'Two volumes on tactical symbols and map markings.'),
    jsonb_build_object('title', 'German Military Unit Insignia Vol. I', 'description', 'The first volume of the unit insignia atlas.')
  ),
  false
),
(
  'german-military-symbols-double-combo',
  'German Military Symbols Double Combo',
  'Vol. I + Vol. II together at −28%.',
  E'The Double Combo pairs German Military Symbols Volume I and Volume II in one discounted set.\n\nVolume I covers basic composition of tactical symbols, higher HQ and combat-troop markings, special signs, obstacles, demolitions, and map symbols. Volume II continues the atlas with further profiles and wartime examples.\n\nBuy both volumes together and save 28% compared with purchasing them separately.',
  69.90,
  96.90,
  'EUR',
  'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/f0f11d79-df2e-4862-a41d-5cb733e0157d.webp',
  jsonb_build_array(
    'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/f0f11d79-df2e-4862-a41d-5cb733e0157d.webp'
  ),
  jsonb_build_array(
    'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/f0f11d79-df2e-4862-a41d-5cb733e0157d.webp'
  ),
  'series-discount-bundles',
  30,
  true,
  false,
  true,
  '-28%',
  null,
  'available',
  0,
  jsonb_build_array(
    'Volumes I and II included',
    '28% combo discount',
    'Tactical symbols atlas',
    'Detailed wartime profiles'
  ),
  jsonb_build_array(
    jsonb_build_object(
      'title', '__page_meta__',
      'description', jsonb_build_object(
        'headline', 'Double Combo — German Military Symbols Vol. I + Vol. II',
        'seoTitle', 'German Military Symbols Double Combo | Igor Donchik Art',
        'seoDescription', 'Save 28% on German Military Symbols Volumes I and II — the complete tactical symbols reference set.',
        'intro', jsonb_build_array(
          'Volume I establishes the language of German tactical symbols used in WWII.',
          'Volume II expands the atlas with additional formations, services, and map practice.',
          'Ordering both together keeps the set consistent and costs less than two separate purchases.'
        ),
        'storyTitle', 'Why the double combo',
        'audience', jsonb_build_array(
          'Readers starting the Military Symbols series',
          'Wargamers who need a full symbol reference',
          'Collectors who want Vol. I and Vol. II matched as a pair'
        )
      )::text
    ),
    jsonb_build_object('title', 'Volume I', 'description', 'Basic symbols, HQ and combat-troop markings, special signs, obstacles, and map symbols.'),
    jsonb_build_object('title', 'Volume II', 'description', 'Continued profiles and wartime examples that complete the symbols atlas.')
  ),
  false
),
(
  'panzer-camouflage-4x1-super-combo',
  'Panzer Camouflage 4×1 Super Combo',
  'Volumes I–IV in one set at −15%.',
  E'The 4×1 Super Combo collects Panzer Camouflage Volumes I, II, III, and IV — the opening arc of the armored camouflage encyclopedia.\n\nTogether these books cover Wehrmacht division camouflage patterns reconstructed from wartime photographs: early-war finishes, field applications, winter schemes, and the evolution into later patterns.\n\nSave 15% versus buying the four volumes one by one.',
  180.90,
  212.80,
  'EUR',
  'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/07ef9557-6ca1-4245-8b0f-280cb1330880.webp',
  jsonb_build_array(
    'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/07ef9557-6ca1-4245-8b0f-280cb1330880.webp'
  ),
  jsonb_build_array(
    'https://eghhruyajykslilnxrfx.supabase.co/storage/v1/object/public/product-images/cta-slides/07ef9557-6ca1-4245-8b0f-280cb1330880.webp'
  ),
  'series-discount-bundles',
  20,
  true,
  false,
  true,
  '-15%',
  null,
  'available',
  0,
  jsonb_build_array(
    'Panzer Camouflage Vol. I–IV',
    '15% combo discount',
    '180+ profiles per volume class',
    'Hand-drawn reference plates'
  ),
  jsonb_build_array(
    jsonb_build_object(
      'title', '__page_meta__',
      'description', jsonb_build_object(
        'headline', '4×1 Super Combo — Panzer Camouflage Vol. I–IV',
        'seoTitle', 'Panzer Camouflage 4×1 Super Combo | Igor Donchik Art',
        'seoDescription', 'Save 15% on Panzer Camouflage Volumes I–IV — four illustrated books on Wehrmacht armored camouflage.',
        'intro', jsonb_build_array(
          'Volume I opens the encyclopedia with early Wehrmacht division camouflage.',
          'Volumes II and III continue field patterns, tactical markings, and wartime practice.',
          'Volume IV extends the story into earlier German camouflage traditions leading into the Wehrmacht period.'
        ),
        'storyTitle', 'The first four volumes',
        'audience', jsonb_build_array(
          'Modelers collecting the Panzer Camouflage series',
          'Readers who want Volumes I–IV without ordering four times',
          'Anyone starting the armored camouflage encyclopedia from the beginning'
        )
      )::text
    ),
    jsonb_build_object('title', 'Volume I', 'description', 'Early Wehrmacht division camouflage patterns and tactical markings.'),
    jsonb_build_object('title', 'Volume II', 'description', 'Continued armored camouflage and markings during WWII.'),
    jsonb_build_object('title', 'Volume III', 'description', 'Further field schemes and reconstructed plates.'),
    jsonb_build_object('title', 'Volume IV', 'description', 'Evolution from earlier German camouflage into the early Wehrmacht period.')
  ),
  false
)
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  description = excluded.description,
  price = excluded.price,
  original_price = excluded.original_price,
  cover_image = excluded.cover_image,
  gallery = excluded.gallery,
  page_gallery = excluded.page_gallery,
  is_on_sale = excluded.is_on_sale,
  sale_label = excluded.sale_label,
  features = excluded.features,
  chapters = excluded.chapters,
  stock = excluded.stock,
  is_featured = excluded.is_featured,
  updated_at = now();

-- Single-book offers: correct pricing / labels
update public.products
set
  is_on_sale = true,
  sale_label = '-10%',
  original_price = 56,
  price = 50.40,
  updated_at = now()
where slug = 'panzer-camouflage-volume-ii';

update public.products
set
  delivery_note = '€1 Delivery',
  updated_at = now()
where slug = 'panzer-camouflage-volume-iv';

-- Point discount slides at the right products
update public.homepage_slides hs
set
  link_type = 'product',
  product_id = p.id,
  category_id = null,
  updated_at = now()
from public.products p
where hs.kind = 'cta'
  and (
    (hs.title ilike 'Complete Bundle%' and p.slug = 'complete-bundle-7-books')
    or (hs.title ilike 'Double Combo%' and p.slug = 'german-military-symbols-double-combo')
    or (hs.title ilike '4x1 Super Combo%' and p.slug = 'panzer-camouflage-4x1-super-combo')
    or (hs.title = 'Panzer Camouflage' and hs.label ilike '%IV%' and p.slug = 'panzer-camouflage-volume-iv')
    or (hs.title ilike 'Panzer Camouflage Vol. II%' and p.slug = 'panzer-camouflage-volume-ii')
  );
