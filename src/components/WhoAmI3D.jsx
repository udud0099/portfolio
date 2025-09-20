"use client";

import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";

export default function WhoAmI3D({ text }) {
  const textRef = useRef();

  // Default small 3D twist
  const defaultRotation = { x: -0.15, y: 0.6, z: 0.04 };

  const handleHover = () => {
    gsap.to(textRef.current.rotation, {
      x: defaultRotation.x + 0.15,
      y: defaultRotation.y + 0.2,
      z: defaultRotation.z,
      duration: 0.5,
    });
    gsap.to(textRef.current.position, { y: 0.2, duration: 0.5 });
    gsap.to(textRef.current.scale, { x: 1.1, y: 1.05, z: 1.5, duration: 0.5 });

    // Change text + outline on hover
    textRef.current.color = "#140036"; // pure white
    textRef.current.outlineWidth = 0.05; // red border
    textRef.current.outlineColor = "#fff";
  };

  const handleHoverOut = () => {
    gsap.to(textRef.current.rotation, {
      x: defaultRotation.x,
      y: defaultRotation.y,
      z: defaultRotation.z,
      duration: 0.5,
    });
    gsap.to(textRef.current.position, { y: 0, duration: 0.5 });
    gsap.to(textRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 });

    // Reset text + outline
    textRef.current.color = "#fff"; // red text
    textRef.current.outlineWidth = 0;
  };

  return (
    <div className="w-full   cursor-pointer  ">
      <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
        <Text
          ref={textRef}
          fontSize={1.5}
          fontWeight={800}
          color="#fff"
          outlineWidth={0}
          outlineColor="#ff0000"
          bevelEnabled
          bevelThickness={0.5}
          bevelSize={0.3}
          rotation={[defaultRotation.x, defaultRotation.y, defaultRotation.z]}
          anchorX="center"
          anchorY="middle"
          materialType="MeshBasicMaterial" // flat colors, no lights needed
          onPointerOver={handleHover}
          onPointerOut={handleHoverOut}
        >
           {text} 
        </Text>
      </Canvas>
    </div>
  );
}
