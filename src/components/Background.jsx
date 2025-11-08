import React from "react";
import Plasma from "./Plasma";

const Background = () => {
  return (
    <div
      className="fixed inset-0 -z-10 bg-black"
      style={{ width: "100%", height: "100%", position: "fixed", backgroundColor: "#000", }}
    >
      <Plasma
        color="#b19eef"
        speed={0.6}
        direction="forward"
        scale={1.0}
        opacity={1.0}
        mouseInteractive={false}
      />
    </div>
  );
};

export default Background;
