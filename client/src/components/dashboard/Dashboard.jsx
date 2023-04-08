import React from 'react'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auht] = useAuth();
  return (
    <div className='text-[#fff] text-center'>
    <h1 className='dashBoardTitle font-bold text-2xl mt-10'>Admin Dashboard</h1>
    <div className="dashboardContent">
 
        <div className="detailedContent p-10 font-semibold text-large">
            <h1>User name : {auht?.user?.name}</h1>
           
        </div>
    </div>
</div>
    )
}

export default Dashboard