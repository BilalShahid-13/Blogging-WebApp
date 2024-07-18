import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const navigate = useNavigate();
  const [passwordToggle, setpasswordToggle] = useState(false);

  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setpasswordToggle(!passwordToggle);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{1,14}$/;
    console.log(usernameRegex.test(username));
    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    password = password.length >= 8;
    return password;
  };

  const onhandleSubmit = async () => {
    validatePassword(password);
    if (!email && !password && !username) {
      setError("All fields are empty!");
    } else if (!username) {
      setError("Username is empty!");
    } else if (!validateUsername(username)) {
      setError(
        "Invalid username format! Must start with a letter and be 3-16 characters long."
      );
    } else if (!email) {
      setError("Email is empty!");
    } else if (!validateEmail(email)) {
      setError("Invalid email format! Must be a @gmail.com address.");
    } else if (!password) {
      setError("Password is empty!");
    } else if (!validatePassword(password)) {
      setError("Password must be greate than 8 characters!");
    } else {
      setError("");
      try {
        setloading(true);
        const response = await axios.post(
          "https://blogging-app-api-six.vercel.app/register/signup",
          {
            username: username,
            password: password,
            email: email,
          }
        );
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
        }

        if (response.status === 201) {
          navigate("/Blogging-WebApp");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="border-2 border-blue-400 flex justify-center items-center flex-col w-[60%] max-sm:w-[93%] my-4 py-2 gap-7 max-md:translate-y-[5%] translate-y-[2%] max-sm:translate-y-[35%]  shadow-md rounded-md">
          <h3 className="text-3xl font-bold">SignUp Form</h3>
          {/* username */}
          <div className="flex flex-col w-[60%]">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="rounded-md py-2 bg-blue-100 outline-none focus:border-2 focus:border-blue-300"
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </div>
          {/* email */}
          <div className="flex flex-col w-[60%]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="py-2 bg-blue-100 outline-none focus:border-2 focus:border-blue-300 rounded-md"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          {/* password */}
          <div className="flex flex-col w-[60%]">
            <label htmlFor="password">Password</label>
            <div className="flex flex-row w-full">
              <input
                type={passwordToggle ? "text" : "password"}
                id="password"
                className="w-[98%] py-2 bg-blue-100 outline-none focus:border-2 focus:border-blue-300 rounded-md"
                onChange={(e) => {
                  setpassword(e.target.value);
                  setpassword(e.target.value);
                }}
              />
              {password ? (
                <span onClick={togglePasswordVisibility} className="py-2">
                  {passwordToggle ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </span>
              ) : null}
            </div>
          </div>
          {/* img */}
          {/* <div
            className="flex flex-col justify-center
             items-center"
          >
            <input
              type="file"
              accept=".jpeg,.jpg,.png"
              id="image"
              hidden
              onChange={(e) => {
                setavatar(e.target.files[0]);
              }}
              className="rounded-md"
            />
            <label
              htmlFor="image"
              className="cursor-pointer gap-2 p-[2vw] justify-center items-center
          flex-col flex border-blue-400 shadow-md border-[1px] rounded-md"
            >
              <IoCloudUploadOutline
                className="cursor-pointer text-blue-400 "
                size={30}
              />
              <p>Profile Image</p>
              <p className="text-neutral-600 font-extralight">
                jpeg,&nbsp;jpg,&nbsp;png
              </p>
            </label>
          </div> */}
          {error && (
            <p className="text-red-500 text-center max-sm:text-sm">{error}</p>
          )}
          <button
            className="bg-blue-500 px-8 py-2 rounded-full text-white"
            onClick={onhandleSubmit}
          >
            SignUp
          </button>
          <Link to="/Register/Login" className="no-underline text-blue-600">
            Already User ?
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
