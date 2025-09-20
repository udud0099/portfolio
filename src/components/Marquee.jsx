"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

const Marquee = () => {
    useEffect(() => {
        const handleWheel = (e) => {
          if (e.deltaY > 0) {
            // Scroll down → move left
            gsap.to(".marque", {
              x: "-240%",
              duration: 4,
              repeat: -1,
              ease: "back.out(1.7)",
            });
            gsap.to("#page2 #move img", { rotate: 180 });
          } else {
            // Scroll up → move back
            gsap.to(".marque", {
              x: "0%",
              duration: 4,
              repeat: -1,
              ease: "back.out(1.7)",
            });
            gsap.to("#page2 #move img", { rotate: 0 });
          }
        };
    
        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
      }, []);

  return (
    <div id="page2" className="h-[100px] flex items-center justify-center bg-yellow-900 text-white">
      <div id="move" className="flex gap-8   overflow-hidden">
        {Array(11)
          .fill("View More")
          .map((text, i) => (
            <div key={i} className="marque flex items-center gap-8 text-4xl font-bold">
                <Link href={`https://dribbble.com/Ujjjwal_D`} target="_blank">
              <h1 className="whitespace-nowrap">{text}</h1>
                </Link>
              <img src="/arrow-br.svg" alt="arrow" className="w-8 h-8 mr-8" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
