import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SearchInput from "./Form/SearchInput";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate=useNavigate();
  //initalProduct details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
        <Navbar/>

{/* Search */}
    <SearchInput/>
    {/* main data */}
      <div className="flex flex-col text-base text-white sm:flex-row">
        <div className="sm:w-[30%] sm:m-5 mx-10 mt-5 flex justify-center">
          <img
            alt={product.name}
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="sm:min-w-[12rem] sm:max-w-[12rem] sm:min-h-[12rem] sm:max-h-[12rem] min-w-[10rem] max-w-[10rem] min-h-[10rem] max-h-[10rem] rounded-2xl"
          />
        </div>
        <div className="sm:w-[70%] ml-10 mt-5">
          <h1>Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product.category?.name}</h6>
          <button
          onClick={()=>{
            setCart([...cart,product]);
            localStorage.setItem("cart",JSON.stringify([...cart,product]));
            toast.success("item added to cart")
          }}
           className="w-40 p-2 text-base sm:px-3 sm:py-1 btn-secondary rounded-3xl">
            Add to cart
          </button>
        </div>
      </div>
      <div className="mt-5 text-lg text-white">
        <div className="flex justify-center text-xl text-[#4d70ff]"><h1>Similar Products</h1></div>
        {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
        <div className='flex flex-row lg:pl-10 lg:justify-evenly carousel '>
          {relatedProducts?.map((p) => (
<div className=" relative lg:max-w-[12vw] lg:min-w-[12vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[44vw] min-w-[44vw]  max-h-fit min-h-fit m-3 text-black rounded-3xl bg-base-100 ">
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
    </>
  );
};

export default ProductDetails;
