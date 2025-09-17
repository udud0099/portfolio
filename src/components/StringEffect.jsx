"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const StringEffect = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!width) return;

    let path = `M 10 70 Q ${width / 2} 70 ${width - 20} 70`;
    const finalPath = `M 10 70 Q ${width / 2} 70 ${width - 20} 70`;
    const string = document.getElementById("string");

    if (!string) return;

    const handleMove = (e) => {
      path = `M 10 70 Q ${e.offsetX} ${e.offsetY} ${width - 20} 70`;
      gsap.to("svg path", {
        attr: { d: path },
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 1.1,
        ease: "elastic.out(2,0.3)",
      });
    };

    string.addEventListener("mousemove", handleMove);
    string.addEventListener("mouseleave", handleLeave);

    return () => {
      string.removeEventListener("mousemove", handleMove);
      string.removeEventListener("mouseleave", handleLeave);
    };
  }, [width]);

  return (
    <div className="flex items-center justify-center w-full h-[60px] bg-red-800">
      <div id="string" className="w-full">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path
            d={`M 10 70 Q ${width / 2} 70 ${width - 20} 70`}
            stroke="white"
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
};

export default StringEffect;
