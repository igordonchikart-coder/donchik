import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const jobs = [
  { from: 'src/assets/books/panzer-camouflage/volume-1-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/panzer-camouflage/volume-2-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/panzer-camouflage/volume-3-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/panzer-camouflage/volume-4-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/panzer-camouflage/volume-5-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/panzer-camouflage/volume-6-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/military-symbols/volume-1-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/military-symbols/volume-2-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/military-symbols/volume-sale-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/unit-insignia/volume-1-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/unit-insignia/volume-2-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/unit-insignia/volume-3-source.png', max: 1280, quality: 72 },
  { from: 'src/assets/books/panzer-camouflage/card-frame.png', max: 1600, quality: 82 },
  { from: 'src/assets/books/panzer-camouflage/card-underlay.png', max: 1100, quality: 68 },
  { from: 'src/assets/hero/title.jpg', max: 1920, quality: 74 },
  { from: 'src/assets/about/igor-donchik.png', max: 800, quality: 74 },
  { from: 'src/assets/ui/logo.png', max: 512, quality: 78 },
  { from: 'src/assets/ui/video-frame.png', max: 1920, quality: 76 },
  { from: 'public/video/home-poster.png', max: 1280, quality: 70, to: 'public/video/home-poster.webp' },
]

async function compress(job) {
  const input = path.join(root, job.from)
  const output = path.join(root, job.to ?? job.from.replace(/\.(png|jpe?g)$/i, '.webp'))
  await mkdir(path.dirname(output), { recursive: true })

  const image = sharp(input, { failOn: 'none' }).rotate()
  const meta = await image.metadata()
  const width = meta.width ?? job.max
  const pipeline = width > job.max ? image.resize({ width: job.max, withoutEnlargement: true }) : image
  await pipeline.webp({ quality: job.quality, effort: 6 }).toFile(output)

  const outMeta = await sharp(output).metadata()
  const fromKb = Math.round((await stat(input)).size / 1024)
  const toKb = Math.round((await stat(output)).size / 1024)
  console.log(`${path.relative(root, output)}  ${width}→${outMeta.width}  ${fromKb}KB → ${toKb}KB`)
}

for (const job of jobs) {
  await compress(job)
}
