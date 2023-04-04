import React from 'react'
import "./LoginPage.css";
const LoginPage = () => {
  return (
    <div className='container1 w-screen'>
        <div className="loginBox flex sm:flex ">
            <div className="loginLeft ">
                <div className='loginLeftTitle text-center text-[#ffffff] font-semibold mt-16'>
                    <p className='text-4xl loginText'>Login</p>
                </div>
                <div className="inputDetails sm:mt-20 text-center">
                        <input className="flex h-10 mt-4 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                            type="email"
                            placeholder="Email"></input>
                        <input className="flex h-10 mt-12 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="password"
                            placeholder="Password"></input>
                            <div className="forgotText w-6/12  mt-4 m-auto text-left">
                            <a href="/forgotPassword" className='text-[#ffffff] hover:underline'>Forgot Password ?</a>
                            </div>
                        <button className=" logInBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2] ">
                            Log In
                            </button>
                <div className='SignInGoogle'>
                    <button className="googleBtn inline-flex justify-evenly rounded-xl items-center w-6/12 mt-16 bg-[#ffffff] sm:px-3.5 py-1.5 text-base font-semibold leading-7 text-[#000]">
                        Sign in with Google
                        <img src="./googleLogo.png" alt="google logo" />
                    </button>
                </div>
                <div className="newMember text-center sm:text-left w-[80%]  mt-4 m-auto flex">
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300"> Not a member?</p>
                    <a href="/signup"  className="font-medium text-[#5f7fff] transition-all duration-200 hover:underline mt-2 px-2">Create a free account
                    </a>
                </div>
            </div> 
            </div>
            <div className="loginRight">
                <img src="./loginPic.png" alt="loginImage" className='loginImage w-[50%] sm:w-[70%] m-auto mt-16 ' />
            </div>
        </div>
    </div>
  )
}

export default LoginPage