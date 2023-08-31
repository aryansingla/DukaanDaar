import React, { useState } from "react";
import "./LoginPage.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[auth,setAuth]=useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
        if(res && res.data.success){
            toast.success(res.data.message);
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            });
            localStorage.setItem("auth",JSON.stringify(res.data));
            navigate(location.state || '/');
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="container1 w-screen">
      <div className="loginBox flex sm:flex ">
        <div className="loginLeft ">
          <div className="loginLeftTitle text-center text-[#ffffff] font-semibold mt-16">
            <p className="text-4xl loginText">Login</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputDetails sm:mt-20 text-center">
              <input
                className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 text-black"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgotText w-6/12  mt-4 m-auto text-left">
                <a
                  href="/forgotPassword"
                  className="text-[#ffffff] hover:underline"
                >
                  Forgot Password ?
                </a>
              </div>
              <button className=" logInBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2]"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="newMember text-center sm:text-left w-[80%]  mt-4 m-auto flex">
            <div className="flex m-auto">
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
              {" "}
              Not a member?
            </p>
            <a
              href="/signup"
              className="font-medium text-[#5f7fff] transition-all duration-200 hover:underline mt-2 px-2"
            >
              Create a free account
            </a>
            </div>
          </div>
        </div>
        <div className="loginRight">
          <img
            src="./loginPic.png"
            alt="loginImage"
            className="loginImage w-[50%] sm:w-[70%] m-auto mt-16 "
          />
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default LoginPage;
