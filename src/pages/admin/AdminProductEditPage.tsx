import { useNavigate, useParams } from 'react-router-dom'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { ProductForm } from '@/components/admin/ProductForm'
import { useCategories } from '@/hooks/useCategories'
import { useProductById } from '@/hooks/useProducts'
import { productsService } from '@/services/productsService'
import { routes } from '@/app/routes'

export function AdminProductEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useProductById(id)
  const categories = useCategories()

  const isLoading = product.isLoading || categories.isLoading
  const error = product.error || categories.error

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return (
      <ErrorState
        description={error}
        onRetry={() => {
          product.reload()
          categories.reload()
        }}
      />
    )
  }

  const currentProduct = product.data
  const currentCategories = categories.data

  if (!currentProduct || !currentCategories) {
    return <ErrorState title="Book not found" description="Check the page address." />
  }

  return (
      <ProductForm
        heading={`Edit: ${currentProduct.title}`}
        categories={currentCategories}
        initialProduct={currentProduct}
        submitLabel="Save"
        onSubmit={async (input) => {
          await productsService.update(currentProduct.id, input)
          navigate(routes.adminProducts)
        }}
      />
  )
}
