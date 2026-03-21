import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";

export function CtaSection() {
  return (
    <section id="contact" className="section-pad relative pb-28">
      <div className="shell">
        <Reveal>
          <section className="cta-panel overflow-hidden rounded-[2.2rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <div className="cta-panel__wave absolute inset-0" />
            <div className="cta-panel__streak cta-panel__streak--one" />
            <div className="cta-panel__streak cta-panel__streak--two" />
            <div className="cta-panel__streak cta-panel__streak--three" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="mb-6 flex justify-center">
                <SectionHeading
                  eyebrow="Contract Positioning"
                  title="Built for Mission-Critical Execution"
                  description="Feepost is positioned for contract-driven engagements and enterprise delivery programs that require secure execution, disciplined engineering, and dependable operational follow-through."
                  align="center"
                />
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ActionLink
                  href="mailto:contracts@feepostsoftware.com?subject=Feepost%20Capability%20Inquiry"
                  className="cta-button-primary min-w-[17rem]"
                  pulse
                >
                  Contact Contracts Team
                </ActionLink>
                <ActionLink href="#services" variant="secondary" className="min-w-[17rem]">
                  Review Capability Areas
                </ActionLink>
              </div>

              <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                Enterprise modernization, systems integration, and secure software delivery
                engagements are supported by a mission-first execution model designed for serious
                environments.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
