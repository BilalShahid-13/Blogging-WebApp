import React from "react";
import { TbMoodSad2 } from "react-icons/tb";

const NotFound = ({ title }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center max-md:text-5xl text-6xl text-gray-500 gap-7 h-screen">
        <TbMoodSad2 />
        <h4 className="font-light">{title} !!!</h4>
      </div>
    </>
  );
};

export default NotFound;

NotFound.defaultProps = {
  title: "User Not Loggedin",
};
