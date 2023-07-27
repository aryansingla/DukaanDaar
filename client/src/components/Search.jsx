import React from 'react'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SearchInput from './Form/SearchInput';

const Search = () => {
    const [values, setValues]=useSearch();
    const navigate=useNavigate();
  return (
    <div>
        <Navbar/>

{/* Search */}
    <SearchInput/>
    {/* main data */}
        <div className='mt-5 text-white'>
           <div className='flex justify-center'> <h1 className='text-3xl'>Search Results</h1></div>
            <div className='flex justify-center'><h6>{values?.results.length < 1 ? 'No Products Found':`Found ${values?.results.length}`}</h6></div>
            <div className='flex flex-row lg:pl-10 lg:justify-evenly carousel'>
                {values?.results?.map((p)=>(
                   
                   <div className="lg:max-w-[12vw] lg:min-w-[12vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[44vw] min-w-[44vw]  max-h-fit min-h-fit m-3 text-black rounded-3xl bg-base-100 ">
                   <button className="w-full" onClick={()=>navigate(`/product/${p.slug}`)}>
                   <div className='flex justify-center mt-2 overflow-hidden rounded-3xl'><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Shoes" className=' m-2 sm:min-w-fit sm:max-w-fit sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]' /></div>
                   <div className=" p-1 pt-2 pl-2 bg-[#C5C5FF] rounded-b-3xl">
                     <p className="m-0 -mt-1 font-medium text-left sm:mt-0">{p.name}</p>
                     <p className='font-normal text-left'> $ {p.price}</p>
                   
                   </div>
                   </button>
                   </div>
             
                ))}
            </div>
        </div>
    </div>
  )
}

export default Search