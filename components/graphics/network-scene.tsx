"use client";

import {
  Float,
  Line,
  PerspectiveCamera,
  Sparkles
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

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

type LogoRigProps = SharedMotionProps & {
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

function LogoRig({
  pointerX,
  pointerY,
  reduceMotion,
  logoReveal,
  glowBoost
}: LogoRigProps) {
  const svg = useLoader(SVGLoader, "/fs-mark.svg") as { paths: THREE.ShapePath[] };
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const particleLogoRef = useRef<THREE.Points | null>(null);
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const coreMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const haloMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);

  const logoGeometry = useMemo(() => {
    const shapes = svg.paths.flatMap((path) => path.toShapes(true));
    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 16,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 2.5,
      bevelThickness: 1.8
    });

    geometry.center();
    geometry.scale(0.016, -0.016, 0.016);
    geometry.computeVertexNormals();

    return geometry;
  }, [svg.paths]);

  const orbitOne = useMemo(() => circlePoints(2.35, 90, 0, 0.74), []);
  const orbitTwo = useMemo(() => circlePoints(2.7, 90, 0.08, 0.58), []);

  useFrame((state) => {
    const logoGroup = meshGroupRef.current;
    const particleLogo = particleLogoRef.current;
    const particleMaterial = particleMaterialRef.current;
    const coreMaterial = coreMaterialRef.current;
    const haloMaterial = haloMaterialRef.current;
    const orb = orbRef.current;
    const rings = ringRef.current;

    if (
      !logoGroup ||
      !particleLogo ||
      !particleMaterial ||
      !coreMaterial ||
      !haloMaterial ||
      !orb ||
      !rings
    ) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const reveal = THREE.MathUtils.clamp(logoReveal, 0, 1);
    const pulse = 0.5 + Math.sin(elapsed * 2.6) * 0.5;

    logoGroup.scale.setScalar(0.001 + reveal);
    logoGroup.position.x = THREE.MathUtils.lerp(logoGroup.position.x, pointerX * 0.22, 0.05);
    logoGroup.position.y = THREE.MathUtils.lerp(
      logoGroup.position.y,
      pointerY * 0.14 + (reduceMotion ? 0 : Math.sin(elapsed * 1.2) * 0.08),
      0.05
    );
    logoGroup.rotation.y = THREE.MathUtils.lerp(
      logoGroup.rotation.y,
      pointerX * 0.22 + (reduceMotion ? 0.18 : elapsed * 0.36),
      0.04
    );
    logoGroup.rotation.x = THREE.MathUtils.lerp(
      logoGroup.rotation.x,
      pointerY * 0.08,
      0.05
    );

    particleMaterial.opacity = 0.95 - reveal * 0.82;
    particleLogo.scale.setScalar(1.14 - reveal * 0.14);

    coreMaterial.emissive.copy(cyan).lerp(magenta, pulse * 0.55);
    coreMaterial.emissiveIntensity = 0.85 + glowBoost * 0.8 + pulse * (0.35 + glowBoost * 0.7);
    coreMaterial.color.copy(cyan).lerp(magenta, 0.28 + pulse * 0.22);

    haloMaterial.opacity = 0.12 + glowBoost * 0.16 + pulse * 0.16;
    rings.rotation.y += reduceMotion ? 0.002 : 0.014;
    rings.rotation.x = Math.sin(elapsed * 0.5) * 0.12;

    const orbRadius = 2.55;
    orb.position.set(
      Math.cos(elapsed * 1.45) * orbRadius,
      Math.sin(elapsed * 1.85) * 0.35,
      Math.sin(elapsed * 1.45) * orbRadius * 0.6
    );
  });

  return (
    <Float speed={1.6} floatIntensity={0.22} rotationIntensity={0.06}>
      <group ref={meshGroupRef}>
        <points ref={particleLogoRef} geometry={logoGeometry}>
          <pointsMaterial
            ref={particleMaterialRef}
            color="#B8FBFF"
            size={0.075}
            transparent
            opacity={0.92}
            depthWrite={false}
          />
        </points>

        <mesh geometry={logoGeometry}>
          <meshPhysicalMaterial
            ref={coreMaterialRef}
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.4}
            metalness={0.82}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>

        <mesh geometry={logoGeometry} position={[0, 0, -0.18]} scale={[1.03, 1.03, 0.92]}>
          <meshBasicMaterial
            ref={haloMaterialRef}
            color="#9C27B0"
            transparent
            opacity={0.32}
          />
        </mesh>

        <group ref={ringRef}>
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

      <LogoRig
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

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 1.8]} gl={{ alpha: true, antialias: true }}>
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
