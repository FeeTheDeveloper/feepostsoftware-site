const shimmerParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + (index % 6) * 16}%`,
  top: `${10 + Math.floor(index / 6) * 24}%`,
  delay: `${index * 0.45}s`,
  duration: `${7 + (index % 4)}s`
}));

export function SiteBackgroundFallback() {
  return (
    <div className="site-background site-background--fallback" aria-hidden="true">
      <div className="site-background__gradient" />
      <div className="site-background__mesh" />
      <div className="site-background__aurora site-background__aurora--cyan" />
      <div className="site-background__aurora site-background__aurora--magenta" />
      <div className="site-background__aurora site-background__aurora--violet" />
      <div className="site-background__particles">
        {shimmerParticles.map((particle) => (
          <span
            key={particle.id}
            className="site-background__particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    </div>
  );
}
