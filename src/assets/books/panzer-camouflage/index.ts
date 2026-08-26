import cardDivider from './card-divider.png'
import cardFrame from './card-frame.png'
import cardUnderlay from './card-underlay.png'
import volume1Photo from './volume-1-photo.png'
import volume1Source from './volume-1-source.png'
import volume2Photo from './volume-2-photo.png'
import volume2Source from './volume-2-source.png'
import volume3Photo from './volume-3-photo.png'
import volume3Source from './volume-3-source.png'
import volume4Photo from './volume-4-photo.png'
import volume4Source from './volume-4-source.png'
import volume5Photo from './volume-5-photo.png'
import volume5Source from './volume-5-source.png'
import volume6Photo from './volume-6-photo.png'
import volume6Source from './volume-6-source.png'
import year2027 from './year-2027.png'
import year2028 from './year-2028.png'

export const panzerCardAssets = {
  cardDivider,
  cardFrame,
  cardUnderlay,
}

export const panzerVolumePhotos = {
  1: volume1Photo,
  2: volume2Photo,
  3: volume3Photo,
  4: volume4Photo,
  5: volume5Photo,
  6: volume6Photo,
} as const

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
