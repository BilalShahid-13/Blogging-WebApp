import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Collections from "./Pages/Collections";
import Feed from "./Pages/Feed";
import Login from "./Components/Register/Login";
import Signup from "./Components/Register/Signup";
import Details from "./Pages/Details";

function App() {
  const location = useLocation();

  return (
    <>
      {/* <Home /> */}

      {/* <HashRouter> */}
      {location.pathname === "/Register/Login" ||
      location.pathname === "/Register/Signup" ? null : (
        <Navbar />
      )}
      <Routes>
        <Route path="/Blogging-WebApp" element={<Home />} />
        <Route path="Collections" element={<Collections />} />
        <Route path="Feeds" element={<Feed />} />
        <Route path="/Register/Login" Component={Login} />
        <Route path="/Register/Signup" Component={Signup} />
        <Route path="/Details/:id" Component={Details} />
      </Routes>
      {/* </HashRouter> */}
    </>
  );
}

export default App;
