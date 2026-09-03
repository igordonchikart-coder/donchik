import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { PageProse } from '@/components/content/PageProse'
import { HomeCatalogSection } from '@/components/home/HomeCatalogSection'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { PageSeo } from '@/components/seo/PageSeo'
import { organizationJsonLd } from '@/data/siteSeo'
import { storePageCopy } from '@/data/staticPageCopy'
import { routes } from '@/app/routes'
import { SITE_URL } from '@/utils/constants'
import styles from '../Page.module.css'

export function CatalogPage() {
  const origin = typeof window === 'undefined' ? SITE_URL : window.location.origin

  return (
    <div className={styles.page}>
      <PageSeo
        title={storePageCopy.seoTitle}
        description={storePageCopy.seoDescription}
        path={routes.catalog}
        jsonLd={organizationJsonLd(origin)}
      />
      <Container>
        <Breadcrumbs items={[{ label: 'Home', to: routes.home }, { label: 'Store' }]} />
        <PageHeader title={storePageCopy.title} description={storePageCopy.description} />
        <PageProse>
          {storePageCopy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </PageProse>
      </Container>
      <HomeCatalogSection />
    </div>
  )
}
