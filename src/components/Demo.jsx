import React from "react";

const Demo = ({ image, left }) => {
  return (
    <div className="w-full h-[400px] bg-accent1 rounded-3xl aspect-[6/4] md:w-1/2 overflow-hidden">
      <img src={image} alt="demo" 
        className={`w-full h-full object-cover ${left && "object-left"}`}
      />
    </div>
  );
};

export default Demo;
