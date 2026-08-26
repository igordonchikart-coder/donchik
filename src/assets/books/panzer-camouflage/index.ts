import cardDivider from './card-divider.png'
import cardFrame from './card-frame.webp'
import cardUnderlay from './card-underlay.webp'
import volume1Source from './volume-1-source.webp'
import volume2Source from './volume-2-source.webp'
import volume3Source from './volume-3-source.webp'
import volume4Source from './volume-4-source.webp'
import volume5Source from './volume-5-source.webp'
import volume6Source from './volume-6-source.webp'
import year2027 from './year-2027.png'
import year2028 from './year-2028.png'

export const panzerCardAssets = {
  cardDivider,
  cardFrame,
  cardUnderlay,
}

export const panzerVolumeSources = {
  1: volume1Source,
  2: volume2Source,
  3: volume3Source,
  4: volume4Source,
  5: volume5Source,
  6: volume6Source,
} as const

export const panzerVolumeYears = {
  5: year2027,
  6: year2028,
} as const
