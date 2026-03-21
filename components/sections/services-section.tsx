import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section id="services" className="section-pad relative">
      <div className="shell">
        <Reveal className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Core Services"
            title="Six core service lines built for secure software, systems, and infrastructure execution."
            description="Feepost's service stack covers custom software, enterprise and government applications, systems integration, DevOps support, secure workflows, and long-horizon modernization."
          />
          <div className="max-w-md rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5 text-sm leading-7 text-white/64 backdrop-blur-md">
            Each service line is structured to stand alone or plug into a larger modernization
            program, which keeps engagements agile without losing enterprise or contract readiness.
          </div>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                detailLabel={service.detailLabel}
                details={service.details}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
