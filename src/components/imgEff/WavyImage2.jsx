"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HoverWaveImage() {
  const imgRef = useRef();
  const anim = useRef();

  useEffect(() => {
    const turb = document.querySelector("#wave feTurbulence");

    // function to start wave animation
    const startAnim = () => {
      anim.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to("#wave feDisplacementMap", {
          attr: { scale: 40 }, // stronger waves 
        duration: 2,
          ease: "sine.inOut",
        })
        .to(turb, {
          attr: { baseFrequency: "0.03 0.08" }, // animate turbulence
        delay:12,
        duration: 12,
          ease: "sine.inOut",
        }, 0); // run together
    };

    startAnim();

    const el = imgRef.current;

    const handleEnter = () => {
      anim.current.kill();
      gsap.to("#wave feDisplacementMap", {
        attr: { scale: 0 }, 
        duration: 4,
        ease: "power2.out",
      });
      gsap.to(turb, {
        attr: { baseFrequency: "0.01 0.02" }, // calm waves
        duration: 4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      startAnim();
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      anim.current?.kill();
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <img
        ref={imgRef}
        src="/2.jpg"
        alt="wave effect"
        className="w-[400px] rounded-xl"
        style={{ filter: "url(#wave)" }}
      />

      {/* SVG Filter */}
      <svg style={{ display: "none" }}>
        <filter id="wave">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02 0.001"
            numOctaves="2"
            seed="2"
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="35"
            xChannelSelector="R"
            yChannelSelector="A"
          />
        </filter>
      </svg>
    </div>
  );
}
