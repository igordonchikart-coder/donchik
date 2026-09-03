import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { PageSeo } from '@/components/seo/PageSeo'
import { routes } from '@/app/routes'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../Page.module.css'

export function NotFoundPage() {
  return (
    <div className="app-shell">
      <PageSeo
        title="Page not found"
        description="This address is not in the Igor Donchik Art catalog."
        path="/404"
        noIndex
      />
      <Header />
      <main className="app-main">
        <div className={styles.page}>
          <Container>
            <PageHeader title="Page not found" description="Check the address or return home." />
            <Button to={routes.home}>Home</Button>
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  )
}
