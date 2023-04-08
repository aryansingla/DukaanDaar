import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { useAuth } from "../../context/auth";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <div className="text-[#fff]">
        HomePage
        {!auth.user ? (
          <>
            <NavLink to="/login">
              <button
                className=" logInBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2]"
                type="submit"
              >
                Log In
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button
                className=" signupBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2]"
                type="submit"
              >
                SignUp
              </button>
            </NavLink>
           
          </>
        ) : (
          <>
              {auth?.user?.name}
            <NavLink to="/login">
              <button
                onClick={handleLogOut}
                className=" signupBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2]"
                type="submit"
              >
                Logout
              </button>
            </NavLink>
            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`}>
            <button
                className=" signupBt mt-4 rounded-xl bg-[#4d70ff] px-5 w-4/12 py-1.5 text-base font-semibold leading-7 text-white hover:bg-[#6581f2]"
              >
                Dashboard
              </button>
            </NavLink>
          </>
        )}
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </>
  );
};

export default HomePage;
