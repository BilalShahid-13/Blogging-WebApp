import React, { useState } from "react";
import { useNavigate } from "react-router";

const Card = ({ img, title, createdAt, index, Data, Category }) => {
  const navigate = useNavigate();

  const TimestampDisplay = () => {
    const timestamp = createdAt;
    const dateObj = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedTime = dateObj.toLocaleTimeString();
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return (
      <div className="flex flex-row justify-center gap-6 items-center font-extralight text-sm">
        <p>{formattedDate}</p> &nbsp;
        {formattedTime}
      </div>
    );
  };

  const CardClick = () => {
    const id = Data[index]._id;
    navigate(`/Details/${id}`);
  };

  return (
    <>
      <div
        className="flex flex-col justify-center items-center
      border-[1px] border-zinc-300 rounded-md gap-4 py-3
      shadow-md hover:shadow-blue-300 transition-all 
      duration-500 ease-linear hover:cursor-pointer
      max-md:w-full w-full max-md:h-[70vh] h-[70%]"
        onClick={CardClick}
      >
        <img
          src={img ? `http://localhost:8000/${img}` : "blog.jpg"}
          className="p-3 object-contain w-full h-full rounded-lg drop-shadow-md"
          onError={(e) => {
            e.target.src = "blog.jpg";
          }}
        />
        <h2 className="text-center w-full max-md:px-[35%] px-[40%] border-l-[3px] rounded-sm border-l-blue-500 font-semibold text-blue-600 text-xl">
          {Category}
        </h2>
        <h4 className="font-semibold px-4 text-center h-[20%] flex justify-center items-center flex-col capitalize">
          {title}
        </h4>
        <TimestampDisplay />
      </div>
    </>
  );
};

export default Card;
