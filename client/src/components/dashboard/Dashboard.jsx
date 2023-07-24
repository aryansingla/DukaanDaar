import React,{useState} from 'react'
import { useAuth } from '../../context/auth'
import Profile from './Profile';
import Orders from './Orders';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
    const [auth] = useAuth();
    const[display,setDisplay] = useState("Profile")
  return (
    <>
    <Navbar/>
    <div className='text-[#fff] text-center'>
    <h1 className='dashBoardTitle font-bold text-2xl mt-10'>Your Dashboard</h1>
    <div className="font-semibold text-large sm:p-10">
            <h1>User name : {auth?.user?.name}</h1>
        </div>
    <div className="dashboardContent sm:flex ">
        <div className="displayButtons flex justify-around sm:justify-start sm:flex sm:flex-col sm:w-[30%] items-center mt-4">
            <div className="button1 w-[35%]">
            <button className="text-white text-xl font-medium px-4 py-2 bg-[#4d70ff] hover:bg-[#6581f2] rounded-xl -mr-3 w-[100%]" onClick={()=>{setDisplay("Profile")}}>Profile</button>
            </div>
            <div className="button2 w-[35%] sm:mt-3">
            <button className="text-[#4d70ff] text-xl font-medium px-4 py-2 bg-[#fff] hover:bg-[#d5d4d4] rounded-xl -mr-3 w-[100%]" onClick={()=>{setDisplay("Orders")}}>Orders</button>
            </div>
        </div>

        <div className="mainDisplayContent sm:w-[70%]">
            {display=="Profile" ? 
            <>
            <div className="contentByButtons">
                <Profile/>
            </div>
            </> : "" }

            {display=="Orders" ? 
            <>
            <div className="contentByButtons">
                <Orders/>
            </div>
            </> : "" }
        </div>

        

    </div>
</div>
</>
    )
}

export default Dashboard