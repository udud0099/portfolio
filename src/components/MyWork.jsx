"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import MainProjects from "./MainProjects";
import Marquee from "./Marquee";
import gsap from "gsap";

const MyWork = () => {
  useEffect(() => {
    const workSection = document.getElementById("mywork");

    const cursorText = document.querySelector("#cursor-text");
    const cursorOuter = document.querySelector("#cursor-outer");

    workSection.addEventListener("mouseenter", () => {
      gsap.to(cursorText, { scale: 1, duration: 0.3 });
      gsap.to(cursorOuter, { scale: 2, duration: 0.3, ease: "power2.out" });
      cursorText.innerHTML = "View More";
    });

    workSection.addEventListener("mouseleave", () => {
      gsap.to(cursorText, { scale: 0, duration: 0.3 });
      gsap.to(cursorOuter, { scale: 1, duration: 0.3, ease: "power2.out" });
      cursorText.innerHTML = "";
    });
  }, []);

  return (
    <>
      <div id="mywork" className="w-full h-screen  bg-[#020024] overflow-hidden"  >
        <Canvas camera={{ fov: 20 }}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight />
          <MainProjects />
        </Canvas>
      </div>
      <Marquee />
    </>
  );
};

export default MyWork;
