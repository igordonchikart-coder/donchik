import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Button } from '@/components/common/Button'
import { TextAreaField, TextField } from '@/components/common/Field'
import { uploadProductImage } from '@/services/imagesService'
import type { Category, CategoryInput } from '@/types'
import { slugify } from '@/utils/slugify'
import styles from './CategoryForm.module.css'

interface CategoryFormProps {
  initialCategory?: Category
  submitLabel: string
  onSubmit: (input: CategoryInput) => Promise<void>
  onCancel?: () => void
}

export function CategoryForm({ initialCategory, submitLabel, onSubmit, onCancel }: CategoryFormProps) {
  const [title, setTitle] = useState(initialCategory?.title ?? '')
  const [slug, setSlug] = useState(initialCategory?.slug ?? '')
  const [description, setDescription] = useState(initialCategory?.description ?? '')
  const [image, setImage] = useState(initialCategory?.image ?? '')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    try {
      setImage(await uploadProductImage(file, 'categories'))
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not upload the image')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      if (!image) {
        throw new Error('Add a series image')
      }
      await onSubmit({
        title,
        slug: slug || slugify(title),
        description,
        image,
      })
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not save the series')
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
        onChange={(event) => {
          setTitle(event.target.value)
          if (!initialCategory && !slug) {
            setSlug(slugify(event.target.value))
          }
        }}
      />
      <TextField
        label="Slug"
        name="slug"
        required
        value={slug}
        onChange={(event) => setSlug(event.target.value)}
      />
      <TextAreaField
        label="Description"
        name="description"
        required
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div>
        <label htmlFor="category-image">Image</label>
        <input id="category-image" type="file" accept="image/*" onChange={handleImageUpload} />
        {image ? <img className={styles.preview} src={image} alt="" /> : null}
      </div>
      {error ? (
        <p className="fieldError" role="alert">
          {error}
        </p>
      ) : null}
      <div className="formActions">
        <Button type="submit" disabled={isSubmitting}>
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
