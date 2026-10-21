import { Hero } from '@/components/landing/hero'
import { FeatureStrip, Services } from '@/components/landing/services'
import { SiteHeader } from '@/components/site/site-header'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
      </main>
      <FeatureStrip />
    </>
  )
}
