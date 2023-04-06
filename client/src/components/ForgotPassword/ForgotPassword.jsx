import React, { useState } from "react";
import "../LoginPage/LoginPage.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgotpassword`,{email,newPassword,answer});
        if(res && res.data.success){
            toast.success(res.data.message);
            navigate('/login');
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
          <p className="text-4xl loginText">Forgot Password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputDetails sm:mt-20 text-center">
            <input
              className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
              type="text"
              placeholder="Enter your favourite sport"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <input
              className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
              type="password"
              placeholder="Enter your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button className=" logInBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2]"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
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
  )
}

export default ForgotPassword