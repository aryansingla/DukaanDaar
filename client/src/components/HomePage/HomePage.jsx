import React, { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import {Checkbox, Radio} from 'antd'
import {FaShoppingCart, FaSpinner} from "react-icons/fa";

import { Prices } from "../Prices";
import SearchInput from "../Form/SearchInput";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products,setProducts]=useState([]);
  const [categories, setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]= useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

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
  const handleFilter=(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id)
    }else{
      all=all.filter((c)=>c!==id);
    }
    setChecked(all);
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
  return (
    <>
    {!auth.user ?(
        <div>
        <nav className="relative flex items-center justify-between px-4 py-4 sm:px-8 ">
          <a
            className="flex justify-start "
            href="#"
          >
            
              <img  className="w-1/2 sm:w-1/3" src="logo.png" alt="logo" />
            <div className="hidden sm:ml-2 sm:flex sm:flex-col sm:justify-center">
            <div className="text-xl font-bold tracking-wide text-white">
              Dukaan
            </div>
            <div className="-mt-1 text-lg font-semibold tracking-wide text-white">
              Daar
            </div></div>
          </a>
          <div className="md:hidden">
            <button onClick={onHamClick} className="flex items-center p-3 text-white navbar-burger">
              <svg
                className="block w-6 h-6 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden mr-4 md:flex md:items-center md:justify-end grow">
            <li>
              <NavLink
                className="hover:text-[#4d70ff] px-4 py-2 mr-8 text-xl font-medium text-white"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-[#4d70ff] px-4 py-2 mr-8 text-xl font-medium text-white"
                to="/signup"
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-[#4d70ff] px-4 py-2 mr-8 text-xl font-medium text-white"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
         
        </nav>
        {/* phone */}
    { display &&   <nav className="block md:hidden absolute bg-[#070d23] bg-opacity-90 w-full text-white">
          <ul className="flex flex-col items-center py-4">
          <li className="my-4 w-full text-center hover:text-[grey]" > 
              <NavLink
                className="hover:text-[#4d70ff] py-2 text-xl font-normal text-white"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="w-full my-4 text-center">
              <NavLink
                className="hover:text-[#4d70ff] py-2 text-xl font-normal text-white"
                to="/signup"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="w-full my-4 text-center">
              <NavLink
                className="hover:text-[#4d70ff] py-2 text-xl font-normal text-white"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>}

      </div>
    ) :(
      <>
      {auth?.user?.name &&
      <div>
      <nav className="relative flex items-center justify-between px-8 py-4 ">
        <a
          className="flex justify-start "
          href="#"
        >
            <img  className="w-1/2 sm:w-1/3" src="logo.png" alt="logo" />
            <div className="hidden ml-2 sm:flex sm:flex-col sm:justify-center">
            <div className="text-xl font-bold tracking-wide text-white">
              Dukaan
            </div>
            <div className="-mt-1 text-lg font-semibold tracking-wide text-white ">
              Daar
            </div></div>
        </a>
        <div className="md:hidden">
          <button onClick={onHamClick} className="flex items-center p-3 text-white navbar-burger">
            <svg
              className="block w-6 h-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden mr-4 md:flex md:items-center md:justify-end grow">
          <li>
            <NavLink
              className="hover:text-[#4d70ff] px-4 py-2 mr-8 text-xl font-medium text-white"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:text-[#4d70ff] px-4 py-2 mr-8 text-xl font-medium text-white"
              to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
          <NavLink to="/login">
              <button
                onClick={handleLogOut}
                className="hover:text-[#4d70ff] px-4 py-2 mr-8 text-xl font-medium text-white"
                type="submit"
              >
                Logout
              </button>
            </NavLink>
          </li>
          <li>
          <NavLink to="#">
              <button
                className="text-white text-xl font-medium px-4 py-2 bg-[#4d70ff] hover:bg-[#6581f2] rounded-xl -mr-3"
                type="submit"
              >
                <div className="flex items-center "><div className="pr-2">Cart</div> 
                <FaShoppingCart/></div>
                
              </button>
            </NavLink>
          </li>
        </ul>
       
      </nav>
             {/* phone */}
    { display &&  <nav className="block md:hidden  absolute bg-[#070d23] bg-opacity-90 w-full text-white">
          <ul className="flex flex-col items-center py-4">
          <li className="w-full my-4 text-center " > 
              <NavLink
                className="py-2 text-xl font-normal text-white hover:text-[#4d70ff]"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="w-full my-4 text-center">
              <NavLink
                className="hover:text-[#4d70ff] py-2 text-xl font-normal text-white"
                to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="w-full my-4 text-center">
              <NavLink
                className="hover:text-[#4d70ff] py-2 text-xl font-normal text-white"
                to="/login"
              >
                   <button
                onClick={handleLogOut}
                type="submit"
              >
                Logout
              </button>
              </NavLink>
            </li>
            <li>
          <NavLink to="#">
              <button
                className="text-white text-xl font-medium px-4 py-2 bg-[#4d70ff] hover:bg-[#6581f2] rounded-xl"
                type="submit"
              >
                <div className="flex items-center"><div className="pr-2">Cart</div> 
                <FaShoppingCart/></div>
                
              </button>
            </NavLink>
          </li>
          </ul>
        </nav>}
    </div>}
    </>
    ) }

{/* Search */}
    <SearchInput/>

{/* main data */}

  
    <div className="text-[#fff] text-center flex flex-col-reverse sm:flex-row sm:flex ">
      <div className="ml-5">
      {/* filter by category */}
    <h1 className='m-3 mt-10 text-xl font-semibold'>Filter By Category</h1>
    <div className="flex flex-col items-center">
    {categories?.map((c)=>(
      <Checkbox className="w-[65%] my-1 text-white" key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)
      }>{c.name}</Checkbox>
    ))}
    </div>
    {/* filter by price */}
    <h1 className='m-3 mt-10 text-xl font-semibold'>Filter By Price</h1>
    <div className="flex flex-col items-center">
      <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
        {Prices?.map(p=>(
          <div key={p._id }>
            <Radio className="w-full my-1 text-white" value={p.array} >{p.name}</Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
    <div className="mt-5" >
      <button className="p-2 px-3 font-semibold btn-primary rounded-3xl" onClick={()=>window.location.reload()}>RESET FILTERS</button>
    </div>
    </div>
        <div className="lg:ml-16 p-10 font-semibold sm:w-[65%] text-large">
            <h1 className='pb-8 text-3xl font-semibold '>All Products</h1>
            <div className='flex flex-col items-center sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-3 lg:gap-10'>
                {products?.map((p)=>(
                   
                  <div className="lg:max-w-[17vw] lg:min-w-[17vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[60vw] min-w-[60vw]  max-h-fit min-h-fit m-3 text-black  card bg-base-100 border-4 shadow-[0_3px_6px_6px_rgba(16,185,129,0.5)] border-emerald-400">
                  <div className='flex justify-center mt-2 '><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Shoes" className='sm:min-w-[100px] sm:max-w-[100px] sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]' /></div>
                  <div className="card-body">
                    <h2 className="m-0 -mt-1 sm:mt-0 card-title">{p.name}</h2>
                    <p className=''>{p.description.substring(0,10)}...</p>
                    <p className=''> $ {p.price}</p>
                    <button className="p-2 sm:p-1 rounded-3xl btn-primary" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="p-2 sm:p-1 btn-secondary rounded-3xl">Add to cart</button>
                  </div>
                </div>
             
                ))}
            </div>
            <div className="p-3 m-2">
              {
                products && products.length<total &&(
              <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();setPage(page+1);}}>
                {loading? <FaSpinner/> :"Loadmore"}
              </button>
                )
              }
            </div>
            </div>
            </div>



            
    </>
  );
};

export default HomePage;

