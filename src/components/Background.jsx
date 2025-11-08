import React, { Suspense, lazy } from "react";

const Plasma = lazy(() => import("./Plasma"));

const Background = () => (
  <div className="fixed inset-0 -z-10">
    <Suspense fallback={null}>
      <Plasma
        color="#b19eef"
        speed={0.6}
        direction="forward"
        scale={1.1}
        opacity={1.0}
        mouseInteractive={fasle}
      />
    </Suspense>
  </div>
);

export default Background;
