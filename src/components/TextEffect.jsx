"use client";

import React, { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";

export default function TextEffect({ text = "WhoAmI" }) {
  const containerRef = useRef(null);
  const chars = useMemo(() => text.split(""), [text]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const halfIndex = Math.floor(chars.length / 2);
    const left = container.querySelectorAll(".char.a");
    const right = container.querySelectorAll(".char.b");

    gsap.killTweensOf([...left, ...right]);
    gsap.set([...left, ...right], { y: 100, opacity: 0 });

    // entrance animation
    const tl = gsap.timeline();

    tl.to(left, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay: 0.25,
      stagger: 0.03,
      ease: "power3.out",
    }).to(
      right,
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.25,
        stagger: { each: 0.03, from: "end" },
        ease: "power3.out",
      },
      "<" // run at the same time
    );

    // infinite grow/shrink loop after entrance
    tl.to(
      [...left, ...right],
      {
        scale: .95,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "bounce.out",
        transformOrigin: "center center",
      },
      "+=0.2" // slight delay after entrance
    );

    return () => {
      tl.kill();
    };
  }, [chars]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <h1
        ref={containerRef}
        className="text-6xl font-bold text-white leading-none select-none"
      >
        {chars.map((ch, idx) => {
          const isSpace = ch === " ";
          const cls = idx < Math.floor(chars.length / 2) ? "a" : "b";
          return (
            <span
              key={idx}
              className={`char ${cls} inline-block`}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {isSpace ? "\u00A0" : ch}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
