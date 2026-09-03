-- Restore original catalog card captions from the printed card artwork.
-- Safe to re-run.

update public.products
set short_description = 'Wehrmacht divisions camouflage patterns in WWII.',
    updated_at = now()
where slug in ('panzer-camouflage-volume-i', 'panzer-camouflage-volume-ii');

update public.products
set short_description = 'Red Army divisions camouflage patterns in WWII.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-iii';

update public.products
set short_description = 'Reichswehr divisions camouflage patterns.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-iv';

update public.products
set short_description = 'DAK divisions camouflage patterns in WWII.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-v';

update public.products
set short_description = 'Book in development',
    updated_at = now()
where slug in ('panzer-camouflage-volume-vi', 'german-military-unit-insignia-volume-iii');

update public.products
set short_description = 'German military symbols in WWII.',
    updated_at = now()
where slug in (
  'german-military-unit-insignia-volume-i',
  'german-military-unit-insignia-volume-ii',
  'german-military-symbols-volume-i',
  'german-military-symbols-volume-ii'
);

update public.products
set short_description = 'Sale copy with minor defects.',
    updated_at = now()
where slug = 'german-military-symbols-volume-i-sale';
