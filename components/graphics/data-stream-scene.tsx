"use client";

import { Float, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function RackUnit({
  position,
  accent
}: {
  position: [number, number, number];
  accent: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.85, 0.36, 0.7]} />
        <meshPhysicalMaterial
          color="#081120"
          emissive={accent}
          emissiveIntensity={0.28}
          roughness={0.24}
          metalness={0.66}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh position={[0, 0, 0.36]}>
        <planeGeometry args={[1.54, 0.14]} />
        <meshBasicMaterial color={accent} transparent opacity={0.65} />
      </mesh>
      <mesh position={[-0.72, 0, 0.37]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#B6FBFF" />
      </mesh>
      <mesh position={[0.72, 0, 0.37]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#FF8BC4" />
      </mesh>
    </group>
  );
}

function FlowingData() {
  const lineRef = useRef<THREE.Group | null>(null);
  const ribbonA = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => {
        const x = -2.4 + index * 0.2;
        return [x, Math.sin(index * 0.34) * 0.26 + 0.9, Math.cos(index * 0.28) * 0.2] as [
          number,
          number,
          number
        ];
      }),
    []
  );
  const ribbonB = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => {
        const x = -2.3 + index * 0.19;
        return [x, Math.cos(index * 0.32) * 0.24 - 1.05, Math.sin(index * 0.25) * 0.24] as [
          number,
          number,
          number
        ];
      }),
    []
  );

  useFrame((state) => {
    const group = lineRef.current;
    if (!group) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    group.rotation.y = Math.sin(elapsed * 0.32) * 0.16;
    group.rotation.x = Math.cos(elapsed * 0.2) * 0.05;
  });

  return (
    <group ref={lineRef}>
      <Line points={ribbonA} color="#00E5FF" transparent opacity={0.7} lineWidth={1.4} />
      <Line points={ribbonB} color="#FF007F" transparent opacity={0.56} lineWidth={1.2} />
      <Sparkles
        count={70}
        color="#9C27B0"
        scale={[4.2, 3.2, 3]}
        size={2.1}
        speed={0.28}
        noise={0.7}
        opacity={0.42}
      />
    </group>
  );
}

function RackSceneContents() {
  const groupRef = useRef<THREE.Group | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    group.rotation.y = Math.sin(elapsed * 0.28) * 0.18;
    group.position.y = reduceMotion ? 0 : Math.sin(elapsed * 0.82) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={12} distance={16} color="#00E5FF" />
      <pointLight position={[-3, -2, 4]} intensity={10} distance={16} color="#FF007F" />
      <pointLight position={[0, 2, 2]} intensity={6} distance={10} color="#9C27B0" />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />

      <group ref={groupRef}>
        <Float speed={1.5} floatIntensity={0.24} rotationIntensity={0.1}>
          <mesh position={[0, 0, -0.22]}>
            <boxGeometry args={[2.4, 4.1, 1]} />
            <meshPhysicalMaterial
              color="#09111E"
              emissive="#00E5FF"
              emissiveIntensity={0.12}
              roughness={0.2}
              metalness={0.72}
              transparent
              opacity={0.2}
            />
          </mesh>

          <Line
            points={[
              [-1.2, -2, 0.52],
              [-1.2, 2, 0.52],
              [1.2, 2, 0.52],
              [1.2, -2, 0.52],
              [-1.2, -2, 0.52]
            ]}
            color="#00E5FF"
            transparent
            opacity={0.34}
            lineWidth={1.2}
          />

          {[-1.32, -0.84, -0.36, 0.12, 0.6, 1.08, 1.56].map((y, index) => (
            <RackUnit
              key={y}
              position={[0, y, 0]}
              accent={index % 2 === 0 ? "#00E5FF" : "#FF007F"}
            />
          ))}
        </Float>

        <FlowingData />
      </group>
    </>
  );
}

export function DataStreamScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.4], fov: 34 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <RackSceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
