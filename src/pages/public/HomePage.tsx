import { DeferredMount } from '@/components/common/DeferredMount'
import { AboutAuthorSection } from '@/components/home/AboutAuthorSection'
import { CtaSlider } from '@/components/home/CtaSlider'
import { HeroSlider } from '@/components/home/HeroSlider'
import { HomeCatalogSection } from '@/components/home/HomeCatalogSection'
import { HomeStatsSection } from '@/components/home/HomeStatsSection'
import { SupportSection } from '@/components/home/SupportSection'
import { VideoSection } from '@/components/home/VideoSection'

export function HomePage() {
  return (
    <>
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
