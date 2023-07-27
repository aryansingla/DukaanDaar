import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import {BsFillPlusCircleFill} from "react-icons/bs";
import { NavLink,useNavigate } from "react-router-dom";

const CardComp = ({p,idx,cart,setCart}) => {
    const [add,setAdd]=useState(false);
    const [count,setCount]=useState(1);
    const navigate=useNavigate();
    
    
     const addFunc=()=>{
            setAdd(!add)
          }
  return (
    <div>
    <button key={idx}>
         <div className=" relative lg:max-w-[12vw] lg:min-w-[12vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[44vw] min-w-[44vw]  max-h-fit min-h-fit m-3 text-black rounded-3xl bg-base-100 ">
       { 
        !add && 
         <div onClick={addFunc} className="flex justify-end ">
            <button > <BsFillPlusCircleFill color="#4d70ff" size={30} className="absolute -mt-1 -ml-6"/></button>
           </div>}
          { add && <div onClick={addFunc} className= " p-1  items-center flex justify-evenly bg-[#4d70ff] w-[100%] h-[5vh] rounded-t-3xl absolute ">
            <div onClick={setCount(count+1)} className="bg-white rounded w-7 h-fit">-</div>
            <div className="text-white">{count}</div>
            <div onClick={()=>{
             setCart([...cart,p]);
             localStorage.setItem("cart",JSON.stringify([...cart,p]));
             toast.success("item added to cart");setCount(count+1)
           }} className="bg-white rounded w-7 h-fit">+</div>
           </div>}
           
          <button className="w-full" onClick={()=>navigate(`/product/${p.slug}`)}>
         <div className='flex justify-center mt-2 overflow-hidden rounded-3xl'><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Shoes" className=' m-2 sm:min-w-fit sm:max-w-fit sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]' /></div>
         <div className=" p-1 pt-2 pl-2 bg-[#C5C5FF] rounded-b-3xl">
           <p className="m-0 -mt-1 font-medium text-left sm:mt-0">{p.name}</p>
           {/* <p className=''>{p.description.substring(0,10)}...</p> */}
           <p className='font-normal text-left'> $ {p.price}</p>
         
         </div>
         </button>
        
       </div>
       </button>
</div>
  )
}

export default CardComp