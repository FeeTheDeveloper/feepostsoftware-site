import { Reveal } from "@/components/motion/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section className="section-pad relative">
      <div className="shell">
        <div className="section-grid items-start">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow="About Feepost"
              title="Mission-first software engineering with enterprise-grade precision."
              description="Feepost Software & Development Corporation is a veteran-owned technology firm delivering scalable software engineering, systems development, and digital infrastructure solutions. The company supports government agencies and commercial enterprises that require secure, reliable, and performance-driven execution."
            />
          </Reveal>

          <Reveal className="space-y-6 lg:col-span-6" delay={0.12}>
            <GlowCard
              kicker="Operating Posture"
              title="Built for high-accountability environments."
              description="Feepost combines disciplined engineering, thoughtful delivery systems, and mission awareness to help organizations modernize with confidence."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Veteran-led decision making",
                  "Performance-oriented system design",
                  "Security-conscious implementation",
                  "Delivery models that scale with mission complexity"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
