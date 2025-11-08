import React from "react";
import Plasma from "./Plasma";

const Background = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ width: "100%", height: "100%", position: "fixed" }}
    >
      <Plasma
        color="#b19eef"
        speed={1.0}
        direction="forward"
        scale={1.0}
        opacity={1.0}
        mouseInteractive={false}
      />
    </div>
  );
};

export default Background;
