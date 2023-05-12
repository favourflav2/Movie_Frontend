import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/Home/Home";
import MovieDetails from "./components/movieDetails/MovieDetails";
import SearchPage from "./pages/Search/SearchPage";
import { ToastContainer } from "react-toastify";
import Categories from "./pages/Categories/Categories";
import "react-toastify/dist/ReactToastify.css";
import MobileSearchPage from "./pages/Search/MobileSearchPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { useDispatch } from "react-redux";
import React from "react";
import { setUser } from "./Redux/features/authSlice";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuhtPrivateRoutes from "./components/redirects/AuhtPrivateRoutes";
import PrivateRoutes from "./components/redirects/PrivateRoutes";

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"));
  //console.log(user)

  React.useEffect(()=>{
    dispatch(setUser(user))
  },[user,dispatch])


  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />}></Route>
        <Route path="/search/:searchValue" element={<SearchPage />} />
        <Route path="/allCategories/:name" element={<Categories />} />
        <Route path="/mobileSearch" element={<MobileSearchPage />} />
        <Route path="/login" element={<AuhtPrivateRoutes><Login /></AuhtPrivateRoutes>} />
        <Route path="/signup" element={<AuhtPrivateRoutes><SignUp /></AuhtPrivateRoutes>} />
        <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
