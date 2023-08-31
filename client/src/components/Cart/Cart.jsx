import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiFillEdit } from "react-icons/ai";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const Cart = ({openCart,setOpenCart}) => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [load, setLoad] = useState(false);
  const[value,setValue] = useState(true); 

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

  // get payment gateway token 
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments
  const handlePayment = async() => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
<div className="sm:w-[100%] sm:z-10 sm:absolute sm:flex sm:justify-end sm:backdrop-blur-lg">
      <div className=" h-full sm:w-[35%] w-[100%] cartContainer text-[#fff] text-lg sm:bg-black">        <div className="cartTitle bg-[#4d70ff] p-3 pt-4 rounded-b-[1rem] text-center">
      <div className="cartTitle bg-[#4d70ff] p-3 pt-4 rounded-b-[1rem] text-center">
          {/* big screen  */}
            <div className="TtitleItems sm:flex hidden w-[60%] justify-between">
            <AiOutlineLeft className=" cursor-pointer mt-[0.35rem]" onClick={() => setOpenCart(false)}/>
            <h3 className="text-[#fff] font-semibold text-xl ">Checkout</h3>
            </div>
            {/* small screen  */}
            <div className="TtitleItems flex w-[60%] justify-between sm:hidden">
            <AiOutlineLeft className="cursor-pointer mt-[0.35rem]" onClick={() =>navigate("/")}/>
            <h3 className="text-[#fff] font-semibold text-xl ">Checkout</h3>
            </div>
        </div>
        </div>

        <div className="userName mt-3  pl-4">
          <h1 className="text-xl">{`Hey ${
            auth?.token && auth?.user?.name
          }`}</h1>
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
                  <h3 className="mt-[-10px]"> Quantity : {p.quantity}</h3>
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
              <div
                className="editAddress flex"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                <p className=" text-[#4d70ff]">Edit Address </p>
                <AiFillEdit className=" text-[#4d70ff] mt-1 pl-2 text-2xl" />
              </div>
            </>
          ) : (
            <>
              {auth?.token ? (
                <p
                  className=" text-[#4d70ff]"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </p>
              ) : (
                <p
                  className=" text-[#4d70ff]"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Please Login to Checkout
                </p>
              )}
            </>
          )}

          {auth?.token ? (
            <>
              {!clientToken || !cart?.length ? (""):(
                <>
                <div className="payment">
                <DropIn
                  options={{
                    authorization: clientToken,
                    stripe: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn bg-[#4d70ff]  text-[#fff] border-none w-[100%] text-md"
                  onClick={handlePayment} disabled={!instance || !auth?.user?.address}
                >
                  {load ? "Processing .." : "Make Payment"}
                </button>
              </div>
                </>
              )}
          <div className="buttonInCart w-[90%] m-auto mt-4">

                {/* small screen  */}
                <button
                className="sm:hidden block btn bg-[#c5c5ff] text-[#000] border-none w-[100%] text-md mt-3 hover:text-[#fff]"
                onClick={() => navigate("/")}
                >
                Continue Shopping
                </button>
                {/* big screen  */}
                <button
                className="sm:block hidden btn bg-[#c5c5ff] text-[#000] border-none w-[100%] text-md mt-3 hover:text-[#fff]"
                onClick={() => {navigate("/");
                setOpenCart(false)}}
                >
                Continue Shopping
                </button>
            </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default Cart;
