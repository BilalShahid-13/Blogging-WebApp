import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loading from "../Loading";

const Login = () => {
  const navigate = useNavigate();
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordToggle(!passwordToggle);
  };

  const validateEmail = () => {
    // const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };
  const onhandleSubmit = async () => {
    if (!email && !password) {
      setError("email and password are empty!");
    } else if (!email) {
      setError("email is empty!");
    } else if (!password) {
      setError("password is empty!");
    } else if (!validateEmail(email)) {
      setError("email format is not valid!");
    } else {
      if (validateEmail(email) && password !== "") {
        setError("");
        try {
          setloading(true);
          const response = await axios.post(
            "https://blogging-app-api-six.vercel.app/register/login",
            {
              email: email,
              password: password,
            }
          );
          const { token } = response.data;
          sessionStorage.setItem("token", token);
          const storedToken = sessionStorage.getItem("token");
          if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            console.log(decodedToken);
          }

          if (response.status === 201) {
            navigate("/Blogging-WebApp");
          }
        } catch (error) {
          console.log("error", error);
          setError("Invalid email or password. Please try again.");
        } finally {
          setloading(false);
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="border-2 border-blue-400 flex justify-center items-center flex-col w-[60%] max-sm:w-[93%] max-sm:translate-y-[35%] py-4 gap-9 translate-y-[39%] shadow-md rounded-md">
          <h3 className="text-3xl font-bold">Login Form</h3>
          {/* email */}
          <div className="flex flex-col w-[60%]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="rounded-md py-2 bg-blue-100 outline-none focus:border-2 focus:border-blue-300"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e);
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
                className="rounded-md w-[98%] py-2 bg-blue-100 outline-none focus:border-2 focus:border-blue-300"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {password && (
                <span onClick={togglePasswordVisibility} className="py-2">
                  {passwordToggle ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </span>
              )}
            </div>
          </div>
          {error && <p className="text-red-500 max-sm:text-sm">{error}</p>}
          <button
            className="bg-blue-500 px-8 py-2 rounded-full text-white"
            onClick={onhandleSubmit}
            disabled={loading}
          >
            {!loading ? "Login" : <Loading />}
          </button>
          <Link to="/Register/Signup" className="no-underline text-blue-600">
            New User ?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
