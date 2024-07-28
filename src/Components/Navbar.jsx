import React, { useEffect, useState } from "react";
import { navbar_li } from "../config/Data";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { SlMenu } from "react-icons/sl";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdown, setdropdown] = useState(false);
  const [token, settoken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    settoken(sessionStorage.getItem("token"));
  }, [token]);
  return (
    <>
      <nav className="flex flex-row max-sm:flex-col max-sm:justify-start justify-between items-center bg-blue-400 p-2 shadow-md max-sm:gap-3">
        <div
          className={`transition-all duration-200 flex flex-row gap-2 max-sm:px-2 max-sm:pt-4
         max-sm:justify-between max-sm:items-center max-sm:w-full max-md:justify-center
          max-lg:justify-center ${dropdown ? "max-sm:h-auto" : "max-sm:h-6"}`}
        >
          <h1 className="text-2xl font-semibold text-zinc-900">BLOGIC</h1>
          <FaBlog size={40} color="white" />
          <span className="max-sm:flex hidden">
            <SlMenu
              size={25}
              onClick={() => {
                setdropdown(!dropdown);
              }}
            />
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all ease-in duration-300 flex flex-row max-sm:flex-col max-sm:gap-2
        justify-center items-center gap-12 hover:cursor-pointer
         no-underline list-none ${dropdown
              ? "max-sm:h-full max-sm:opacity-100"
              : "max-sm:h-0 max-sm:opacity-0"
            }`}
        >
          {navbar_li.map((items, index) => (
            <Link
              key={index}
              to={items.link}
              onClick={() => {
                setdropdown(false);
              }}
              className="flex flex-row justify-center items-center gap-2 hover:border-blue-600 border-b-2 border-transparent px-3 py-1 transition-colors duration-500 ease-linear no-underline"
            >
              {items.icon}
              <li>{items.title}</li>
            </Link>
          ))}
        </div>
        <div
          className={`${dropdown
            ? "max-sm:h-full opacity-100"
            : "max-sm:h-0 max-sm:opacity-0"
            } overflow-hidden transition-all duration-200`}
        >
          {token ? (
            <button
              className="bg-white px-5 py-2 rounded-lg border-[1px] hover:border-zinc-900 hover:bg-neutral-50 transition-all duration-300 ease-in no-underline"
              onClick={() => {
                sessionStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <div className="bg-white px-5 py-2 rounded-lg border-[1px] hover:border-zinc-900 hover:bg-neutral-50 transition-all duration-300 ease-in no-underline"
            >
              <Link
                to="/Register/Login"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
