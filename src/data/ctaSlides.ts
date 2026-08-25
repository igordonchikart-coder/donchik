import { routes } from '@/app/routes'
import { placeholders } from './placeholders'

export interface CtaSlide {
  id: string
  title: string
  discountLabel: string
  image: string
  to: string
}

const images = placeholders.ctas

export const ctaSlides: CtaSlide[] = [
  {
    id: 'cta-1',
    title: "Complete Bundle of Igor Donchik's Books (7 books)",
    discountLabel: '-30%',
    image: images[0],
    to: routes.discounts,
  },
  {
    id: 'cta-2',
    title: 'Panzer Camouflage collection (4 books)',
    discountLabel: '-20%',
    image: images[1],
    to: routes.category('panzer-camouflage'),
  },
  {
    id: 'cta-3',
    title: 'German Military Symbols collection',
    discountLabel: '-15%',
    image: images[2],
    to: routes.category('german-military-symbols'),
  },
  {
    id: 'cta-4',
    title: 'Super sale copies',
    discountLabel: '-50%',
    image: images[3],
    to: routes.discounts,
  },
  {
    id: 'cta-5',
    title: 'German Military Unit Insignia collection',
    discountLabel: '-10%',
    image: images[4],
    to: routes.category('german-military-unit-insignia'),
  },
]
