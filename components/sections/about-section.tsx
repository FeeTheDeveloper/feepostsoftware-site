import dynamic from "next/dynamic";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { CountUp } from "@/components/ui/count-up";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  aboutMetrics,
  aboutNarrative,
  missionStatement,
  modernizationSignals
} from "@/lib/content";

const DataStreamScene = dynamic(
  () => import("@/components/graphics/data-stream-scene").then((mod) => mod.DataStreamScene),
  { ssr: false }
);

export function AboutSection() {
  return (
    <section id="about" className="section-pad relative">
      <div className="shell">
        <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <SectionHeading
              eyebrow="About Feepost"
              title="Veteran-owned engineering shaped by mission accountability and compliance-aware delivery."
              description={missionStatement}
            />

            <StaggerGroup className="mt-8 space-y-5" staggerChildren={0.1}>
              {aboutNarrative.map((item, index) => (
                <StaggerItem key={item.title}>
                  <div
                    className={`about-copy-panel rounded-[1.7rem] p-6 sm:p-7 ${
                      index === 1 ? "about-copy-panel--magenta" : ""
                    }`}
                  >
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-cyan/78">
                      {item.title}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div className="mt-8 flex flex-wrap gap-3">
              {modernizationSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/72"
                >
                  {signal}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="about-visual-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
              <div className="absolute inset-0 rounded-[inherit] border border-white/10" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/54">
                <span>Infrastructure Signal</span>
                <span className="text-cyan/80">Looping Data Stream</span>
              </div>

              <div className="relative h-[25rem] overflow-hidden rounded-[1.55rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,0,127,0.08),transparent_26%),linear-gradient(180deg,rgba(4,8,18,0.98),rgba(4,4,12,0.98))] sm:h-[33rem]">
                <DataStreamScene />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(2,2,9,0.36)_72%,rgba(2,2,9,0.82)_100%)]" />
                <div className="absolute inset-x-[12%] top-[16%] h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent" />
                <div className="absolute inset-x-[18%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-magenta/30 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-3">
          {aboutMetrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="about-metric-panel rounded-[1.5rem] px-5 py-5">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/52">
                  {metric.label}
                </div>
                <div className="mt-3 text-4xl font-semibold text-white sm:text-[2.8rem]">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
