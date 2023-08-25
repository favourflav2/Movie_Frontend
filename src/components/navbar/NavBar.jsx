import {
  Box,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  
  Skeleton,
  useMediaQuery
} from "@mui/material";
import React from "react";
import logo2 from "../../assets/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";

import { Link as ReactLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


import SearchCard from "../cards/SearchCard";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import { setLogOut } from "../../Redux/features/authSlice";
import jwt_decode from "jwt-decode";


export default function NavBar() {

  const { user } = useSelector((state) => state.auth);
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState(false);
  const refOne = React.useRef(null);
  const [openSearch, setOpenSearch] = React.useState(false);

  const userId = user?.user?._id
  //console.log(user?.token)

  const isNonMobile = useMediaQuery("(min-width:842px)");

  if(user?.token){
    if(user?.token?.length > 55){
      const decode = jwt_decode(user?.token)
      if(decode.exp * 1000 < new Date().getTime()){
        console.log("Jwt expired logged out")
        dispatch(setLogOut())
        navigate("/")
      }
    }
  }

  

  async function handleSearch(search) {
    setIsFetching(true);

    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`
    );
    if (!res.data) {
      setError(true);
      setIsFetching(false);
    }
    setOpenSearch(true);
    setData(res.data);
    setIsFetching(false);
  }

  async function handleEnter(e) {
    if (e.key === "Enter") {
      if (searchValue) {
        //dispatch(searchEnterMovies({searchValue}))
        navigate(`/search/${searchValue}`);
        setOpenSearch(false);
        setSearchValue("");
      }
    }
  }

  function handleClickOutside(e) {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenSearch(false);
    }
  }

 

  // if (user?.token) {
  //   const decoded: any = jwt_decode(user?.token);
  //   if (decoded.exp * 1000 < new Date().getTime()) {
  //     console.log("jwt expired");
  //     dispatch(setLogout());
  //     navigate("/")
  //   }
  // }
  



  React.useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    }
  }, [error]);

  return (
    <Box
      className="w-full h-[90px] flex justify-between navBarShadow fixed top-0 left-0 right-0 z-10 bg-white/80
    backdrop-blur-md"
    >
      {/* Left Side */}
      <Box className="flex items-center p-5">
        <img src={logo2} alt="logo" className="w-[45px] mr-2 " />
        <Typography className="text-3xl">
          <span>M</span>ovie<span>D</span>
          <span>B</span>
        </Typography>
      </Box>

      {/* Right Side */}
      {isNonMobile && <Box className="flex items-center p-5 ">
       
        <Box className="flex flex-col mr-5">
          <Box className="">
            <input
              type="text"
              className="w-[250px] input indent-2 h-[30px] placeholder-black/60"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="Search A Movie"
              onKeyDown={handleEnter}
            />
            <SearchIcon />
          </Box>

          {/* if we are typing our search dropdwon will appear.... if our dropdown is there we add our loading state... then render what we have to render */}
          {openSearch ? (
            !isFetching ? (
              <div
                className="absolute mt-[32px] w-[274px] bg-gray-700 rounded-md flex flex-col pb-1 pt-1"
                ref={refOne}
              >
                {data?.results?.slice(0, 6).map((item, index) => (
                  <SearchCard
                    item={item}
                    key={index}
                    setOpenSearch={setOpenSearch}
                    setSearchValue={setSearchValue}
                  />
                ))}
              </div>
            ) : (
              <div
                className="absolute mt-[32px] w-[274px] bg-gray-700 rounded-md flex flex-col pb-1 pt-1"
                ref={refOne}
              >
                <Skeleton className="h-[100px]  my-1 hover:bg-gray-500/60" />
              </div>
            )
          ) : (
            <></>
          )}
        </Box>

        <ReactLink to="/">
          <Typography className="mx-2 text-[19px] transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-106 hover:text-indigo-500 duration-300 cursor-pointer hover:border-b hover:border-indigo-500 ">
            Home
          </Typography>
        </ReactLink>

        {!userId && <Typography className="ml-5 text-[19px] transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-106 hover:text-indigo-500 duration-300 cursor-pointer hover:border-b hover:border-indigo-500 ">
          <ReactLink to="/login">Log In</ReactLink>
        </Typography>}

        {userId && <Box className='flex items-center mr-2 ml-2 transition ease-in-out delay-150 group cursor-pointer hover:-translate-y-[1px] hover:scale-106' onClick={handleClick2}>
            <IconButton>
              <PersonIcon className=" group-hover:text-indigo-500  "/>
            </IconButton>

            <Typography className="text-[19px] group-hover:underline group-hover:text-indigo-500">Profile: <span>{user?.user?.userName}</span></Typography>
        </Box>}

        <Menu
        id="basic-menu"
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose2}><ReactLink to='/dashboard'>Dashboard</ReactLink></MenuItem>
        <MenuItem onClick={()=>{
          dispatch(setLogOut())
          handleClose2()
        }}>Logout</MenuItem>
      </Menu>
        
      </Box>}

      

      {/* Mobile Side */}
      {!isNonMobile && <Box className=" flex items-center">
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>
      </Box>}

      {/* Menu Drawer */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={()=>{
          handleClose()
          navigate("/")
        }}>Home</MenuItem>
        <MenuItem onClick={()=>{
          handleClose()
          navigate("/dashboard")
        }}>Dashboard</MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/mobileSearch");
            handleClose();
          }}
        >
          Search Movies
        </MenuItem>
        
        {!user?.user?._id &&<MenuItem onClick={handleClose}><ReactLink to="/login">Log In</ReactLink></MenuItem>}
        {user?.user?._id && <MenuItem onClick={()=>{
          handleClose()
          dispatch(setLogOut())
          navigate("/")
        }}>Log Out</MenuItem>}
      </Menu>
    </Box>
  );
}
