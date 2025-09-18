// components/Arrow3D.js
"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

export default function Arrow3D({ onClick, scale = 1.5 }) {
  const groupRef = useRef();
  const floatRef = useRef({ y: 0 });

  const gltf = useGLTF("/untitled.gltf"); // from public folder

  // Floating animation
  useEffect(() => {
    gsap.to(floatRef.current, {
      y: 0.5,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut",
    });
  }, []);

  // Rotate + float
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    //   groupRef.current.rotation.x += 0.005;
      groupRef.current.position.y = floatRef.current.y;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      onClick={onClick}
      dispose={null}
      castShadow
      receiveShadow
    >
      <primitive object={gltf.scene} />
    </group>
  );
}
