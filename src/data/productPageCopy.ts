import type { BookChapter, Product, ProductPageMeta, ProductSpec } from '@/types'
import { getProductHeadline } from '@/utils/product'

export type { ProductSpec }

export interface ProductPageCopy {
  headline: string
  seoTitle: string
  seoDescription: string
  intro: string[]
  storyTitle: string
  story: string[]
  features: string[]
  specs: ProductSpec[]
  chapters: BookChapter[]
  audienceTitle: string
  audience: string[]
  isbn?: string
}

const panzerOne: ProductPageCopy = {
  headline: 'Panzer Camouflage Vol. I — Wehrmacht Divisions | Hand-Drawn WWII Armor Reference',
  seoTitle: 'Panzer Camouflage Vol. I | Wehrmacht Divisions WWII Art Book',
  seoDescription:
    'Official Panzer Camouflage Volume I by Igor Donchik: 180 hand-drawn Wehrmacht tank profiles, 128 pages, tactical signs 1939–1945. Hardcover WWII reference shipped from Estonia.',
  intro: [
    'Open the Panzer Camouflage encyclopedia with the Wehrmacht volume — currently listed with €1 collector shipping.',
    'Volume I is the first hardcover in the series: 180 hand-drawn tank profiles, reconstructed from archival photographs, with a 4,9 Trustpilot rating across Igor Donchik’s books.',
  ],
  storyTitle: 'Where the Panzer Camouflage encyclopedia begins',
  story: [
    'Panzer Camouflage Volume I is the opening Wehrmacht book in Igor Donchik’s armor series. The plates follow German tank divisions through the war years, showing how factory paint, field overpaints, and divisional badges actually sat on steel — not how later artwork imagined them.',
    'Research starts with wartime photographs and documents. Each profile is drawn by hand so turret numbers, tactical signs, and camouflage edges stay consistent from one division to the next. Modelers can take a scheme to the bench; historians can compare markings across units without switching visual languages.',
    'The volume also records captured KV-1 and KV-2 tanks in German hands, Wehrmacht road and vehicle signs, fuel drums and stowage, and two focused unit studies: the 202nd Sturmgeschütz battalion and schwere Panzer-Abteilung 508 with Tigers in Italy in 1944. It closes with a clearly labelled alternate-history chapter: a “what if” look at Operation Valkyrie, kept separate from the documentary plates.',
  ],
  features: [
    'Hardcover WWII camouflage reference',
    '180 hand-drawn armored vehicle profiles',
    '128 pages of original plates and notes',
    'Wehrmacht tactical signs, 1939–1945',
    'Road and vehicle sign plates',
    'Bookmark included with the volume',
    'Printed in limited batches',
    'Packed in Estonia with Omniva tracking',
  ],
  specs: [
    { label: 'Format', value: 'Hardcover' },
    { label: 'Pages', value: '128' },
    { label: 'Plates', value: '180 vehicle profiles' },
    { label: 'Subject', value: 'Wehrmacht tank divisions, WWII' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: [
    {
      title: 'Panzer Divisions 1–7',
      description: 'How early Wehrmacht tank divisions painted, marked, and overpainted their armor as the war progressed.',
    },
    {
      title: 'Beutepanzer KV-1 and KV-2',
      description: 'Captured Soviet heavies in German service, with the new tactical paint and badges applied in the field.',
    },
    {
      title: 'Tactical Insignia 1939–1945',
      description: 'Divisional and regimental signs reconstructed so they can be read from period photographs.',
    },
    {
      title: 'Fuel Barrels and Equipment',
      description: 'Drums, cans, and stowage as they appeared on German fighting vehicles, not as generic accessories.',
    },
    {
      title: 'Road and Car Signs',
      description: 'Field and highway markers used around armored columns, drawn as historical graphics rather than clip-art.',
    },
    {
      title: '202nd Sturmgeschütz Battalion',
      description: 'Self-propelled guns in a single unit study, with camouflage tied to that formation’s record.',
    },
    {
      title: '508th Heavy Tank Battalion (Tiger)',
      description: 'Tiger operations in Italy in 1944, reconstructed from photographs of this heavy battalion.',
    },
    {
      title: 'Alternate history: Operation Valkyrie',
      description: 'A labelled “what if” closing chapter — fictional Free German Army markings, kept apart from the documentary plates.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Scale modelers who need argued Wehrmacht paint schemes instead of generic dark yellow.',
    'Readers building a complete Panzer Camouflage shelf, starting with the first hardcover.',
    'Researchers comparing divisional badges and tactical signs on German armor.',
  ],
}

const panzerTwo: ProductPageCopy = {
  headline: 'Panzer Camouflage Vol. II — Wehrmacht Tank Divisions | WWII Camouflage Art Book',
  seoTitle: 'Panzer Camouflage Vol. II | Wehrmacht Tank Division Camouflage',
  seoDescription:
    'Panzer Camouflage Volume II continues Igor Donchik’s Wehrmacht armor series with hand-drawn division camouflage, tactical markings, and field patterns from 1939 to 1945.',
  intro: [
    'Continue the Wehrmacht half of the encyclopedia — Volume II currently ships with €1 collector delivery.',
    'This second hardcover keeps the same hand-drawn method as Volume I, extending German tank-division camouflage across the war, with a 4,9 Trustpilot rating for the author’s books.',
  ],
  storyTitle: 'The Wehrmacht story continues',
  story: [
    'Volume II is the companion Wehrmacht book to Panzer Camouflage I. Where the first volume establishes the early divisions and signature studies, this one stays with German tank formations through the Polish campaign to the last year of the war.',
    'Plates reconstruct factory finishes, field-applied patterns, winter whitewash, and the simplified late-war schemes that appear in photographs but rarely in toy-like “ambush” artwork. Tactical numbers and divisional emblems are drawn as part of the vehicle, not as stickers floating on a profile.',
    'Use it beside Volume I if you are painting a Wehrmacht column, or as a stand-alone reference if your project sits in the mid- and late-war panzer divisions. Every illustration remains manual work from archival stills — the same discipline as the rest of the official catalog.',
  ],
  features: [
    'Hardcover continuation of the Wehrmacht series',
    'Division-by-division camouflage plates',
    'Tactical numbers and unit badges on the vehicle',
    'Field overpaints, winter, and late-war finishes',
    'Hand-drawn from wartime photographs',
    '€1 collector shipping while the offer lasts',
    'Limited print run from Estonia',
  ],
  specs: [
    { label: 'Format', value: 'Hardcover reference' },
    { label: 'Series', value: 'Panzer Camouflage, Volume II' },
    { label: 'Subject', value: 'Wehrmacht tank divisions, 1939–1945' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: [
    {
      title: 'Wehrmacht tank divisions in sequence',
      description: 'Further German armored formations, drawn with the same profile language as Volume I.',
    },
    {
      title: 'Campaign finishes, 1939–1942',
      description: 'Early-war greys, first three-tone experiments, and the paint that actually reached the front.',
    },
    {
      title: 'Mid-war field patterns',
      description: 'Workshop and crew overpaints that diverge from factory instructions.',
    },
    {
      title: 'Winter and seasonal coats',
      description: 'Whitewash, wash-off methods, and the worn surfaces seen in photographs.',
    },
    {
      title: 'Late-war simplifications',
      description: 'Reduced schemes and hurried application in the last campaigns.',
    },
    {
      title: 'Tactical signs on armor',
      description: 'How division badges and numbering sat on turrets, hulls, and schürzen.',
    },
    {
      title: 'Photographic notes',
      description: 'Source comments so a plate can be traced back to the stills that justified it.',
    },
    {
      title: 'Working index of schemes',
      description: 'A closer for the bench: which plates to open for a given formation and year.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Readers who already use Volume I and want the rest of the Wehrmacht tank-division set.',
    'Modelers painting 1943–1945 German armor with documented, not generic, patterns.',
    'Historians comparing how markings changed on the same formation over time.',
  ],
}

const panzerThree: ProductPageCopy = {
  headline: 'Panzer Camouflage Vol. III — Red Army Divisions | Soviet Armor 1939–1945',
  seoTitle: 'Panzer Camouflage Vol. III | Red Army Camouflage Patterns WWII',
  seoDescription:
    'Panzer Camouflage Volume III by Igor Donchik: hand-drawn Red Army armor camouflage 1939–1945, plus captured Soviet tanks in German service. Official artist edition.',
  intro: [
    'The third Panzer Camouflage hardcover leaves the Wehrmacht and reconstructs Red Army paint practice from 1939 to 1945.',
    'Soviet factory colors, field schemes, and German use of captured vehicles are all drawn by hand — part of the same 4,9 Trustpilot-rated reference library.',
  ],
  storyTitle: 'Soviet armor, drawn for the workbench',
  story: [
    'Volume III is the Red Army book in the Panzer Camouflage encyclopedia. It follows how Soviet armored units painted their tanks from the eve of the German invasion through the last campaigns of 1945, including the gap between official instructions and what crews actually applied.',
    'A second thread documents Beutepanzer practice: Soviet types taken into German service, with new crosses, numbers, and overpaints. Those plates sit beside the Red Army schemes so you can see both sides of a captured vehicle’s life.',
    'As with the German volumes, nothing here is a video-game skin. Profiles are rebuilt from photographs and period notes, then drawn so a modeler can copy edges, winter coats, and slogan or marking placement with a defensible source.',
  ],
  features: [
    'Hardcover Red Army camouflage reference',
    'Soviet schemes from 1939 to 1945',
    'Captured Soviet armor in German use',
    'Factory colors versus field application',
    'Hand-drawn plates, no generative AI',
    'Limited print run, shipped from Estonia',
  ],
  specs: [
    { label: 'Format', value: 'Hardcover reference' },
    { label: 'Series', value: 'Panzer Camouflage, Volume III' },
    { label: 'Subject', value: 'Red Army armor, 1939–1945' },
    { label: 'Also covers', value: 'Beutepanzer use of Soviet types' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: [
    {
      title: 'The Soviet camouflage system',
      description: 'How official paint rules were written, and how they met the reality of workshops and fronts.',
    },
    {
      title: 'Pre-war and 1941 finishes',
      description: 'Early greens, unit variation, and the schemes visible in the first year of the German–Soviet war.',
    },
    {
      title: 'Field patterns at the front',
      description: 'Crew and depot overpaints that photographs show more often than manuals do.',
    },
    {
      title: 'Winter and seasonal coats',
      description: 'Whitewash and worn winter surfaces on Red Army armor.',
    },
    {
      title: 'Markings and slogans',
      description: 'Tactical numbers, guards badges, and painted slogans placed as they appear on surviving stills.',
    },
    {
      title: 'Captured Soviet tanks in German hands',
      description: 'Beutepanzer overpaints, crosses, and German tactical signs on KV, T-34, and related types.',
    },
    {
      title: 'Comparative plates',
      description: 'Side-by-side notes so a Soviet scheme can be told apart from its German reuse.',
    },
    {
      title: 'Photographic notes',
      description: 'Source remarks for modelers who need to defend a color choice.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Modelers building Red Army tanks who want more than a single shade of 4BO green.',
    'Readers of Volumes I–II who need the Soviet counterpart and Beutepanzer chapter.',
    'Researchers tracking how captured Soviet armor was remarked in German units.',
  ],
}

const panzerFour: ProductPageCopy = {
  headline: 'Panzer Camouflage Vol. IV — Reichswehr to Wehrmacht | Interwar German Armor',
  seoTitle: 'Panzer Camouflage Vol. IV | Reichswehr and Interwar German Tanks',
  seoDescription:
    'Panzer Camouflage Volume IV by Igor Donchik reconstructs German armor camouflage from 1918 through the Reichswehr years to the eve of the Wehrmacht. Hand-drawn reference.',
  intro: [
    'Volume IV steps back before 1939: Freikorps, Reichswehr trials, and the paint systems that later Wehrmacht schemes grew out of.',
    'A hand-drawn interwar reference in the same encyclopedia as the wartime volumes, from an author with a 4,9 Trustpilot rating.',
  ],
  storyTitle: 'Before the wartime three-tone schemes',
  story: [
    'Most camouflage books begin in 1939. Volume IV begins in 1918. It follows German armored painting from the end of the First World War, through Freikorps vehicles, into the first tank trials of the Reichswehr, and up to the formations that became the Wehrmacht.',
    'The plates matter if you paint early panzers, visit a museum vehicle with an interwar finish, or need to understand why later German patterns look the way they do. Buntfarbenanstrich, grey experiments, and the first tactical markings are treated as a continuous story rather than a footnote.',
    'As elsewhere in the series, reconstructions stay tied to photographs and documents. Where evidence is thin, the book does not invent a decorative pattern to fill the page.',
  ],
  features: [
    'Hardcover interwar German armor reference',
    'From 1918 and the Freikorps into the Reichswehr',
    'Early tank trials and pre-war finishes',
    'The road from Reichswehr paint to Wehrmacht practice',
    'Hand-drawn plates from archival sources',
    'Limited print run, Estonia dispatch',
  ],
  specs: [
    { label: 'Format', value: 'Hardcover reference' },
    { label: 'Series', value: 'Panzer Camouflage, Volume IV' },
    { label: 'Period', value: '1918–1939, Germany' },
    { label: 'Subject', value: 'Freikorps, Reichswehr, early Wehrmacht' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: [
    {
      title: '1918 and the first armored paint',
      description: 'End-of-war German vehicles and the camouflage language carried into the following decade.',
    },
    {
      title: 'Freikorps armor',
      description: 'Improvised fighting vehicles and the markings used in the immediate post-war years.',
    },
    {
      title: 'Reichswehr trials',
      description: 'Early tank experiments, training vehicles, and the paint systems approved for a small army.',
    },
    {
      title: 'Interwar color orders',
      description: 'Official patterns — including multi-color coats — as they were specified and as they weathered.',
    },
    {
      title: 'Tactical signs before 1939',
      description: 'Numbers, rhomboids, and unit graphics that precede wartime divisional badges.',
    },
    {
      title: 'Toward the Wehrmacht',
      description: 'How late Reichswehr practice fed the first panzer divisions’ appearance.',
    },
    {
      title: 'Photographic notes',
      description: 'Source stills and the limits of what those stills can prove.',
    },
    {
      title: 'Bridge to Volumes I–II',
      description: 'Where an interwar plate ends and the wartime Wehrmacht books begin.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Modelers painting Reichswehr, Weimar, or very early panzer subjects.',
    'Collectors who want the prequel to Panzer Camouflage I and II.',
    'Researchers tracing German armor color orders before the Second World War.',
  ],
}

const panzerFive: ProductPageCopy = {
  headline: 'Panzer Camouflage Vol. V — Deutsches Afrikakorps | North Africa, in preparation',
  seoTitle: 'Panzer Camouflage Vol. V | DAK North Africa Camouflage (Coming Soon)',
  seoDescription:
    'Panzer Camouflage Volume V is in preparation for 2027: hand-drawn DAK and tropical armor camouflage, tactical signs, and North African schemes by Igor Donchik.',
  intro: [
    'Volume V is the African Corps book — tropical armor, desert overpaints, and DAK markings — still in the studio.',
    'The planned year is 2027. It will join the same hand-drawn encyclopedia that readers already rate 4,9 on Trustpilot; it is not yet offered for sale.',
  ],
  storyTitle: 'A North Africa volume, still on the drawing board',
  story: [
    'Panzer Camouflage V is reserved for Rommel’s Afrikakorps and the wider tropical story: sand and green overpaints, the way European schemes were rewritten for North Africa, and the tactical signs painted on armor in that theatre.',
    'Until publication, the page exists so the official catalog stays honest. There is no pre-order cart for this volume. When the plates are ready to print, the book will move from “in development” to in stock like the earlier hardcovers.',
    'If you are collecting the set, Volumes I–IV remain the volumes you can put on the shelf now. Volume V will follow the same archival method: photographs first, hand drawing second, no generative fill.',
  ],
  features: [
    'Forthcoming DAK / North Africa reference',
    'Tropical camouflage and overpaints',
    'Afrikakorps tactical signs',
    'Planned for 2027',
    'Same hand-drawn method as Volumes I–IV',
    'Not available to order yet',
  ],
  specs: [
    { label: 'Status', value: 'In development' },
    { label: 'Planned', value: '2027' },
    { label: 'Series', value: 'Panzer Camouflage, Volume V' },
    { label: 'Subject', value: 'DAK and tropical armor schemes' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
  ],
  chapters: [
    {
      title: 'Tropical color orders',
      description: 'How German armor was supposed to look in Africa, and how paint actually arrived in theatre.',
    },
    {
      title: 'Sand, green, and overpaint',
      description: 'Workshop and crew applications over European base coats.',
    },
    {
      title: 'Afrikakorps tactical signs',
      description: 'Palm, swastika-and-palm, and related unit graphics as they appear on vehicles.',
    },
    {
      title: 'Armored types in the desert',
      description: 'Panzers, assault guns, and supporting vehicles in DAK service.',
    },
    {
      title: 'Wear, dust, and field repair',
      description: 'The surfaces photographs show after months of desert movement.',
    },
    {
      title: 'Photographic notes',
      description: 'The stills and film that will justify the finished plates.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Readers waiting for a dedicated DAK camouflage book in this series.',
    'Modelers who already use Volumes I–IV and want the tropical continuation.',
    'Anyone tracking forthcoming Igor Donchik titles on the official site.',
  ],
}

const panzerSix: ProductPageCopy = {
  headline: 'Panzer Camouflage Vol. VI — Next hardcover in the encyclopedia | In development',
  seoTitle: 'Panzer Camouflage Vol. VI | Forthcoming WWII Armor Reference',
  seoDescription:
    'Panzer Camouflage Volume VI is in development for 2028 on Igor Donchik’s official site. A further hand-drawn WWII armor camouflage hardcover; not yet for sale.',
  intro: [
    'Volume VI is announced so the series roadmap stays visible. The studio target is 2028.',
    'It will continue the hand-drawn Panzer Camouflage encyclopedia. There is no add-to-cart until the book exists as a printed object.',
  ],
  storyTitle: 'Held for the next printed volume',
  story: [
    'Panzer Camouflage VI is a placeholder on the official site, not a finished title. The earlier volumes — Wehrmacht, Red Army, and Reichswehr — are the books you can study and order today.',
    'When the sixth hardcover is ready, this page will gain the same kind of chapter list, plate count, and shipping notes as Volumes I–IV. Until then, treat 2028 as a studio date, not a shop promise.',
  ],
  features: [
    'Forthcoming Panzer Camouflage hardcover',
    'Studio target: 2028',
    'Same research method as the published volumes',
    'Not available to order yet',
  ],
  specs: [
    { label: 'Status', value: 'In development' },
    { label: 'Planned', value: '2028' },
    { label: 'Series', value: 'Panzer Camouflage, Volume VI' },
  ],
  chapters: [
    {
      title: 'To be announced',
      description: 'Chapter list, plate count, and subject notes will appear here when the volume leaves the studio.',
    },
  ],
  audienceTitle: 'Who this page is for',
  audience: [
    'Collectors following the full Panzer Camouflage plan.',
    'Readers who want forthcoming titles listed honestly, without a fake pre-order.',
  ],
}

const insigniaOne: ProductPageCopy = {
  headline: 'German Military Unit Insignia Vol. I — 727 Hand-Drawn Wehrmacht Emblems',
  seoTitle: 'German Military Unit Insignia Vol. I | 727 Wehrmacht Divisional Emblems',
  seoDescription:
    'German Military Unit Insignia Volume I by Igor Donchik: 727 hand-drawn Wehrmacht divisional emblems, 88-page softcover, ISBN 978-9916-9350-4-0. Official artist edition.',
  intro: [
    'A working atlas of Wehrmacht divisional badges — 727 emblems redrawn from photographs and documents, plus ten pages of vehicle profiles.',
    'Softcover, 88 pages, printed in limited batches. Part of the same 4,9 Trustpilot-rated library as the Panzer Camouflage hardcovers.',
  ],
  storyTitle: 'Divisional badges you can actually compare',
  story: [
    'German Military Unit Insignia Volume I collects 727 Wehrmacht formation badges in one visual language. Infantry, grenadier, Jäger, mountain, motorized, security, and fortress divisions sit beside army groups, corps, and observation battalions, so a badge seen on a photograph can be tested against a drawn standard rather than a muddy wartime print alone.',
    'Each emblem is reconstructed from archival stills and paperwork. Summary tables note raising, reorganization, and how a sign changed when a division was rebuilt. Where a badge cannot yet be identified, it is left open — the research does not invent a pretty device to close a gap.',
    'Ten pages of original vehicle side profiles by Igor Donchik show the same insignia on armor, with camouflage and placement argued from photographs. Modelers can move from the emblem plate to the vehicle plate without switching artists.',
  ],
  isbn: '978-9916-9350-4-0',
  features: [
    '727 hand-drawn Wehrmacht divisional insignia',
    'Softcover, 88 pages',
    'ISBN 978-9916-9350-4-0',
    'Infantry, Jäger, mountain, motorized, security, fortress',
    'Army groups, armies, corps, observation battalions',
    '10 pages of original vehicle profiles',
    'Summary tables of formation history',
    'Limited print run from Estonia',
  ],
  specs: [
    { label: 'Format', value: 'Softcover' },
    { label: 'Pages', value: '88' },
    { label: 'Illustrations', value: '727 emblems plus vehicle profiles' },
    { label: 'ISBN', value: '978-9916-9350-4-0' },
    { label: 'Released', value: '6 August 2025' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: [
    {
      title: 'Infantry divisions',
      description: 'Emblems and summary tables for the core infantry formations of the wartime army.',
    },
    {
      title: 'Propaganda units',
      description: 'Distinctive signs used by propaganda formations, redrawn from surviving sources.',
    },
    {
      title: 'Mountain division',
      description: 'Gebirgs badges with notes on how the devices were painted and worn.',
    },
    {
      title: 'Light infantry divisions',
      description: 'Leichte Division emblems and the tables that track their reorganization.',
    },
    {
      title: 'Jäger divisions',
      description: 'Jäger insignia reconstructed for comparison with infantry and mountain signs.',
    },
    {
      title: 'Motorized divisions',
      description: 'Badges of motorized infantry formations and their later identities.',
    },
    {
      title: 'Security and fortress divisions',
      description: 'Occupation, security, and fortress unit devices, often poorly photographed.',
    },
    {
      title: 'Grenadier and Volksgrenadier divisions',
      description: 'Late-war infantry titles and the emblems that travelled with them.',
    },
    {
      title: 'Army groups, armies, and corps',
      description: 'Higher-command graphics used on vehicles, maps, and headquarters signs.',
    },
    {
      title: 'Observation battalions',
      description: 'Specialist artillery observation badges collected in one section.',
    },
    {
      title: 'Assorted Wehrmacht insignia',
      description: 'Further devices that do not sit cleanly in the division chapters.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Modelers who need to name a badge visible on a turret or mudguard.',
    'Collectors identifying formation signs on original equipment.',
    'Historians who want a consistent drawn set rather than scattered wartime snapshots.',
  ],
}

const insigniaTwo: ProductPageCopy = {
  headline: 'German Military Unit Insignia Vol. II — Panzer and elite formations | Coming soon',
  seoTitle: 'German Military Unit Insignia Vol. II | Panzer Formations (Coming Soon)',
  seoDescription:
    'German Military Unit Insignia Volume II is in preparation for 2027: panzer, panzergrenadier, and elite Wehrmacht formation badges by Igor Donchik. Not yet for sale.',
  intro: [
    'Volume II will extend the insignia atlas into panzer, panzergrenadier, and selected elite formations.',
    'Planned for 2027. Volume I remains the in-print book you can order now; this title is not in the cart yet.',
  ],
  storyTitle: 'The armored half of the insignia atlas',
  story: [
    'Unit Insignia I covers infantry and related arms. Volume II is reserved for the armored and elite devices that modelers ask for next: panzer divisions, panzergrenadier formations, and further higher-command signs that belong with those units.',
    'The same drawing rules will apply — archival photographs, no invented badges, summary notes where a formation was rebuilt. Until the studio date, this page is a roadmap entry, not a product you can check out.',
  ],
  features: [
    'Forthcoming panzer and panzergrenadier insignia volume',
    'Elite formation badges planned for this atlas',
    'Same reconstruction method as Volume I',
    'Studio target: 2027',
    'Not available to order yet',
  ],
  specs: [
    { label: 'Status', value: 'In development' },
    { label: 'Planned', value: '2027' },
    { label: 'Series', value: 'German Military Unit Insignia, Volume II' },
    { label: 'Subject', value: 'Panzer, panzergrenadier, elite formations' },
  ],
  chapters: [
    {
      title: 'Panzer divisions',
      description: 'Formation badges of German tank divisions, to be reconstructed in the Volume I style.',
    },
    {
      title: 'Panzergrenadier divisions',
      description: 'Mechanized infantry emblems and their wartime changes of title.',
    },
    {
      title: 'Elite and named formations',
      description: 'Selected distinctive devices that sit outside the ordinary infantry list.',
    },
    {
      title: 'Higher commands and vehicle placement',
      description: 'How these badges were painted on armor, cars, and signboards.',
    },
  ],
  audienceTitle: 'Who this page is for',
  audience: [
    'Readers of Volume I waiting for the panzer half of the atlas.',
    'Modelers who need armored-formation badges and are tracking the 2027 slot.',
  ],
}

const insigniaThree: ProductPageCopy = {
  headline: 'German Military Unit Insignia Vol. III — Further formations | In development',
  seoTitle: 'German Military Unit Insignia Vol. III | Forthcoming Emblem Atlas',
  seoDescription:
    'German Military Unit Insignia Volume III is in development for 2028 on Igor Donchik’s official site. A further Wehrmacht emblem volume; not yet for sale.',
  intro: [
    'Volume III continues the insignia encyclopedia after the panzer book. The studio year is 2028.',
    'No cart button until the plates exist. Volume I is the title in print today.',
  ],
  storyTitle: 'A later volume in the same atlas',
  story: [
    'Unit Insignia III is listed so the series is complete on the official site. Subject notes and chapter lists will be published when the drawings leave the studio.',
    'Until 2028, use Volume I as the working emblem reference, and treat Volume II as the next announced hardcover-or-softcover in the pipeline.',
  ],
  features: [
    'Forthcoming third insignia volume',
    'Studio target: 2028',
    'Follows Volumes I and II in the same atlas',
    'Not available to order yet',
  ],
  specs: [
    { label: 'Status', value: 'In development' },
    { label: 'Planned', value: '2028' },
    { label: 'Series', value: 'German Military Unit Insignia, Volume III' },
  ],
  chapters: [
    {
      title: 'To be announced',
      description: 'The chapter list will be published with the finished plates.',
    },
  ],
  audienceTitle: 'Who this page is for',
  audience: [
    'Collectors following every volume of the insignia atlas.',
  ],
}

const symbolsOne: ProductPageCopy = {
  headline: 'German Military Symbols Vol. I — WWII Tactical Markings Encyclopedia',
  seoTitle: 'German Military Symbols Vol. I | 1000+ Wehrmacht Tactical Signs',
  seoDescription:
    'German Military Symbols Volume I by Igor Donchik: more than 1,000 WWII tactical markings used on Wehrmacht, Luftwaffe, and Kriegsmarine vehicles and maps. Official edition.',
  intro: [
    'An illustrated encyclopedia of German tactical shorthand — more than a thousand signs taken from vehicles, maps, and staff graphics.',
    'Drawn by hand for modelers and researchers, in the same 4,9 Trustpilot-rated catalog as the camouflage and insignia books.',
  ],
  storyTitle: 'The markings that sit beside camouflage',
  story: [
    'Panzer Camouflage tells you how a tank was painted. German Military Symbols Volume I tells you what the little signs on that tank — and on the map that sent it — were supposed to mean. The first volume gathers over a thousand reconstructed markings used by the Wehrmacht, with related Luftwaffe and Kriegsmarine graphics where they share the same visual language.',
    'Plates cover branch symbols, vehicle tactical signs, abbreviations, and road or route markers. The drawings are standardized so a sign from a staff map can be compared with the same sign painted on a hull, without two different artists’ interpretations.',
    'If you have ever paused a photograph because a rhomboid, chevron, or letter code would identify the unit, this is the book meant to sit open on that desk. A discounted copy with small cover wear is listed separately when we have one; the plates inside are the same.',
  ],
  features: [
    'More than 1,000 reconstructed tactical symbols',
    'Wehrmacht, Luftwaffe, and Kriegsmarine graphics',
    'Vehicle markings and map / staff signs',
    'Road markers and abbreviation plates',
    'Hand-drawn encyclopedia format',
    'Limited print run, Estonia dispatch',
  ],
  specs: [
    { label: 'Series', value: 'German Military Symbols, Volume I' },
    { label: 'Subject', value: 'WWII German tactical markings' },
    { label: 'Scope', value: '1,000+ reconstructed signs' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: [
    {
      title: 'Tactical symbol primer',
      description: 'How German staff and vehicle graphics were built, and how to read a plate in this encyclopedia.',
    },
    {
      title: 'Branch and arm of service',
      description: 'Infantry, armor, artillery, engineers, and support signs used on maps and vehicles.',
    },
    {
      title: 'Markings on armor and soft-skins',
      description: 'Tactical symbols as they were painted on tanks, cars, and trucks.',
    },
    {
      title: 'Map and document graphics',
      description: 'The same language on overlays, orders, and printed legends.',
    },
    {
      title: 'Luftwaffe and Kriegsmarine plates',
      description: 'Related signs that share the German tactical vocabulary.',
    },
    {
      title: 'Road and route markers',
      description: 'Field and highway graphics that sat around moving columns.',
    },
    {
      title: 'Abbreviations',
      description: 'Letter codes that appear beside symbols in wartime paperwork and on vehicles.',
    },
    {
      title: 'Index of signs',
      description: 'A closing finder so you can move from a photograph to the matching plate.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Modelers decoding a tactical sign on a photograph or surviving vehicle.',
    'Wargamers and historians who need map-legend accuracy, not modern NATO symbols.',
    'Readers who already own the camouflage books and need the markings layer.',
  ],
}

const symbolsTwo: ProductPageCopy = {
  headline: 'German Military Symbols Vol. II — Further Vehicle and Map Signs',
  seoTitle: 'German Military Symbols Vol. II | WWII Vehicle Markings Guide',
  seoDescription:
    'German Military Symbols Volume II by Igor Donchik extends the tactical-markings encyclopedia with further Wehrmacht vehicle, map, and staff signs. Hand-drawn official edition.',
  intro: [
    'Volume II is the continuation of the symbols encyclopedia — more vehicle markings and map graphics in the same drawn standard as Volume I.',
    'Built for readers who already use the first book at the bench, with the author’s 4,9 Trustpilot rating across the catalog.',
  ],
  storyTitle: 'The second binder in the markings encyclopedia',
  story: [
    'One volume cannot hold every German tactical graphic of the war. Volume II adds further plates of vehicle markings, staff signs, and related Luftwaffe or naval graphics so the first book does not have to be overloaded.',
    'The visual language does not change. If you learned to read Volume I, these pages slot beside it: same line weight, same reconstruction rules, same refusal to “pretty up” a sign the photograph does not support.',
    'Order it as a pair with Volume I if you are building a markings desk set, or on its own if you already own the first encyclopedia and keep hitting signs that were not in that index.',
  ],
  features: [
    'Continuation of the tactical-symbols encyclopedia',
    'Further vehicle and map plates',
    'Wehrmacht focus with related service graphics',
    'Matches Volume I drawing standard',
    'Hand-drawn, limited print run',
    'Shipped from Estonia with tracking',
  ],
  specs: [
    { label: 'Series', value: 'German Military Symbols, Volume II' },
    { label: 'Subject', value: 'Further WWII German tactical markings' },
    { label: 'Use with', value: 'Volume I as the base encyclopedia' },
    { label: 'Drawing', value: 'Hand-drawn, no generative AI' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: [
    {
      title: 'Further vehicle markings',
      description: 'Additional hull, turret, and soft-skin signs beyond the first volume’s index.',
    },
    {
      title: 'Staff and map plates',
      description: 'More overlay graphics and document marks used by German headquarters.',
    },
    {
      title: 'Field variants',
      description: 'Hand-painted wartime simplifications that diverge from the textbook form.',
    },
    {
      title: 'Color and contrast notes',
      description: 'How signs were painted for visibility on armor, signs, and paper.',
    },
    {
      title: 'Cross-reference to Volume I',
      description: 'Where a sign in this book continues a family already drawn in the first encyclopedia.',
    },
    {
      title: 'Photographic notes',
      description: 'Source stills for the added plates.',
    },
    {
      title: 'Extended index',
      description: 'A finder for the second volume’s signs.',
    },
  ],
  audienceTitle: 'Who this volume is for',
  audience: [
    'Owners of Volume I who need the rest of the markings set.',
    'Modelers working from photographs that show less common tactical graphics.',
    'Researchers comparing vehicle paint with staff-map legends.',
  ],
}

const symbolsSale: ProductPageCopy = {
  headline: 'German Military Symbols Vol. I — Discounted copy with minor cover wear',
  seoTitle: 'German Military Symbols Vol. I Sale Copy | Minor Cover Defects',
  seoDescription:
    'Discounted German Military Symbols Volume I: same 1,000+ tactical-marking plates, minor cover wear. Final sale, non-refundable. Official Igor Donchik edition.',
  intro: [
    'This is the Volume I encyclopedia at a reduced price because the cover is not mint. The interior plates are complete.',
    'By ordering this copy you accept small exterior defects. Sale books are not refundable and not exchangeable.',
  ],
  storyTitle: 'The same encyclopedia, a softer cover price',
  story: [
    'Printing and packing sometimes leave a scuff, a bumped corner, or a small mark on the cover. Rather than waste a finished book, we sell those copies here. Inside you still get the German Military Symbols Volume I plates: more than a thousand reconstructed tactical signs for vehicles, maps, and related German graphics.',
    'Choose this listing if you want the reference and do not need a display-grade cover. Choose the standard Volume I in the store if the jacket has to be clean. We will not replace a sale copy because of the defects described on this page.',
  ],
  features: [
    'Same interior as German Military Symbols Volume I',
    'Minor cover defects — sold as-is',
    'Non-refundable and non-exchangeable',
    'More than 1,000 tactical symbols inside',
    'Lower price than the standard edition',
  ],
  specs: [
    { label: 'Condition', value: 'Minor cover defects' },
    { label: 'Interior', value: 'Complete Volume I plates' },
    { label: 'Returns', value: 'Final sale' },
    { label: 'Series', value: 'German Military Symbols, Volume I' },
    { label: 'Dispatch', value: 'Estonia, Omniva' },
  ],
  chapters: symbolsOne.chapters,
  audienceTitle: 'Who this copy is for',
  audience: [
    'Readers who need the Volume I plates and can accept a marked cover.',
    'Workshops that would rather spend on paint than on a mint jacket.',
  ],
}

const copies: Record<string, ProductPageCopy> = {
  'panzer-camouflage-volume-i': panzerOne,
  'panzer-camouflage-volume-ii': panzerTwo,
  'panzer-camouflage-volume-iii': panzerThree,
  'panzer-camouflage-volume-iv': panzerFour,
  'panzer-camouflage-volume-v': panzerFive,
  'panzer-camouflage-volume-vi': panzerSix,
  'german-military-unit-insignia-volume-i': insigniaOne,
  'german-military-unit-insignia-volume-ii': insigniaTwo,
  'german-military-unit-insignia-volume-iii': insigniaThree,
  'german-military-symbols-volume-i': symbolsOne,
  'german-military-symbols-volume-ii': symbolsTwo,
  'german-military-symbols-volume-i-sale': symbolsSale,
}

function fallbackCopy(product: Product): ProductPageCopy {
  const story = product.description
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    headline: getProductHeadline(product),
    seoTitle: `${product.title} ${product.volumeLabel}`,
    seoDescription: product.shortDescription,
    intro: [
      product.shortDescription,
      `A hand-drawn WWII reference by Igor Donchik, with a 4,9 Trustpilot rating across the official catalog.`,
    ],
    storyTitle: `${product.title} ${product.volumeLabel}`,
    story: story.length > 0 ? story : [product.shortDescription],
    features: product.features,
    specs: product.features.map((feature) => ({ label: 'Feature', value: feature })),
    chapters: product.chapters,
    audienceTitle: 'Who this volume is for',
    audience: ['Modelers, historians, and collectors using Igor Donchik’s official reference books.'],
  }
}

export function getProductCopyBySlug(slug: string): ProductPageCopy | undefined {
  return copies[slug]
}

export function getCatalogPageMeta(slug: string): ProductPageMeta | undefined {
  const copy = copies[slug]
  if (!copy) {
    return undefined
  }

  return {
    headline: copy.headline,
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
    intro: copy.intro,
    storyTitle: copy.storyTitle,
    audienceTitle: copy.audienceTitle,
    audience: copy.audience,
    specs: copy.specs,
    isbn: copy.isbn,
  }
}

function storyFromProduct(product: Product): string[] {
  return product.description
    .split(/\n\s*\n|(?<=\.)\s+(?=[A-ZА-Я])/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function pickText(primary: string | undefined, fallback: string): string {
  const value = primary?.trim()
  return value ? value : fallback
}

function pickList<T>(primary: T[] | undefined, fallback: T[]): T[] {
  return primary && primary.length > 0 ? primary : fallback
}

export function getProductPageCopy(product: Product): ProductPageCopy {
  const base = copies[product.slug] ?? fallbackCopy(product)
  const meta = product.pageCopy ?? {}
  const story = storyFromProduct(product)

  return {
    headline: pickText(meta.headline, base.headline),
    seoTitle: pickText(meta.seoTitle, base.seoTitle),
    seoDescription: pickText(meta.seoDescription, pickText(product.shortDescription, base.seoDescription)),
    intro: pickList(meta.intro, base.intro),
    storyTitle: pickText(meta.storyTitle, base.storyTitle),
    story: story.length > 0 ? story : base.story,
    features: pickList(product.features, base.features),
    specs: pickList(meta.specs, base.specs),
    chapters: pickList(product.chapters, base.chapters),
    audienceTitle: pickText(meta.audienceTitle, base.audienceTitle),
    audience: pickList(meta.audience, base.audience),
    isbn: meta.isbn ?? base.isbn,
  }
}
