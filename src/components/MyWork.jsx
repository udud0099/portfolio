"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from 'three'
import MainProjects from "./MainProjects";

const MyWork = () => {
  return (
    <>
      <div className="w-full h-screen bg-black">
        <Canvas camera={{fov:20}}>
            <OrbitControls enableZoom={false} enablePan={false}/>
            <ambientLight />
          <MainProjects />
        </Canvas>
      </div>
    </>
  );
};

export default MyWork;
