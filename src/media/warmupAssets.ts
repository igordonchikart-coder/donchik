import { symbolsCardSources } from '@/assets/books/military-symbols'
import { panzerCardAssets, panzerVolumeSources, panzerVolumeYears } from '@/assets/books/panzer-camouflage'
import { insigniaCardSources } from '@/assets/books/unit-insignia'
import { heroImages } from '@/assets/hero'
import videoFrame from '@/assets/ui/video-frame.webp'
import { aboutAuthorPortraits } from '@/data/aboutAuthor'
import { homeVideo } from '@/data/homeVideo'

export const warmupImageUrls: string[] = [
  '/fonts/bahnschrift.woff2',
  '/fonts/guttery.woff2',
  heroImages.title,
  panzerCardAssets.cardFrame,
  panzerCardAssets.cardUnderlay,
  panzerCardAssets.cardDivider,
  ...Object.values(panzerVolumeSources),
  ...Object.values(symbolsCardSources),
  ...Object.values(insigniaCardSources),
  ...Object.values(panzerVolumeYears),
  aboutAuthorPortraits[0]?.image ?? '',
  videoFrame,
  homeVideo.poster,
].filter(Boolean)
