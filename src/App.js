import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import React, { Suspense, lazy }  from "react";
import { setUser } from "./Redux/features/authSlice";
import AuhtPrivateRoutes from "./components/redirects/AuhtPrivateRoutes";
import PrivateRoutes from "./components/redirects/PrivateRoutes";

const Home = lazy(() => import("./pages/Home/Home"))
const MovieDetails = lazy(() => import("./components/movieDetails/MovieDetails"))
const SearchPage =  lazy(() => import("./pages/Search/SearchPage"))
const Categories = lazy(() => import("./pages/Categories/Categories"))
const MobileSearchPage = lazy(() => import("./pages/Search/MobileSearchPage"))
const Login = lazy(() => import("./pages/Auth/Login"))
const SignUp = lazy(() => import("./pages/Auth/SignUp"))
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"))

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
        <Route path="/" element={
          <Suspense fallback={<div className="homebg w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
            <Home />
          </Suspense>
        } />
        <Route path="/movie/:id" element={
          <Suspense fallback={<div className="bg-gray-400/70 w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
            <MovieDetails />
          </Suspense>
        }></Route>
        <Route path="/search/:searchValue" element={
          <Suspense fallback={<div className="bg-gray-400/30 w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
            <SearchPage />
          </Suspense>
        } />
        <Route path="/allCategories/:name" element={
          <Suspense fallback={<div className="bg-gray-400/30 w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
            <Categories />
          </Suspense>
        } />
        <Route path="/mobileSearch" element={
          <Suspense fallback={<div className="bg-gray-400/50 w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
            <MobileSearchPage />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<div className=" w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
            <AuhtPrivateRoutes><Login /></AuhtPrivateRoutes>
          </Suspense>
        } />
        <Route path="/signup" element={
          <Suspense fallback={<div className=" w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
            <AuhtPrivateRoutes><SignUp /></AuhtPrivateRoutes>
          </Suspense>
        } />
        <Route path="/dashboard" element={
          <Suspense fallback={<div className="bg-black/80 w-full h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <PrivateRoutes><Dashboard /></PrivateRoutes>
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
