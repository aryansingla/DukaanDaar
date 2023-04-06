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
              <Route path="/dashboard" element={<PrivateRoute/>}>
              <Route path="" element={<Dashboard />} />
              </Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgotPassword" element={<ForgotPassword />} />
              <Route path="profile" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
