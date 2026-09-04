import type { Product } from '@/types'
import { getProductPageCopy } from './productPageCopy'

const cardDescriptions: Record<string, string> = {
  'panzer-camouflage-volume-i':
    'Wehrmacht tank camouflage from the first Panzer Divisions through 1945, with 180 hand-drawn profiles, tactical signs, captured KV tanks, and eight hardcover chapters.',
  'panzer-camouflage-volume-ii':
    'The Wehrmacht encyclopedia continues from 1939 to 1945, with mid- and late-war schemes, winter whitewash, and division markings drawn from archival photographs.',
  'panzer-camouflage-volume-iii':
    'Red Army armor camouflage and markings from 1939 to 1945, including Soviet factory and field schemes plus Beutepanzer plates for captured tanks in German service.',
  'panzer-camouflage-volume-iv':
    'German armor paint from the Reichswehr years to 1939, covering Freikorps vehicles, early tank trials, and the color orders that shaped later Wehrmacht schemes.',
  'panzer-camouflage-volume-v':
    'North Africa volume in preparation for 2027, with DAK tropical overpaints, desert wear, and Afrikakorps tactical signs on armor.',
  'panzer-camouflage-volume-vi': 'Book in development',
  'german-military-unit-insignia-volume-i':
    '727 hand-drawn Wehrmacht divisional emblems in one atlas, with summary tables, infantry to corps signs, and ten pages of vehicle profiles.',
  'german-military-unit-insignia-volume-ii':
    'Panzer, panzergrenadier, and elite formation badges planned for 2027 — the armored continuation of the insignia atlas.',
  'german-military-unit-insignia-volume-iii': 'Book in development',
  'german-military-symbols-volume-i':
    'More than 1,000 WWII German tactical symbols on vehicles and maps, covering Wehrmacht, Luftwaffe, and Kriegsmarine markings in one encyclopedia.',
  'german-military-symbols-volume-ii':
    'Second volume of the tactical-signs encyclopedia, with further vehicle and staff markings in the same drawn standard as Volume I.',
  'german-military-symbols-volume-i-sale':
    'Volume I encyclopedia at a lower price: complete interior plates, minor cover wear, final sale and non-refundable.',
}

export function preventOrphanLine(text: string): string {
  const words = text.replace(/\s+/g, ' ').trim().split(' ')
  if (words.length < 3) {
    return words.join(' ')
  }

  return `${words.slice(0, -2).join(' ')}\u00A0${words.at(-2)}\u00A0${words.at(-1)}`
}

export function getProductCardDescription(product: Pick<Product, 'slug' | 'shortDescription'>): string {
  const fromProduct = product.shortDescription.trim()
  if (fromProduct) {
    return preventOrphanLine(fromProduct)
  }

  const fromCatalog = cardDescriptions[product.slug]
  if (fromCatalog) {
    return preventOrphanLine(fromCatalog)
  }

  const pageCopy = getProductPageCopy(product as Product)
  return preventOrphanLine(pageCopy.intro[0] ?? '')
}

export const productCardDescriptions = cardDescriptions
