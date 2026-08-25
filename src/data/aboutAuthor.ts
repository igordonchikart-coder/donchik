import { placeholders } from './placeholders'

export interface AboutAuthorPortrait {
  id: string
  image: string
  alt: string
}

export interface AboutAuthorSocial {
  id: string
  label: string
  href: string
  icon: 'instagram' | 'facebook' | 'youtube'
}

export const aboutAuthorHeading = 'Who Is Igor Donchik?'

export const aboutAuthorParagraphs = [
  'My name is Igor Donchik. I am a military illustrator, historical researcher, and author specializing in the reconstruction of armored vehicles, camouflage systems, and tactical markings of the World War II.',
  'I am the creator of the Panzer Camouflage book series — a multi-volume project dedicated to historically accurate camouflage schemes of German armored units from 1939 to 1945. Each volume is based on deep archival research, original wartime photographs, and documentary video materials. I carefully analyze visual sources frame by frame to reconstruct authentic paint patterns, divisional emblems, and field-applied markings.',
  'All armored vehicle models in my books are drawn entirely by hand. I do not use AI for the reconstruction process. Every illustration is the result of manual work, historical comparison, and artistic precision.',
  'Beyond publishing, I am also developing tabletop wargames inspired by historical events. These projects combine visual authenticity, operational mechanics, and immersive design. My goal is to create strategic games where historical detail and gameplay depth coexist in balance.',
  'Looking ahead, I continue expanding the Panzer Camouflage series, launching new research projects, and developing original wargame systems set in both historical and alternative-history environments. My work is dedicated to preserving visual military history through accuracy, discipline, and artistic craftsmanship.',
]

export const aboutAuthorPortraits: AboutAuthorPortrait[] = [
  { id: 'portrait-1', image: placeholders.portraits[0], alt: 'Igor Donchik' },
  { id: 'portrait-2', image: placeholders.portraits[1], alt: 'Igor Donchik' },
  { id: 'portrait-3', image: placeholders.portraits[2], alt: 'Igor Donchik' },
]

export const aboutAuthorSocials: AboutAuthorSocial[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
]
