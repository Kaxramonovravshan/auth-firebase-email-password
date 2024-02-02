import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PageNout from "./pages/404/PageNout";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const openPage = ["/", "/login", "/register"];

  useEffect(() => {
    const token = localStorage.getItem("token");

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        if (!openPage.includes(location.pathname)) {
          navigate("/404");
        }
      }
    });

    
  }, [location.pathname]);

  return (
    <div>
      <div className="w-full p-3 bg-slate-900 text-white h-32 flex justify-between items-center">
        <Link to={"/"} className="">
          <h1 className="text-3xl">Logo</h1>
        </Link>
        <Link to={"/login"} className="btn btn-primary">
          Login
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/404" element={<PageNout />} />
      </Routes>
    </div>
  );
};

export default App;
