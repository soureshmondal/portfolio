import {  Tranquiluxe } from "uvcanvas";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Tranquiluxe style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Background;