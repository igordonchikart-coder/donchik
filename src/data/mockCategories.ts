import type { Category } from '@/types'
import { placeholders } from './placeholders'

export const mockCategories: Category[] = [
  {
    id: 'series-panzer-camouflage',
    slug: 'panzer-camouflage',
    title: 'Panzer Camouflage',
    description: 'Illustrated reference volumes on camouflage patterns of armored units.',
    image: placeholders.categories.albums,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'series-military-symbols',
    slug: 'german-military-symbols',
    title: 'German Military Symbols',
    description: 'Tactical symbols and markings used by German forces in WWII.',
    image: placeholders.categories.graphics,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'series-unit-insignia',
    slug: 'german-military-unit-insignia',
    title: 'German Military Unit Insignia',
    description: 'Encyclopedia of unit insignia for modelers and historical researchers.',
    image: placeholders.categories.painting,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
]
