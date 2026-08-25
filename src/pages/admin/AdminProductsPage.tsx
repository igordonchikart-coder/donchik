import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { ProductsTable } from '@/components/admin/ProductsTable'
import { productsService } from '@/services/productsService'
import { useProducts } from '@/hooks/useProducts'
import type { Product } from '@/types'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

export function AdminProductsPage() {
  const { data, isLoading, error, reload } = useProducts()
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isBusy, setIsBusy] = useState(false)

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

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState description={error} onRetry={reload} />
  }

  return (
    <>
      <PageHeader title="Books" description="Create, edit, and delete volumes." />
      <div className={styles.toolbar}>
        <Button to={routes.adminProductNew}>New book</Button>
      </div>
      {data && data.length > 0 ? (
        <ProductsTable products={data} onDelete={setProductToDelete} />
      ) : (
        <EmptyState
          title="No books"
          description="Create the first volume to fill the catalog."
          actionLabel="Create book"
          actionTo={routes.adminProductNew}
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
