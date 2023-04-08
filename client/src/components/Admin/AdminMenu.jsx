import React from 'react'
import { NavLink } from 'react-router-dom'
import "./AdminMenu.css";
const AdminMenu = () => {
  return (
    <>
    <div className="list-group text-[#fff]">
        <div>
            <button className="dashboardbtn mt-4 rounded-xl bg-[#4d70ff]  sm:w-[100%] sm:p-3 text-base font-semibold leading-7 text-white hover:bg-[#6581f2]" type="submit">
                <NavLink to ="/dashboard/admin/create-category" class=" list-group-item list-group-item-action]">
                     Create Category
                </NavLink>
            </button>
        </div>
        <div>
            <button className="  dashboardbtn mt-4 rounded-xl bg-[#4d70ff]  sm:w-[100%] sm:p-3  text-base font-semibold leading-7 text-white hover:bg-[#6581f2]" type="submit">
                <NavLink to ="/dashboard/admin/create-product" class="list-group-item list-group-item-action ">
                     Create Product
                </NavLink>
            </button>
        </div>
        <div>
            <button className=" dashboardbtn mt-4 rounded-xl bg-[#4d70ff]  sm:w-[100%] sm:p-3  text-base font-semibold leading-7 text-white hover:bg-[#6581f2]" type="submit">
                <NavLink to ="/dashboard/admin/users"  class="  list-group-item list-group-item-action">
                    Show Users
                </NavLink>
            </button>
        </div>
    </div>
    </>
  )
}

export default AdminMenu