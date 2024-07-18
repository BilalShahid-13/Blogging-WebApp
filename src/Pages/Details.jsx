import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Comment from "../Components/Comment";
import Loading from "../Components/Loading";

const Details = () => {
  const { id } = useParams();
  const host = "http://localhost:8000";
  const [Data, setData] = useState(null);
  const [comments, setcomments] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (id) {
      viewBlog(id);
    }
  }, [id]);

  useEffect(() => {
    viewComments();
  }, [comments]);

  const viewBlog = async (id) => {
    try {
      setloading(true);
      const response = await axios.get(`${host}/blog/viewBlog/${id}`);
      const { blog } = response.data;
      if (response.status === 200) {
        setData(blog);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };

  const TimestampDisplay = ({ createdAt }) => {
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
      <div className="flex flex-row justify-center gap-6 items-center font-extralight text-sm max-sm:text-xs">
        {formattedDate} , {formattedTime}
      </div>
    );
  };

  const viewComments = async () => {
    try {
      const response = await axios.get(`${host}/blog/viewComments/${id}`);
      const { comments } = response.data;
      if (response.status === 200) {
        if (comments) {
          setcomments(comments);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {!loading ? (
        Data ? (
          <>
            <div className="flex  flex-col gap-4 mt-2 py-2">
              <img
                src={`${host}/${Data.imgURL}`}
                alt=""
                className="max-md:px-3 px-1 drop-shadow-md"
              />
              <h2 className="text-3xl font-bold text-center">{Data.title}</h2>
              {/* {!sessionStorage.getItem("token") ? ( */}
              {/* date time  */}
              <div className="flex justify-center items-center gap-6 flex-row">
                {Data.createdBy && Data.createdBy.username ? (
                  <div className="flex flex-row justify-between items-center w-[90%] my-2">
                    <p className="uppercase">{Data.createdBy.username}</p>
                    <TimestampDisplay createdAt={Data.createdBy.createdAt} />
                  </div>
                ) : null}
              </div>
              <div className="justify-center items-center flex">
                <pre className=" text-base pl-4 fixed-width">
                  {Data.description}
                </pre>
              </div>
            </div>
            <div className="flex gap-4 flex-col max-md:px-3 my-3 pl-20">
              <h3 className="text-zinc-600 text-2xl max-md:text-base font-semibold">
                Comments
                <span className="text-xs font-extralight absolute ml-1 text-black">
                  ({comments.length})
                </span>
              </h3>
            </div>
            {/* comments input */}
            {sessionStorage.getItem("token") ? <Comment blog_id={id} /> : null}
            {/* comment box all comments */}
            <div className="flex flex-col justify-center gap-6 px-7 mb-4">
              {comments.map((items, index) => (
                <div
                  key={index}
                  className="pl-2 flex flex-row justify-start items-center gap-3 bg-neutral-100 rounded-md p-1"
                >
                  <img
                    src="/logo.png"
                    alt=""
                    width={40}
                    className="border-[1px] border-green-300 rounded-full p-1"
                  />
                  <div className="flex flex-col max-sm:gap-1 py-2">
                    <div className="flex flex-row justify-between items-center max-md:gap-x-[60vw] gap-x-[79vw] max-sm:gap-x-[20vw]">
                      <h3 className="font-semibold text-sm">
                        {items.createdBy.username}
                      </h3>
                      <div className="max-sm:text-xl">
                        <TimestampDisplay createdAt={items.createdAt} />
                      </div>
                    </div>
                    <p className="font-light max-sm:text-xs">{items.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null
      ) : (
        <div className="flex justify-center items-center fixed w-full h-[40vh] max-sm:w-[60%]">
          <Loading style="w-[90px] h-[90px]" />
        </div>
      )}
    </>
  );
};

export default Details;
