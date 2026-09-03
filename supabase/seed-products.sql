-- Catalog books. Safe to re-run: existing slugs are left unchanged.

insert into public.products (
  slug, title, short_description, description, price, original_price, currency,
  cover_image, gallery, category_id, stock, is_available, is_featured, is_on_sale,
  sale_label, delivery_note, condition_note, status, volume_number, features, chapters,
  release_year, has_video
)
values
  (
    'panzer-camouflage-volume-i',
    'Panzer Camouflage',
    'Wehrmacht divisions camouflage patterns in WWII.',
    $d$The first volume covers the early development of camouflage patterns for Wehrmacht tank forces from the 1st to the 5th Division. The book presents detailed reconstructions of armored vehicle paint schemes, tactical markings, divisional emblems, and actual camouflage patterns used throughout the war.$d$,
    56, null, 'EUR', '', '[]'::jsonb, 'series-panzer-camouflage', 14, true, true, false,
    null, '€1 Delivery', null, 'available', 1,
    '["180 detailed profiles","128 pages","Hand-drawn plates"]'::jsonb,
    '[{"title":"Panzer Divisions 1-7","description":"Evolution of camouflage schemes and tactical insignia."},{"title":"Early War Patterns","description":"Factory finishes and first field applications."},{"title":"Beutepanzer KV-1 and KV-2","description":"Captured vehicles and their German markings."},{"title":"Tactical Insignia 1939-1945","description":"Divisional signs, numbers, and unit markings."},{"title":"Winter Camouflage","description":"Whitewash methods and seasonal overpaints."},{"title":"Late-War Schemes","description":"Ambush patterns and simplified late production finishes."},{"title":"Reference Photos","description":"Archival photographs with notes for modelers."},{"title":"Alternate History Plate","description":"A closing illustrated study of unused pattern variants."}]'::jsonb,
    null, true
  ),
  (
    'panzer-camouflage-volume-ii',
    'Panzer Camouflage',
    'Wehrmacht tank divisions from 1939 to 1945.',
    $d$The second volume of the series is devoted to the camouflage schemes of Wehrmacht tank divisions from 1939 to 1945. The book presents detailed reconstructions of armored vehicle paint schemes, tactical markings, divisional emblems, and actual camouflage patterns used throughout the war, from the Polish campaign to the final battles of 1945.$d$,
    56, null, 'EUR', '', '[]'::jsonb, 'series-panzer-camouflage', 11, true, true, false,
    null, '€1 Delivery', null, 'available', 2,
    '["Division-by-division plates","Color notes","Insignia details"]'::jsonb,
    '[]'::jsonb, null, true
  ),
  (
    'panzer-camouflage-volume-iii',
    'Panzer Camouflage',
    'Red Army armored vehicles, 1939 to 1945.',
    $d$The third volume is devoted to the armored vehicles of the Red Army from 1939 to 1945. The emergence of the Soviet camouflage system and its practical application in combat conditions. The book also discusses the use of captured Soviet equipment in the German army.$d$,
    44.8, null, 'EUR', '', '[]'::jsonb, 'series-panzer-camouflage', 8, true, false, false,
    null, null, null, 'available', 3,
    '["Beutepanzer studies","Comparative plates"]'::jsonb,
    '[]'::jsonb, null, true
  ),
  (
    'panzer-camouflage-volume-iv',
    'Panzer Camouflage',
    'Later camouflage schemes and unit practice.',
    $d$The fourth volume is devoted to the emergence and development of the camouflage system in Germany. The end of World War I, the emergence of the Freikorps, the first tank trials in the Reichswehr. You will find all this in this book.$d$,
    56, null, 'EUR', '', '[]'::jsonb, 'series-panzer-camouflage', 6, true, false, false,
    null, null, null, 'available', 4,
    '["Late-war schemes","Unit examples"]'::jsonb,
    '[]'::jsonb, null, true
  ),
  (
    'panzer-camouflage-volume-v',
    'Panzer Camouflage',
    'Next volume in the camouflage series.',
    $d$The book is dedicated to Rommel's African Corps, armored vehicles, tactical insignia, and camouflage patterns of the tropical version.$d$,
    56, null, 'EUR', '', '[]'::jsonb, 'series-panzer-camouflage', 0, false, false, false,
    null, null, null, 'coming-soon', 5,
    '[]'::jsonb, '[]'::jsonb, 2027, true
  ),
  (
    'panzer-camouflage-volume-vi',
    'Panzer Camouflage',
    'Book in development',
    'Book in development',
    56, null, 'EUR', '', '[]'::jsonb, 'series-panzer-camouflage', 0, false, false, false,
    null, null, null, 'coming-soon', 6,
    '[]'::jsonb, '[]'::jsonb, 2028, true
  ),
  (
    'german-military-unit-insignia-volume-i',
    'German Military Unit Insignia',
    'German military symbols in WWII.',
    $d$727 meticulously hand-drawn Wehrmacht divisional insignia reconstructed from archival sources. A practical WWII reference book for modelers, historians and collectors.$d$,
    33.6, null, 'EUR', '', '[]'::jsonb, 'series-unit-insignia', 20, true, true, false,
    null, null, null, 'available', 1,
    '["727 hand-drawn insignia","Reference plates","For modelers"]'::jsonb,
    '[]'::jsonb, null, true
  ),
  (
    'german-military-unit-insignia-volume-ii',
    'German Military Unit Insignia',
    'Further WWII German divisions.',
    $d$This volume documents the insignia of German divisions active during World War II. It covers panzergrenadier, Panzer Division, Elite units Division. In addition, it includes army groups, corps and observation battalions.$d$,
    39.9, null, 'EUR', '', '[]'::jsonb, 'series-unit-insignia', 0, false, false, false,
    null, null, null, 'coming-soon', 2,
    '[]'::jsonb, '[]'::jsonb, 2027, true
  ),
  (
    'german-military-unit-insignia-volume-iii',
    'German Military Unit Insignia',
    'Book in development',
    'Book in development',
    39.9, null, 'EUR', '', '[]'::jsonb, 'series-unit-insignia', 0, false, false, false,
    null, null, null, 'coming-soon', 3,
    '[]'::jsonb, '[]'::jsonb, 2028, true
  ),
  (
    'german-military-symbols-volume-i',
    'German Military Symbols',
    'Encyclopedia of authentic tactical symbols.',
    $d$German Military Symbols is a groundbreaking encyclopedia series that explores the tactical markings used by the German army during World War II. This first volume offers an in-depth look at over 1,000 authentic symbols found on Wehrmacht vehicles and military maps.$d$,
    33.6, null, 'EUR', '', '[]'::jsonb, 'series-military-symbols', 10, true, false, false,
    null, null, null, 'available', 1,
    '["Over 1,000 symbols","Ground encyclopedia"]'::jsonb,
    '[]'::jsonb, null, true
  ),
  (
    'german-military-symbols-volume-ii',
    'German Military Symbols',
    'Further tactical symbols and vehicle markings.',
    $d$Explore over 1,000 WWII German tactical symbols in this guide by Igor Donchik. Essential for historians, modelers, and reenactors, featuring detailed markings from Wehrmacht, Luftwaffe, and Kriegsmarine.$d$,
    39.9, null, 'EUR', '', '[]'::jsonb, 'series-military-symbols', 7, true, false, false,
    null, null, null, 'available', 2,
    '["Additional plates","Vehicle markings"]'::jsonb,
    '[]'::jsonb, null, true
  ),
  (
    'german-military-symbols-volume-i-sale',
    'German Military Symbols',
    'Sale copy with minor defects.',
    $d$🕒💰 The book with minor defects! 💰🕒
⚠️ Attention! By placing an order for this book, you agree that you are purchasing a copy with minor cover defects at a discounted price! 📖💰
Books with defects purchased at a reduced price are non-refundable and non-exchangeable! 🚫🔄$d$,
    15, 33.6, 'EUR', '', '[]'::jsonb, 'series-military-symbols', 4, true, false, true,
    'Super sale', null, 'This book has minor defects and is non-refundable.', 'available', 1,
    '["Minor defects","Non-refundable"]'::jsonb,
    '[]'::jsonb, null, true
  )
on conflict (slug) do nothing;

update public.products
set chapters = $c$[{"title":"Panzer Divisions 1-7","description":"Evolution of camouflage schemes and tactical insignia."},{"title":"Early War Patterns","description":"Factory finishes and first field applications."},{"title":"Beutepanzer KV-1 and KV-2","description":"Captured vehicles and their German markings."},{"title":"Tactical Insignia 1939-1945","description":"Divisional signs, numbers, and unit markings."},{"title":"Winter Camouflage","description":"Whitewash methods and seasonal overpaints."},{"title":"Late-War Schemes","description":"Ambush patterns and simplified late production finishes."},{"title":"Reference Photos","description":"Archival photographs with notes for modelers."},{"title":"Alternate History Plate","description":"A closing illustrated study of unused pattern variants."}]$c$::jsonb
where category_id = 'series-panzer-camouflage' and chapters = '[]'::jsonb;

update public.products
set chapters = $c$[{"title":"Divisional Insignia","description":"Wehrmacht divisional signs reconstructed from archival sources."},{"title":"Panzer and Panzergrenadier Units","description":"Markings of armored and mechanized formations."},{"title":"Army Groups and Corps","description":"Higher-command emblems and their field variants."},{"title":"Elite Formations","description":"Distinctive insignia of selected wartime units."},{"title":"Observation and Support Battalions","description":"Specialist unit signs used alongside combat divisions."},{"title":"Vehicle Placement","description":"Where insignia were painted on tanks, cars, and soft-skins."},{"title":"Reference Photos","description":"Wartime photographs used to verify each reconstruction."},{"title":"Index of Units","description":"A closing register of formations covered in the volume."}]$c$::jsonb
where category_id = 'series-unit-insignia' and chapters = '[]'::jsonb;

update public.products
set chapters = $c$[{"title":"Tactical Symbols","description":"The core encyclopedia of German tactical markings."},{"title":"Vehicle Markings","description":"Symbols applied to armor, trucks, and command cars."},{"title":"Map and Document Signs","description":"Marks used on maps, orders, and staff paperwork."},{"title":"Branch Distinctions","description":"Symbols for infantry, armor, artillery, and support arms."},{"title":"Field Variations","description":"Hand-painted wartime variants and simplified forms."},{"title":"Color Notes","description":"Paint colors and contrast used on vehicles and signs."},{"title":"Reference Photos","description":"Archival images that confirm each reconstructed mark."},{"title":"Index of Symbols","description":"A closing catalogue of the symbols in this volume."}]$c$::jsonb
where category_id = 'series-military-symbols' and chapters = '[]'::jsonb;
