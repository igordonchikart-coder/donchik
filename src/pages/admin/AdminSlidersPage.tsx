import { useMemo, useState } from 'react'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/common/Button'
import { HomepageSlideForm } from '@/components/admin/HomepageSlideForm'
import { useCategories } from '@/hooks/useCategories'
import { useHomepageSlides } from '@/hooks/useHomepageSlides'
import { useProducts } from '@/hooks/useProducts'
import { homepageSlidesService } from '@/services/homepageSlidesService'
import type { HomepageSlide, HomepageSlideKind } from '@/types'
import { resolveHomepageSlidePath } from '@/utils/homepageSlides'
import styles from '../Page.module.css'
import slideStyles from './AdminSlidersPage.module.css'

type Mode = 'list' | 'create' | 'edit'

export function AdminSlidersPage() {
  const [kind, setKind] = useState<HomepageSlideKind>('hero')
  const { data: slides, isLoading, error, reload } = useHomepageSlides(kind)
  const { data: products } = useProducts()
  const { data: categories } = useCategories()
  const [mode, setMode] = useState<Mode>('list')
  const [selected, setSelected] = useState<HomepageSlide | null>(null)
  const [slideToDelete, setSlideToDelete] = useState<HomepageSlide | null>(null)
  const [isBusy, setIsBusy] = useState(false)

  const orderedSlides = useMemo(
    () => (slides ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder),
    [slides],
  )

  async function confirmDelete() {
    if (!slideToDelete) {
      return
    }
    setIsBusy(true)
    try {
      await homepageSlidesService.remove(slideToDelete.id)
      setSlideToDelete(null)
      reload()
    } finally {
      setIsBusy(false)
    }
  }

  async function moveSlide(slideId: string, direction: -1 | 1) {
    const index = orderedSlides.findIndex((slide) => slide.id === slideId)
    const target = index + direction
    if (index < 0 || target < 0 || target >= orderedSlides.length) {
      return
    }
    const next = orderedSlides.slice()
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    setIsBusy(true)
    try {
      await homepageSlidesService.reorder(
        kind,
        next.map((slide) => slide.id),
      )
      reload()
    } finally {
      setIsBusy(false)
    }
  }

  function switchKind(nextKind: HomepageSlideKind) {
    setKind(nextKind)
    setMode('list')
    setSelected(null)
  }

  if (isLoading && mode === 'list') {
    return <LoadingState />
  }

  if (error && mode === 'list') {
    return <ErrorState description={error} onRetry={reload} />
  }

  if (mode === 'create') {
    return (
      <>
        <PageHeader title={kind === 'hero' ? 'New hero slide' : 'New discount slide'} />
        <HomepageSlideForm
          kind={kind}
          products={products ?? []}
          categories={categories ?? []}
          nextSortOrder={orderedSlides.length}
          submitLabel="Create"
          onCancel={() => setMode('list')}
          onSubmit={async (input) => {
            await homepageSlidesService.create(input)
            setMode('list')
            reload()
          }}
        />
      </>
    )
  }

  if (mode === 'edit' && selected) {
    return (
      <>
        <PageHeader title={`Edit: ${selected.title}`} />
        <HomepageSlideForm
          kind={kind}
          products={products ?? []}
          categories={categories ?? []}
          initialSlide={selected}
          nextSortOrder={selected.sortOrder}
          submitLabel="Save"
          onCancel={() => {
            setSelected(null)
            setMode('list')
          }}
          onSubmit={async (input) => {
            await homepageSlidesService.update(selected.id, input)
            setSelected(null)
            setMode('list')
            reload()
          }}
        />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Sliders"
        description="Hero and discount slides on the homepage: image, text, and destination book."
      />

      <div className={slideStyles.tabs} role="tablist" aria-label="Slider type">
        <button
          type="button"
          role="tab"
          aria-selected={kind === 'hero'}
          className={`${slideStyles.tab} ${kind === 'hero' ? slideStyles.tabActive : ''}`}
          onClick={() => switchKind('hero')}
        >
          Hero
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={kind === 'cta'}
          className={`${slideStyles.tab} ${kind === 'cta' ? slideStyles.tabActive : ''}`}
          onClick={() => switchKind('cta')}
        >
          Discount
        </button>
      </div>

      <div className={styles.toolbar}>
        <Button type="button" onClick={() => setMode('create')}>
          {kind === 'hero' ? 'New hero slide' : 'New discount slide'}
        </Button>
      </div>

      {orderedSlides.length > 0 ? (
        <div className={slideStyles.list}>
          {orderedSlides.map((slide, index) => (
            <article key={slide.id} className={slideStyles.card}>
              {slide.image ? (
                <img
                  className={`${slideStyles.thumb} ${kind === 'cta' ? slideStyles.thumbCta : ''}`}
                  src={slide.image}
                  alt=""
                />
              ) : (
                <div
                  className={`${slideStyles.thumbEmpty} ${kind === 'cta' ? slideStyles.thumbEmptyCta : ''}`}
                >
                  No image
                </div>
              )}
              <div className={slideStyles.meta}>
                <h2>{slide.title}</h2>
                <p>{slide.label}</p>
                <p className={slideStyles.link}>
                  {slide.linkType === 'product' && slide.productSlug
                    ? `Book → /product/${slide.productSlug}`
                    : slide.linkType === 'category' && slide.categorySlug
                      ? `Series → /category/${slide.categorySlug}`
                      : `→ ${resolveHomepageSlidePath(slide)}`}
                </p>
              </div>
              <div className={slideStyles.actions}>
                <Button
                  variant="secondary"
                  type="button"
                  disabled={isBusy || index === 0}
                  onClick={() => void moveSlide(slide.id, -1)}
                >
                  Up
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  disabled={isBusy || index === orderedSlides.length - 1}
                  onClick={() => void moveSlide(slide.id, 1)}
                >
                  Down
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setSelected(slide)
                    setMode('edit')
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" type="button" onClick={() => setSlideToDelete(slide)}>
                  Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title={kind === 'hero' ? 'No hero slides' : 'No discount slides'}
          description="Add the first slide. Until then the homepage keeps the built-in defaults."
        />
      )}

      <ConfirmDialog
        title="Delete this slide?"
        description={slideToDelete ? `“${slideToDelete.title}” will be removed.` : ''}
        isOpen={Boolean(slideToDelete)}
        isBusy={isBusy}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setSlideToDelete(null)}
      />
    </>
  )
}
