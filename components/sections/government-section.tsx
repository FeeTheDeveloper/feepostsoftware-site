"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { useInteractiveGlow } from "@/components/ui/use-interactive-glow";
import { agencyProfiles, procurementSignals } from "@/lib/content";

function AgencyCard({
  acronym,
  label,
  tooltip
}: {
  acronym: string;
  label: string;
  tooltip: string;
}) {
  const { interactiveStyle, glowHandlers } = useInteractiveGlow(0.9);

  return (
    <motion.article
      className="agency-card interactive-card group relative overflow-hidden rounded-[1.45rem] p-5"
      data-cursor="interactive"
      {...glowHandlers}
      style={interactiveStyle}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      <div className="agency-card__outline absolute inset-0 rounded-[inherit]" />
      <div className="agency-card__glow absolute inset-0 rounded-[inherit]" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="agency-card__mark flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/10 bg-white/[0.04]">
          <span className="font-display text-lg uppercase tracking-[0.18em] text-white">
            {acronym}
          </span>
        </div>

        <div>
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan/78">
            Agency Lane
          </div>
          <div className="mt-2 text-base font-semibold text-white">{label}</div>
        </div>
      </div>

      <div className="agency-card__tooltip absolute inset-x-4 bottom-4 rounded-[1.15rem] px-4 py-3 text-sm leading-6 text-white/74">
        {tooltip}
      </div>
    </motion.article>
  );
}

export function GovernmentSection() {
  return (
    <section id="government" className="section-pad relative">
      <div className="shell">
        <Reveal>
          <section className="government-panel overflow-hidden rounded-[2.15rem]">
            <div className="government-network__lines absolute inset-[-18%]" />
            <div className="government-network__dots absolute inset-0" />
            <div className="government-panel__line government-panel__line--top" />
            <div className="government-panel__line government-panel__line--mid" />
            <div className="government-panel__line government-panel__line--bottom" />

            <div className="relative z-10 grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-14">
              <div className="max-w-3xl">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-cyan/72">
                  Contract Readiness
                </div>
                <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[3.7rem]">
                  Government &amp; Enterprise Solutions
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
                  Feepost aligns with federal and state procurement expectations through a
                  veteran-owned, contract-ready operating posture shaped around secure delivery,
                  modernization discipline, and cybersecurity-conscious engineering.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {procurementSignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/72"
                    >
                      {signal}
                    </span>
                  ))}
                </div>

                <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {agencyProfiles.map((agency) => (
                    <StaggerItem key={agency.acronym}>
                      <AgencyCard
                        acronym={agency.acronym}
                        label={agency.label}
                        tooltip={agency.tooltip}
                      />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>

              <div className="grid gap-5 self-start">
                <div className="veteran-badge relative overflow-hidden rounded-[1.9rem] p-7 sm:p-8">
                  <div className="veteran-badge__glow absolute inset-0" />
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="veteran-badge__shield flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem]">
                      <svg viewBox="0 0 80 80" className="h-11 w-11 text-cyan" fill="none" aria-hidden="true">
                        <path
                          d="M40 12c8 7 16 10 24 11v18c0 15-9 27-24 33-15-6-24-18-24-33V23c8-1 16-4 24-11Z"
                          stroke="currentColor"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="m29 41 7 7 15-15"
                          stroke="currentColor"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-magenta/78">
                        Procurement Signal
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white sm:text-[2rem]">
                        Veteran-Owned
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-7 text-white/68 sm:text-[0.98rem]">
                        A mission-first engineering culture with a secure delivery posture designed
                        for agencies, enterprise programs, and stakeholders who require accountable
                        execution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="government-brief rounded-[1.65rem] p-6 sm:p-7">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-cyan/70">
                    Cybersecurity Alignment
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    Secure-by-design modernization for serious environments.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                    Feepost supports software delivery, systems integration, workflow automation,
                    and infrastructure modernization with an engineering posture aligned to risk
                    awareness, continuity, and procurement-conscious execution.
                  </p>
                </div>

                <div className="government-brief rounded-[1.65rem] p-6 sm:p-7">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-cyan/70">
                    Enterprise Readiness
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    Built to serve both agency stakeholders and enterprise operators.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                    The delivery model is equally suited to public-sector modernization and
                    enterprise transformation programs that need resilient systems, disciplined
                    process, and scalable engineering support.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
