import React from "react";
import LiquidEther from "./LiquidEther";

const Background = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ width: "100%", height: "100%", position: "fixed" }}
    >
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
};

export default Background;
