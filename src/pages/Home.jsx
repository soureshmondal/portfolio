import React from "react";
import { FlipWords } from "../components/FlipWords"; // adjust this path based on your structure
import { MaskContainer } from "../components/svg-mask-effect";


const Home = () => {
  return (
    <MaskContainer
      revealText={
        <div className="text-3xl text-white font-semibold">
          Hover here for a quick intro....
        </div>
      }
      size={40}
      revealSize={600}
    >
      
    <div className="min-h-screen bg-black/40 backdrop-blur-[10px] overflow-hidden">
      <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen">
        
          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Exploring the Universe with 
                </span>
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                Code & Curiosity
                </span>
              </span>
            </h1>
          </div>
          

          
          <div className="h-8 flex items-center mt-6">
            <FlipWords
              words={["Web Developer", "AI/ML Enthusiast", "CyberSecurity Expert"]}
              className="text-xl md:text-2xl font-light bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
              duration={3000}
            />
          </div>
        </div>
      </div>
    </div>
    
    </MaskContainer> 
  );
};

export default Home;
