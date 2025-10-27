"use client";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";
import WhoAmI3D from "./WhoAmI3D";
import TextEffect from "./TextEffect";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsOpen(false);

    if (window.lenis) {
      window.lenis.scrollTo(target, { duration: 3.0 }); // 👈 smooth & slow scroll
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Animate menu open
      gsap.fromTo(
        menuRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    } else {
      // Animate menu close
      gsap.to(menuRef.current, {
        y: "-200%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <nav className="  w-full flex items-center justify-between px-6 pt-8 pb-2 bg-[#020024] text-white z-50 shadow-md shadow-[#050511]">
      <div className="text-xl font-bold">
        <TextEffect />
      </div>

      <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        className="absolute top-15 left-0 w-full bg-[#020024] flex flex-col items-center justify-center gap-6 text-2xl text-black z-40"
        style={{
          // same as top-[30px]
          height: "calc(100vh - 30px)", // 100vh minus navbar height
          opacity: 0,
          transform: "translateY(-100%)",
        }}
      >
        <a
          className="w-full"
          href="#AboutMe"
          onClick={(e) => handleNavClick(e, "#AboutMe")}
        >
          <WhoAmI3D text="About Me" />
        </a>
        <a
          className="w-full"
          href="#MySkills"
          onClick={(e) => handleNavClick(e, "#MySkills")}
        >
          <WhoAmI3D text="My Skills" />
        </a>
        <a
          className="w-full"
          href="#Projects"
          onClick={(e) => handleNavClick(e, "#Projects")}
        >
          <WhoAmI3D text="Projects" />
        </a>
        <a
          className="w-full"
          href="#Contact"
          onClick={(e) => handleNavClick(e, "#Contact")}
        >
          <WhoAmI3D text="Contact" />
        </a>
      </div>
    </nav>
  );
}
