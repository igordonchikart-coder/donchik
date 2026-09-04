import { type FormEvent, useMemo, useState } from 'react'
import { BookPageEditor, type BookPageEditorValues } from '@/components/admin/BookPageEditor'
import { PhotoStrip } from '@/components/admin/PhotoStrip'
import { Button } from '@/components/common/Button'
import { SelectField, TextAreaField, TextField } from '@/components/common/Field'
import { PageHeader } from '@/components/common/PageHeader'
import { ProductCard } from '@/components/catalog/ProductCard'
import { getCatalogPageMeta, getProductCopyBySlug } from '@/data/productPageCopy'
import { uploadProductImage } from '@/services/imagesService'
import type { Category, Product, ProductInput, ProductStatus } from '@/types'
import { DEFAULT_CURRENCY } from '@/utils/constants'
import { usableCatalogImages, withCatalogArtwork } from '@/utils/catalogArtwork'
import { toVolumeLabel } from '@/utils/product'
import {
  paragraphsToText,
  sanitizePageMeta,
  specsToText,
  textToParagraphs,
  textToSpecs,
} from '@/utils/productPageMeta'
import { slugify } from '@/utils/slugify'
import styles from './ProductForm.module.css'

type FormTab = 'card' | 'book'

interface ProductFormProps {
  categories: Category[]
  initialProduct?: Product
  heading?: string
  submitLabel: string
  onSubmit: (input: ProductInput) => Promise<void>
}

interface FormState extends BookPageEditorValues {
  shortDescription: string
  price: string
  originalPrice: string
  currency: string
  coverImage: string
  gallery: string[]
  stock: string
  isAvailable: boolean
  isOnSale: boolean
  saleLabel: string
  deliveryNote: string
  status: ProductStatus
}

function toState(product: Product | undefined, categories: Category[]): FormState {
  const photos = usableCatalogImages([product?.coverImage, ...(product?.gallery ?? [])])
  const catalog = product ? getProductCopyBySlug(product.slug) : undefined
  const catalogMeta = product ? getCatalogPageMeta(product.slug) : undefined
  const pageCopy = sanitizePageMeta({
    ...catalogMeta,
    ...product?.pageCopy,
  })
  const story =
    product?.description.trim() ||
    (catalog?.story.length ? catalog.story.join('\n\n') : '') ||
    ''
  const features = product?.features.length ? product.features : (catalog?.features ?? [])
  const chapters = product?.chapters.length ? product.chapters : (catalog?.chapters ?? [])

  return {
    title: product?.title ?? '',
    slug: product?.slug ?? '',
    volumeNumber: product ? String(product.volumeNumber) : '1',
    shortDescription: product?.shortDescription ?? '',
    headline: pageCopy.headline ?? '',
    seoTitle: pageCopy.seoTitle ?? '',
    seoDescription: pageCopy.seoDescription ?? '',
    intro: paragraphsToText(pageCopy.intro),
    storyTitle: pageCopy.storyTitle ?? '',
    description: story,
    features: features.join('\n'),
    chapters: chapters.map((chapter) => `${chapter.title} | ${chapter.description}`).join('\n'),
    specs: specsToText(pageCopy.specs),
    audienceTitle: pageCopy.audienceTitle ?? '',
    audience: (pageCopy.audience ?? []).join('\n'),
    isbn: pageCopy.isbn ?? '',
    price: product ? String(product.price) : '',
    originalPrice: product?.originalPrice ? String(product.originalPrice) : '',
    currency: product?.currency ?? DEFAULT_CURRENCY,
    coverImage: photos[0] ?? '',
    gallery: photos.slice(1),
    pageGallery: usableCatalogImages(product?.pageGallery ?? []),
    categoryId: product?.categoryId ?? categories[0]?.id ?? '',
    stock: product ? String(product.stock) : '0',
    isAvailable: product?.isAvailable ?? true,
    isFeatured: product?.isFeatured ?? false,
    isOnSale: product?.isOnSale ?? false,
    saleLabel: product?.saleLabel ?? '',
    deliveryNote: product?.deliveryNote ?? '',
    conditionNote: product?.conditionNote ?? '',
    status: product?.status ?? 'available',
    releaseYear: product?.releaseYear ? String(product.releaseYear) : '',
    hasVideo: product?.hasVideo ?? true,
  }
}

function parseList(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function pageCopyFromValues(values: FormState) {
  return sanitizePageMeta({
    headline: values.headline,
    seoTitle: values.seoTitle,
    seoDescription: values.seoDescription,
    intro: textToParagraphs(values.intro),
    storyTitle: values.storyTitle,
    audienceTitle: values.audienceTitle,
    audience: parseList(values.audience),
    specs: textToSpecs(values.specs),
    isbn: values.isbn,
  })
}

function tabForSaveError(message: string): FormTab {
  const cardErrors = ['cover', 'price', 'stock', 'caption']
  return cardErrors.some((part) => message.toLowerCase().includes(part)) ? 'card' : 'book'
}

function photoList(coverImage: string, gallery: string[]): string[] {
  const extras = gallery.filter((image) => image !== coverImage)
  return coverImage ? [coverImage, ...extras] : extras
}

function moveItem<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const nextIndex = index + direction
  if (nextIndex < 0 || nextIndex >= list.length) {
    return list
  }
  const next = [...list]
  const current = next[index]
  const swap = next[nextIndex]
  if (current === undefined || swap === undefined) {
    return list
  }
  next[index] = swap
  next[nextIndex] = current
  return next
}

function moveItemTo<T>(list: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
    return list
  }
  const next = [...list]
  const [item] = next.splice(from, 1)
  if (item === undefined) {
    return list
  }
  next.splice(to, 0, item)
  return next
}

export function ProductForm({ categories, initialProduct, heading, submitLabel, onSubmit }: ProductFormProps) {
  const [values, setValues] = useState<FormState>(() => toState(initialProduct, categories))
  const [tab, setTab] = useState<FormTab>('card')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const photos = photoList(values.coverImage, values.gallery)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function setPhotoList(nextPhotos: string[]) {
    setValues((current) => ({
      ...current,
      coverImage: nextPhotos[0] ?? '',
      gallery: nextPhotos.slice(1),
    }))
  }

  async function handleAddPhotos(files: FileList) {
    if (files.length === 0) {
      return
    }
    setIsUploading(true)
    try {
      const uploaded = await Promise.all(Array.from(files).map((file) => uploadProductImage(file, 'gallery')))
      setValues((current) => {
        const next = [...photoList(current.coverImage, current.gallery), ...uploaded]
        return {
          ...current,
          coverImage: next[0] ?? '',
          gallery: next.slice(1),
        }
      })
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not upload images')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleAddPagePhotos(files: FileList) {
    if (files.length === 0) {
      return
    }
    setIsUploading(true)
    try {
      const uploaded = await Promise.all(Array.from(files).map((file) => uploadProductImage(file, 'page')))
      setValues((current) => ({
        ...current,
        pageGallery: [...current.pageGallery, ...uploaded],
      }))
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not upload images')
    } finally {
      setIsUploading(false)
    }
  }

  function movePhoto(index: number, direction: -1 | 1) {
    setPhotoList(moveItem(photos, index, direction))
  }

  function movePhotoTo(from: number, to: number) {
    setPhotoList(moveItemTo(photos, from, to))
  }

  function removePhoto(index: number) {
    setPhotoList(photos.filter((_, itemIndex) => itemIndex !== index))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const price = Number(values.price)
      const stock = Number(values.stock)
      const volumeNumber = Number(values.volumeNumber)
      if (!values.title.trim()) {
        throw new Error('Enter a title')
      }
      if (!values.categoryId) {
        throw new Error('Choose a series')
      }
      if (!Number.isInteger(volumeNumber) || volumeNumber < 1) {
        throw new Error('Enter a valid volume number')
      }
      if (!values.shortDescription.trim()) {
        throw new Error('Enter a card caption')
      }
      if (!values.description.trim()) {
        throw new Error('Enter the book story')
      }
      const nextPhotos = usableCatalogImages([values.coverImage, ...values.gallery])
      const pageGallery = usableCatalogImages(values.pageGallery)
      if (!nextPhotos[0]) {
        throw new Error('Add a cover image')
      }
      if (!Number.isFinite(price) || price < 0) {
        throw new Error('Enter a valid price')
      }
      if (!Number.isFinite(stock) || stock < 0) {
        throw new Error('Enter a valid stock quantity')
      }

      await onSubmit({
        title: values.title,
        slug: values.slug || slugify(values.title),
        volumeNumber,
        volumeLabel: toVolumeLabel(volumeNumber),
        shortDescription: values.shortDescription,
        description: values.description,
        features: parseList(values.features),
        chapters: parseList(values.chapters).map((line) => {
          const [title, description = ''] = line.split('|').map((part) => part.trim())
          return { title, description }
        }),
        pageCopy: pageCopyFromValues(values),
        price,
        originalPrice: values.originalPrice ? Number(values.originalPrice) : undefined,
        currency: values.currency,
        coverImage: nextPhotos[0] ?? '',
        gallery: nextPhotos.slice(1),
        pageGallery,
        categoryId: values.categoryId,
        stock,
        isAvailable: values.isAvailable,
        isFeatured: values.isFeatured,
        isOnSale: values.isOnSale,
        saleLabel: values.saleLabel || undefined,
        deliveryNote: values.deliveryNote || undefined,
        conditionNote: values.conditionNote || undefined,
        status: values.status,
        releaseYear: values.releaseYear ? Number(values.releaseYear) : undefined,
        hasVideo: values.hasVideo,
      })
    } catch (caught: unknown) {
      const message = caught instanceof Error ? caught.message : 'Could not save the book'
      setError(message)
      setTab(tabForSaveError(message))
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewProduct = useMemo<Product>(() => {
    const volumeNumber = Number(values.volumeNumber) || 1
    const price = Number(values.price)
    const category = categories.find((item) => item.id === values.categoryId)

    return withCatalogArtwork({
      id: initialProduct?.id ?? 'preview',
      slug: values.slug || 'preview',
      title: values.title || 'Untitled book',
      volumeNumber,
      volumeLabel: toVolumeLabel(volumeNumber),
      shortDescription: values.shortDescription,
      description: values.description,
      features: parseList(values.features),
      chapters: parseList(values.chapters).map((line) => {
        const [title, description = ''] = line.split('|').map((part) => part.trim())
        return { title, description }
      }),
      pageCopy: pageCopyFromValues(values),
      price: Number.isFinite(price) ? price : 0,
      originalPrice: values.originalPrice ? Number(values.originalPrice) : undefined,
      currency: values.currency,
      coverImage: values.coverImage,
      gallery: values.gallery,
      pageGallery: values.pageGallery,
      categoryId: values.categoryId,
      category,
      stock: Number(values.stock) || 0,
      isAvailable: values.isAvailable,
      isFeatured: values.isFeatured,
      isOnSale: values.isOnSale,
      saleLabel: values.saleLabel || undefined,
      deliveryNote: values.deliveryNote || undefined,
      conditionNote: values.conditionNote || undefined,
      status: values.status,
      releaseYear: values.releaseYear ? Number(values.releaseYear) : undefined,
      hasVideo: values.hasVideo,
      createdAt: initialProduct?.createdAt ?? '',
      updatedAt: initialProduct?.updatedAt ?? '',
    })
  }, [categories, initialProduct, values])

  const canPreviewCard = Boolean(previewProduct.coverImage)

  return (
    <div className={`${styles.layout} ${tab === 'book' ? styles.layoutBook : ''}`}>
      <div className={styles.main}>
        {heading ? <PageHeader title={heading} /> : null}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.tabs} role="tablist" aria-label="What to edit">
            <button
              className={`${styles.tab} ${tab === 'card' ? styles.tabActive : ''}`}
              type="button"
              role="tab"
              id="product-tab-card"
              aria-selected={tab === 'card'}
              aria-controls="product-panel-card"
              onClick={() => setTab('card')}
            >
              Card
            </button>
            <button
              className={`${styles.tab} ${tab === 'book' ? styles.tabActive : ''}`}
              type="button"
              role="tab"
              id="product-tab-book"
              aria-selected={tab === 'book'}
              aria-controls="product-panel-book"
              onClick={() => setTab('book')}
            >
              Book page
            </button>
          </div>

          <div className={styles.formScroll}>
            {tab === 'card' ? (
              <div className={styles.panel} id="product-panel-card" role="tabpanel" aria-labelledby="product-tab-card">
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Photos on the card</h2>
                  <PhotoStrip
                    photos={photos}
                    uploading={isUploading}
                    coverLabel="Cover"
                    onAdd={handleAddPhotos}
                    onMove={movePhoto}
                    onMoveTo={movePhotoTo}
                    onRemove={removePhoto}
                  />
                  <p className={styles.hint}>First photo is the cover. Drag or use arrows to change the order.</p>
                </section>

                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Card text and status</h2>
                  <TextAreaField
                    label="Caption on the card"
                    name="shortDescription"
                    required
                    value={values.shortDescription}
                    onChange={(event) => update('shortDescription', event.target.value)}
                  />
                  <SelectField
                    label="Status"
                    name="status"
                    value={values.status}
                    onChange={(event) => update('status', event.target.value as ProductStatus)}
                  >
                    <option value="available">Available</option>
                    <option value="coming-soon">Coming soon</option>
                  </SelectField>
                </section>

                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Price on the card</h2>
                  <div className={styles.inline}>
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={values.price}
                      onChange={(event) => update('price', event.target.value)}
                    />
                    <TextField
                      label="Original price"
                      name="originalPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={values.originalPrice}
                      onChange={(event) => update('originalPrice', event.target.value)}
                    />
                  </div>
                  <div className={styles.inline}>
                    <TextField
                      label="Currency"
                      name="currency"
                      required
                      value={values.currency}
                      onChange={(event) => update('currency', event.target.value)}
                    />
                    <TextField
                      label="Stock"
                      name="stock"
                      type="number"
                      min="0"
                      required
                      value={values.stock}
                      onChange={(event) => update('stock', event.target.value)}
                    />
                  </div>
                  <TextField
                    label="Sale label"
                    name="saleLabel"
                    value={values.saleLabel}
                    onChange={(event) => update('saleLabel', event.target.value)}
                  />
                  <TextField
                    label="Delivery note"
                    name="deliveryNote"
                    value={values.deliveryNote}
                    onChange={(event) => update('deliveryNote', event.target.value)}
                  />
                  <div className={styles.flags}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={values.isAvailable}
                        onChange={(event) => update('isAvailable', event.target.checked)}
                      />
                      In stock
                    </label>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={values.isOnSale}
                        onChange={(event) => update('isOnSale', event.target.checked)}
                      />
                      On sale
                    </label>
                  </div>
                </section>
              </div>
            ) : (
              <div className={styles.panel} id="product-panel-book" role="tabpanel" aria-labelledby="product-tab-book">
                <BookPageEditor
                  values={values}
                  categories={categories}
                  uploading={isUploading}
                  onTitleChange={(title) => {
                    setValues((current) => ({
                      ...current,
                      title,
                      slug: !initialProduct && !current.slug ? slugify(title) : current.slug,
                    }))
                  }}
                  onChange={(key, value) => {
                    setValues((current) => ({ ...current, [key]: value }))
                  }}
                  onAddPhotos={handleAddPagePhotos}
                  onMovePhoto={(index, direction) => {
                    update('pageGallery', moveItem(values.pageGallery, index, direction))
                  }}
                  onMovePhotoTo={(from, to) => {
                    update('pageGallery', moveItemTo(values.pageGallery, from, to))
                  }}
                  onRemovePhoto={(index) => {
                    update(
                      'pageGallery',
                      values.pageGallery.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }}
                />
              </div>
            )}

            {isUploading ? <p className={styles.status}>Uploading image...</p> : null}
            {error ? (
              <p className="fieldError" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className={`formActions ${styles.formActions}`}>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
            <Button to="/admin/products" variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </div>
      {tab === 'card' ? (
        <aside className={styles.previewPane} aria-label="Catalog card preview">
          {canPreviewCard ? (
            <div className={styles.previewLive}>
              <ProductCard product={previewProduct} preview />
            </div>
          ) : (
            <p className={styles.hint}>Add a cover image to preview the card.</p>
          )}
        </aside>
      ) : null}
    </div>
  )
}
