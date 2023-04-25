import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {

  return (
    <>
        <form onSubmit={handleSubmit}>
        <div className=" w-[65%] sm:w-[60%] mb-10 sm:flex sm:items-center sm:justify-center m-auto">
       
       <input
        
         className=" w-full py-2 pl-4 pr-4  sm:mb-0 mb-4 mr-3 text-sm md:text-md font-semibold placeholder-[#4d70ff] rounded-lg  bg-gray-100 dark:bg-gray-800  focus:outline-none focus:bg-white focus:text-gray-900"
         type="text" placeholder='Enter new category' value={value} onChange={(e)=>setValue(e.target.value)} />
         <button type='submit' className="text-sm md:text-md font-semibold py-2 px-5 bg-[#4d70ff] rounded-lg hover:cursor-pointer hover:bg-[#6581f2]">Submit</button>
     </div>
        </form>

     
    </>
  )
}

export default CategoryForm