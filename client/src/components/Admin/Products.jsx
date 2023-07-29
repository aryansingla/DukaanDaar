import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Products = () => {
  //get all products
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="text-[#fff] text-center">
      <h1 className="mt-10 text-2xl font-bold dashBoardTitle">
        Admin Dashboard
      </h1>
      <div className="flex flex-col-reverse sm:flex-row sm:flex ">
        <div className="p-10 dashmenu">
          <AdminMenu />
        </div>
        <div className="lg:ml-16 p-10 font-semibold sm:w-[65%] text-large">
          <h1 className="pb-8 text-3xl font-semibold ">Manage Products</h1>
          <div className="flex flex-col items-center sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-3 lg:gap-10">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                {/* <div className="lg:max-w-[17vw] lg:min-w-[17vw]  lg:max-h-[45vh] lg:min-h-[45vh] sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-[32vh] sm:min-h-[32vh] max-w-[60vw] min-w-[60vw]  max-h-[35vh] min-h-[35vh] m-3 text-black  card bg-base-100 border-4 shadow-[0_3px_6px_6px_rgba(16,185,129,0.5)] border-emerald-400">
                  <div className="flex justify-center mt-2 ">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt="Shoes"
                      className="sm:min-w-[100px] sm:max-w-[100px] sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]"
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="m-0 -mt-1 sm:mt-0 card-title">{p.name}</h2>
                    <p className="">{p.description}</p>
                  </div>
                </div> */}
                    <div className="lg:max-w-[12vw] lg:min-w-[12vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[44vw] min-w-[44vw]  max-h-fit min-h-fit m-3 text-black rounded-3xl bg-base-100 ">
                   {/* <button className="w-full" onClick={()=>navigate(`/product/${p.slug}`)}> */}
                   <div className='flex justify-center mt-2 overflow-hidden rounded-3xl'><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Shoes" className=' m-2 sm:min-w-fit sm:max-w-fit sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]' /></div>
                   <div className=" p-1 pt-2 pl-2 bg-[#C5C5FF] rounded-b-3xl">
                     <p className="m-0 -mt-1 font-medium text-left sm:mt-0">{p.name}</p>
                     <p className='font-normal text-left'> $ {p.price}</p>
                   
                   </div>
                   {/* </button> */}
                   </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Products;
