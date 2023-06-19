import React, { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import {Checkbox, Radio} from 'antd'
import {FaShoppingCart, FaSpinner} from "react-icons/fa";
import {BsFillPlusCircleFill} from "react-icons/bs";
import Navbar from "../Navbar/Navbar";
import { Prices } from "../Prices";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products,setProducts]=useState([]);
  const [categories, setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]= useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const [categoryName,setCategoryName]=useState("");
  const navigate=useNavigate();
  const [add,setAdd]=useState(false)

  //get products
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  const [display,setDisplay]=useState(false);
  const onHamClick =()=>{
 setDisplay(!display);
  }
        //get all category
const getAllCategory =async()=>{
  try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data.success){
          setCategories(data.category);
      }
  } catch (error) {
      console.log(error);
  }
}
useEffect(() => {
getAllCategory()
getTotal()
}, [])
  //get all products
  const getAllProducts=async()=>{
    try {
      setLoading(true);
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false);
      setProducts(data.products)
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
    //get total count
    const getTotal=async()=>{
      try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
        setTotal(data?.total)
      } catch (error) {
        console.log(error);
      }
   
    }
    useEffect(()=>{
      if(page===1)return ;
      loadMore();
    },[page]);
    //load more 
    const loadMore =async()=>{
      try {
        setLoading(true);
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts([...products,...data?.products]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }


  //filter by cat
  const handleFilter=(value,id,name)=>{
    let all=[];
    if(value){
      all.push(id)
    }else{
      all=all.filter((c)=>c!==id);
    }
    setChecked(all);
    setCategoryName(name);
  }
  useEffect(()=>{
   if(!checked.length||!radio.length) getAllProducts();
    //eslint-disable-next-line
  },[checked.length,radio.length])
  useEffect(()=>{
    if(checked.length||radio.length) filterProduct()
  },[checked,radio])


  //get filtered product
  const filterProduct =async()=>{
    try {
      const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`,{checked,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }
  const addFunc=()=>{
    setAdd(!add)
  }
  return (
    <>
    <Navbar/>

{/* Search */}
    <SearchInput/>

{/* main data */}

  
    <div className="text-[#fff] text-center flex flex-col  ">
      <div className="px-4 sm:px-12">
      {/* filter by category */}
      <div className="flex flex-row justify-between mt-12 carousel">
    {categories?.map((c)=>(
      <button className=" flex justify-center carousel-item p-2.5  mx-5 sm:mx-10 min-w-[30%] max-w-fit sm:min-w-[15%] sm:max-w-fit text-[#4d70ff] bg-white rounded-xl font-semibold hover:bg-slate-200" key={c._id} onClick={(e)=>handleFilter(e.target,c._id,c.name)
      }>{c.name}</button>
    ))}
    </div>
    {/* filter by price */}
    <div className="hidden">
    <h1 className='m-3 mt-10 text-xl font-semibold '>Filter By Price</h1>
    <div className="flex flex-col items-center">
      <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
        {Prices?.map(p=>(
          <div key={p._id }>
            <Radio className="w-full my-1 text-white" value={p.array} >{p.name}</Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
    </div>
    {/* reset filter */}
    <div className="hidden mt-5" >
      <button className="p-2 px-3 font-semibold btn-primary rounded-3xl " onClick={()=>window.location.reload()}>RESET FILTERS</button>
    </div>
    </div>
        <div className="p-2 font-semibold lg:p-10 text-large">
          <div className="flex justify-start p-5">
            {(!checked.length)? <h1 className='text-3xl font-semibold '>All Items</h1>: <h1 className='text-3xl font-semibold '>{categoryName}</h1>}</div>
            <div className='flex flex-row lg:pl-10 lg:justify-evenly carousel '>
                {products?.map((p)=>(
                  <button>
                <div className=" relative lg:max-w-[12vw] lg:min-w-[12vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[44vw] min-w-[44vw]  max-h-fit min-h-fit m-3 text-black rounded-3xl bg-base-100 ">
              { 
              //  !add && 
                <div onClick={addFunc} className="flex justify-end ">
                   <button onClick={()=>{
                    setCart([...cart,p]);
                    localStorage.setItem("cart",JSON.stringify([...cart,p]));
                    toast.success("item added to cart")
                  }} > <BsFillPlusCircleFill color="#4d70ff" size={30} className="absolute -mt-1 -ml-6"/></button>
                  </div>}
                 {/* { add && <div onClick={addFunc} className= " p-1  items-center flex justify-evenly bg-[#4d70ff] w-[100%] h-[5vh] rounded-t-3xl absolute ">
                   <div className="bg-white rounded w-7 h-fit">-</div>
                   <div className="text-white">1</div>
                   <div className="bg-white rounded w-7 h-fit">+</div>
                  </div>} */}
                  
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
              
             
                ))}
            </div>
            {/* <div className="p-3 m-2">
              {
                products && products.length<total &&(
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();setPage(page+1);}}>
                {loading? <FaSpinner/> :"Loadmore"}
              </button>
                )
              }
            </div> */}
            </div>
            </div>



            
    </>
  );
};

export default HomePage;
