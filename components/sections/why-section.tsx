"use client";

import { motion } from "framer-motion";
import { useInteractiveGlow } from "@/components/ui/use-interactive-glow";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyFeatureCards } from "@/lib/content";

type WhyIconKind = (typeof whyFeatureCards)[number]["icon"];

const iconMap: Record<WhyIconKind, string> = {
  mission:
    "M14 44c8-12 21-18 31-18 10 0 23 6 31 18-8 12-21 18-31 18-10 0-23-6-31-18Zm31-12v24M33 44h24",
  shield:
    "M46 14c7 6 14 8 22 9v16c0 13-8 24-22 29-14-5-22-16-22-29V23c8-1 15-3 22-9Zm-8 24 6 6 14-14",
  structure:
    "M18 24h52M22 24v34m24-34v34m20-34v34M16 58h56M28 66h36M26 66v8m28-8v8",
  agile:
    "M62 30V18l-8 8a20 20 0 1 0 6 20M18 50v12l8-8m6-24h18m-9-9v18"
};

function WhyFeatureCard({
  icon,
  title,
  description
}: {
  icon: WhyIconKind;
  title: string;
  description: string;
}) {
  const { interactiveStyle, glowHandlers } = useInteractiveGlow(1);

  return (
    <motion.article
      className="why-card interactive-card group relative h-full overflow-hidden rounded-[1.65rem] p-6 sm:p-7"
      data-cursor="interactive"
      {...glowHandlers}
      style={interactiveStyle}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.995 }}
    >
      <div className="why-card__outline absolute inset-0 rounded-[inherit]" />
      <div className="why-card__glow absolute inset-0 rounded-[inherit]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="why-card__icon flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-cyan">
          <svg viewBox="0 0 80 80" className="h-8 w-8" fill="none" aria-hidden="true">
            <path
              d={iconMap[icon]}
              stroke="currentColor"
              strokeWidth="4.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-white/66 sm:text-[0.98rem]">{description}</p>
      </div>
    </motion.article>
  );
}

export function WhySection() {
  return (
    <section id="why" className="section-pad relative pt-12">
      <div className="shell">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="Why Feepost"
            title="Mission-first credibility with a delivery model built for serious environments."
            description="Feepost brings veteran-owned leadership, secure engineering habits, contract-ready structure, and agile execution discipline to software and infrastructure programs that need trust from day one."
          />
        </Reveal>

        <StaggerGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {whyFeatureCards.map((card) => (
            <StaggerItem key={card.title}>
              <WhyFeatureCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
