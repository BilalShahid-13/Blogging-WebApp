import React from "react";

const Loading = ({
  width = "30px",
  height = "30px",
  style = "w-[30px] h-[30px]",
}) => {
  return (
    <>
      {/* <div className={`loader w-[${width}] h-[${height}]`}></div> */}
      <div className={`loader ${style}`}></div>
    </>
  );
};

export default Loading;
