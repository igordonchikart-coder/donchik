import { useState } from 'react'
import { PhotoStrip } from '@/components/admin/PhotoStrip'
import { SelectField, TextAreaField, TextField } from '@/components/common/Field'
import type { Category } from '@/types'
import { toVolumeLabel } from '@/utils/product'
import styles from './BookPageEditor.module.css'

export interface BookPageEditorValues {
  title: string
  slug: string
  volumeNumber: string
  headline: string
  seoTitle: string
  seoDescription: string
  intro: string
  storyTitle: string
  description: string
  features: string
  chapters: string
  specs: string
  audienceTitle: string
  audience: string
  isbn: string
  conditionNote: string
  releaseYear: string
  categoryId: string
  pageGallery: string[]
  isFeatured: boolean
  hasVideo: boolean
}

interface BookPageEditorProps {
  values: BookPageEditorValues
  categories: Category[]
  uploading: boolean
  onTitleChange: (title: string) => void
  onChange: (key: keyof BookPageEditorValues, value: BookPageEditorValues[keyof BookPageEditorValues]) => void
  onAddPhotos: (files: FileList) => void
  onMovePhoto: (index: number, direction: -1 | 1) => void
  onMovePhotoTo: (from: number, to: number) => void
  onRemovePhoto: (index: number) => void
}

export function BookPageEditor({
  values,
  categories,
  uploading,
  onTitleChange,
  onChange,
  onAddPhotos,
  onMovePhoto,
  onMovePhotoTo,
  onRemovePhoto,
}: BookPageEditorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const photos = values.pageGallery
  const safeIndex = photos.length === 0 ? 0 : Math.min(activeIndex, photos.length - 1)
  const activePhoto = photos[safeIndex]
  const volumeLabel = toVolumeLabel(Number(values.volumeNumber) || 1)
  const headline = values.headline.trim()
    ? values.headline
    : values.title
      ? `${values.title} ${volumeLabel}`
      : 'Book title'

  return (
    <div className={styles.page}>
      <section className={styles.top}>
        <div className={styles.media}>
          {activePhoto ? (
            <img className={styles.hero} src={activePhoto} alt="" />
          ) : (
            <label className={styles.heroEmpty}>
              Add photos for the book page
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploading}
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    onAddPhotos(event.target.files)
                  }
                  event.target.value = ''
                }}
              />
            </label>
          )}
          <PhotoStrip
            photos={photos}
            uploading={uploading}
            coverLabel="Main"
            emptyLabel="Add photos"
            onAdd={onAddPhotos}
            onMove={onMovePhoto}
            onMoveTo={(from, to) => {
              onMovePhotoTo(from, to)
              setActiveIndex(to)
            }}
            onRemove={(index) => {
              onRemovePhoto(index)
              setActiveIndex((current) => Math.max(0, Math.min(current, photos.length - 2)))
            }}
          />
          {photos.length > 1 ? (
            <div className={styles.thumbs} role="tablist" aria-label="Book page photos">
              {photos.map((image, index) => (
                <button
                  className={`${styles.thumb} ${index === safeIndex ? styles.thumbActive : ''}`}
                  key={`${image}-pick-${index}`}
                  type="button"
                  aria-selected={index === safeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          ) : null}
          <p className={styles.hint}>These photos are only for the book page, not the catalog card.</p>
        </div>

        <div className={styles.copy}>
          <p className={styles.kicker}>Book page</p>
          <h2 className={styles.headline}>{headline}</h2>
          <TextField
            label="Title"
            name="title"
            required
            value={values.title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
          <div className={styles.inline}>
            <SelectField
              label="Series"
              name="categoryId"
              required
              value={values.categoryId}
              onChange={(event) => onChange('categoryId', event.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </SelectField>
            <TextField
              label="Volume number"
              name="volumeNumber"
              type="number"
              min="1"
              required
              value={values.volumeNumber}
              onChange={(event) => onChange('volumeNumber', event.target.value)}
            />
          </div>
          <TextField
            label="Page address (slug)"
            name="slug"
            required
            value={values.slug}
            onChange={(event) => onChange('slug', event.target.value)}
          />
          <TextField
            label="Headline on the book page"
            name="headline"
            value={values.headline}
            onChange={(event) => onChange('headline', event.target.value)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>SEO</h3>
        <TextField
          label="SEO title"
          name="seoTitle"
          value={values.seoTitle}
          onChange={(event) => onChange('seoTitle', event.target.value)}
        />
        <TextAreaField
          label="SEO description"
          name="seoDescription"
          value={values.seoDescription}
          onChange={(event) => onChange('seoDescription', event.target.value)}
        />
        <TextField
          label="ISBN"
          name="isbn"
          value={values.isbn}
          onChange={(event) => onChange('isbn', event.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Buy panel intro</h3>
        <TextAreaField
          label="Intro paragraphs (blank line between paragraphs)"
          name="intro"
          value={values.intro}
          onChange={(event) => onChange('intro', event.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Story</h3>
        <TextField
          label="Story title"
          name="storyTitle"
          value={values.storyTitle}
          onChange={(event) => onChange('storyTitle', event.target.value)}
        />
        <TextAreaField
          label="Story on the book page"
          name="description"
          required
          value={values.description}
          onChange={(event) => onChange('description', event.target.value)}
        />
        <TextField
          label="Audience title"
          name="audienceTitle"
          value={values.audienceTitle}
          onChange={(event) => onChange('audienceTitle', event.target.value)}
        />
        <TextAreaField
          label="Audience (one line per item)"
          name="audience"
          value={values.audience}
          onChange={(event) => onChange('audience', event.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Inside the book</h3>
        <TextAreaField
          label="Chapters (Title | Description)"
          name="chapters"
          value={values.chapters}
          onChange={(event) => onChange('chapters', event.target.value)}
        />
        <TextAreaField
          label="Features (one per line)"
          name="features"
          value={values.features}
          onChange={(event) => onChange('features', event.target.value)}
        />
        <TextAreaField
          label="Specs (Label | Value)"
          name="specs"
          value={values.specs}
          onChange={(event) => onChange('specs', event.target.value)}
        />
        <TextAreaField
          label="Condition note"
          name="conditionNote"
          value={values.conditionNote}
          onChange={(event) => onChange('conditionNote', event.target.value)}
        />
        <TextField
          label="Release year"
          name="releaseYear"
          type="number"
          value={values.releaseYear}
          onChange={(event) => onChange('releaseYear', event.target.value)}
        />
        <div className={styles.flags}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={values.isFeatured}
              onChange={(event) => onChange('isFeatured', event.target.checked)}
            />
            Featured
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={values.hasVideo}
              onChange={(event) => onChange('hasVideo', event.target.checked)}
            />
            Has video section
          </label>
        </div>
      </section>
    </div>
  )
}
