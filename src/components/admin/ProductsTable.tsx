import { Button } from '@/components/common/Button'
import type { Product } from '@/types'
import { formatPrice } from '@/utils/formatPrice'
import styles from './Table.module.css'

interface ProductsTableProps {
  products: Product[]
  onDelete: (product: Product) => void
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Series</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img className={styles.cover} src={product.coverImage} alt="" />
              </td>
              <td>
                {product.title} {product.volumeLabel}
              </td>
              <td>{product.category?.title ?? '—'}</td>
              <td>{formatPrice(product.price, product.currency)}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.actions}>
                  <Button to={`/admin/products/${product.id}/edit`} variant="secondary">
                    Edit
                  </Button>
                  <Button variant="danger" type="button" onClick={() => onDelete(product)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
