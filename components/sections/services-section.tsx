import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section id="services" className="section-pad relative">
      <div className="shell">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="Core Services"
            title="Software, systems, and infrastructure services designed for forward motion."
            description="From custom platforms to modernization and cloud delivery support, Feepost aligns engineering capability with operational objectives across government and enterprise environments."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <ServiceCard
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
