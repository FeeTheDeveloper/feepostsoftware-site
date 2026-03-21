"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  isIOS,
  isMobileSafari,
  isTouchDevice,
  supportsWebGL
} from "@/lib/browser-capabilities";
import { SiteBackgroundFallback } from "@/components/graphics/site-background-fallback";

type Pointer = {
  x: number;
  y: number;
};

type SceneProps = {
  pointer: Pointer;
  reduceMotion: boolean;
};

type ParticleData = {
  base: THREE.Vector3;
  drift: THREE.Vector3;
  scale: number;
  phase: number;
  influence: number;
  color: THREE.Color;
};

type StreakData = {
  startX: number;
  startY: number;
  z: number;
  speed: number;
  width: number;
  tilt: number;
  color: THREE.Color;
  phase: number;
};

type WireNode = {
  position: [number, number, number];
  scale: number;
};

function CameraRig({ pointer, reduceMotion }: SceneProps) {
  const { camera } = useThree();

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const driftZ = reduceMotion ? 0 : Math.sin(elapsed * 0.12) * 0.45;
    const driftY = reduceMotion ? 0 : Math.cos(elapsed * 0.18) * 0.18;
    const driftX = reduceMotion ? 0 : Math.sin(elapsed * 0.08) * 0.22;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.9 + driftX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      1.8 + pointer.y * 0.45 + driftY,
      0.03
    );
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 17.4 - driftZ, 0.025);
    camera.lookAt(pointer.x * 0.35, -1.2 + pointer.y * 0.16, -4);
  });

  return null;
}

function DepthFog() {
  return <fog attach="fog" args={["#11061c", 8, 42]} />;
}

function GridFloor({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);

  const positions = useMemo(() => {
    const size = 68;
    const divisions = 38;
    const step = size / divisions;
    const half = size / 2;
    const lines: number[] = [];

    for (let index = 0; index <= divisions; index += 1) {
      const offset = -half + index * step;
      lines.push(-half, 0, offset, half, 0, offset);
      lines.push(offset, 0, -half, offset, 0, half);
    }

    return new Float32Array(lines);
  }, []);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    group.position.z = reduceMotion ? -4 : ((elapsed * 0.9) % 4) - 6;
  });

  return (
    <group ref={groupRef} position={[0, -6.8, -4]} rotation={[-Math.PI / 2, 0, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00E5FF" transparent opacity={0.12} />
      </lineSegments>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[72, 72]} />
        <meshBasicMaterial color="#34105B" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function InstancedParticles({ pointer, reduceMotion }: SceneProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<ParticleData[]>(() => {
    const count = reduceMotion ? 520 : 1600;

    return Array.from({ length: count }, (_, index) => ({
      base: new THREE.Vector3(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 30
      ),
      drift: new THREE.Vector3(
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.06,
        0.02 + Math.random() * 0.08
      ),
      scale: 0.02 + Math.random() * 0.05,
      phase: index * 0.37,
      influence: 0.15 + Math.random() * 0.45,
      color:
        index % 3 === 0
          ? new THREE.Color("#00E5FF")
          : index % 3 === 1
            ? new THREE.Color("#FF007F")
            : new THREE.Color("#9C27B0")
    }));
  }, [reduceMotion]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    particles.forEach((particle, index) => {
      mesh.setColorAt(index, particle.color);
    });

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [particles]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const elapsed = state.clock.elapsedTime;

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      const pulse = Math.sin(elapsed * 0.8 + particle.phase);

      dummy.position.set(
        particle.base.x + particle.drift.x * elapsed + pointer.x * particle.influence,
        particle.base.y +
          Math.sin(elapsed * 0.4 + particle.phase) * 0.24 +
          pointer.y * particle.influence * 0.45,
        ((particle.base.z + particle.drift.z * elapsed + 32) % 32) - 16
      );
      dummy.scale.setScalar(particle.scale + pulse * 0.008);
      dummy.rotation.set(elapsed * 0.08, elapsed * 0.12 + particle.phase, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial transparent opacity={0.78} toneMapped={false} vertexColors />
    </instancedMesh>
  );
}

function LightStreaks({ pointer, reduceMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const streaks = useMemo<StreakData[]>(
    () =>
      Array.from({ length: reduceMotion ? 5 : 10 }, (_, index) => ({
        startX: -20 - Math.random() * 8,
        startY: -3.8 + Math.random() * 8.5,
        z: -10 - Math.random() * 14,
        speed: 2 + Math.random() * 2.2,
        width: 1.8 + Math.random() * 2.4,
        tilt: -0.52 + Math.random() * 0.24,
        color:
          index % 2 === 0 ? new THREE.Color("#00E5FF") : new THREE.Color("#FF007F"),
        phase: Math.random() * Math.PI * 2
      })),
    [reduceMotion]
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    group.position.x = THREE.MathUtils.lerp(group.position.x, pointer.x * 0.32, 0.03);
    group.position.y = THREE.MathUtils.lerp(group.position.y, pointer.y * 0.18, 0.03);

    group.children.forEach((child, index) => {
      const streak = streaks[index];
      const movement = ((elapsed * streak.speed + streak.phase) % 28) - 14;
      child.position.x = streak.startX + movement * 1.9;
      child.position.y = streak.startY + movement * 0.22;
    });
  });

  return (
    <group ref={groupRef}>
      {streaks.map((streak, index) => (
        <mesh
          key={index}
          position={[streak.startX, streak.startY, streak.z]}
          rotation={[0, 0, streak.tilt]}
        >
          <planeGeometry args={[streak.width, 0.05]} />
          <meshBasicMaterial color={streak.color} transparent opacity={0.32} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function WireStructures({ pointer, reduceMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const structures = useMemo(
    () => [
      { position: [-7, -1.4, -8], scale: [1.8, 1.8, 1.8], color: "#00E5FF" },
      { position: [6.5, 2.4, -11], scale: [1.2, 1.2, 1.2], color: "#9C27B0" },
      { position: [2.8, -2.6, -6], scale: [1.45, 1.45, 1.45], color: "#FF007F" },
      { position: [-2.8, 2.8, -13], scale: [2.1, 2.1, 2.1], color: "#00E5FF" }
    ],
    []
  );
  const wireNodes = useMemo<WireNode[]>(
    () => [
      { position: [-4.8, 1.2, -8], scale: 0.09 },
      { position: [-2.6, 2.4, -10], scale: 0.08 },
      { position: [0.5, 1.1, -12], scale: 0.07 },
      { position: [3.8, 2.2, -11], scale: 0.08 },
      { position: [5.6, -0.6, -9], scale: 0.09 },
      { position: [1.8, -1.7, -7], scale: 0.08 }
    ],
    []
  );
  const linePositions = useMemo(
    () =>
      new Float32Array(
        [
          [-4.8, 1.2, -8, -2.6, 2.4, -10],
          [-2.6, 2.4, -10, 0.5, 1.1, -12],
          [0.5, 1.1, -12, 3.8, 2.2, -11],
          [3.8, 2.2, -11, 5.6, -0.6, -9],
          [5.6, -0.6, -9, 1.8, -1.7, -7]
        ].flat()
      ),
    []
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      pointer.x * 0.12 + (reduceMotion ? 0 : Math.sin(elapsed * 0.16) * 0.06),
      0.03
    );
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.05, 0.03);
  });

  return (
    <group ref={groupRef}>
      {structures.map((structure, index) => (
        <mesh
          key={index}
          position={structure.position as [number, number, number]}
          scale={structure.scale as [number, number, number]}
          rotation={[index * 0.3, index * 0.4, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={structure.color}
            wireframe
            transparent
            opacity={0.12}
            toneMapped={false}
          />
        </mesh>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00E5FF" transparent opacity={0.22} />
      </lineSegments>

      {wireNodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[node.scale, 10, 10]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#00E5FF" : "#FF007F"}
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContents({ pointer, reduceMotion }: SceneProps) {
  return (
    <>
      <color attach="background" args={["#020108"]} />
      <DepthFog />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 5, 8]} intensity={18} color="#00E5FF" distance={30} />
      <pointLight position={[-5, 1, 6]} intensity={12} color="#9C27B0" distance={28} />
      <pointLight position={[0, -4, 10]} intensity={8} color="#FF007F" distance={24} />

      <CameraRig pointer={pointer} reduceMotion={reduceMotion} />
      <GridFloor reduceMotion={reduceMotion} />
      <InstancedParticles pointer={pointer} reduceMotion={reduceMotion} />
      <LightStreaks pointer={pointer} reduceMotion={reduceMotion} />
      <WireStructures pointer={pointer} reduceMotion={reduceMotion} />
    </>
  );
}

export function SiteBackground() {
  const reduceMotion = useReducedMotion() ?? false;
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });
  const [canRenderCanvas, setCanRenderCanvas] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setCanRenderCanvas(false);
      return;
    }

    try {
      const shouldUseFallback =
        isTouchDevice() || isIOS() || isMobileSafari() || !supportsWebGL();
      setCanRenderCanvas(!shouldUseFallback);
    } catch {
      setCanRenderCanvas(false);
    }
  }, []);

  useEffect(() => {
    if (!canRenderCanvas || reduceMotion || typeof window === "undefined") {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * -2
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [canRenderCanvas, reduceMotion]);

  if (!canRenderCanvas) {
    return <SiteBackgroundFallback />;
  }

  return (
    <div className="site-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.8, 17.4], fov: 46, near: 0.1, far: 80 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContents pointer={pointer} reduceMotion={reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
