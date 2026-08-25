import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import { Button } from '@/components/common/Button'
import { SelectField, TextAreaField, TextField } from '@/components/common/Field'
import { ProductCard } from '@/components/catalog/ProductCard'
import { uploadProductImage } from '@/services/imagesService'
import type { Category, Product, ProductInput, ProductStatus } from '@/types'
import { DEFAULT_CURRENCY } from '@/utils/constants'
import { toVolumeLabel } from '@/utils/product'
import { slugify } from '@/utils/slugify'
import styles from './ProductForm.module.css'

interface ProductFormProps {
  categories: Category[]
  initialProduct?: Product
  submitLabel: string
  onSubmit: (input: ProductInput) => Promise<void>
}

interface FormState {
  title: string
  slug: string
  volumeNumber: string
  shortDescription: string
  description: string
  features: string
  chapters: string
  price: string
  originalPrice: string
  currency: string
  coverImage: string
  gallery: string[]
  categoryId: string
  stock: string
  isAvailable: boolean
  isFeatured: boolean
  isOnSale: boolean
  saleLabel: string
  deliveryNote: string
  conditionNote: string
  status: ProductStatus
  releaseYear: string
  hasVideo: boolean
}

function toState(product: Product | undefined, categories: Category[]): FormState {
  return {
    title: product?.title ?? '',
    slug: product?.slug ?? '',
    volumeNumber: product ? String(product.volumeNumber) : '1',
    shortDescription: product?.shortDescription ?? '',
    description: product?.description ?? '',
    features: product?.features.join('\n') ?? '',
    chapters: (product?.chapters ?? []).map((chapter) => `${chapter.title} | ${chapter.description}`).join('\n'),
    price: product ? String(product.price) : '',
    originalPrice: product?.originalPrice ? String(product.originalPrice) : '',
    currency: product?.currency ?? DEFAULT_CURRENCY,
    coverImage: product?.coverImage ?? '',
    gallery: product?.gallery ?? [],
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

export function ProductForm({ categories, initialProduct, submitLabel, onSubmit }: ProductFormProps) {
  const [values, setValues] = useState<FormState>(() => toState(initialProduct, categories))
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleCoverUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    setIsUploading(true)
    try {
      const url = await uploadProductImage(file, 'covers')
      update('coverImage', url)
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not upload the cover image')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  async function handleGalleryUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) {
      return
    }
    setIsUploading(true)
    try {
      const uploaded = await Promise.all(
        Array.from(files).map((file) => uploadProductImage(file, 'gallery')),
      )
      update('gallery', [...values.gallery, ...uploaded])
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not upload gallery images')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const price = Number(values.price)
      const stock = Number(values.stock)
      const volumeNumber = Number(values.volumeNumber)
      if (!values.coverImage) {
        throw new Error('Add a cover image')
      }
      if (!Number.isFinite(price) || price < 0) {
        throw new Error('Enter a valid price')
      }
      if (!Number.isFinite(stock) || stock < 0) {
        throw new Error('Enter a valid stock quantity')
      }
      if (!Number.isInteger(volumeNumber) || volumeNumber < 1) {
        throw new Error('Enter a valid volume number')
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
        price,
        originalPrice: values.originalPrice ? Number(values.originalPrice) : undefined,
        currency: values.currency,
        coverImage: values.coverImage,
        gallery: values.gallery,
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
      setError(caught instanceof Error ? caught.message : 'Could not save the book')
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewProduct = useMemo<Product>(() => {
    const volumeNumber = Number(values.volumeNumber) || 1
    const price = Number(values.price)

    return {
      id: initialProduct?.id ?? 'preview',
      slug: values.slug || 'preview',
      title: values.title || 'Untitled book',
      volumeNumber,
      volumeLabel: toVolumeLabel(volumeNumber),
      shortDescription: values.shortDescription,
      description: values.description,
      features: parseList(values.features),
      chapters: [],
      price: Number.isFinite(price) ? price : 0,
      originalPrice: values.originalPrice ? Number(values.originalPrice) : undefined,
      currency: values.currency,
      coverImage: values.coverImage,
      gallery: values.gallery,
      categoryId: values.categoryId,
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
    }
  }, [initialProduct, values])

  return (
    <div className={styles.layout}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        required
        value={values.title}
        onChange={(event) => {
          const title = event.target.value
          setValues((current) => ({
            ...current,
            title,
            slug: !initialProduct && !current.slug ? slugify(title) : current.slug,
          }))
        }}
      />
      <TextField
        label="Slug"
        name="slug"
        required
        value={values.slug}
        onChange={(event) => update('slug', event.target.value)}
      />
      <TextField
        label="Volume number"
        name="volumeNumber"
        type="number"
        min="1"
        required
        value={values.volumeNumber}
        onChange={(event) => update('volumeNumber', event.target.value)}
      />
      <SelectField
        label="Series"
        name="categoryId"
        required
        value={values.categoryId}
        onChange={(event) => update('categoryId', event.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </SelectField>
      <TextField
        label="Short description"
        name="shortDescription"
        required
        value={values.shortDescription}
        onChange={(event) => update('shortDescription', event.target.value)}
      />
      <TextAreaField
        label="Description"
        name="description"
        required
        value={values.description}
        onChange={(event) => update('description', event.target.value)}
      />
      <TextAreaField
        label="Features (one per line)"
        name="features"
        value={values.features}
        onChange={(event) => update('features', event.target.value)}
      />
      <TextAreaField
        label="Chapters (Title | Description)"
        name="chapters"
        value={values.chapters}
        onChange={(event) => update('chapters', event.target.value)}
      />
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
      <SelectField
        label="Status"
        name="status"
        value={values.status}
        onChange={(event) => update('status', event.target.value as ProductStatus)}
      >
        <option value="available">Available</option>
        <option value="coming-soon">Coming soon</option>
      </SelectField>
      <TextField
        label="Release year"
        name="releaseYear"
        type="number"
        value={values.releaseYear}
        onChange={(event) => update('releaseYear', event.target.value)}
      />
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
      <TextAreaField
        label="Condition note"
        name="conditionNote"
        value={values.conditionNote}
        onChange={(event) => update('conditionNote', event.target.value)}
      />
      <div>
        <label className={styles.checkbox} htmlFor="coverImage">
          Cover image
        </label>
        <input id="coverImage" type="file" accept="image/*" onChange={handleCoverUpload} />
        {values.coverImage ? (
          <div className={styles.previewRow}>
            <img className={styles.preview} src={values.coverImage} alt="Cover" />
          </div>
        ) : null}
      </div>
      <div>
        <label className={styles.checkbox} htmlFor="gallery">
          Additional images
        </label>
        <input id="gallery" type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
        <div className={styles.previewRow}>
          {values.gallery.map((image, index) => (
            <div className={styles.galleryItem} key={`${image}-${index}`}>
              <img className={styles.preview} src={image} alt="" />
              <Button
                variant="secondary"
                type="button"
                onClick={() => update('gallery', values.gallery.filter((item) => item !== image))}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <p className={styles.hint}>Cover and extra images become the dots on the product card.</p>
      </div>
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
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={values.isFeatured}
          onChange={(event) => update('isFeatured', event.target.checked)}
        />
        Featured
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={values.hasVideo}
          onChange={(event) => update('hasVideo', event.target.checked)}
        />
        Has video section
      </label>
      {isUploading ? <p>Uploading image...</p> : null}
      {error ? (
        <p className="fieldError" role="alert">
          {error}
        </p>
      ) : null}
      <div className="formActions">
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
        <Button to="/admin/products" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
      <aside className={styles.previewPane} aria-label="Product card preview">
        <h2 className={styles.previewHeading}>Product card</h2>
        {values.coverImage ? (
          <ProductCard product={previewProduct} />
        ) : (
          <p>Add a cover image to preview the card.</p>
        )}
      </aside>
    </div>
  )
}
