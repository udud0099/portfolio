 import ImageFlag from "@/components/imgEff/WavyImage"; 
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

     </>
  );
}
