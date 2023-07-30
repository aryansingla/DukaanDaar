import React from 'react'
import "./AllUsers.css"
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'
import Navbar from '../Navbar/Navbar'
const AllUsers = () => {
    const [auth] = useAuth();
  return (
    <>
    <Navbar/>
    <div className='text-[#fff] text-center'>
    <h1 className='dashBoardTitle font-bold text-2xl mt-10'>Admin Dashboard</h1>
    <div className="dashboardContent flex">
        <div className="dashmenu p-10">
            <AdminMenu/>
        </div>
        <div className="usersContent p-10 font-semibold text-large">
            <h1>All Users</h1>
        </div>
    </div>
</div>  
</>
  )
}

export default AllUsers