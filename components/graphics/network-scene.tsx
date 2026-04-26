"use client";

import {
  Float,
  Line,
  PerspectiveCamera,
  Sparkles
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { NetworkSceneFallback } from "@/components/graphics/network-scene-fallback";
import { shouldPreferStaticExperience } from "@/lib/browser-capabilities";

type NetworkSceneProps = {
  pointerX?: number;
  pointerY?: number;
  backgroundReveal?: number;
  logoReveal?: number;
  logoGlowBoost?: number;
};

type SharedMotionProps = {
  pointerX: number;
  pointerY: number;
  reduceMotion: boolean;
};

type EnergyCoreRigProps = SharedMotionProps & {
  logoReveal: number;
  glowBoost: number;
};

type SceneContentsProps = SharedMotionProps & {
  backgroundReveal: number;
  logoReveal: number;
  logoGlowBoost: number;
};

const cyan = new THREE.Color("#00E5FF");
const magenta = new THREE.Color("#FF007F");
const violet = new THREE.Color("#9C27B0");

function circlePoints(radius: number, count: number, y = 0, skew = 1) {
  return Array.from({ length: count + 1 }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      y + Math.sin(angle * 1.1) * 0.06,
      Math.sin(angle) * radius * skew
    ] as [number, number, number];
  });
}

function buildOrbitalParticles(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const spread = radius * (0.56 + Math.random() * 0.54);

    positions[index * 3] = Math.sin(phi) * Math.cos(theta) * spread;
    positions[index * 3 + 1] = Math.sin(phi) * Math.sin(theta) * spread;
    positions[index * 3 + 2] = Math.cos(phi) * spread;
  }

  return positions;
}

function ParticleNebula({ pointerX, pointerY, reduceMotion }: SharedMotionProps) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const elapsed = state.clock.elapsedTime;

    group.position.x = THREE.MathUtils.lerp(group.position.x, pointerX * 0.45, 0.03);
    group.position.y = THREE.MathUtils.lerp(group.position.y, pointerY * 0.24, 0.03);

    if (!reduceMotion) {
      group.rotation.y = Math.sin(elapsed * 0.16) * 0.18;
      group.rotation.x = Math.cos(elapsed * 0.14) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Sparkles
        count={160}
        color="#00E5FF"
        opacity={0.72}
        scale={[12, 7, 7]}
        size={2.8}
        speed={reduceMotion ? 0.02 : 0.18}
        noise={reduceMotion ? 0.15 : 0.7}
      />
      <Sparkles
        count={120}
        color="#FF007F"
        opacity={0.42}
        scale={[11, 6, 6]}
        size={2.2}
        speed={reduceMotion ? 0.02 : 0.12}
        noise={reduceMotion ? 0.12 : 0.55}
      />
      <Sparkles
        count={90}
        color="#9C27B0"
        opacity={0.28}
        scale={[9, 5, 5]}
        size={2.6}
        speed={reduceMotion ? 0.01 : 0.1}
        noise={reduceMotion ? 0.1 : 0.4}
      />
    </group>
  );
}

function Cityscape({ pointerX, pointerY, reduceMotion }: SharedMotionProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const skyline = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const x = -5 + index * 0.58;
        const height = 0.45 + ((index * 7) % 5) * 0.32;
        return { x, height };
      }),
    []
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    group.position.x = THREE.MathUtils.lerp(group.position.x, pointerX * 0.18, 0.04);
    group.position.y = THREE.MathUtils.lerp(group.position.y, -2.6 + pointerY * 0.08, 0.04);

    if (!reduceMotion) {
      group.rotation.y = Math.sin(elapsed * 0.11) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.6, -2.5]}>
      <Line
        points={[
          [-5.8, 0, 0],
          [5.8, 0, 0]
        ]}
        color="#00E5FF"
        transparent
        opacity={0.26}
        lineWidth={1}
      />
      {skyline.map((building) => (
        <group key={building.x} position={[building.x, 0, 0]}>
          <Line
            points={[
              [0, 0, 0],
              [0, building.height, 0]
            ]}
            color={building.height > 1.2 ? "#FF007F" : "#00E5FF"}
            transparent
            opacity={0.24}
            lineWidth={1}
          />
          <Line
            points={[
              [-0.09, building.height, 0],
              [0.09, building.height, 0]
            ]}
            color="#9C27B0"
            transparent
            opacity={0.22}
            lineWidth={1}
          />
        </group>
      ))}
    </group>
  );
}

function CircuitBoard({
  position,
  rotation,
  accent
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  accent: string;
}) {
  const traces = useMemo(
    () => [
      [
        [-1.15, 0.45, 0.02],
        [-0.35, 0.45, 0.02],
        [-0.35, 0.1, 0.02],
        [0.55, 0.1, 0.02]
      ],
      [
        [-0.8, -0.2, 0.02],
        [0, -0.2, 0.02],
        [0, 0.55, 0.02],
        [0.95, 0.55, 0.02]
      ],
      [
        [-1.05, -0.55, 0.02],
        [-0.45, -0.55, 0.02],
        [-0.45, -0.78, 0.02],
        [0.7, -0.78, 0.02]
      ]
    ],
    []
  );

  const nodes = useMemo(
    () => [
      [-0.35, 0.1, 0.05],
      [0.55, 0.1, 0.05],
      [0, 0.55, 0.05],
      [-0.45, -0.55, 0.05],
      [0.7, -0.78, 0.05]
    ],
    []
  );

  return (
    <Float speed={1.8} floatIntensity={0.2} rotationIntensity={0.08}>
      <group position={position} rotation={rotation}>
        <mesh>
          <planeGeometry args={[2.9, 2.05]} />
          <meshPhysicalMaterial
            color="#091223"
            emissive={accent}
            emissiveIntensity={0.24}
            metalness={0.5}
            roughness={0.18}
            transparent
            opacity={0.24}
          />
        </mesh>

        {traces.map((trace, index) => (
          <Line
            key={index}
            points={trace as [number, number, number][]}
            color={accent}
            transparent
            opacity={0.72}
            lineWidth={1.2}
          />
        ))}

        {nodes.map((node, index) => (
          <mesh key={index} position={node as [number, number, number]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={accent} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function EnergyCoreRig({
  pointerX,
  pointerY,
  reduceMotion,
  logoReveal,
  glowBoost
}: EnergyCoreRigProps) {
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const particleShellRef = useRef<THREE.Points | null>(null);
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const shellMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const wireMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const pulseMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const haloRef = useRef<THREE.Mesh | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);
  const particlePositions = useMemo(() => buildOrbitalParticles(520, 1.62), []);

  const orbitOne = useMemo(() => circlePoints(2.35, 90, 0, 0.74), []);
  const orbitTwo = useMemo(() => circlePoints(2.7, 90, 0.08, 0.58), []);
  const orbitThree = useMemo(() => circlePoints(2.1, 80, -0.08, 0.86), []);

  useFrame((state) => {
    const coreGroup = coreGroupRef.current;
    const particleShell = particleShellRef.current;
    const particleMaterial = particleMaterialRef.current;
    const shellMaterial = shellMaterialRef.current;
    const wireMaterial = wireMaterialRef.current;
    const pulseMaterial = pulseMaterialRef.current;
    const halo = haloRef.current;
    const innerCore = innerCoreRef.current;
    const orb = orbRef.current;
    const rings = ringRef.current;

    if (
      !coreGroup ||
      !particleShell ||
      !particleMaterial ||
      !shellMaterial ||
      !wireMaterial ||
      !pulseMaterial ||
      !halo ||
      !innerCore ||
      !orb ||
      !rings
    ) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const reveal = THREE.MathUtils.clamp(logoReveal, 0, 1);
    const pulse = 0.5 + Math.sin(elapsed * 2.6) * 0.5;

    coreGroup.scale.setScalar(0.001 + reveal);
    coreGroup.position.x = THREE.MathUtils.lerp(coreGroup.position.x, pointerX * 0.22, 0.05);
    coreGroup.position.y = THREE.MathUtils.lerp(
      coreGroup.position.y,
      pointerY * 0.14 + (reduceMotion ? 0 : Math.sin(elapsed * 1.2) * 0.08),
      0.05
    );
    coreGroup.rotation.y = THREE.MathUtils.lerp(
      coreGroup.rotation.y,
      pointerX * 0.18 + (reduceMotion ? 0.14 : elapsed * 0.28),
      0.04
    );
    coreGroup.rotation.x = THREE.MathUtils.lerp(
      coreGroup.rotation.x,
      pointerY * 0.08 + (reduceMotion ? 0 : Math.cos(elapsed * 0.52) * 0.05),
      0.05
    );

    particleMaterial.opacity = 0.2 + (1 - reveal) * 0.46 + glowBoost * 0.08;
    particleMaterial.size = reduceMotion ? 0.06 : 0.06 + pulse * 0.02;
    particleShell.rotation.y -= reduceMotion ? 0.001 : 0.01;
    particleShell.rotation.x = Math.sin(elapsed * 0.72) * 0.24;

    shellMaterial.emissive.copy(cyan).lerp(magenta, 0.22 + pulse * 0.3);
    shellMaterial.emissiveIntensity =
      0.94 + glowBoost * 0.82 + pulse * (0.22 + glowBoost * 0.42);
    shellMaterial.color.copy(cyan).lerp(violet, 0.18 + pulse * 0.28);
    shellMaterial.opacity = 0.82 + pulse * 0.08;

    wireMaterial.color.copy(cyan).lerp(magenta, 0.32 + pulse * 0.32);
    wireMaterial.opacity = 0.18 + glowBoost * 0.12 + pulse * 0.14;

    pulseMaterial.color.copy(cyan).lerp(magenta, pulse * 0.62);
    pulseMaterial.opacity = 0.1 + glowBoost * 0.12 + pulse * 0.12;

    halo.scale.setScalar(1.58 + pulse * 0.08);
    innerCore.scale.setScalar(1 + pulse * 0.14);
    rings.rotation.y += reduceMotion ? 0.002 : 0.014;
    rings.rotation.x = Math.sin(elapsed * 0.5) * 0.12;
    rings.rotation.z = Math.cos(elapsed * 0.34) * 0.1;

    const orbRadius = 2.55;
    orb.position.set(
      Math.cos(elapsed * 1.45) * orbRadius,
      Math.sin(elapsed * 1.85) * 0.35,
      Math.sin(elapsed * 1.45) * orbRadius * 0.6
    );
  });

  return (
    <Float speed={1.6} floatIntensity={0.22} rotationIntensity={0.06}>
      <group ref={coreGroupRef}>
        <points ref={particleShellRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={particleMaterialRef}
            color="#B8FBFF"
            size={0.06}
            transparent
            opacity={0.92}
            depthWrite={false}
          />
        </points>

        <mesh ref={haloRef} scale={[1.58, 1.58, 1.58]}>
          <sphereGeometry args={[1.12, 42, 42]} />
          <meshBasicMaterial ref={pulseMaterialRef} color="#9C27B0" transparent opacity={0.18} />
        </mesh>

        <mesh>
          <icosahedronGeometry args={[1.12, 4]} />
          <meshPhysicalMaterial
            ref={shellMaterialRef}
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.4}
            metalness={0.54}
            roughness={0.14}
            clearcoat={1}
            clearcoatRoughness={0.12}
            transparent
            opacity={0.88}
          />
        </mesh>

        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[0.56, 40, 40]} />
          <meshBasicMaterial color="#D9FBFF" transparent opacity={0.72} />
        </mesh>

        <mesh scale={[1.34, 1.34, 1.34]}>
          <icosahedronGeometry args={[1.04, 1]} />
          <meshBasicMaterial
            ref={wireMaterialRef}
            color="#00E5FF"
            transparent
            opacity={0.28}
            wireframe
          />
        </mesh>

        <group ref={ringRef} scale={[1.02, 1.02, 1.02]}>
          <Line
            points={orbitOne}
            color="#00E5FF"
            transparent
            opacity={0.42}
            lineWidth={1.1}
          />
          <Line
            points={orbitTwo}
            color="#FF007F"
            transparent
            opacity={0.3}
            lineWidth={1}
          />
          <Line
            points={orbitThree}
            color="#9C27B0"
            transparent
            opacity={0.24}
            lineWidth={0.9}
            rotation={[Math.PI / 2.65, 0, Math.PI / 6]}
          />
          <mesh ref={orbRef}>
            <sphereGeometry args={[0.08, 20, 20]} />
            <meshBasicMaterial color="#B8FBFF" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function SceneContents({
  pointerX,
  pointerY,
  reduceMotion,
  backgroundReveal,
  logoReveal,
  logoGlowBoost
}: SceneContentsProps) {
  return (
    <>
      <PerspectiveCamera makeDefault fov={35} position={[0, 0, 9]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[2.8, 2, 4]} intensity={18} distance={18} color="#00E5FF" />
      <pointLight position={[-3.2, -1.2, 4]} intensity={14} distance={18} color="#FF007F" />
      <pointLight position={[0, -3.5, 3]} intensity={8} distance={16} color="#9C27B0" />

      <group scale={0.8 + backgroundReveal * 0.2}>
        <ParticleNebula pointerX={pointerX} pointerY={pointerY} reduceMotion={reduceMotion} />
        <Cityscape pointerX={pointerX} pointerY={pointerY} reduceMotion={reduceMotion} />
        <CircuitBoard
          position={[-3.2, 1.3, -1.6]}
          rotation={[0.18, 0.58, -0.14]}
          accent="#00E5FF"
        />
        <CircuitBoard
          position={[3.25, -0.2, -1.8]}
          rotation={[-0.24, -0.64, 0.14]}
          accent="#FF007F"
        />
        <CircuitBoard
          position={[0, -1.45, -2.2]}
          rotation={[-0.82, 0, 0]}
          accent="#9C27B0"
        />
      </group>

      <EnergyCoreRig
        pointerX={pointerX}
        pointerY={pointerY}
        reduceMotion={reduceMotion}
        logoReveal={logoReveal}
        glowBoost={logoGlowBoost}
      />
    </>
  );
}

export function NetworkScene({
  pointerX = 0,
  pointerY = 0,
  backgroundReveal = 1,
  logoReveal = 1,
  logoGlowBoost = 1
}: NetworkSceneProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [canRenderCanvas, setCanRenderCanvas] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setCanRenderCanvas(false);
      return;
    }

    try {
      setCanRenderCanvas(!shouldPreferStaticExperience());
    } catch {
      setCanRenderCanvas(false);
    }
  }, []);

  if (!canRenderCanvas) {
    return (
      <NetworkSceneFallback
        backgroundReveal={backgroundReveal}
        logoReveal={logoReveal}
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContents
            pointerX={pointerX}
            pointerY={pointerY}
            reduceMotion={reduceMotion}
            backgroundReveal={backgroundReveal}
            logoReveal={logoReveal}
            logoGlowBoost={logoGlowBoost}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
