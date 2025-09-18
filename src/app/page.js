 import ImageFlag from "@/components/imgEff/WavyImage";
import WaterImage from "@/components/imgEff/WavyImage2";
import HoverWaveImage from "@/components/imgEff/WavyImage3";
import HoverWaveImage2 from "@/components/imgEff/WavyImage4";
import MyWork from "@/components/MyWork";
import Navbar from "@/components/Navbar";
import StringEffect from "@/components/StringEffect";

 
export default function Home() {
  return (
     <>
     <Navbar />
     <div className="w-full h-screen bg-gray-900"></div>
     <MyWork />
     <div className="w-full h-screen bg-gray-900"></div>
     <StringEffect />
     <div className="w-full h-screen bg-gray-900"></div>
      <ImageFlag />
      <WaterImage />
      <HoverWaveImage />
      <HoverWaveImage2 />

     </>
  );
}
