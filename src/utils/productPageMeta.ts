import type { BookChapter, ProductPageMeta, ProductSpec } from '@/types/product'

export const PAGE_META_CHAPTER_TITLE = '__page_meta__'

export function isPageMetaChapter(chapter: BookChapter): boolean {
  return chapter.title === PAGE_META_CHAPTER_TITLE
}

export function unpackChapters(chapters: BookChapter[] | null | undefined): {
  chapters: BookChapter[]
  pageCopy?: ProductPageMeta
} {
  const list = Array.isArray(chapters) ? chapters : []
  const metaChapter = list.find(isPageMetaChapter)
  const visible = list.filter((chapter) => !isPageMetaChapter(chapter))

  if (!metaChapter?.description.trim()) {
    return { chapters: visible }
  }

  try {
    const parsed = JSON.parse(metaChapter.description) as ProductPageMeta
    return { chapters: visible, pageCopy: sanitizePageMeta(parsed) }
  } catch {
    return { chapters: visible }
  }
}

export function packChapters(chapters: BookChapter[], pageCopy?: ProductPageMeta): BookChapter[] {
  const visible = chapters.filter((chapter) => !isPageMetaChapter(chapter))
  const meta = sanitizePageMeta(pageCopy)

  if (!hasPageMetaContent(meta)) {
    return visible
  }

  return [
    ...visible,
    {
      title: PAGE_META_CHAPTER_TITLE,
      description: JSON.stringify(meta),
    },
  ]
}

export function sanitizePageMeta(value?: ProductPageMeta | null): ProductPageMeta {
  if (!value) {
    return {}
  }

  return {
    headline: cleanText(value.headline),
    seoTitle: cleanText(value.seoTitle),
    seoDescription: cleanText(value.seoDescription),
    intro: cleanList(value.intro),
    storyTitle: cleanText(value.storyTitle),
    audienceTitle: cleanText(value.audienceTitle),
    audience: cleanList(value.audience),
    specs: cleanSpecs(value.specs),
    isbn: cleanText(value.isbn),
  }
}

export function hasPageMetaContent(meta?: ProductPageMeta): boolean {
  if (!meta) {
    return false
  }

  return Boolean(
    meta.headline ||
      meta.seoTitle ||
      meta.seoDescription ||
      meta.storyTitle ||
      meta.audienceTitle ||
      meta.isbn ||
      (meta.intro && meta.intro.length > 0) ||
      (meta.audience && meta.audience.length > 0) ||
      (meta.specs && meta.specs.length > 0),
  )
}

export function paragraphsToText(paragraphs: string[] | undefined): string {
  return (paragraphs ?? []).join('\n\n')
}

export function textToParagraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

export function specsToText(specs: ProductSpec[] | undefined): string {
  return (specs ?? []).map((spec) => `${spec.label} | ${spec.value}`).join('\n')
}

export function textToSpecs(value: string): ProductSpec[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split('|').map((part) => part.trim())
      return {
        label: label ?? '',
        value: rest.join(' | '),
      }
    })
    .filter((spec) => spec.label && spec.value)
}

function cleanText(value: string | undefined): string | undefined {
  const next = value?.trim()
  return next ? next : undefined
}

function cleanList(value: string[] | undefined): string[] | undefined {
  const next = (value ?? []).map((item) => item.trim()).filter(Boolean)
  return next.length > 0 ? next : undefined
}

function cleanSpecs(value: ProductSpec[] | undefined): ProductSpec[] | undefined {
  const next = (value ?? [])
    .map((spec) => ({
      label: spec.label.trim(),
      value: spec.value.trim(),
    }))
    .filter((spec) => spec.label && spec.value)
  return next.length > 0 ? next : undefined
}
