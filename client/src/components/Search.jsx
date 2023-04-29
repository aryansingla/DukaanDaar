import React from 'react'
import { useSearch } from '../context/search'

const Search = () => {
    const [values, setValues]=useSearch();
  return (
    <div>
        <div className='text-white'>
            <h1>Search Results</h1>
            <h6>{values?.results.length < 1 ? 'No Products Found':`Found ${values?.results.length}`}</h6>
            <div className='flex flex-col items-center sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-3 lg:gap-10'>
                {values?.results?.map((p)=>(
                   
                  <div className="lg:max-w-[17vw] lg:min-w-[17vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[60vw] min-w-[60vw]  max-h-fit min-h-fit m-3 text-black  card bg-base-100 border-4 shadow-[0_3px_6px_6px_rgba(16,185,129,0.5)] border-emerald-400">
                  <div className='flex justify-center mt-2 '><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Shoes" className='sm:min-w-[100px] sm:max-w-[100px] sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]' /></div>
                  <div className="card-body">
                    <h2 className="m-0 -mt-1 sm:mt-0 card-title">{p.name}</h2>
                    <p className=''>{p.description.substring(0,10)}...</p>
                    <p className=''> $ {p.price}</p>
                    <button className="p-2 sm:p-1 rounded-3xl btn-primary">More Details</button>
                    <button className="p-2 sm:p-1 btn-secondary rounded-3xl">Add to cart</button>
                  </div>
                </div>
             
                ))}
            </div>
        </div>
    </div>
  )
}

export default Search