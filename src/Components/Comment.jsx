import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Comment = ({ blog_id }) => {
  const [comment, setcomment] = useState("");
  const [token, settoken] = useState(sessionStorage.getItem("token"));
  const [userToken, setuserToken] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setuserToken(decodedToken.user._id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const addComment = async () => {
    try {
      const response = await axios.post(
        "https://blogging-app-api-six.vercel.app//blog/addComment",
        {
          comment: comment,
          user_id: userToken,
          blog_id: blog_id,
        }
      );

      //   console.log("response", response.data);
      if (response.status === 201) {
        console.log("response", response.data);
        setcomment("");
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center gap-2 my-3">

        <textarea
          type="text"
          placeholder="enter comment"
          rows={2}
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          value={comment}
          className="w-[90%] resize-none pl-2 mx-2 font-extralight text-sm outline-none border-[1px]
           border-zinc-400 rounded-sm focus:border-blue-500"
        />
        <button
          className="bg-blue-400 px-5 py-2 w-32 rounded-full flex flex-row
         justify-center items-center gap-4 text-white hover:bg-blue-600"
          onClick={addComment}
        >
          <IoMdSend />
          Post
        </button>
      </div>
    </>
  );
};

export default Comment;
