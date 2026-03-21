"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useState } from "react";

type InteractiveStyle = CSSProperties & {
  "--pointer-x"?: string;
  "--pointer-y"?: string;
};

export function useInteractiveGlow(intensity = 1) {
  const [style, setStyle] = useState<InteractiveStyle>({
    "--pointer-x": "50%",
    "--pointer-y": "50%"
  });

  const onPointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setStyle({
      "--pointer-x": `${x}%`,
      "--pointer-y": `${y}%`,
      transform: `perspective(1400px) rotateX(${(50 - y) * 0.07 * intensity}deg) rotateY(${(x - 50) * 0.08 * intensity}deg)`
    });
  };

  const onPointerLeave = () => {
    setStyle({
      "--pointer-x": "50%",
      "--pointer-y": "50%",
      transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)"
    });
  };

  return {
    interactiveStyle: style,
    glowHandlers: {
      onMouseMove: onPointerMove,
      onMouseLeave: onPointerLeave,
      onBlur: onPointerLeave
    }
  };
}
