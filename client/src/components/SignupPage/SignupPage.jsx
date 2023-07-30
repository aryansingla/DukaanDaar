import React,{useState} from 'react'
import "./SignUpPage.css"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
const navigate = useNavigate();
const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[address,setAddress]=useState('');
const[phone,setPhone]=useState('');
const[answer,setAnswer]=useState('');

// form function
const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/signup`,{name,email,password,address,phone,answer});
        if(res && res.data.success){
            toast.success(res.data.message);
            navigate('/login');
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
      toast.error("Something went wrong");
    }
}
  return (
    <div className='container1 w-screen'>
        <div className="signupBox flex sm:flex ">
            <div className="signupLeft ">
                <div className='signupLeftTitle text-center text-[#ffffff] font-semibold mt-8'>
                    <p className='text-4xl signupText'>Signup</p>
                </div>
                <form onSubmit={handleSubmit} className='text-[#4d70ff]'>
                <div className="inputDetails sm:mt-20 text-center" >
                        <input className="flex h-10 mt-4 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                            type="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required/>
                      <input className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required/>
                        <input className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required/>
                      <input className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            required/>
                      <input className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="text"
                            placeholder="What is your faviroute sports ?"
                            value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                            required/>
                      <input className="flex h-10 mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="text"
                            placeholder="Phone no."
                            value={phone} 
                            onChange={(e)=>setPhone(e.target.value)}
                            required/>   
                        <button className=" signupBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2] " type="submit">
                            Sign Up
                            </button>
                {/* <div className='SignInGoogle'>
                    <button className="googleBtn inline-flex justify-evenly rounded-xl items-center w-6/12 mt-16 bg-[#ffffff] sm:px-3.5 py-1.5 text-base font-semibold leading-7 text-[#000]">
                        Sign up with Google
                        <img src="./googleLogo.png" alt="google logo" />
                    </button>
                </div> */}
                <div className="newMember text-center sm:text-left w-[80%]  mt-4 m-auto flex">
                    <div className='flex m-auto'>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-300"> Already a member?</p>
                        <a href="/login"  className="font-medium text-[#5f7fff] transition-all duration-200 hover:underline mt-2 px-2">Login Here</a>
                    </div>
                </div>
            </div> 
            </form>
            </div>
            <div className="signupRight">
                <img src="./loginPic.png" alt="signupImage" className='signupImage w-[50%] sm:w-[70%] m-auto mt-16 ' />
            </div>
        </div>
        <Toaster />
    </div>
    
  )
}

export default SignupPage
