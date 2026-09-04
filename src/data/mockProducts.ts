import type { Product } from '@/types'
import { symbolsCardSources } from '@/assets/books/military-symbols'
import {
  panzerVolumeSources,
} from '@/assets/books/panzer-camouflage'
import { insigniaCardSources } from '@/assets/books/unit-insignia'
import { productCardDescriptions } from '@/data/productCardCopy'
import { getProductCopyBySlug } from '@/data/productPageCopy'
import { toVolumeLabel } from '@/utils/product'

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
  partial: Omit<Product, 'volumeLabel' | 'createdAt' | 'updatedAt' | 'currency' | 'gallery' | 'pageGallery'> & {
    gallery?: string[]
    pageGallery?: string[]
    createdAt?: string
  },
): Product {
  const copy = getProductCopyBySlug(partial.slug)
  const cardDescription = productCardDescriptions[partial.slug]

  return {
    ...partial,
    currency: 'EUR',
    gallery: partial.gallery ?? [partial.coverImage],
    pageGallery: partial.pageGallery ?? [],
    volumeLabel: toVolumeLabel(partial.volumeNumber),
    shortDescription: cardDescription ?? partial.shortDescription,
    description: copy?.story.join('\n\n') ?? partial.description,
    features: copy?.features ?? partial.features,
    chapters: copy?.chapters ?? (partial.chapters.length > 0 ? partial.chapters : chaptersFor(partial.categoryId)),
    pageCopy: copy
      ? {
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
      : partial.pageCopy,
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
      'The first volume covers the early development of camouflage patterns for Wehrmacht tank forces from the 1st to the 5th Division. The book presents detailed reconstructions of armored vehicle paint schemes, tactical markings, divisional emblems, and actual camouflage patterns used throughout the war.',
    features: ['180 detailed profiles', '128 pages', 'Hand-drawn plates'],
    chapters: panzerChapters,
    price: 56,
    coverImage: panzerVolumeSources[1],
    gallery: [panzerVolumeSources[1]],
    categoryId: 'series-panzer-camouflage',
    stock: 14,
    isAvailable: true,
    isFeatured: true,
    isOnSale: false,
    deliveryNote: '€1 Delivery',
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-panzer-2',
    slug: 'panzer-camouflage-volume-ii',
    title: 'Panzer Camouflage',
    volumeNumber: 2,
    shortDescription: 'Wehrmacht divisions camouflage patterns in WWII.',
    description:
      'The second volume of the series is devoted to the camouflage schemes of Wehrmacht tank divisions from 1939 to 1945. The book presents detailed reconstructions of armored vehicle paint schemes, tactical markings, divisional emblems, and actual camouflage patterns used throughout the war, from the Polish campaign to the final battles of 1945.',
    features: ['Division-by-division plates', 'Color notes', 'Insignia details'],
    chapters: [],
    price: 56,
    coverImage: panzerVolumeSources[2],
    gallery: [panzerVolumeSources[2]],
    categoryId: 'series-panzer-camouflage',
    stock: 11,
    isAvailable: true,
    isFeatured: true,
    isOnSale: false,
    deliveryNote: '€1 Delivery',
    status: 'available',
    hasVideo: true,
  }),
  book({
    id: 'prod-panzer-3',
    slug: 'panzer-camouflage-volume-iii',
    title: 'Panzer Camouflage',
    volumeNumber: 3,
    shortDescription: 'Red Army divisions camouflage patterns in WWII.',
    description:
      'The third volume is devoted to the armored vehicles of the Red Army from 1939 to 1945. The emergence of the Soviet camouflage system and its practical application in combat conditions. The book also discusses the use of captured Soviet equipment in the German army.',
    features: ['Beutepanzer studies', 'Comparative plates'],
    chapters: [],
    price: 44.8,
    coverImage: panzerVolumeSources[3],
    gallery: [panzerVolumeSources[3]],
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
    shortDescription: 'Reichswehr divisions camouflage patterns.',
    description:
      'The fourth volume is devoted to the emergence and development of the camouflage system in Germany. The end of World War I, the emergence of the Freikorps, the first tank trials in the Reichswehr. You will find all this in this book.',
    features: ['Late-war schemes', 'Unit examples'],
    chapters: [],
    price: 56,
    coverImage: panzerVolumeSources[4],
    gallery: [panzerVolumeSources[4]],
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
    shortDescription: 'DAK divisions camouflage patterns in WWII.',
    description:
      "The book is dedicated to Rommel's African Corps, armored vehicles, tactical insignia, and camouflage patterns of the tropical version.",
    features: [],
    chapters: [],
    price: 56,
    coverImage: panzerVolumeSources[5],
    gallery: [panzerVolumeSources[5]],
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
    shortDescription: 'Book in development',
    description: 'Book in development',
    features: [],
    chapters: [],
    price: 56,
    coverImage: panzerVolumeSources[6],
    gallery: [panzerVolumeSources[6]],
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
    coverImage: insigniaCardSources[1],
    gallery: [insigniaCardSources[1]],
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
    shortDescription: 'German military symbols in WWII.',
    description:
      'This volume documents the insignia of German divisions active during World War II. It covers panzergrenadier, Panzer Division, Elite units Division. In addition, it includes army groups, corps and observation battalions.',
    features: [],
    chapters: [],
    price: 39.9,
    coverImage: insigniaCardSources[2],
    gallery: [insigniaCardSources[2]],
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
    shortDescription: 'Book in development',
    description: 'Book in development',
    features: [],
    chapters: [],
    price: 39.9,
    coverImage: insigniaCardSources[3],
    gallery: [insigniaCardSources[3]],
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
    shortDescription: 'German military symbols in WWII.',
    description:
      'German Military Symbols is a groundbreaking encyclopedia series that explores the tactical markings used by the German army during World War II. This first volume offers an in-depth look at over 1,000 authentic symbols found on Wehrmacht vehicles and military maps.',
    features: ['Over 1,000 symbols', 'Ground encyclopedia'],
    chapters: [],
    price: 33.6,
    coverImage: symbolsCardSources[1],
    gallery: [symbolsCardSources[1]],
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
    shortDescription: 'German military symbols in WWII.',
    description:
      'Explore over 1,000 WWII German tactical symbols in this guide by Igor Donchik. Essential for historians, modelers, and reenactors, featuring detailed markings from Wehrmacht, Luftwaffe, and Kriegsmarine.',
    features: ['Additional plates', 'Vehicle markings'],
    chapters: [],
    price: 39.9,
    coverImage: symbolsCardSources[2],
    gallery: [symbolsCardSources[2]],
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
    description:
      '🕒💰 The book with minor defects! 💰🕒\n⚠️ Attention! By placing an order for this book, you agree that you are purchasing a copy with minor cover defects at a discounted price! 📖💰\nBooks with defects purchased at a reduced price are non-refundable and non-exchangeable! 🚫🔄',
    features: ['Minor defects', 'Non-refundable'],
    chapters: [],
    price: 15,
    originalPrice: 33.6,
    coverImage: symbolsCardSources.sale,
    gallery: [symbolsCardSources.sale],
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
