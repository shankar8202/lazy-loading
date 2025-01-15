import React from "react";
const Skeleton = ({ style, item }) => {
  const RenderElements = Array.from({ length: item });
  return (
    <>
      {RenderElements.map((element, index) => {
        return (
          <div
            key={index}
            className={`bg-slate-300 animate-pulse-fast ${style}`}
          ></div>
        );
      })}
    </>
  );
};
export default Skeleton;
