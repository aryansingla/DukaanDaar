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
    <div className='text-[#fff] text-center'>
    <div className="dashboardContent sm:flex ">


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