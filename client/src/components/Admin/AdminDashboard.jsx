import React from 'react'
import "./AdminDashboard.css"
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
    const [auht] = useAuth();
  return (
    <div className='text-[#fff] text-center'>
        <h1 className='dashBoardTitle font-bold text-2xl mt-10'>Admin Dashboard</h1>
        <div className="dashboardContent flex">
            <div className="dashmenu p-10">
                <AdminMenu/>
            </div>
            <div className="detailedContent p-10 font-semibold text-large">
                <h1>Admin name : {auht?.user?.name}</h1>
                <h1>Admin email : {auht?.user?.email}</h1>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard