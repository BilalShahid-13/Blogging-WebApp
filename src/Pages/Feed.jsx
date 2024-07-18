import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NotFound from "../Components/NotFound";
import { Categories } from "../config/Data";

const Feed = () => {
  const navigate = useNavigate();
  const [coverimg, setcoverimg] = useState(null);
  const [title, settitle] = useState(null);
  const [des, setdes] = useState(null);
  const [token, settoken] = useState(sessionStorage.getItem("token"));
  const [selectedCategory, setSelectedCategory] = useState("");

  const onhandleSubmit = async () => {
    console.log(coverimg, title, des);
    const token = jwtDecode(sessionStorage.getItem("token"));

    try {
      const response = await axios.post(
        "https://blogging-app-api-six.vercel.app/blog/feed",
        {
          title: title,
          description: des,
          imgURL: coverimg,
          Category: selectedCategory,
          userId: token.user._id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response.data);
      if (response.status === 201) {
        navigate("/Collections");
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      {token ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col justify-center gap-7 my-5">
            {/* display img */}
            <img
              src={`${coverimg ? URL.createObjectURL(coverimg) : "https://bilalshahid-13.github.io/Blogging-WebApp/blog.jpg"}`}
              alt="blog img"
              className="m-2 border-[2px] border-blue-500 p-1 rounded-lg"
            />
            {/* img */}
            <div
              className="flex flex-col justify-center
            items-center"
            >
              <input
                type="file"
                accept=".jpeg,.jpg,.png"
                id="image"
                name="imgURL"
                hidden
                onChange={(e) => {
                  setcoverimg(e.target.files[0]);
                }}
              />
              <label
                htmlFor="image"
                className="cursor-pointer gap-3 p-[4vw] justify-center items-center
         flex-col flex border-blue-400 shadow-md border-[1px] rounded-md"
              >
                <IoCloudUploadOutline
                  className="cursor-pointer text-blue-400 "
                  size={40}
                />
                <p>Upload Image</p>
                <p className="text-neutral-600 font-extralight">
                  jpeg,&nbsp;jpg,&nbsp;png
                </p>
              </label>
            </div>
            {/* selection */}
            <div className="flex flex-row justify-center gap-9 items-center">
              <h2 className="max-md:text-2xl text-3xl">Categories</h2>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="blog-categories p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a category...</option>
                {Categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* title */}
            <div className="flex flex-col items-center gap-3 px-4 justify-center">
              <label
                htmlFor="title"
                className="font-medium max-md:text-2xl text-3xl text-neutral-500"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="title.."
                id="title"
                name="title"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                className="border-2 w-full placeholder:px-2 outline-none"
              />
            </div>
            {/* des */}
            <div className="flex flex-col items-center gap-3 px-4 justify-center">
              <label
                htmlFor="des"
                className="font-medium max-md:text-2xl text-3xl text-neutral-500"
              >
                Description
              </label>
              <textarea
                type="text"
                id="des"
                name="description"
                className="border-2 w-full placeholder:pl-3 outline-none"
                rows={5}
                onChange={(e) => {
                  setdes(e.target.value);
                }}
                placeholder="description ..."
              />
            </div>
            {/* buttons */}
            <div className="flex flex-row-reverse justify-center items-center gap-8">
              <button
                className="flex flex-row justify-center items-center
             gap-3 hover:border-transparent border-2 border-blue-400
             px-3 py-1 hover:bg-blue-500 hover:rounded-lg hover:text-white"
                onClick={onhandleSubmit}
              >
                Publish <IoMdSend />
              </button>
              <button
                onClick={() => {
                  setcoverimg(null);
                }}
                type="reset"
                className="flex flex-row justify-center items-center
             gap-3 hover:border-transparent border-2 border-red-400
              px-3 py-1 hover:bg-red-500 hover:rounded-lg hover:text-white"
              >
                <CiCircleRemove /> Reset
              </button>
            </div>
          </div>
        </form>
      ) : (
        <NotFound title="Not Logged In" />
      )}
    </>
  );
};

export default Feed;
