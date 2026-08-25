import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { HomeCatalogSection } from '@/components/home/HomeCatalogSection'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

export function CatalogPage() {
  return (
    <div className={styles.page}>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', to: routes.home }, { label: 'Store' }]} />
        <PageHeader title="Store" description="All volumes currently listed in the shop." />
      </Container>
      <HomeCatalogSection />
    </div>
  )
}
