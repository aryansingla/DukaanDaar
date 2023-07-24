import React,{useState,useEffect} from 'react'
import { useAuth } from '../../context/auth';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
    //context
    const[auth,setAuth] = useAuth();

    // states
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[address,setAddress]=useState('');
    const[phone,setPhone]=useState('');

    // get user data
    useEffect(()=>{
        const {email,name,phone,address} = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    },[auth?.user])

    // form function
    const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,password,address,phone});
        if(data?.error){
            toast.error(data?.error);
        } else {
            setAuth({...auth,user:data?.updatedUser})
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updatedUser
            localStorage.setItem('auth',JSON.stringify(ls));
            toast.success("Profile updated successfully");
        }
    } catch (error) {
      toast.error("Something went wrong");
    }
}

  return (
    <div className='mt-5'>
        <div className="profileForm">
        <form onSubmit={handleSubmit}>
                <div className="inputDetails  text-center" >
                        <input className="flex h-10 text-[#4d70ff] mt-4 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                            type="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                      <input className="flex h-10  text-[#4d70ff] mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)} 
                            disabled/>
                        <input className="flex h-10 text-[#4d70ff] mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                      <input className="flex h-10 text-[#4d70ff] mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            />

                      <input className="flex h-10 text-[#4d70ff] mt-6 w-6/12 m-auto border rounded-xl border-[#ffffff] bg-[#ffffff] py-2 px-3 text-md font-medium placeholder:text-[#4d70ff] focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
                            type="text"
                            placeholder="Phone no."
                            value={phone} 
                            onChange={(e)=>setPhone(e.target.value)}
                            />   
                        <button className=" signupBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2] " type="submit">
                            Update
                            </button>
            </div> 
            </form>
        </div>
    </div>
  )
}

export default Profile