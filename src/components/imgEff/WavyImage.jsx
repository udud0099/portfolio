"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HoverWaveGallery() {
  const imgRefs = useRef([]);
  const anim = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    const turb = document.querySelector("#wave feTurbulence");

    // ✅ Shared wave animation
    const startAnim = () => {
      anim.current = gsap
        .timeline({ repeat: -1, yoyo: true })
        .to("#wave feDisplacementMap", {
          attr: { scale: 35 },
          duration: 8,
          ease: "sine.inOut",
        })
        .to(
          turb,
          {
            attr: { baseFrequency: "0.025 0.07" },
            duration: 12,
            ease: "sine.inOut",
          },
          0
        );
    };

    startAnim();

    // ✅ Hover effect
    imgRefs.current.forEach((el) => {
      const handleEnter = () => {
        anim.current.pause();
        gsap.to("#wave feDisplacementMap", {
          attr: { scale: 0 },
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(turb, {
          attr: { baseFrequency: "0.01 0.02" },
          duration: 1,
          ease: "power2.out",
        });
      };
      const handleLeave = () => {
        anim.current.play();
      };
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // ✅ Scroll-triggered sequential entrance (one by one)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "-30% top ",
        end: "-30%  bottom ",
        scrub: true,
        markers: false, 
      },
    });

    imgRefs.current.forEach((el, i) => {
      tl.fromTo(
        el,
        { x: "-100vw", rotate: -20, opacity: 0 },
        { x: "0vw", rotate: 0, opacity: 1, duration: 1 }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} id="contact"
      className="flex flex-wrap gap-6 justify-center items-center h-screen bg-[#020024] overflow-hidden"
    >
      {[4, 3, 2, 1].map((n, i) => (
        <img
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          src={`/${n}.jpg`}
          alt={`img-${n}`}
          className="w-[300px] hover:w-[320px] rounded-xl      cursor-pointer transition-all duration-500 "
          style={{ filter: "url(#wave)" }}
        />
      ))}

      {/* Shared wave filter */}
      <svg style={{ display: "none" }}>
        <filter id="wave">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.05"
            numOctaves="3"
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
    </section>
  );
}
