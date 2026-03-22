import Image from "next/image";

type NetworkSceneFallbackProps = {
  backgroundReveal?: number;
  logoReveal?: number;
};

const skylineHeights = [28, 44, 36, 62, 48, 74, 58, 42, 66, 38, 54, 32];

export function NetworkSceneFallback({
  backgroundReveal = 1,
  logoReveal = 1
}: NetworkSceneFallbackProps) {
  return (
    <div
      className="hero-scene-fallback absolute inset-0"
      aria-hidden="true"
      style={{ opacity: Math.max(0.18, backgroundReveal) }}
    >
      <div className="hero-scene-fallback__mesh" />
      <div className="hero-scene-fallback__aurora hero-scene-fallback__aurora--cyan" />
      <div className="hero-scene-fallback__aurora hero-scene-fallback__aurora--magenta" />
      <div className="hero-scene-fallback__grid" />

      <div className="hero-scene-fallback__particles">
        {Array.from({ length: 24 }, (_, index) => (
          <span
            key={index}
            className="hero-scene-fallback__particle"
            style={{
              left: `${6 + (index % 6) * 16}%`,
              top: `${10 + Math.floor(index / 6) * 18}%`,
              animationDelay: `${index * 0.22}s`
            }}
          />
        ))}
      </div>

      <div className="hero-scene-fallback__city">
        {skylineHeights.map((height, index) => (
          <span
            key={`${index}-${height}`}
            className="hero-scene-fallback__tower"
            style={{
              height: `${height}px`,
              left: `${8 + index * 7.2}%`
            }}
          />
        ))}
      </div>

      <div className="hero-scene-fallback__board hero-scene-fallback__board--left">
        <span className="hero-scene-fallback__trace" />
        <span className="hero-scene-fallback__trace hero-scene-fallback__trace--alt" />
      </div>
      <div className="hero-scene-fallback__board hero-scene-fallback__board--right">
        <span className="hero-scene-fallback__trace" />
        <span className="hero-scene-fallback__trace hero-scene-fallback__trace--alt" />
      </div>

      <div
        className="hero-scene-fallback__logo-shell"
        style={{
          opacity: 0.3 + logoReveal * 0.7,
          transform: `translate3d(-50%, -50%, 0) scale(${0.72 + logoReveal * 0.28})`
        }}
      >
        <span className="hero-scene-fallback__orbit hero-scene-fallback__orbit--cyan" />
        <span className="hero-scene-fallback__orbit hero-scene-fallback__orbit--magenta" />
        <span className="hero-scene-fallback__light" />
        <div className="hero-scene-fallback__logo-core">
          <div className="hero-scene-fallback__logo-glow" />
          <Image
            src="/fs-mark.svg"
            alt=""
            width={320}
            height={320}
            className="hero-scene-fallback__logo"
          />
        </div>
      </div>
    </div>
  );
}
