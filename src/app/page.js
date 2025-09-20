"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import Navbar from "@/components/Navbar";
import MyWork from "@/components/MyWork";
import StringEffect from "@/components/StringEffect";
import ImageFlag from "@/components/imgEff/WavyImage";
import Arrow3D from "@/components/Arrow3D";
import { useEffect, useRef, useState } from "react"; 
import CustomCursor from "@/components/CustomCursor"; 
import WhoAmI3D from "@/components/WhoAmI3D";

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
    <div className="bg-[#020024]">

     <CustomCursor /> {/* custom cursor active globally */}
      <Navbar />
      {/* <WhoAmI3D text="WhoAmI"/> */}
      
      <div className="w-full h-screen bg-[#0d1828]"></div>
      <MyWork />
      <div className="w-full h-screen bg-gray-900"></div>
      <StringEffect />
      <div className="w-full h-screen bg-gray-900"></div>
      <ImageFlag />
      <div className="w-full h-screen bg-gray-900"></div>

      {/* 3D Go To Top Button */}
      {showBtn && (
        <div className="fixed bottom-10 right-10 w-28 h-28 z-50 cursor-pointer">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }}>
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <Suspense fallback={null}>
              <Arrow3D onClick={scrollTop} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      )}
      </div>
    </>
  );
}
