import { useState } from 'react'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/common/Button'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { categoriesService } from '@/services/categoriesService'
import { useCategories } from '@/hooks/useCategories'
import type { Category } from '@/types'
import styles from '../Page.module.css'

export function AdminCategoriesPage() {
  const { data, isLoading, error, reload } = useCategories()
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [selected, setSelected] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [isBusy, setIsBusy] = useState(false)

  async function confirmDelete() {
    if (!categoryToDelete) {
      return
    }
    setIsBusy(true)
    try {
      await categoriesService.remove(categoryToDelete.id)
      setCategoryToDelete(null)
      reload()
    } finally {
      setIsBusy(false)
    }
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState description={error} onRetry={reload} />
  }

  if (mode === 'create') {
    return (
      <>
        <PageHeader title="New series" />
        <CategoryForm
          submitLabel="Create"
          onCancel={() => setMode('list')}
          onSubmit={async (input) => {
            await categoriesService.create(input)
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
        <CategoryForm
          initialCategory={selected}
          submitLabel="Save"
          onCancel={() => {
            setSelected(null)
            setMode('list')
          }}
          onSubmit={async (input) => {
            await categoriesService.update(selected.id, input)
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
      <PageHeader title="Series" description="Manage book series shown on the catalog." />
      <div className={styles.toolbar}>
        <Button type="button" onClick={() => setMode('create')}>
          New series
        </Button>
      </div>
      {data && data.length > 0 ? (
        <div className="formGrid">
          {data.map((category) => (
            <article key={category.id} className={styles.stat}>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <div className="formActions">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setSelected(category)
                    setMode('edit')
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" type="button" onClick={() => setCategoryToDelete(category)}>
                  Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No series" description="Create the first series for the catalog." />
      )}
      <ConfirmDialog
        title="Delete this series?"
        description={categoryToDelete ? `“${categoryToDelete.title}” will be removed.` : ''}
        isOpen={Boolean(categoryToDelete)}
        isBusy={isBusy}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setCategoryToDelete(null)}
      />
    </>
  )
}
