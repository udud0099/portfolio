"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const MyWork = () => {
  return (
    <>
      <div className="w-full h-screen bg-black">
        <Canvas>
            <OrbitControls />
          <mesh>
            <boxGeometry />
            <meshBasicMaterial />
          </mesh>
        </Canvas>
      </div>
    </>
  );
};

export default MyWork;
