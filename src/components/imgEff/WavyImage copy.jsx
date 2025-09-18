"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HoverWaveGallery() {
  const imgRefs = useRef([]);
  const anim = useRef();

  useEffect(() => {
    const turb = document.querySelector("#wave feTurbulence");

    // ✅ Start one shared animation
    const startAnim = () => {
      anim.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to("#wave feDisplacementMap", {
          attr: { scale: 35 },
          duration: 8,
          delay:2,
          ease: "sine.inOut",
        })
        .to(turb, {
          attr: { baseFrequency: "0.025 0.07" },
          duration: 12,
          delay:2,
          ease: "sine.inOut",
        }, 0);
    };

    startAnim();

    // ✅ Add hover handlers to all images
    imgRefs.current.forEach((el) => {
      const handleEnter = () => {
        anim.current.pause(); // stop anim globally
        gsap.to("#wave feDisplacementMap", {
          attr: { scale: 0 },
          duration: 3,
          ease: "power2.out",
        });
        gsap.to(turb, {
          attr: { baseFrequency: "0.01 0.02" },
          duration: 3,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        anim.current.play(); // resume anim globally
      };

      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);

      // cleanup
      return () => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center min-h-screen bg-black">
      {[1, 2, 3, 4].map((n, i) => (
        <img
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          src={`/${n}.jpg`}
          alt={`img-${n}`}
          className="w-[300px] rounded-xl hover:scale-103 hover:rotate-1 cursor-pointer transition-all duration-500"
          style={{ filter: "url(#wave)" }}
        />
      ))}

      {/* ✅ One shared filter for all */}
      <svg style={{ display: "none" }}>
        <filter id="wave">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.05"
            numOctaves="3"   // lighter
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
}
