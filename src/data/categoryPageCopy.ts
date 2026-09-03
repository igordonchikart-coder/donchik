import type { Category } from '@/types'

export interface CategoryPageCopy {
  title: string
  seoTitle: string
  seoDescription: string
  lead: string
  paragraphs: string[]
}

const copies: Record<string, CategoryPageCopy> = {
  'panzer-camouflage': {
    title: 'Panzer Camouflage book series',
    seoTitle: 'Panzer Camouflage Series | WWII Armor Paint Schemes by Igor Donchik',
    seoDescription:
      'Hand-drawn Panzer Camouflage volumes covering Wehrmacht, Red Army, Reichswehr, and forthcoming DAK armor schemes. Official Igor Donchik WWII reference series.',
    lead: 'A multi-volume encyclopedia of armored camouflage, reconstructed plate by plate from wartime photographs rather than modern box-art conventions.',
    paragraphs: [
      'Volume I opens the Wehrmacht story: early divisions, captured KV tanks, tactical signs, and a closing “what if” study of Operation Valkyrie. Volume II continues German tank-division patterns through the war. Volume III turns to Red Army schemes and German use of captured Soviet armor. Volume IV steps back to the Reichswehr, Freikorps, and the interwar years that shaped later German paint practice.',
      'Volumes V and VI are in the studio. The African Corps / DAK book is planned for 2027; the sixth volume follows in 2028. Until those releases, the published hardcover references remain the working set for modelers who need historically argued color, not generic olive or sand.',
      'Selected in-print Panzer volumes currently ship with €1 collector delivery from Estonia.',
    ],
  },
  'german-military-symbols': {
    title: 'German Military Symbols book series',
    seoTitle: 'German Military Symbols | WWII Tactical Markings Encyclopedia',
    seoDescription:
      'Igor Donchik’s German Military Symbols books document Wehrmacht, Luftwaffe, and Kriegsmarine tactical signs used on vehicles, maps, and road markers in WWII.',
    lead: 'An illustrated catalogue of German tactical markings — the shorthand painted on armor, printed on maps, and posted on wartime roads.',
    paragraphs: [
      'Volume I gathers more than a thousand reconstructed signs: branch symbols, vehicle markings, abbreviations, and related road or staff graphics. Volume II extends the same encyclopedia with further vehicle and map plates for readers who already use the first book at the bench.',
      'The series is written for modelers who must identify a sign from a photograph, historians comparing map legends, and collectors documenting original equipment. Drawings stay consistent from plate to plate so a marking in one chapter can be compared with another without a change of style.',
      'A discounted Volume I with minor cover wear is listed on the Discounts page when stock is available. Those copies are final sale.',
    ],
  },
  'german-military-unit-insignia': {
    title: 'German Military Unit Insignia book series',
    seoTitle: 'German Military Unit Insignia | Wehrmacht Divisional Emblems',
    seoDescription:
      'Hand-drawn Wehrmacht divisional insignia reconstructed by Igor Donchik. Volume I is in print; later volumes covering panzer and elite formations are in development.',
    lead: 'A structured atlas of German formation badges — redrawn from photographs and documents so emblems can be compared across infantry, mountain, motorized, and higher commands.',
    paragraphs: [
      'Volume I presents 727 divisional insignia with summary notes on infantry, grenadier, Jäger, mountain, motorized, security, and fortress units, plus army groups, corps, and observation battalions. Ten pages of original vehicle profiles show how those badges sat on armor.',
      'Volume II will move into panzer, panzergrenadier, and selected elite formations; Volume III continues the atlas. Both later books are announced here only as forthcoming titles — they are not yet for sale.',
      'The series is meant to sit beside period photographs: when a caption says only “German tank in Russia,” the plates help you test which formation the visible badge might belong to.',
    ],
  },
}

export function getCategoryPageCopy(category: Category): CategoryPageCopy {
  return (
    copies[category.slug] ?? {
      title: `«${category.title}» book series`,
      seoTitle: `${category.title} | WWII Reference Series`,
      seoDescription: category.description,
      lead: category.description,
      paragraphs: [],
    }
  )
}
