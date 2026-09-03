-- Enrich product descriptions, features, and chapters from the official site copy.
-- Safe to re-run. Card captions stay in restore-card-descriptions.sql.

update public.products
set
  description = $d$Panzer Camouflage Volume I is the opening Wehrmacht book in Igor Donchik’s armor series. The plates follow German tank divisions through the war years, showing how factory paint, field overpaints, and divisional badges actually sat on steel — not how later artwork imagined them.

Research starts with wartime photographs and documents. Each profile is drawn by hand so turret numbers, tactical signs, and camouflage edges stay consistent from one division to the next. Modelers can take a scheme to the bench; historians can compare markings across units without switching visual languages.

The volume also records captured KV-1 and KV-2 tanks in German hands, Wehrmacht road and vehicle signs, fuel drums and stowage, and two focused unit studies: the 202nd Sturmgeschütz battalion and schwere Panzer-Abteilung 508 with Tigers in Italy in 1944. It closes with a clearly labelled alternate-history chapter: a “what if” look at Operation Valkyrie, kept separate from the documentary plates.$d$,
  features = '["Hardcover WWII camouflage reference","180 hand-drawn armored vehicle profiles","128 pages of original plates and notes","Wehrmacht tactical signs, 1939–1945","Road and vehicle sign plates","Bookmark included with the volume","Printed in limited batches","Packed in Estonia with Omniva tracking"]'::jsonb,
  chapters = '[{"title":"Panzer Divisions 1–7","description":"How early Wehrmacht tank divisions painted, marked, and overpainted their armor as the war progressed."},{"title":"Beutepanzer KV-1 and KV-2","description":"Captured Soviet heavies in German service, with the new tactical paint and badges applied in the field."},{"title":"Tactical Insignia 1939–1945","description":"Divisional and regimental signs reconstructed so they can be read from period photographs."},{"title":"Fuel Barrels and Equipment","description":"Drums, cans, and stowage as they appeared on German fighting vehicles, not as generic accessories."},{"title":"Road and Car Signs","description":"Field and highway markers used around armored columns, drawn as historical graphics rather than clip-art."},{"title":"202nd Sturmgeschütz Battalion","description":"Self-propelled guns in a single unit study, with camouflage tied to that formation’s record."},{"title":"508th Heavy Tank Battalion (Tiger)","description":"Tiger operations in Italy in 1944, reconstructed from photographs of this heavy battalion."},{"title":"Alternate history: Operation Valkyrie","description":"A labelled “what if” closing chapter — fictional Free German Army markings, kept apart from the documentary plates."}]'::jsonb,
  updated_at = now()
where slug = 'panzer-camouflage-volume-i';

update public.products
set
  description = $d$Volume II is the companion Wehrmacht book to Panzer Camouflage I. Where the first volume establishes the early divisions and signature studies, this one stays with German tank formations through the Polish campaign to the last year of the war.

Plates reconstruct factory finishes, field-applied patterns, winter whitewash, and the simplified late-war schemes that appear in photographs but rarely in toy-like “ambush” artwork. Tactical numbers and divisional emblems are drawn as part of the vehicle, not as stickers floating on a profile.

Use it beside Volume I if you are painting a Wehrmacht column, or as a stand-alone reference if your project sits in the mid- and late-war panzer divisions. Every illustration remains manual work from archival stills — the same discipline as the rest of the official catalog.$d$,
  features = '["Hardcover continuation of the Wehrmacht series","Division-by-division camouflage plates","Tactical numbers and unit badges on the vehicle","Field overpaints, winter, and late-war finishes","Hand-drawn from wartime photographs","€1 collector shipping while the offer lasts","Limited print run from Estonia"]'::jsonb,
  chapters = '[{"title":"Wehrmacht tank divisions in sequence","description":"Further German armored formations, drawn with the same profile language as Volume I."},{"title":"Campaign finishes, 1939–1942","description":"Early-war greys, first three-tone experiments, and the paint that actually reached the front."},{"title":"Mid-war field patterns","description":"Workshop and crew overpaints that diverge from factory instructions."},{"title":"Winter and seasonal coats","description":"Whitewash, wash-off methods, and the worn surfaces seen in photographs."},{"title":"Late-war simplifications","description":"Reduced schemes and hurried application in the last campaigns."},{"title":"Tactical signs on armor","description":"How division badges and numbering sat on turrets, hulls, and schürzen."},{"title":"Photographic notes","description":"Source comments so a plate can be traced back to the stills that justified it."},{"title":"Working index of schemes","description":"A closer for the bench: which plates to open for a given formation and year."}]'::jsonb,
  updated_at = now()
where slug = 'panzer-camouflage-volume-ii';

update public.products
set
  description = $d$Volume III is the Red Army book in the Panzer Camouflage encyclopedia. It follows how Soviet armored units painted their tanks from the eve of the German invasion through the last campaigns of 1945, including the gap between official instructions and what crews actually applied.

A second thread documents Beutepanzer practice: Soviet types taken into German service, with new crosses, numbers, and overpaints. Those plates sit beside the Red Army schemes so you can see both sides of a captured vehicle’s life.

As with the German volumes, nothing here is a video-game skin. Profiles are rebuilt from photographs and period notes, then drawn so a modeler can copy edges, winter coats, and slogan or marking placement with a defensible source.$d$,
  features = '["Hardcover Red Army camouflage reference","Soviet schemes from 1939 to 1945","Captured Soviet armor in German use","Factory colors versus field application","Hand-drawn plates, no generative AI","Limited print run, shipped from Estonia"]'::jsonb,
  chapters = '[{"title":"The Soviet camouflage system","description":"How official paint rules were written, and how they met the reality of workshops and fronts."},{"title":"Pre-war and 1941 finishes","description":"Early greens, unit variation, and the schemes visible in the first year of the German–Soviet war."},{"title":"Field patterns at the front","description":"Crew and depot overpaints that photographs show more often than manuals do."},{"title":"Winter and seasonal coats","description":"Whitewash and worn winter surfaces on Red Army armor."},{"title":"Markings and slogans","description":"Tactical numbers, guards badges, and painted slogans placed as they appear on surviving stills."},{"title":"Captured Soviet tanks in German hands","description":"Beutepanzer overpaints, crosses, and German tactical signs on KV, T-34, and related types."},{"title":"Comparative plates","description":"Side-by-side notes so a Soviet scheme can be told apart from its German reuse."},{"title":"Photographic notes","description":"Source remarks for modelers who need to defend a color choice."}]'::jsonb,
  updated_at = now()
where slug = 'panzer-camouflage-volume-iii';

update public.products
set
  description = $d$Most camouflage books begin in 1939. Volume IV begins in 1918. It follows German armored painting from the end of the First World War, through Freikorps vehicles, into the first tank trials of the Reichswehr, and up to the formations that became the Wehrmacht.

The plates matter if you paint early panzers, visit a museum vehicle with an interwar finish, or need to understand why later German patterns look the way they do. Buntfarbenanstrich, grey experiments, and the first tactical markings are treated as a continuous story rather than a footnote.

As elsewhere in the series, reconstructions stay tied to photographs and documents. Where evidence is thin, the book does not invent a decorative pattern to fill the page.$d$,
  features = '["Hardcover interwar German armor reference","From 1918 and the Freikorps into the Reichswehr","Early tank trials and pre-war finishes","The road from Reichswehr paint to Wehrmacht practice","Hand-drawn plates from archival sources","Limited print run, Estonia dispatch"]'::jsonb,
  chapters = '[{"title":"1918 and the first armored paint","description":"End-of-war German vehicles and the camouflage language carried into the following decade."},{"title":"Freikorps armor","description":"Improvised fighting vehicles and the markings used in the immediate post-war years."},{"title":"Reichswehr trials","description":"Early tank experiments, training vehicles, and the paint systems approved for a small army."},{"title":"Interwar color orders","description":"Official patterns — including multi-color coats — as they were specified and as they weathered."},{"title":"Tactical signs before 1939","description":"Numbers, rhomboids, and unit graphics that precede wartime divisional badges."},{"title":"Toward the Wehrmacht","description":"How late Reichswehr practice fed the first panzer divisions’ appearance."},{"title":"Photographic notes","description":"Source stills and the limits of what those stills can prove."},{"title":"Bridge to Volumes I–II","description":"Where an interwar plate ends and the wartime Wehrmacht books begin."}]'::jsonb,
  updated_at = now()
where slug = 'panzer-camouflage-volume-iv';

update public.products
set
  description = $d$Panzer Camouflage V is reserved for Rommel’s Afrikakorps and the wider tropical story: sand and green overpaints, the way European schemes were rewritten for North Africa, and the tactical signs painted on armor in that theatre.

Until publication, the page exists so the official catalog stays honest. There is no pre-order cart for this volume. When the plates are ready to print, the book will move from “in development” to in stock like the earlier hardcovers.

If you are collecting the set, Volumes I–IV remain the volumes you can put on the shelf now. Volume V will follow the same archival method: photographs first, hand drawing second, no generative fill.$d$,
  features = '["Forthcoming DAK / North Africa reference","Tropical camouflage and overpaints","Afrikakorps tactical signs","Planned for 2027","Same hand-drawn method as Volumes I–IV","Not available to order yet"]'::jsonb,
  chapters = '[{"title":"Tropical color orders","description":"How German armor was supposed to look in Africa, and how paint actually arrived in theatre."},{"title":"Sand, green, and overpaint","description":"Workshop and crew applications over European base coats."},{"title":"Afrikakorps tactical signs","description":"Palm, swastika-and-palm, and related unit graphics as they appear on vehicles."},{"title":"Armored types in the desert","description":"Panzers, assault guns, and supporting vehicles in DAK service."},{"title":"Wear, dust, and field repair","description":"The surfaces photographs show after months of desert movement."},{"title":"Photographic notes","description":"The stills and film that will justify the finished plates."}]'::jsonb,
  updated_at = now()
where slug = 'panzer-camouflage-volume-v';

update public.products
set
  description = $d$Panzer Camouflage VI is a placeholder on the official site, not a finished title. The earlier volumes — Wehrmacht, Red Army, and Reichswehr — are the books you can study and order today.

When the sixth hardcover is ready, this page will gain the same kind of chapter list, plate count, and shipping notes as Volumes I–IV. Until then, treat 2028 as a studio date, not a shop promise.$d$,
  features = '["Forthcoming Panzer Camouflage hardcover","Studio target: 2028","Same research method as the published volumes","Not available to order yet"]'::jsonb,
  chapters = '[{"title":"To be announced","description":"Chapter list, plate count, and subject notes will appear here when the volume leaves the studio."}]'::jsonb,
  updated_at = now()
where slug = 'panzer-camouflage-volume-vi';

update public.products
set
  description = $d$German Military Unit Insignia Volume I collects 727 Wehrmacht formation badges in one visual language. Infantry, grenadier, Jäger, mountain, motorized, security, and fortress divisions sit beside army groups, corps, and observation battalions, so a badge seen on a photograph can be tested against a drawn standard rather than a muddy wartime print alone.

Each emblem is reconstructed from archival stills and paperwork. Summary tables note raising, reorganization, and how a sign changed when a division was rebuilt. Where a badge cannot yet be identified, it is left open — the research does not invent a pretty device to close a gap.

Ten pages of original vehicle side profiles by Igor Donchik show the same insignia on armor, with camouflage and placement argued from photographs. Modelers can move from the emblem plate to the vehicle plate without switching artists.$d$,
  features = '["727 hand-drawn Wehrmacht divisional insignia","Softcover, 88 pages","ISBN 978-9916-9350-4-0","Infantry, Jäger, mountain, motorized, security, fortress","Army groups, armies, corps, observation battalions","10 pages of original vehicle profiles","Summary tables of formation history","Limited print run from Estonia"]'::jsonb,
  chapters = '[{"title":"Infantry divisions","description":"Emblems and summary tables for the core infantry formations of the wartime army."},{"title":"Propaganda units","description":"Distinctive signs used by propaganda formations, redrawn from surviving sources."},{"title":"Mountain division","description":"Gebirgs badges with notes on how the devices were painted and worn."},{"title":"Light infantry divisions","description":"Leichte Division emblems and the tables that track their reorganization."},{"title":"Jäger divisions","description":"Jäger insignia reconstructed for comparison with infantry and mountain signs."},{"title":"Motorized divisions","description":"Badges of motorized infantry formations and their later identities."},{"title":"Security and fortress divisions","description":"Occupation, security, and fortress unit devices, often poorly photographed."},{"title":"Grenadier and Volksgrenadier divisions","description":"Late-war infantry titles and the emblems that travelled with them."},{"title":"Army groups, armies, and corps","description":"Higher-command graphics used on vehicles, maps, and headquarters signs."},{"title":"Observation battalions","description":"Specialist artillery observation badges collected in one section."},{"title":"Assorted Wehrmacht insignia","description":"Further devices that do not sit cleanly in the division chapters."}]'::jsonb,
  updated_at = now()
where slug = 'german-military-unit-insignia-volume-i';

update public.products
set
  description = $d$Unit Insignia I covers infantry and related arms. Volume II is reserved for the armored and elite devices that modelers ask for next: panzer divisions, panzergrenadier formations, and further higher-command signs that belong with those units.

The same drawing rules will apply — archival photographs, no invented badges, summary notes where a formation was rebuilt. Until the studio date, this page is a roadmap entry, not a product you can check out.$d$,
  features = '["Forthcoming panzer and panzergrenadier insignia volume","Elite formation badges planned for this atlas","Same reconstruction method as Volume I","Studio target: 2027","Not available to order yet"]'::jsonb,
  chapters = '[{"title":"Panzer divisions","description":"Formation badges of German tank divisions, to be reconstructed in the Volume I style."},{"title":"Panzergrenadier divisions","description":"Mechanized infantry emblems and their wartime changes of title."},{"title":"Elite and named formations","description":"Selected distinctive devices that sit outside the ordinary infantry list."},{"title":"Higher commands and vehicle placement","description":"How these badges were painted on armor, cars, and signboards."}]'::jsonb,
  updated_at = now()
where slug = 'german-military-unit-insignia-volume-ii';

update public.products
set
  description = $d$Unit Insignia III is listed so the series is complete on the official site. Subject notes and chapter lists will be published when the drawings leave the studio.

Until 2028, use Volume I as the working emblem reference, and treat Volume II as the next announced hardcover-or-softcover in the pipeline.$d$,
  features = '["Forthcoming third insignia volume","Studio target: 2028","Follows Volumes I and II in the same atlas","Not available to order yet"]'::jsonb,
  chapters = '[{"title":"To be announced","description":"The chapter list will be published with the finished plates."}]'::jsonb,
  updated_at = now()
where slug = 'german-military-unit-insignia-volume-iii';

update public.products
set
  description = $d$Panzer Camouflage tells you how a tank was painted. German Military Symbols Volume I tells you what the little signs on that tank — and on the map that sent it — were supposed to mean. The first volume gathers over a thousand reconstructed markings used by the Wehrmacht, with related Luftwaffe and Kriegsmarine graphics where they share the same visual language.

Plates cover branch symbols, vehicle tactical signs, abbreviations, and road or route markers. The drawings are standardized so a sign from a staff map can be compared with the same sign painted on a hull, without two different artists’ interpretations.

If you have ever paused a photograph because a rhomboid, chevron, or letter code would identify the unit, this is the book meant to sit open on that desk. A discounted copy with small cover wear is listed separately when we have one; the plates inside are the same.$d$,
  features = '["More than 1,000 reconstructed tactical symbols","Wehrmacht, Luftwaffe, and Kriegsmarine graphics","Vehicle markings and map / staff signs","Road markers and abbreviation plates","Hand-drawn encyclopedia format","Limited print run, Estonia dispatch"]'::jsonb,
  chapters = '[{"title":"Tactical symbol primer","description":"How German staff and vehicle graphics were built, and how to read a plate in this encyclopedia."},{"title":"Branch and arm of service","description":"Infantry, armor, artillery, engineers, and support signs used on maps and vehicles."},{"title":"Markings on armor and soft-skins","description":"Tactical symbols as they were painted on tanks, cars, and trucks."},{"title":"Map and document graphics","description":"The same language on overlays, orders, and printed legends."},{"title":"Luftwaffe and Kriegsmarine plates","description":"Related signs that share the German tactical vocabulary."},{"title":"Road and route markers","description":"Field and highway graphics that sat around moving columns."},{"title":"Abbreviations","description":"Letter codes that appear beside symbols in wartime paperwork and on vehicles."},{"title":"Index of signs","description":"A closing finder so you can move from a photograph to the matching plate."}]'::jsonb,
  updated_at = now()
where slug = 'german-military-symbols-volume-i';

update public.products
set
  description = $d$One volume cannot hold every German tactical graphic of the war. Volume II adds further plates of vehicle markings, staff signs, and related Luftwaffe or naval graphics so the first book does not have to be overloaded.

The visual language does not change. If you learned to read Volume I, these pages slot beside it: same line weight, same reconstruction rules, same refusal to “pretty up” a sign the photograph does not support.

Order it as a pair with Volume I if you are building a markings desk set, or on its own if you already own the first encyclopedia and keep hitting signs that were not in that index.$d$,
  features = '["Continuation of the tactical-symbols encyclopedia","Further vehicle and map plates","Wehrmacht focus with related service graphics","Matches Volume I drawing standard","Hand-drawn, limited print run","Shipped from Estonia with tracking"]'::jsonb,
  chapters = '[{"title":"Further vehicle markings","description":"Additional hull, turret, and soft-skin signs beyond the first volume’s index."},{"title":"Staff and map plates","description":"More overlay graphics and document marks used by German headquarters."},{"title":"Field variants","description":"Hand-painted wartime simplifications that diverge from the textbook form."},{"title":"Color and contrast notes","description":"How signs were painted for visibility on armor, signs, and paper."},{"title":"Cross-reference to Volume I","description":"Where a sign in this book continues a family already drawn in the first encyclopedia."},{"title":"Photographic notes","description":"Source stills for the added plates."},{"title":"Extended index","description":"A finder for the second volume’s signs."}]'::jsonb,
  updated_at = now()
where slug = 'german-military-symbols-volume-ii';

update public.products
set
  description = $d$Printing and packing sometimes leave a scuff, a bumped corner, or a small mark on the cover. Rather than waste a finished book, we sell those copies here. Inside you still get the German Military Symbols Volume I plates: more than a thousand reconstructed tactical signs for vehicles, maps, and related German graphics.

Choose this listing if you want the reference and do not need a display-grade cover. Choose the standard Volume I in the store if the jacket has to be clean. We will not replace a sale copy because of the defects described on this page.$d$,
  features = '["Same interior as German Military Symbols Volume I","Minor cover defects — sold as-is","Non-refundable and non-exchangeable","More than 1,000 tactical symbols inside","Lower price than the standard edition"]'::jsonb,
  chapters = '[]'::jsonb,
  updated_at = now()
where slug = 'german-military-symbols-volume-i-sale';

-- Category blurbs for series pages and the store.
update public.categories
set description = 'Hand-drawn encyclopedia of Wehrmacht, Red Army, Reichswehr, and forthcoming DAK armor camouflage.', updated_at = now()
where slug = 'panzer-camouflage';

update public.categories
set description = 'Tactical signs used on German vehicles, maps, and roads — more than a thousand reconstructed markings.', updated_at = now()
where slug = 'german-military-symbols';

update public.categories
set description = 'Atlas of Wehrmacht formation badges, beginning with 727 hand-drawn divisional emblems in Volume I.', updated_at = now()
where slug = 'german-military-unit-insignia';

