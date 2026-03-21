"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

const TRAIL_COUNT = 6;

export function CustomCursor() {
  const reduceMotion = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Point[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const [active, setActive] = useState(false);
  const targetRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setPointerFine(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pointerFine || reduceMotion) {
      return;
    }

    let frame = 0;

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      const next = { x: event.clientX, y: event.clientY };
      targetRef.current = next;

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor='interactive'], [data-magnetic='true']"
      );
      setActive(Boolean(interactive));
    };

    const onLeave = () => setVisible(false);

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.24,
        y: prev.y + (targetRef.current.y - prev.y) * 0.24
      }));

      setTrail((prev) => {
        const next = [...prev];
        next[0] = {
          x: next[0].x + (targetRef.current.x - next[0].x) * 0.16,
          y: next[0].y + (targetRef.current.y - next[0].y) * 0.16
        };

        for (let index = 1; index < next.length; index += 1) {
          next[index] = {
            x: next[index].x + (next[index - 1].x - next[index].x) * 0.28,
            y: next[index].y + (next[index - 1].y - next[index].y) * 0.28
          };
        }

        return next;
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, [pointerFine, reduceMotion]);

  if (!pointerFine || reduceMotion) {
    return null;
  }

  return (
    <div className="custom-cursor" aria-hidden="true">
      {trail.map((item, index) => (
        <motion.span
          key={index}
          className="custom-cursor__trail"
          style={{
            left: item.x,
            top: item.y,
            opacity: visible ? 0.28 - index * 0.03 : 0,
            scale: 1 - index * 0.08
          }}
        />
      ))}
      <motion.span
        animate={{
          opacity: visible ? 1 : 0,
          scale: active ? 1.45 : 1
        }}
        className={`custom-cursor__orb ${active ? "custom-cursor__orb--active" : ""}`}
        style={{ left: position.x, top: position.y }}
      />
      <motion.span
        animate={{
          opacity: visible ? 0.82 : 0,
          scale: active ? 1.18 : 1
        }}
        className="custom-cursor__halo"
        style={{ left: position.x, top: position.y }}
      />
    </div>
  );
}
