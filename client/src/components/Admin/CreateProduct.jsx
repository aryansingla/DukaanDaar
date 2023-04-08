import React from 'react'
import "./CreateProduct.css"
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'
const CreateProduct = () => {
    const [auht] = useAuth();
  return (
    <div className='text-[#fff] text-center'>
    <h1 className='dashBoardTitle font-bold text-2xl mt-10'>Admin Dashboard</h1>
    <div className="dashboardContent flex">
        <div className="dashmenu p-10">
            <AdminMenu/>
        </div>
        <div className="productsContent p-10 font-semibold text-large">
            <h1>Products</h1>
        </div>
    </div>
</div>     
    )
}

export default CreateProduct