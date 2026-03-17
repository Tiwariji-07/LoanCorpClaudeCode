import Image from 'next/image'
import LandingNav from '@/components/landing/LandingNav'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import CTASection from '@/components/landing/CTASection'
import LandingFooter from '@/components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Nav is sticky top: 0, so it stays at top of viewport regardless of DOM order.
          In Figma it's at the end of the frame, but visually fixed to the top. */}
      <LandingNav />
      {/* Figma "Image" frame — wavy background spanning hero + features + CTA */}
      <div className="relative">
        <Image
          src="/icons/landing/hero-bg.png"
          alt=""
          fill
          style={{ objectFit: 'cover', pointerEvents: 'none' }}
          priority
        />
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
      <LandingFooter />
    </main>
  )
}
