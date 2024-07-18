import React from "react";
import { FaRegHandPeace } from "react-icons/fa6";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaBlog } from "react-icons/fa6";

const Hero = ({ username }) => {
  return (
    <>
      <div className="flex flex-col mt-9 gap-7 justify-center items-center">
        <h1 className="flex flex-row text-center max-md:text-6xl text-7xl max-sm:text-5xl font-semibold">
          Hi <FaRegHandPeace className="text-blue-400" />
          {username ? username : null}.
        </h1>
        <h1 className="max-md:text-4xl text-5xl max-sm:text-xl font-light flex flex-row justify-center items-center gap-2">
          Welcome to Blogic &nbsp;
          <FaBlog size={35} className="text-zinc-500" />
          &nbsp; Blogging Website
        </h1>
        <p className="flex flex-row justify-center items-center gap-1 max-md:text-3xl text-4xl max-sm:text-2xl font-extralight">
          See All Blogs <FaLongArrowAltDown className="text-blue-400" />
          <span className="font-bold">:</span>
        </p>
      </div>
    </>
  );
};

export default Hero;
