import React from "react";
import { FlipWords } from "../components/FlipWords";
import ShapeBlur from "../components/ShapeBlur"; // adjust the path if needed

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ShapeBlur Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -10,
          overflow: "hidden",
        }}
      >
        <ShapeBlur
          variation={0}
          pixelRatioProp={window.devicePixelRatio || 1}
          shapeSize={0.5}
          roundness={0.5}
          borderSize={0.05}
          circleSize={0.5}
          circleEdge={1}
        />
      </div>

      {/* Overlay for slight dark effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[10px] z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen flex flex-col items-center justify-center">
        {/* Main Title */}
        <div className="space-y-2 text-center">
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

        {/* FlipWords Subtitle */}
        <div className="h-8 flex items-center mt-6">
          <FlipWords
            words={["Web Developer", "AI/ML Enthusiast", "CyberSecurity Expert"]}
            className="text-xl md:text-2xl font-light bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
            duration={3000}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
