import React from 'react'
import "./CreateCategory.css"
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'
const CreateCategory = () => {
  const [auht] = useAuth();
  return (
    <div className='text-[#fff] text-center'>
    <h1 className='dashBoardTitle font-bold text-2xl mt-10'>Admin Dashboard</h1>
    <div className="dashboardContent flex">
        <div className="dashmenu p-10">
            <AdminMenu/>
        </div>
        <div className="categoryContent p-10 font-semibold text-large">
            <h1>Categories</h1>
        </div>
    </div>
</div> 
    )
}

export default CreateCategory