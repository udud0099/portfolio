"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    // Move both on mouse move
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 25,
        y: e.clientY - 25,
        duration: 0.4,
        ease: "bounce.out",
      });
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.15,
        ease: "bounce.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Outer circle with text inside */}
      <div
        ref={cursorRef}
        id="cursor-outer"
        className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-pink-500 mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center text-white text-xs font-semibold p-4 tracking-tight leading-none text-center"
      >
        <span ref={textRef} id="cursor-text" className="scale-0">
          {/* text will be inserted here */}
        </span>
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-pink-500 pointer-events-none z-[9999]"
      ></div>
    </>
  );
}
