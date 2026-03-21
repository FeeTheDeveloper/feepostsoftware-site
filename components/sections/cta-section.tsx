import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import {
  contactEmail,
  contactPhoneStatus,
  samProfileStatus
} from "@/lib/content";

type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}?subject=Feepost%20Capability%20Inquiry`
  },
  {
    label: "Phone",
    value: contactPhoneStatus
  },
  {
    label: "SAM.gov",
    value: samProfileStatus
  }
] as const;

export function CtaSection() {
  return (
    <section id="contact" className="section-pad relative pb-28">
      <div className="shell">
        <Reveal>
          <section className="cta-panel overflow-hidden rounded-[2.4rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <div className="cta-panel__wave absolute inset-0" />
            <div className="cta-panel__aurora absolute inset-[-12%]" />
            <div className="cta-panel__streak cta-panel__streak--one" />
            <div className="cta-panel__streak cta-panel__streak--two" />
            <div className="cta-panel__streak cta-panel__streak--three" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
              <div className="max-w-3xl">
                <div className="eyebrow">Immediate Engagement</div>
                <h2 className="mt-7 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[4rem]">
                  <span className="gradient-title">Ready to Execute Your Mission</span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                  Available for immediate engagement for software development contracts, IT
                  modernization initiatives, and government technology partnerships.
                </p>

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                  <ActionLink
                    href={`mailto:${contactEmail}?subject=Engage%20Feepost`}
                    className="cta-button-primary min-w-[17rem] cta-button-engage"
                    pulse
                  >
                    Engage Feepost
                  </ActionLink>
                  <ActionLink href="#government" variant="secondary" className="min-w-[17rem]">
                    Review Contract Readiness
                  </ActionLink>
                </div>
              </div>

              <div className="grid gap-4">
                {contactItems.map((item) => {
                  const content = (
                    <div className="cta-contact-card rounded-[1.45rem] px-5 py-5">
                      <div className="text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-cyan/78">
                        {item.label}
                      </div>
                      <div className="mt-3 text-base font-semibold text-white sm:text-lg">
                        {item.value}
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
