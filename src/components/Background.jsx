import React from "react";
import Plasma from "./Plasma";

const Background = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ width: "100%", height: "100%", position: "fixed" }}
    >
      <Plasma
        color="#ff6b35"
        speed={0.6}
        direction="forward"
        scale={1.1}
        opacity={0.8}
        mouseInteractive={true}
      />
    </div>
  );
};

export default Background;
