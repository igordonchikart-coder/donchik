import { useNavigate } from 'react-router-dom'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { ProductForm } from '@/components/admin/ProductForm'
import { useCategories } from '@/hooks/useCategories'
import { productsService } from '@/services/productsService'
import { routes } from '@/app/routes'

export function AdminProductNewPage() {
  const navigate = useNavigate()
  const { data, isLoading, error, reload } = useCategories()

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState description={error} onRetry={reload} />
  }

  if (!data || data.length === 0) {
    return (
      <ErrorState
        title="Create a series first"
        description="A book cannot be saved without a series."
      />
    )
  }

  return (
    <ProductForm
      heading="New book"
      categories={data}
      submitLabel="Create book"
      onSubmit={async (input) => {
        await productsService.create(input)
        navigate(routes.adminProducts)
      }}
    />
  )
}
