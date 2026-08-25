import type { Product } from '@/types'
import { toVolumeLabel } from '@/utils/product'
import { placeholders } from './placeholders'

const [cover1, cover2, cover3, cover4, cover5, cover6] = placeholders.covers

function four(start: number): string[] {
  return [0, 1, 2, 3].map((offset) => placeholders.covers[(start + offset) % placeholders.covers.length])
}

const panzerChapters = [
  {
    title: 'Panzer Divisions 1-7',
    description: 'Evolution of camouflage schemes and tactical insignia.',
  },
  {
    title: 'Early War Patterns',
    description: 'Factory finishes and first field applications.',
  },
  {
    title: 'Beutepanzer KV-1 and KV-2',
    description: 'Captured vehicles and their German markings.',
  },
  {
    title: 'Tactical Insignia 1939-1945',
    description: 'Divisional signs, numbers, and unit markings.',
  },
  {
    title: 'Winter Camouflage',
    description: 'Whitewash methods and seasonal overpaints.',
  },
  {
    title: 'Late-War Schemes',
    description: 'Ambush patterns and simplified late production finishes.',
  },
  {
    title: 'Reference Photos',
    description: 'Archival photographs with notes for modelers.',
  },
  {
    title: 'Alternate History Plate',
    description: 'A closing illustrated study of unused pattern variants.',
  },
]

const insigniaChapters = [
  {
    title: 'Divisional Insignia',
    description: 'Wehrmacht divisional signs reconstructed from archival sources.',
  },
  {
    title: 'Panzer and Panzergrenadier Units',
    description: 'Markings of armored and mechanized formations.',
  },
  {
    title: 'Army Groups and Corps',
    description: 'Higher-command emblems and their field variants.',
  },
  {
    title: 'Elite Formations',
    description: 'Distinctive insignia of selected wartime units.',
  },
  {
    title: 'Observation and Support Battalions',
    description: 'Specialist unit signs used alongside combat divisions.',
  },
  {
    title: 'Vehicle Placement',
    description: 'Where insignia were painted on tanks, cars, and soft-skins.',
  },
  {
    title: 'Reference Photos',
    description: 'Wartime photographs used to verify each reconstruction.',
  },
  {
    title: 'Index of Units',
    description: 'A closing register of formations covered in the volume.',
  },
]

const symbolsChapters = [
  {
    title: 'Tactical Symbols',
    description: 'The core encyclopedia of German tactical markings.',
  },
  {
    title: 'Vehicle Markings',
    description: 'Symbols applied to armor, trucks, and command cars.',
  },
  {
    title: 'Map and Document Signs',
    description: 'Marks used on maps, orders, and staff paperwork.',
  },
  {
    title: 'Branch Distinctions',
    description: 'Symbols for infantry, armor, artillery, and support arms.',
  },
  {
    title: 'Field Variations',
    description: 'Hand-painted wartime variants and simplified forms.',
  },
  {
    title: 'Color Notes',
    description: 'Paint colors and contrast used on vehicles and signs.',
  },
  {
    title: 'Reference Photos',
    description: 'Archival images that confirm each reconstructed mark.',
  },
  {
    title: 'Index of Symbols',
    description: 'A closing catalogue of the symbols in this volume.',
  },
]

function chaptersFor(categoryId: string) {
  if (categoryId === 'series-unit-insignia') {
    return insigniaChapters
  }

  if (categoryId === 'series-military-symbols') {
    return symbolsChapters
  }

  return panzerChapters
}

function book(
  partial: Omit<Product, 'volumeLabel' | 'createdAt' | 'updatedAt' | 'currency' | 'gallery'> & {
    gallery?: string[]
    createdAt?: string
  },
): Product {
  return {
    ...partial,
    currency: 'EUR',
    gallery: partial.gallery ?? [partial.coverImage],
    volumeLabel: toVolumeLabel(partial.volumeNumber),
    chapters: partial.chapters.length > 0 ? partial.chapters : chaptersFor(partial.categoryId),
    hasVideo: true,
    createdAt: partial.createdAt ?? '2026-02-01T12:00:00.000Z',
    updatedAt: partial.createdAt ?? '2026-02-01T12:00:00.000Z',
  }
}

export const mockProducts: Product[] = [
  book({
    id: 'prod-panzer-1',
    slug: 'panzer-camouflage-volume-i',
    title: 'Panzer Camouflage',
    volumeNumber: 1,
    shortDescription: 'Wehrmacht divisions camouflage patterns in WWII.',
    description:
      'The beginning of the legendary series. Panzer Camouflage Vol. I by Igor Donchik documents early camouflage development with historically researched plates and markings. Built as a long product page: description, contents, video, and related volumes.',
    features: ['180 detailed profiles', '128 pages', 'Hand-drawn plates'],
    chapters: panzerChapters,
    price: 56,
    coverImage: cover1,
    gallery: four(0),
    categoryId: 'series-panzer-camouflage',
    stock: 14,
    isAvailable: true,
    isFeatured: true,
    isOnSale: false,
    deliveryNote: '€1 delivery',
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-panzer-2',
    slug: 'panzer-camouflage-volume-ii',
    title: 'Panzer Camouflage',
    volumeNumber: 2,
    shortDescription: 'Wehrmacht tank divisions from 1939 to 1945.',
    description: 'The second volume continues the camouflage record across wartime tank divisions.',
    features: ['Division-by-division plates', 'Color notes', 'Insignia details'],
    chapters: [],
    price: 56,
    coverImage: cover2,
    gallery: four(1),
    categoryId: 'series-panzer-camouflage',
    stock: 11,
    isAvailable: true,
    isFeatured: true,
    isOnSale: false,
    deliveryNote: '€1 delivery',
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-panzer-3',
    slug: 'panzer-camouflage-volume-iii',
    title: 'Panzer Camouflage',
    volumeNumber: 3,
    shortDescription: 'Red Army armored vehicles, 1939 to 1945.',
    description: 'A volume on captured and opposing armor, with emphasis on markings and field finishes.',
    features: ['Beutepanzer studies', 'Comparative plates'],
    chapters: [],
    price: 44.8,
    coverImage: cover3,
    gallery: four(2),
    categoryId: 'series-panzer-camouflage',
    stock: 8,
    isAvailable: true,
    isFeatured: false,
    isOnSale: false,
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-panzer-4',
    slug: 'panzer-camouflage-volume-iv',
    title: 'Panzer Camouflage',
    volumeNumber: 4,
    shortDescription: 'Later camouflage schemes and unit practice.',
    description: 'Volume IV continues the series with later-war patterns and unit-level variation.',
    features: ['Late-war schemes', 'Unit examples'],
    chapters: [],
    price: 56,
    coverImage: cover4,
    gallery: four(3),
    categoryId: 'series-panzer-camouflage',
    stock: 6,
    isAvailable: true,
    isFeatured: false,
    isOnSale: false,
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-panzer-5',
    slug: 'panzer-camouflage-volume-v',
    title: 'Panzer Camouflage',
    volumeNumber: 5,
    shortDescription: 'Next volume in the camouflage series.',
    description:
      'This volume is scheduled for publication in 2027. It continues the Panzer Camouflage series with Rommel’s African Corps, tropical schemes, and tactical insignia of the desert campaign.',
    features: [],
    chapters: [],
    price: 56,
    coverImage: cover5,
    gallery: four(4),
    categoryId: 'series-panzer-camouflage',
    stock: 0,
    isAvailable: false,
    isFeatured: false,
    isOnSale: false,
    status: 'coming-soon',
    releaseYear: 2027,
    hasVideo: true,
  }),
  book({
    id: 'prod-panzer-6',
    slug: 'panzer-camouflage-volume-vi',
    title: 'Panzer Camouflage',
    volumeNumber: 6,
    shortDescription: 'Book in development.',
    description:
      'Volume VI is in development. It will close the Panzer Camouflage series with later research plates and a final illustrated study.',
    features: [],
    chapters: [],
    price: 56,
    coverImage: cover6,
    gallery: four(5),
    categoryId: 'series-panzer-camouflage',
    stock: 0,
    isAvailable: false,
    isFeatured: false,
    isOnSale: false,
    status: 'coming-soon',
    releaseYear: 2028,
    hasVideo: true,
  }),
  book({
    id: 'prod-insignia-1',
    slug: 'german-military-unit-insignia-volume-i',
    title: 'German Military Unit Insignia',
    volumeNumber: 1,
    shortDescription: 'German military symbols in WWII.',
    description:
      '727 meticulously hand-drawn Wehrmacht divisional insignia reconstructed from archival sources. A practical WWII reference book for modelers, historians and collectors.',
    features: ['727 hand-drawn insignia', 'Reference plates', 'For modelers'],
    chapters: [],
    price: 33.6,
    coverImage: cover4,
    gallery: four(3),
    categoryId: 'series-unit-insignia',
    stock: 20,
    isAvailable: true,
    isFeatured: true,
    isOnSale: false,
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-insignia-2',
    slug: 'german-military-unit-insignia-volume-ii',
    title: 'German Military Unit Insignia',
    volumeNumber: 2,
    shortDescription: 'Further WWII German divisions.',
    description:
      'This volume documents the insignia of German divisions active during World War II. It covers panzergrenadier, Panzer Division and elite units, plus army groups, corps and observation battalions.',
    features: [],
    chapters: [],
    price: 39.9,
    coverImage: cover5,
    gallery: four(4),
    categoryId: 'series-unit-insignia',
    stock: 0,
    isAvailable: false,
    isFeatured: false,
    isOnSale: false,
    status: 'coming-soon',
    releaseYear: 2027,
    hasVideo: true,
  }),
  book({
    id: 'prod-insignia-3',
    slug: 'german-military-unit-insignia-volume-iii',
    title: 'German Military Unit Insignia',
    volumeNumber: 3,
    shortDescription: 'Book in development.',
    description:
      'Volume III is in development. It will continue the insignia encyclopedia with further formations and reference plates.',
    features: [],
    chapters: [],
    price: 39.9,
    coverImage: cover6,
    gallery: four(5),
    categoryId: 'series-unit-insignia',
    stock: 0,
    isAvailable: false,
    isFeatured: false,
    isOnSale: false,
    status: 'coming-soon',
    releaseYear: 2028,
    hasVideo: true,
  }),
  book({
    id: 'prod-symbols-1',
    slug: 'german-military-symbols-volume-i',
    title: 'German Military Symbols',
    volumeNumber: 1,
    shortDescription: 'Encyclopedia of authentic tactical symbols.',
    description: 'A reference volume of tactical symbols used on German vehicles and documents.',
    features: ['Over 1,000 symbols', 'Ground encyclopedia'],
    chapters: [],
    price: 33.6,
    coverImage: cover3,
    gallery: four(2),
    categoryId: 'series-military-symbols',
    stock: 10,
    isAvailable: true,
    isFeatured: false,
    isOnSale: false,
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-symbols-2',
    slug: 'german-military-symbols-volume-ii',
    title: 'German Military Symbols',
    volumeNumber: 2,
    shortDescription: 'Further tactical symbols and vehicle markings.',
    description: 'The second volume continues the encyclopedia of authentic tactical symbols used on German vehicles and documents.',
    features: ['Additional plates', 'Vehicle markings'],
    chapters: [],
    price: 39.9,
    coverImage: cover1,
    gallery: four(0),
    categoryId: 'series-military-symbols',
    stock: 7,
    isAvailable: true,
    isFeatured: false,
    isOnSale: false,
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-symbols-sale',
    slug: 'german-military-symbols-volume-i-sale',
    title: 'German Military Symbols',
    volumeNumber: 1,
    shortDescription: 'Sale copy with minor defects.',
    description: 'The same reference volume, offered as a copy with minor defects. Non-refundable.',
    features: ['Minor defects', 'Non-refundable'],
    chapters: [],
    price: 15,
    originalPrice: 33.6,
    coverImage: cover2,
    gallery: four(1),
    categoryId: 'series-military-symbols',
    stock: 4,
    isAvailable: true,
    isFeatured: false,
    isOnSale: true,
    saleLabel: 'Super sale',
    conditionNote: 'This book has minor defects and is non-refundable.',
    status: 'available',
    hasVideo: true,
  }),
]
