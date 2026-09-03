import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { AboutStudio } from '@/components/about/AboutStudio'
import { AboutAuthorSection } from '@/components/home/AboutAuthorSection'
import { PageSeo } from '@/components/seo/PageSeo'
import { organizationJsonLd, personJsonLd } from '@/data/siteSeo'
import { aboutPageCopy } from '@/data/staticPageCopy'
import { routes } from '@/app/routes'
import { SITE_URL } from '@/utils/constants'
import styles from '../Page.module.css'

export function AboutPage() {
  const origin = typeof window === 'undefined' ? SITE_URL : window.location.origin

  return (
    <div className={styles.page}>
      <PageSeo
        title={aboutPageCopy.seoTitle}
        description={aboutPageCopy.seoDescription}
        path={routes.about}
        jsonLd={[organizationJsonLd(origin), personJsonLd(origin)]}
      />
      <Container>
        <PageHeader title={aboutPageCopy.title} description={aboutPageCopy.description} />
      </Container>
      <AboutAuthorSection compact />
      <Container>
        <AboutStudio />
      </Container>
    </div>
  )
}
