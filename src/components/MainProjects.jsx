"use client";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const MainProjects = () => {
  let tex = useTexture("./img.png");
  let cly = useRef(null);
  useFrame((state, delta) => {
    cly.current.rotation.y += delta;
  });
  return (
    <mesh rotation={[-0.1, -0.1, 0.2]} ref={cly}>
      <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
      <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

export default MainProjects;
