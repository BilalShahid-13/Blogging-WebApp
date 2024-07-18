import React, { useEffect, useState } from "react";
import NotFound from "../Components/NotFound";
import Card from "../Components/Card";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../Components/Loading";

const Collections = () => {
  const [userToken, setuserToken] = useState(null);
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [token, settoken] = useState(sessionStorage.getItem("token"));
  const host = "https://blogging-app-api-six.vercel.app";

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setuserToken(decodedToken.user._id);
        console.log(decodedToken.user._id);
        viewBlog(decodedToken.user._id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const viewBlog = async (id) => {
    try {
      setloading(true);
      const response = await axios.get(`${host}/blog/viewAllBlog/${id}`);
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
      {token ? (
        !loading ? (
          <>
            {Data.length === 0 ? (
              <NotFound title="No Blogs" />
            ) : (
              <div className="grid grid-cols-3 max-md:grid-cols-2 p-3 gap-3 max-sm:gap-6 max-sm:grid-cols-1">
                {Data.map((items, index) => (
                  <Card
                    title={items.title}
                    img={items.imgURL}
                    createdAt={items.createdAt}
                    key={index}
                    index={index}
                    Data={Data}
                    Category={items.Category}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center fixed w-full h-[40vh]">
            <Loading style="w-[90px] h-[90px]" />
          </div>
        )
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Collections;
