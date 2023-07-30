import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Loader from "./components/Loader/Loader";
import { IntroPage } from "./components/IntroPage/IntroPage";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CreateCategory from "./components/Admin/CreateCategory";
import CreateProduct from "./components/Admin/CreateProduct";
import AllUsers from "./components/Admin/AllUsers";
import Products from "./components/Admin/Products";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Search from "./components/Search";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart/Cart";
import Orders from "./components/dashboard/Orders";
import Profile from "./components/dashboard/Profile";
import AllOrders from "./components/Admin/AllOrders";

function App() {
  const [loading, setLoading] = useState(true);
  const [userIn, setUserIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(t);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="intro" element={<IntroPage />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="user" element={<Dashboard />} />
                <Route path="user/orders" element={<Orders />} />
                <Route path="user/profile" element={<Profile />} />
              </Route>
              <Route path="/dashboard" element={<AdminRoute />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route
                  path="admin/create-category"
                  element={<CreateCategory />}
                />
                <Route path="admin/products" element={<Products />} />
                <Route
                  path="admin/create-product"
                  element={<CreateProduct />}
                />
                <Route path="admin/product/:slug" element={<UpdateProduct />} />
                <Route path="admin/users" element={<AllUsers />} />
                <Route path="admin/orders" element={<AllOrders />} />
              </Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgotPassword" element={<ForgotPassword />} />
              {/* <Route path="profile" element={<ProfilePage />} /> */}
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
