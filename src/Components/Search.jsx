import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
const Search = () => {
  const [inputClick, setinputClick] = useState(false);
  return (
    <>
      <div
        className={`flex flex-row justify-between 
      items-center border-2 ${
        inputClick ? "border-blue-400" : "border-neutral-400"
      } px-4 mx-5 max-md:py-1 py-2 rounded-full transition-all duration-300 ease-linear`}
      >
        <CiSearch className="cursor-pointer" />
        <input
          type="text"
          className="w-full mx-3 outline-none text-base"
          onClick={() => {
            setinputClick(true);
          }}
          onBlur={() => {
            setinputClick(false);
          }}
        />
      </div>
    </>
  );
};

export default Search;
