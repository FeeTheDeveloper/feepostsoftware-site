import { Reveal } from "@/components/motion/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { credibilitySignals, whyFeepost } from "@/lib/content";

export function WhySection() {
  return (
    <section className="section-pad relative">
      <div className="shell">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="Why Feepost"
            title="Credibility, delivery discipline, and engineering focus that earns trust."
            description="Feepost is built for organizations that need strong execution fundamentals, modern technical capability, and a team posture shaped around mission success."
          />
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <GlowCard
              kicker="Credibility"
              title="Operational confidence from strategy through deployment."
              description="The delivery model emphasizes readiness, responsiveness, and secure execution so teams can move decisively without sacrificing control."
              className="h-full"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {whyFeepost.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>

          <div className="grid gap-6">
            {credibilitySignals.map((signal, index) => (
              <Reveal key={signal.title} delay={0.08 + index * 0.08}>
                <GlowCard
                  kicker={`Signal 0${index + 1}`}
                  title={signal.title}
                  description={signal.description}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
