import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FaShoppingCart, FaSpinner } from "react-icons/fa"; 
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import {Badge} from "antd";
import Cart from "../Cart/Cart";
import logo from "../../Images/logo.png"
const Navbar = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const [openCart,setOpenCart]=useState(false);
    const categories = useCategory(); 
    const navigate = useNavigate();
    const handleLogOut = () => {
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
      };
      const [display, setDisplay] = useState(false);
      const onHamClick = () => {
        setDisplay(!display);
      };
      const handleCart=()=>{
        setOpenCart(true);
      }
  return (
    <>
    {!auth.user ? (
        <div>
          <nav className="relative flex items-center justify-between px-4 py-4 sm:px-8 ">
            <a className="flex justify-start " href="#">
              <img className="w-1/2 sm:w-1/3" src={logo} alt="logo" />
              <div className="hidden sm:ml-2 sm:flex sm:flex-col sm:justify-center">
                <div className="text-xl font-bold tracking-wide text-white">
                  Dukaan
                </div>
                <div className="-mt-1 text-lg font-semibold tracking-wide text-white">
                  Daar
                </div>
              </div>
            </a>
            <div className="md:hidden">
              <button
                onClick={onHamClick}
                className="flex items-center p-3 text-white navbar-burger"
              >
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
              <li>
                    <NavLink to="/cart">
                      <button
                        className="text-white text-xl font-medium px-4 py-2 bg-[#4d70ff] hover:bg-[#6581f2] rounded-xl -mr-3"
                        type="submit"
                      >
                        <div className="flex items-center ">
                          <div className="pr-2">Cart {cart?.length}</div>
                          <FaShoppingCart />
                        </div>
                      </button>
                    </NavLink>
                </li>
            </ul>
          </nav>
          {/* phone */}
          {display && (
            <nav className="block md:hidden absolute bg-[#070d23] bg-opacity-90 w-full text-white">
              <ul className="flex flex-col items-center py-4">
                <li className="my-4 w-full text-center hover:text-[grey]">
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
                <li>
                      <NavLink to="/cart">
                        <button
                          className="text-white text-xl font-medium px-4 py-2 bg-[#4d70ff] hover:bg-[#6581f2] rounded-xl"
                          type="submit"
                        >
                          <div className="flex items-center">
                            <div className="pr-2">Cart {cart?.length}</div>
                            <FaShoppingCart />
                          </div>
                        </button>
                      </NavLink>
                    </li>
              </ul>
            </nav>
          )}
        </div>
      ) : (
        <>
          {auth?.user?.name && (
            <div>
              <nav className="relative flex items-center justify-between px-8 py-4 ">
                <a className="flex justify-start " href="#">
                  <img className="w-1/2 sm:w-1/3" src={logo} alt="logo" />
                  <div className="hidden ml-2 sm:flex sm:flex-col sm:justify-center">
                    <div className="text-xl font-bold tracking-wide text-white">
                      Dukaan
                    </div>
                    <div className="-mt-1 text-lg font-semibold tracking-wide text-white ">
                      Daar
                    </div>
                  </div>
                </a>
                <div className="md:hidden">
                  
                  <button
                    onClick={onHamClick}
                    className="flex items-center p-3 text-white navbar-burger"
                  >
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
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
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
                        onClick={handleCart}
                      >
                        <div className="flex items-center ">
                          <div className="pr-2">Cart {cart?.length}</div>
                          <FaShoppingCart />
                        </div>
                      </button>
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <div className="hidden sm:block">
               { openCart && <Cart openCart={openCart} setOpenCart={setOpenCart}/>}
              </div>
              {/* phone */}
              {display && (
                <nav className="block md:hidden  absolute bg-[#070d23] bg-opacity-90 w-full text-white">
                  <ul className="flex flex-col items-center py-4">
                    <li className="w-full my-4 text-center ">
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
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="w-full my-4 text-center">
                      <NavLink
                        className="hover:text-[#4d70ff] py-2 text-xl font-normal text-white"
                        to="/login"
                      >
                        <button onClick={handleLogOut} type="submit">
                          Logout
                        </button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/cart">
                        <button
                          className="text-white text-xl font-medium px-4 py-2 bg-[#4d70ff] hover:bg-[#6581f2] rounded-xl"
                          type="submit"
                        >
                          <div className="flex items-center">
                            <div className="pr-2">Cart {cart?.length}</div>
                            <FaShoppingCart />
                          </div>
                        </button>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Navbar