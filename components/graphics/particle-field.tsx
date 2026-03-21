"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  layer: number;
};

type ParticleFieldProps = {
  intensity?: number;
  parallaxX?: number;
  parallaxY?: number;
};

export function ParticleField({
  intensity = 1,
  parallaxX = 0,
  parallaxY = 0
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles: Particle[] = [];
    let time = 0;

    const createParticles = () => {
      const baseCount = reduceMotion
        ? 18
        : Math.min(56, Math.max(28, Math.floor((width * height) / 38000)));
      const particleCount = Math.max(12, Math.round(baseCount * intensity));

      particles = Array.from({ length: particleCount }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (reduceMotion ? 0.12 : 0.32),
        vy: (Math.random() - 0.5) * (reduceMotion ? 0.12 : 0.32),
        size: 1.2 + Math.random() * 2.4,
        hue: index % 4 === 0 ? 320 : 190,
        layer: 0.4 + Math.random() * 0.8
      }));
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = () => {
      time += 0.004;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const offsetX = parallaxX * particle.layer * 10;
        const offsetY = parallaxY * particle.layer * 10;

        if (!reduceMotion) {
          particle.x += particle.vx * particle.layer + Math.sin(time + i) * 0.06;
          particle.y += particle.vy * particle.layer + Math.cos(time * 1.2 + i) * 0.06;
        }

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        context.beginPath();
        context.fillStyle =
          particle.hue === 320 ? "rgba(255, 0, 170, 0.85)" : "rgba(0, 229, 255, 0.88)";
        context.shadowBlur = particle.hue === 320 ? 18 : 22;
        context.shadowColor =
          particle.hue === 320 ? "rgba(255, 0, 170, 0.85)" : "rgba(0, 229, 255, 0.85)";
        context.arc(
          particle.x + offsetX,
          particle.y + offsetY,
          particle.size * particle.layer,
          0,
          Math.PI * 2
        );
        context.fill();
      }

      context.shadowBlur = 0;

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const ax = a.x + parallaxX * a.layer * 10;
          const ay = a.y + parallaxY * a.layer * 10;
          const bx = b.x + parallaxX * b.layer * 10;
          const by = b.y + parallaxY * b.layer * 10;
          const dx = ax - bx;
          const dy = ay - by;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            const alpha = 1 - distance / 140;
            context.beginPath();
            context.strokeStyle =
              a.hue === 320 || b.hue === 320
                ? `rgba(255, 0, 170, ${alpha * 0.18})`
                : `rgba(0, 229, 255, ${alpha * 0.22})`;
            context.lineWidth = 1;
            context.moveTo(ax, ay);
            context.lineTo(bx, by);
            context.stroke();
          }
        }
      }

      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [intensity, parallaxX, parallaxY, reduceMotion]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
