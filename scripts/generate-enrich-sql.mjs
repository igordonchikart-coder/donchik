import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)

// Register tsx-less extraction: parse productPageCopy slugs from the TS source.
const copySource = readFileSync(path.join(root, 'src/data/productPageCopy.ts'), 'utf8')
const mockSource = readFileSync(path.join(root, 'src/data/mockProducts.ts'), 'utf8')
const categorySource = readFileSync(path.join(root, 'src/data/mockCategories.ts'), 'utf8')

function extractObjectBlock(name) {
  const start = copySource.indexOf(`const ${name}: ProductPageCopy = {`)
  if (start < 0) return null
  let depth = 0
  let started = false
  let end = start
  for (let i = start; i < copySource.length; i += 1) {
    const char = copySource[i]
    if (char === '{') {
      depth += 1
      started = true
    } else if (char === '}') {
      depth -= 1
      if (started && depth === 0) {
        end = i + 1
        break
      }
    }
  }
  return copySource.slice(start, end)
}

function parseStringArray(block, key) {
  const match = block.match(new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\],\\s*(?:storyTitle|features|specs|chapters|audienceTitle|isbn|audience)`))
  if (!match) return []
  return [...match[1].matchAll(/'((?:\\'|[^'])*)'/g)].map((item) => item[1].replace(/\\'/g, "'"))
}

function parseChapters(block) {
  const match = block.match(/chapters:\s*\[([\s\S]*?)\],\s*audienceTitle/)
  if (!match) return []
  const chapters = []
  const re = /\{\s*title:\s*'((?:\\'|[^'])*)',\s*description:\s*'((?:\\'|[^'])*)',\s*\}/g
  let item
  while ((item = re.exec(match[1])) !== null) {
    chapters.push({
      title: item[1].replace(/\\'/g, "'"),
      description: item[2].replace(/\\'/g, "'"),
    })
  }
  return chapters
}

function sqlString(value) {
  return `'${value.replace(/'/g, "''")}'`
}

function sqlJson(value) {
  return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`
}

function dollarQuote(value) {
  const tag = 'd'
  if (!value.includes('$d$')) {
    return `$${tag}$${value}$${tag}$`
  }
  return sqlString(value)
}

const slugMap = {
  panzerOne: 'panzer-camouflage-volume-i',
  panzerTwo: 'panzer-camouflage-volume-ii',
  panzerThree: 'panzer-camouflage-volume-iii',
  panzerFour: 'panzer-camouflage-volume-iv',
  panzerFive: 'panzer-camouflage-volume-v',
  panzerSix: 'panzer-camouflage-volume-vi',
  insigniaOne: 'german-military-unit-insignia-volume-i',
  insigniaTwo: 'german-military-unit-insignia-volume-ii',
  insigniaThree: 'german-military-unit-insignia-volume-iii',
  symbolsOne: 'german-military-symbols-volume-i',
  symbolsTwo: 'german-military-symbols-volume-ii',
  symbolsSale: 'german-military-symbols-volume-i-sale',
}

const lines = [
  '-- Enrich product descriptions, features, and chapters from the official site copy.',
  '-- Safe to re-run. Card captions stay in restore-card-descriptions.sql.',
  '',
]

for (const [constName, slug] of Object.entries(slugMap)) {
  const block = extractObjectBlock(constName)
  if (!block) continue
  const story = parseStringArray(block, 'story')
  const features = parseStringArray(block, 'features')
  const chapters = parseChapters(block)
  const description = story.join('\n\n')

  lines.push(`update public.products`)
  lines.push(`set`)
  lines.push(`  description = ${dollarQuote(description)},`)
  lines.push(`  features = ${sqlJson(features)},`)
  lines.push(`  chapters = ${sqlJson(chapters)},`)
  lines.push(`  updated_at = now()`)
  lines.push(`where slug = ${sqlString(slug)};`)
  lines.push('')
}

const categoryDescriptions = [...categorySource.matchAll(/slug:\s*'([^']+)',\s*title:[^,]+,\s*description:\s*'([^']+)'/g)]
lines.push('-- Category blurbs for series pages and the store.')
for (const [, slug, description] of categoryDescriptions) {
  lines.push(`update public.categories`)
  lines.push(`set description = ${sqlString(description)}, updated_at = now()`)
  lines.push(`where slug = ${sqlString(slug)};`)
  lines.push('')
}

const outputPath = path.join(root, 'supabase/enrich-product-content.sql')
writeFileSync(outputPath, `${lines.join('\n')}\n`)
console.log(`Wrote ${outputPath}`)
