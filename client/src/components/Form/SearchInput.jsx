import React from 'react'
import {useSearch} from '../../context/search'
import axios from 'axios';
import {TbSearch} from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {
  const [values,setValues]=useSearch();
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
      setValues({...values,results:data});
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <form role='search' onSubmit={handleSubmit}>
    <div className="hidden w-[45%] mt-8 sm:flex sm:items-center sm:justify-center m-auto">
       
       <input
         type="search"
         className=" w-full py-2.5 pl-4 pr-4 text-md font-semibold placeholder-[#4d70ff]  bg-gray-100 dark:bg-gray-800 rounded-l-xl focus:outline-none focus:bg-white focus:text-gray-900"
         placeholder="What are you looking for?" 
         value={values.keyword}
         onChange={(e)=>setValues({...values, keyword:e.target.value})}
         />
         <button type='submit' className="py-3 px-5 bg-[#4d70ff] rounded-r-xl hover:cursor-pointer hover:bg-[#6581f2]"><TbSearch  style={{color: "white", backgroundColor:"#4d70ff"}}/></button>
     </div>
     <div className="sm:hidden w-[70%] mt-8 flex items-center justify-center m-auto">
    
    <input
      type="search"
      className=" w-full py-1.5 pl-3 pr-4 text-sm font-semibold placeholder-[#4d70ff]  bg-gray-100 dark:bg-gray-800 rounded-l-xl focus:outline-none focus:bg-white focus:text-gray-900"
      placeholder="Search Here..." 
      value={values.keyword}
      onChange={(e)=>setValues({...values, keyword:e.target.value})}
      />
      <button className="py-2 px-3 bg-[#4d70ff] rounded-r-xl  hover:bg-[#6581f2]" type='submit'><TbSearch  style={{color: "white", backgroundColor:"#4d70ff"}}/></button>
  </div>
    </form>
    </>
  )
}

export default SearchInput