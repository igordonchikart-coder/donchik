import portrait from '@/assets/about/igor-donchik.webp'

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
  'My name is Igor Donchik. I am a military illustrator, historical researcher, and author specializing in armored vehicles, camouflage systems, unit insignia, and tactical markings of the Second World War.',
  'This official site gathers the encyclopedias I publish: Panzer Camouflage for armor paint schemes, German Military Unit Insignia for divisional emblems, and German Military Symbols for the signs used on vehicles and maps. Each volume is based on archival research, original wartime photographs, and documentary film — compared frame by frame before a plate is drawn.',
  'All vehicle profiles, badges, and symbols in the current catalog are drawn by hand. I do not use generative AI for reconstruction. Every illustration is manual work, historical comparison, and line control meant to stay useful on a modeler’s bench.',
  'Beyond the books, I also develop tabletop wargames rooted in historical events. Those projects combine visual authenticity with operational mechanics. The same research that feeds a camouflage plate can feed a scenario.',
  'Looking ahead, I continue the Panzer Camouflage and insignia series, open new research files, and keep the official catalog here — with honest coming-soon dates rather than empty pre-order carts. The work is dedicated to preserving visual military history through accuracy, discipline, and craft.',
]

export const aboutAuthorPortraits: AboutAuthorPortrait[] = [
  { id: 'portrait-1', image: portrait, alt: 'Igor Donchik' },
  { id: 'portrait-2', image: portrait, alt: 'Igor Donchik' },
  { id: 'portrait-3', image: portrait, alt: 'Igor Donchik' },
]

export const aboutAuthorSocials: AboutAuthorSocial[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
]
