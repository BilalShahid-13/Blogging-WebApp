import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Loading from "./Loading";

const AllBlogs = () => {
  const host = "https://blogging-app-api-six.vercel.app";
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    AllBlogs();
  }, []);

  const AllBlogs = async () => {
    try {
      setloading(true);
      const response = await axios.get(`${host}/blog/allBlogs`);
      const { blogs } = response.data;
      if (response.status === 200) {
        setData(blogs);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {!loading ? (
        Data.map((items, index) => (
          <Card
            title={items.title}
            img={items.imgURL}
            createdAt={items.createdAt}
            key={index}
            index={index}
            Data={Data}
            Category={items.Category}
          />
        ))
      ) : (
        <div className="flex justify-center items-center fixed w-full h-[40vh] max-sm:w-[60%]">
          <Loading style="w-[90px] h-[90px]" />
        </div>
      )}
    </>
  );
};

export default AllBlogs;
