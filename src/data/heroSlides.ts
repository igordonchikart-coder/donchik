import { routes } from '@/app/routes'
import { heroImages } from '@/assets/hero'
import { placeholders } from './placeholders'

export interface HeroSlide {
  id: string
  title: string
  volumeLabel: string
  image: string
  to: string
}

const images = placeholders.heroes

export const heroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'Panzer Camouflage',
    volumeLabel: 'Volume I',
    image: heroImages.title,
    to: routes.product('panzer-camouflage-volume-i'),
  },
  {
    id: 'hero-2',
    title: 'Panzer Camouflage',
    volumeLabel: 'Volume II',
    image: images[1 % images.length],
    to: routes.product('panzer-camouflage-volume-ii'),
  },
  {
    id: 'hero-3',
    title: 'Panzer Camouflage',
    volumeLabel: 'Volume III',
    image: images[2 % images.length],
    to: routes.product('panzer-camouflage-volume-iii'),
  },
  {
    id: 'hero-4',
    title: 'Panzer Camouflage',
    volumeLabel: 'Volume IV',
    image: images[3 % images.length],
    to: routes.product('panzer-camouflage-volume-iv'),
  },
  {
    id: 'hero-5',
    title: 'Panzer Camouflage',
    volumeLabel: 'Volume V',
    image: images[4 % images.length],
    to: routes.product('panzer-camouflage-volume-v'),
  },
  {
    id: 'hero-6',
    title: 'Panzer Camouflage',
    volumeLabel: 'Volume VI',
    image: images[5 % images.length],
    to: routes.product('panzer-camouflage-volume-vi'),
  },
  {
    id: 'hero-7',
    title: 'German Military Unit Insignia',
    volumeLabel: 'Volume I',
    image: images[6 % images.length],
    to: routes.product('german-military-unit-insignia-volume-i'),
  },
  {
    id: 'hero-8',
    title: 'German Military Unit Insignia',
    volumeLabel: 'Volume II',
    image: images[7 % images.length],
    to: routes.product('german-military-unit-insignia-volume-ii'),
  },
]
