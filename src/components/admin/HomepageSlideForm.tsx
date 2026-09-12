import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import { Button } from '@/components/common/Button'
import { SelectField, TextField } from '@/components/common/Field'
import { uploadProductImage } from '@/services/imagesService'
import type {
  Category,
  HomepageSlide,
  HomepageSlideInput,
  HomepageSlideKind,
  HomepageSlideLinkType,
  Product,
} from '@/types'
import { toVolumeLabel } from '@/utils/product'
import styles from './HomepageSlideForm.module.css'

interface HomepageSlideFormProps {
  kind: HomepageSlideKind
  products: Product[]
  categories: Category[]
  initialSlide?: HomepageSlide
  nextSortOrder: number
  submitLabel: string
  onSubmit: (input: HomepageSlideInput) => Promise<void>
  onCancel?: () => void
}

export function HomepageSlideForm({
  kind,
  products,
  categories,
  initialSlide,
  nextSortOrder,
  submitLabel,
  onSubmit,
  onCancel,
}: HomepageSlideFormProps) {
  const [title, setTitle] = useState(initialSlide?.title ?? '')
  const [label, setLabel] = useState(initialSlide?.label ?? (kind === 'hero' ? 'Volume I' : '-20%'))
  const [image, setImage] = useState(initialSlide?.image ?? '')
  const [linkType, setLinkType] = useState<HomepageSlideLinkType>(
    initialSlide?.linkType ?? (kind === 'hero' ? 'product' : 'discounts'),
  )
  const [productId, setProductId] = useState(initialSlide?.productId ?? '')
  const [categoryId, setCategoryId] = useState(initialSlide?.categoryId ?? '')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const sortedProducts = useMemo(
    () =>
      products
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title) || a.volumeNumber - b.volumeNumber),
    [products],
  )

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    setIsUploading(true)
    setError(null)
    try {
      setImage(await uploadProductImage(file, kind === 'hero' ? 'hero-slides' : 'cta-slides'))
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not upload the image')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  function handleProductChange(nextProductId: string) {
    setProductId(nextProductId)
    const product = sortedProducts.find((item) => item.id === nextProductId)
    if (!product) {
      return
    }
    if (!title.trim()) {
      setTitle(product.title)
    }
    if (kind === 'hero' && (!label.trim() || label.startsWith('Volume'))) {
      setLabel(toVolumeLabel(product.volumeNumber))
    }
    if (!image && product.coverImage) {
      setImage(product.coverImage)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      if (!image) {
        throw new Error('Add a slide image')
      }
      if (linkType === 'product' && !productId) {
        throw new Error('Choose a book for this slide')
      }
      if (linkType === 'category' && !categoryId) {
        throw new Error('Choose a series for this slide')
      }

      await onSubmit({
        kind,
        title: title.trim(),
        label: label.trim(),
        image,
        linkType,
        productId: linkType === 'product' ? productId : null,
        categoryId: linkType === 'category' ? categoryId : null,
        sortOrder: initialSlide?.sortOrder ?? nextSortOrder,
      })
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not save the slide')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        label={kind === 'hero' ? 'Volume label' : 'Discount label'}
        name="label"
        required
        value={label}
        placeholder={kind === 'hero' ? 'Volume I' : '-20%'}
        onChange={(event) => setLabel(event.target.value)}
      />

      <SelectField
        label="Link to"
        name="linkType"
        value={linkType}
        onChange={(event) => setLinkType(event.target.value as HomepageSlideLinkType)}
      >
        <option value="product">Book</option>
        {kind === 'cta' ? <option value="category">Series</option> : null}
        {kind === 'cta' ? <option value="discounts">Discounts page</option> : null}
      </SelectField>

      {linkType === 'product' ? (
        <SelectField
          label="Book"
          name="productId"
          required
          value={productId}
          onChange={(event) => handleProductChange(event.target.value)}
        >
          <option value="">Select a book</option>
          {sortedProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.title} — {toVolumeLabel(product.volumeNumber)}
            </option>
          ))}
        </SelectField>
      ) : null}

      {linkType === 'category' ? (
        <SelectField
          label="Series"
          name="categoryId"
          required
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Select a series</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </SelectField>
      ) : null}

      <div className={styles.imageField}>
        <label htmlFor={`${kind}-slide-image`}>Image</label>
        <input
          id={`${kind}-slide-image`}
          type="file"
          accept="image/*"
          disabled={isUploading}
          onChange={handleImageUpload}
        />
        {isUploading ? <p className={styles.hint}>Uploading…</p> : null}
        {image ? <img className={styles.preview} src={image} alt="" /> : null}
      </div>

      {error ? (
        <p className="fieldError" role="alert">
          {error}
        </p>
      ) : null}

      <div className="formActions">
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
        {onCancel ? (
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  )
}
