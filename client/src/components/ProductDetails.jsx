import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
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
      <div className="flex text-white">
        <div className="w-[30%]">
          <img
            alt={product.name}
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="sm:min-w-[100px] sm:max-w-[100px] sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]"
          />
        </div>
        <div className="w-[70%]">
          <h1>Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product.category?.name}</h6>
          <button className="p-2 sm:p-1 btn-secondary rounded-3xl">
            Add to cart
          </button>
        </div>
      </div>
      <div className="text-white">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
        <div className="flex flex-col items-center sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-3 lg:gap-10">
          {relatedProducts?.map((p) => (
            <div className="lg:max-w-[17vw] lg:min-w-[17vw]  lg:max-h-fit lg:min-h-fit sm:max-w-[24vw] sm:min-w-[24vw]  sm:max-h-fit sm:min-h-fit max-w-[60vw] min-w-[60vw]  max-h-fit min-h-fit m-3 text-black  card bg-base-100 border-4 shadow-[0_3px_6px_6px_rgba(16,185,129,0.5)] border-emerald-400">
              <div className="flex justify-center mt-2 ">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt="Shoes"
                  className="sm:min-w-[100px] sm:max-w-[100px] sm:min-h-[100px] sm:max-h-[100px] min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]"
                />
              </div>
              <div className="card-body">
                <h2 className="m-0 -mt-1 sm:mt-0 card-title">{p.name}</h2>
                <p className="">{p.description.substring(0, 10)}...</p>
                <p className=""> $ {p.price}</p>
                <button className="p-2 sm:p-1 btn-secondary rounded-3xl">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
