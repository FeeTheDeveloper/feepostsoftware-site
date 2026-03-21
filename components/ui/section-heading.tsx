type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <div className={`eyebrow motion-border-pulse ${align === "center" ? "mx-auto" : ""}`}>
        {eyebrow}
      </div>
      <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
        <span className="gradient-title motion-sweep-text">{title}</span>
      </h2>
      <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">{description}</p>
    </div>
  );
}
