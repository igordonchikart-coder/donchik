-- Catalog card captions shown under the cover art.
-- Safe to re-run.

update public.products
set short_description = 'Wehrmacht tank camouflage from the first Panzer Divisions through 1945, with 180 hand-drawn profiles, tactical signs, captured KV tanks, and eight hardcover chapters.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-i';

update public.products
set short_description = 'The Wehrmacht encyclopedia continues from 1939 to 1945, with mid- and late-war schemes, winter whitewash, and division markings drawn from archival photographs.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-ii';

update public.products
set short_description = 'Red Army armor camouflage and markings from 1939 to 1945, including Soviet factory and field schemes plus Beutepanzer plates for captured tanks in German service.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-iii';

update public.products
set short_description = 'German armor paint from the Reichswehr years to 1939, covering Freikorps vehicles, early tank trials, and the color orders that shaped later Wehrmacht schemes.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-iv';

update public.products
set short_description = 'North Africa volume in preparation for 2027, with DAK tropical overpaints, desert wear, and Afrikakorps tactical signs on armor.',
    updated_at = now()
where slug = 'panzer-camouflage-volume-v';

update public.products
set short_description = 'Book in development',
    updated_at = now()
where slug in ('panzer-camouflage-volume-vi', 'german-military-unit-insignia-volume-iii');

update public.products
set short_description = '727 hand-drawn Wehrmacht divisional emblems in one atlas, with summary tables, infantry to corps signs, and ten pages of vehicle profiles.',
    updated_at = now()
where slug = 'german-military-unit-insignia-volume-i';

update public.products
set short_description = 'Panzer, panzergrenadier, and elite formation badges planned for 2027 — the armored continuation of the insignia atlas.',
    updated_at = now()
where slug = 'german-military-unit-insignia-volume-ii';

update public.products
set short_description = 'More than 1,000 WWII German tactical symbols on vehicles and maps, covering Wehrmacht, Luftwaffe, and Kriegsmarine markings in one encyclopedia.',
    updated_at = now()
where slug = 'german-military-symbols-volume-i';

update public.products
set short_description = 'Second volume of the tactical-signs encyclopedia, with further vehicle and staff markings in the same drawn standard as Volume I.',
    updated_at = now()
where slug = 'german-military-symbols-volume-ii';

update public.products
set short_description = 'Volume I encyclopedia at a lower price: complete interior plates, minor cover wear, final sale and non-refundable.',
    updated_at = now()
where slug = 'german-military-symbols-volume-i-sale';
