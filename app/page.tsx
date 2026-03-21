import { AboutSection } from "@/components/sections/about-section";
import { CtaSection } from "@/components/sections/cta-section";
import { GovernmentSection } from "@/components/sections/government-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhySection } from "@/components/sections/why-section";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GovernmentSection />
      <WhySection />
      <CtaSection />
    </main>
  );
}
