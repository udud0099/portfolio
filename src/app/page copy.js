"use client";

import ImageFlag from "@/components/imgEff/WavyImage"; 
import MyWork from "@/components/MyWork";
import Navbar from "@/components/Navbar";
import StringEffect from "@/components/StringEffect";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

// 3D Arrow Component using Three.js as placeholder
function Arrow3D({ onClick }) {
  const groupRef = useRef();
  const floatRef = useRef({ y: 0 });

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

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x += 0.005;
      groupRef.current.position.y = floatRef.current.y;
    }
  });

  return (
    <group ref={groupRef} onClick={onClick} scale={2}>
      {/* Shaft */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 32]} />
        <meshStandardMaterial color="#ff0080" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Arrow Head */}
      <mesh position={[0, 0.7, 0]}>
        <coneGeometry args={[0.2, 0.4, 32]} />
        <meshStandardMaterial color="#ff0080" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Base for depth */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial color="#ff0080" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Home() {
  const lenisRef = useRef(null);
  const [showBtn, setShowBtn] = useState(false);

  // Lenis setup
  useEffect(() => {
    import("@studio-freight/lenis").then((module) => {
      const Lenis = module.default;
      const lenis = new Lenis({ duration: 1.2, smooth: true });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    });
  }, []);

  // Show button after scroll
  useEffect(() => {
    const handleScroll = () => setShowBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0);
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-900"></div>
      <MyWork />
      <div className="w-full h-screen bg-gray-900"></div>
      <StringEffect />
      <div className="w-full h-screen bg-gray-900"></div>
      <ImageFlag /> 
      <div className="w-full h-screen bg-gray-900"></div>

      {/* 3D Up Arrow Go To Top Button */}
      {showBtn && (
        <div className="fixed bottom-10 right-10 w-28 h-28 z-50 cursor-pointer">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <Arrow3D onClick={scrollTop} />
          </Canvas>
        </div>
      )}
    </>
  );
}
