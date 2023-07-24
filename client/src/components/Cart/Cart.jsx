import React from "react";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft , AiFillEdit } from "react-icons/ai";
const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((p) => p._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    
      <div className="cartContainer text-[#fff] text-lg">

        <div className="cartTitle bg-[#4d70ff] p-3 pt-4 rounded-b-[1rem] text-center">
            <div className="TtitleItems flex w-[60%] justify-between">
            <AiOutlineLeft className="mt-[0.35rem]" onClick={() => navigate("/")}/>
            <h3 className="text-[#fff] font-semibold text-xl ">Checkout</h3>
            </div>
        </div>

        <div className="userName mt-3  pl-4">
            <h1 className="text-xl">{`Hey ${auth?.token && auth?.user?.name}`}</h1>
            <h4 className="text-lg">
            {cart.length > 1
                ? `You have ${cart.length} items in your cart 
                    ${auth?.token ? "" : "Please login to continue"}`
                : `You have ${cart.length} item in your cart`}
            </h4>
        </div>

        <div className="cartItems mt-8">
          {cart?.map((p) => (
            <div className="cartItem bg-[#c5c5ff] p-2 pt-3 mt-3 rounded-2xl ml-4 mr-4">
              <div className="cartItemBox flex justify-around">
              <div className="itemImage min-w-[33%]  ">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt="Shoes"
                  className="md:min-w-[100px] md:max-w-[100px] md:min-h-[100px] md:max-h-[100px]
                            min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]"
                />
              </div>
              <div className="itemDetails text-[black] min-w-[33%]">
                <h1>{p.name}</h1>
                <h3 className="mt-[-10px]"> ₹ {p.price}</h3>

              </div>
              <div className="removeButton ">
              <button
                  className="btn bg-[#fff] text-[#000] rounded-full border-none"
                  onClick={() => removeCartItem(p._id)}
                >
                  X
                </button>
              </div>             
              </div>
            </div>
          ))}
        </div>

        <div className="cartTotal mt-16 p-5">
            <div className="delivery flex justify-between pr-3 text-[#b3adad]">
                <div className="text-sm ">Delivery</div>
                <div className="text-sm ">Free</div>
            </div>
            <div className="totalPrice flex justify-between pr-3">
                <div className="text-lg">Grand Total</div>
                <div>₹ {cart.reduce((acc, curr) => acc + curr.price, 0)}</div>
            </div>
            {auth?.user?.address ? (
                <>
                  <div className="address flex justify-between pr-3">
                    <div className="text-lg">Address</div>
                    <p> {auth?.user?.address}</p>
                  </div>
                  <div className="editAddress flex"  onClick={()=> navigate("/dashboard/user")}>
                  <p className=" text-[#4d70ff]">
                  Edit Address </p>
                  <AiFillEdit className=" text-[#4d70ff] mt-1 pl-2 text-2xl"/>
                  </div>

                </>
              ):(
                <>
                  {auth?.token ? (
                  <p className=" text-[#4d70ff]" onClick={()=> navigate("/dashboard/user")}>Update Address</p>
                  ) : (
                    <p className=" text-[#4d70ff]" 
                    onClick={()=> navigate("/login" , {
                        state:"/cart",
                    })}>
                      Please Login to Checkout</p>
                  )}
                </>
              )}
               {auth?.token ? (
            <div className="buttonInCart w-[90%] m-auto mt-4">
                <button
                className="btn bg-[#4d70ff]  text-[#fff] border-none w-[100%] text-md"
                onClick={() => navigate("/checkout")}
                >
                Make Order
                </button>
                <button
                className="btn bg-[#c5c5ff] text-[#000] border-none w-[100%] text-md mt-3"
                onClick={() => navigate("/")}
                >
                Continue Shopping
                </button>
            </div>
               ):""}
        </div>
      </div>
    </>
  );
};

export default Cart;
