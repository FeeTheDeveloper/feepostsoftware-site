import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { CredibilitySection } from "@/components/sections/credibility-section";
import { CtaSection } from "@/components/sections/cta-section";
import { GovernmentSection } from "@/components/sections/government-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhySection } from "@/components/sections/why-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="relative overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GovernmentSection />
        <WhySection />
        <CredibilitySection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
