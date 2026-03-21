import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { CountUp } from "@/components/ui/count-up";
import { SectionHeading } from "@/components/ui/section-heading";
import { credibilityStats, growthTimeline } from "@/lib/content";

export function CredibilitySection() {
  return (
    <section id="credibility" className="section-pad relative pt-10">
      <div className="shell">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="Credibility"
            title="Operational readiness backed by contracting infrastructure and disciplined growth."
            description="Feepost's credibility story is built around compliance-minded business setup, procurement readiness, and a staged growth strategy designed to support long-term contract execution."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="grid gap-5">
            <StaggerGroup className="grid gap-5">
              {credibilityStats.map((stat) => (
                <StaggerItem key={stat.title}>
                  <article className="credibility-stat-card rounded-[1.7rem] p-6 sm:p-7">
                    <div className="flex items-start gap-5">
                      <div className="credibility-stat-index flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem]">
                        <CountUp
                          value={stat.value}
                          className="font-display text-2xl font-semibold text-white"
                        />
                      </div>

                      <div>
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan/78">
                          Readiness Marker
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                          {stat.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/68 sm:text-[0.98rem]">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div className="credibility-timeline rounded-[1.9rem] p-6 sm:p-8">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-magenta/78">
              Business Credit &amp; Growth Strategy
            </div>

            <div className="relative mt-8 pl-8">
              <div className="credibility-timeline__rail absolute bottom-2 left-3 top-2 w-px" />

              <StaggerGroup className="grid gap-8" staggerChildren={0.1} delayChildren={0.1}>
                {growthTimeline.map((milestone) => (
                  <StaggerItem key={milestone.phase}>
                    <article className="credibility-node relative">
                      <div className="credibility-node__dot absolute left-[-2.25rem] top-2 flex h-6 w-6 items-center justify-center rounded-full">
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      </div>

                      <div className="credibility-node__card rounded-[1.35rem] p-5">
                        <div className="text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-cyan/78">
                          Phase {milestone.phase}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                          {milestone.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                          {milestone.description}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
