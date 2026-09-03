import type { Category } from '@/types'
import { placeholders } from './placeholders'

export const mockCategories: Category[] = [
  {
    id: 'series-panzer-camouflage',
    slug: 'panzer-camouflage',
    title: 'Panzer Camouflage',
    description: 'Hand-drawn encyclopedia of Wehrmacht, Red Army, Reichswehr, and forthcoming DAK armor camouflage.',
    image: placeholders.categories.albums,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'series-military-symbols',
    slug: 'german-military-symbols',
    title: 'German Military Symbols',
    description: 'Tactical signs used on German vehicles, maps, and roads — more than a thousand reconstructed markings.',
    image: placeholders.categories.graphics,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'series-unit-insignia',
    slug: 'german-military-unit-insignia',
    title: 'German Military Unit Insignia',
    description: 'Atlas of Wehrmacht formation badges, beginning with 727 hand-drawn divisional emblems in Volume I.',
    image: placeholders.categories.painting,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
]
