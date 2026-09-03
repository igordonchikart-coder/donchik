import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { PageProse } from '@/components/content/PageProse'
import prose from '@/components/content/PageProse.module.css'
import { FooterContact } from '@/components/layout/FooterContact'
import { PageSeo } from '@/components/seo/PageSeo'
import { organizationJsonLd } from '@/data/siteSeo'
import { contactPageCopy } from '@/data/staticPageCopy'
import { routes } from '@/app/routes'
import { SITE_URL } from '@/utils/constants'
import styles from '../Page.module.css'
import contactStyles from './ContactPage.module.css'

export function ContactPage() {
  const origin = typeof window === 'undefined' ? SITE_URL : window.location.origin

  return (
    <div className={styles.page}>
      <PageSeo
        title={contactPageCopy.seoTitle}
        description={contactPageCopy.seoDescription}
        path={routes.contact}
        jsonLd={organizationJsonLd(origin)}
      />
      <Container>
        <PageHeader title={contactPageCopy.title} description={contactPageCopy.description} />
        <div className={contactStyles.layout}>
          <PageProse className={contactStyles.copy}>
            {contactPageCopy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2 className={prose.title}>{contactPageCopy.hoursTitle}</h2>
            {contactPageCopy.hoursParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </PageProse>
          <address className={contactStyles.card}>
            <FooterContact />
          </address>
        </div>
      </Container>
    </div>
  )
}
