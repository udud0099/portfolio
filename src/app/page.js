import MyWork from "@/components/MyWork";
import Navbar from "@/components/Navbar";

 
export default function Home() {
  return (
     <>
     <Navbar />
     <div className="w-full h-screen bg-gray-900"></div>
     <MyWork />
     <div className="w-full h-screen bg-gray-900"></div>

     </>
  );
}
