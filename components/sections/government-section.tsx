import { Reveal } from "@/components/motion/reveal";
import { agencyTargets, governmentPillars } from "@/lib/content";

export function GovernmentSection() {
  return (
    <section className="section-pad relative">
      <div className="shell">
        <Reveal>
          <div className="government-panel overflow-hidden rounded-[2rem]">
            <div className="government-panel__grid absolute inset-0" />
            <div className="government-panel__line government-panel__line--top" />
            <div className="government-panel__line government-panel__line--mid" />
            <div className="government-panel__line government-panel__line--bottom" />

            <div className="relative z-10 grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
              <div className="max-w-3xl">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-cyan/72">
                  Government Focus
                </div>
                <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  Government &amp; Enterprise Solutions
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
                  Feepost delivers secure software, systems modernization, and dependable
                  technical execution for procurement-aware organizations operating in serious
                  environments. The posture is disciplined, mission-first, and built for
                  accountability.
                </p>

                <div className="mt-10">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-white/46">
                    Agency Targets
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {agencyTargets.map((agency) => (
                      <div
                        key={agency}
                        className="government-target rounded-full border border-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.24em] text-white/80"
                      >
                        {agency}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 self-start">
                {governmentPillars.map((pillar, index) => (
                  <Reveal key={pillar.title} delay={0.08 + index * 0.08}>
                    <article className="government-brief rounded-[1.4rem] p-5 sm:p-6">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-cyan/70">
                        0{index + 1}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/64 sm:text-[0.96rem]">
                        {pillar.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
