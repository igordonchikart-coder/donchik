import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { PageProse } from '@/components/content/PageProse'
import prose from '@/components/content/PageProse.module.css'
import { PageSeo } from '@/components/seo/PageSeo'
import { legalDocuments, type LegalDocId } from '@/data/legalPages'
import { organizationJsonLd } from '@/data/siteSeo'
import { SITE_URL } from '@/utils/constants'
import styles from '../Page.module.css'

interface LegalDocumentPageProps {
  docId: LegalDocId
}

export function LegalDocumentPage({ docId }: LegalDocumentPageProps) {
  const doc = legalDocuments[docId]
  const origin = typeof window === 'undefined' ? SITE_URL : window.location.origin

  return (
    <div className={styles.page}>
      <PageSeo
        title={doc.seoTitle}
        description={doc.seoDescription}
        path={doc.path}
        jsonLd={organizationJsonLd(origin)}
      />
      <Container>
        <PageHeader title={doc.title} description={doc.intro} />
        <PageProse>
          {doc.sections.map((section) => (
            <section key={section.title}>
              <h2 className={prose.title}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </PageProse>
      </Container>
    </div>
  )
}
