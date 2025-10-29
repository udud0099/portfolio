import Image from "next/image";
import React from "react";

const AboutMe = () => {
  return (
    <div
      id="AboutMe"
      className="h-screen bg-red-800 w-full relative overflow-hidden"
    >
      <div className="w-full h-full absolute top-0 left-0 z-1 overflow-hidden">
        <Image
          src="/bg.jpg"
          width={1000}
          height={1000}
          alt="a"
          className="  min-w-full min-h-full"
        />
      </div>
      <div className="relative z-2">
        <div className="pl-[40%] pt-[10%] pr-[10%] pb-[3%] text-[#020024]">
          <h1 className="text-8xl mb-12 font-semibold ">HI, I'm <span className="font-bold">Ujjawal</span></h1>
          <h2 className="text-4xl font-semibold mb-8   ">A Frontend Developer based in Kathmandu, Nepal.</h2>
          <p className="font-base text-xl text-justify">
            Over the past 2 years, I’ve worked on building responsive, fast, and
            modern web applications using React.js, Next.js, and Tailwind CSS.
            These days, I focus on writing clean, maintainable code and creating
            smooth user experiences that bring ideas to life on the web.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
