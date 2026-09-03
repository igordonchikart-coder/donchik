import { useMemo, useState } from 'react'
import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { ProductsTable } from '@/components/admin/ProductsTable'
import { SelectField, TextField } from '@/components/common/Field'
import { productsService } from '@/services/productsService'
import { useCategories } from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'
import type { Product } from '@/types'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

export function AdminProductsPage() {
  const { data, isLoading, error, reload } = useProducts()
  const categories = useCategories()
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isBusy, setIsBusy] = useState(false)
  const [query, setQuery] = useState('')
  const [seriesId, setSeriesId] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return (data ?? [])
      .filter((product) => {
        const matchesQuery =
          !needle ||
          product.title.toLowerCase().includes(needle) ||
          product.volumeLabel.toLowerCase().includes(needle) ||
          (product.category?.title ?? '').toLowerCase().includes(needle)
        const matchesSeries = seriesId === 'all' || product.categoryId === seriesId
        const matchesStatus = status === 'all' || product.status === status
        return matchesQuery && matchesSeries && matchesStatus
      })
      .sort((left, right) => {
        const series = (left.category?.title ?? left.categoryId).localeCompare(
          right.category?.title ?? right.categoryId,
        )
        if (series !== 0) {
          return series
        }
        if (left.volumeNumber !== right.volumeNumber) {
          return left.volumeNumber - right.volumeNumber
        }
        return left.id.localeCompare(right.id)
      })
  }, [data, query, seriesId, status])

  async function confirmDelete() {
    if (!productToDelete) {
      return
    }
    setIsBusy(true)
    try {
      await productsService.remove(productToDelete.id)
      setProductToDelete(null)
      reload()
    } finally {
      setIsBusy(false)
    }
  }

  if (isLoading || categories.isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState description={error} onRetry={reload} />
  }

  return (
    <>
      <PageHeader title="Books" description="Add volumes, change prices, photos, and stock." />
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <div className={styles.filterField}>
            <TextField
              label="Search"
              name="search"
              value={query}
              placeholder="Title or volume"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className={styles.filterField}>
            <SelectField label="Series" name="series" value={seriesId} onChange={(event) => setSeriesId(event.target.value)}>
              <option value="all">All series</option>
              {(categories.data ?? []).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </SelectField>
          </div>
          <div className={styles.filterField}>
            <SelectField label="Status" name="status" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="coming-soon">Coming soon</option>
            </SelectField>
          </div>
        </div>
        <Button to={routes.adminProductNew}>New book</Button>
      </div>
      {filtered.length > 0 ? (
        <ProductsTable products={filtered} onDelete={setProductToDelete} />
      ) : (
        <EmptyState
          title={data && data.length > 0 ? 'No matches' : 'No books'}
          description={
            data && data.length > 0
              ? 'Try another search or filter.'
              : 'Create the first volume to fill the catalog.'
          }
          actionLabel={data && data.length > 0 ? undefined : 'Create book'}
          actionTo={data && data.length > 0 ? undefined : routes.adminProductNew}
        />
      )}
      <ConfirmDialog
        title="Delete this book?"
        description={productToDelete ? `“${productToDelete.title}” will be removed from the catalog.` : ''}
        isOpen={Boolean(productToDelete)}
        isBusy={isBusy}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setProductToDelete(null)}
      />
    </>
  )
}
