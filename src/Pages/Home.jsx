import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Search from "../Components/Search";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import AllBlogs from "../Components/AllBlogs";
import Loading from "../Components/Loading";

const Home = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token")); // Initialize token as null
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setToken(token); // Set the decoded token, not the original token
        const username = decodedToken.user.username || decodedToken.username;
        setUsername(username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <main className="max-md:space-y-3 space-y-6">
      <Hero username={username} />
      <Search />
      <div className="grid grid-cols-3 max-md:grid-cols-2 gap-3 max-sm:gap-8 p-3 mt-9 max-sm:grid-cols-1">
        <AllBlogs />
      </div>
    </main>
  );
};

export default Home;
