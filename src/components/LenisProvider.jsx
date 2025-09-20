"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3.0, // 👈 slower scroll everywhere
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      smoothWheel: true, 
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // expose globally if needed
    window.lenis = lenis;
  }, []);

  return <>{children}</>;
}
