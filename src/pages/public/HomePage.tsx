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
      <AboutAuthorSection />
      <VideoSection />
      <SupportSection />
    </>
  )
}
