"use client";

import { Center, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  url: string;
  autoRotate?: boolean;
};

const TARGET_HEIGHT = 2.15;

export function CharacterModel({ url, autoRotate = false }: Props) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const model = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, group);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const scale = TARGET_HEIGHT / maxDim;
    model.scale.setScalar(scale);
    box.setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
  }, [model]);

  useEffect(() => {
    if (animations.length === 0) return;
    const clip = animations[0];
    const action = actions[clip.name];
    if (!action) return;
    action.reset().fadeIn(0.25).play();
    return () => {
      action.fadeOut(0.2);
    };
  }, [url, animations, actions]);

  useFrame((_, delta) => {
    if (!autoRotate || !group.current || animations.length > 0) return;
    group.current.rotation.y += delta * 0.4;
  });

  return (
    <Center>
      <group ref={group}>
        <primitive object={model} />
      </group>
    </Center>
  );
}

useGLTF.preload("/models/Afro_Geek_0516044824_texture.glb");
useGLTF.preload("/models/Meshy_AI_Animation_Walking_withSkin.glb");
useGLTF.preload("/models/Meshy_AI_Animation_Angry_Ground_Stomp_2_withSkin.glb");
