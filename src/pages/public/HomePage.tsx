import { DeferredMount } from '@/components/common/DeferredMount'
import { AboutAuthorSection } from '@/components/home/AboutAuthorSection'
import { CtaSlider } from '@/components/home/CtaSlider'
import { HeroSlider } from '@/components/home/HeroSlider'
import { HomeCatalogSection } from '@/components/home/HomeCatalogSection'
import { HomeStatsSection } from '@/components/home/HomeStatsSection'
import { SupportSection } from '@/components/home/SupportSection'
import { VideoSection } from '@/components/home/VideoSection'
import { PageSeo } from '@/components/seo/PageSeo'
import { organizationJsonLd } from '@/data/siteSeo'
import { homeSeo } from '@/data/staticPageCopy'
import { routes } from '@/app/routes'
import { SITE_URL } from '@/utils/constants'

export function HomePage() {
  const origin = typeof window === 'undefined' ? SITE_URL : window.location.origin

  return (
    <>
      <PageSeo
        title={homeSeo.title}
        description={homeSeo.description}
        path={routes.home}
        jsonLd={organizationJsonLd(origin)}
      />
      <HeroSlider />
      <HomeStatsSection />
      <HomeCatalogSection />
      <CtaSlider />
      <DeferredMount minHeight="24rem">
        <AboutAuthorSection />
      </DeferredMount>
      <DeferredMount minHeight="32rem">
        <VideoSection />
      </DeferredMount>
      <SupportSection />
    </>
  )
}
