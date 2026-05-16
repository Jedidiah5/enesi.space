"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { CharacterModel } from "./CharacterModel";
import { MODEL_PATHS, type CharacterPose } from "./model-paths";

type SceneContentProps = {
  pose: CharacterPose;
};

function SceneContent({ pose }: SceneContentProps) {
  const rig = useRef<Group>(null);

  useFrame((state) => {
    if (!rig.current) return;
    const { x, y } = state.pointer;
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, x * 0.4, 0.06);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -y * 0.1, 0.06);
  });

  return (
    <>
      <group ref={rig}>
        <CharacterModel key={pose} url={MODEL_PATHS[pose]} autoRotate={pose === "idle"} />
      </group>
      <ContactShadows position={[0, -0.85, 0]} opacity={0.4} scale={9} blur={2.8} far={4} />
    </>
  );
}

type Props = {
  pose: CharacterPose;
  className?: string;
};

export function HeroCharacterScene({ pose, className }: Props) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0.35, 3.35], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 4]} intensity={1.15} />
      <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#94a3b8" />
      <pointLight position={[-2.5, 1.5, 2]} intensity={0.55} color="#c45c3e" />
      <Suspense fallback={null}>
        <SceneContent pose={pose} />
      </Suspense>
    </Canvas>
  );
}
