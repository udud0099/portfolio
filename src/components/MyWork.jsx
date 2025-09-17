"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from 'three'
import MainProjects from "./MainProjects";
import Marquee from "./Marquee";

const MyWork = () => {
  return (
    <>
      <div className="w-full h-screen bg-black overflow-hidden">
        <Canvas camera={{fov:20}}>
            <OrbitControls enableZoom={false} enablePan={false}/>
            <ambientLight />
          <MainProjects />
        </Canvas>
      </div>
        <Marquee />
    </>
  );
};

export default MyWork;
