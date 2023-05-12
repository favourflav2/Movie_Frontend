import React from 'react'
import {
    Box, Typography,
  } from "@mui/material";
import Trending from './Trending';
import TopMovies from './TopMovies';
import TopRated from './TopRated';
import { useDispatch, useSelector } from "react-redux";
import { getLikedMovies } from '../../Redux/features/authSlice';

export default function Home() {
  const { user} = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  React.useEffect(()=>{
    if(user?.user?._id){
      dispatch(getLikedMovies())
    }
    // eslint-disable-next-line
  },[user])
  return (
    <div className='mt-[90px] pt-10 flex flex-col w-full h-full justify-center  items-center bg-gray-400/20'>

        {/* Content Container */}
      <Box className=" w-[90%] h-full">

            {/* Title For HomePage */}
        <Typography className='flex justify-center sm:text-2xl text-[22px] font-bold p-5 text-indigo-500 sm:my-10 mt-10 mb-[70px] underline'>Welcome To The Movie DataBase</Typography>


        {/* Trending Section */}
        <Trending />

        {/* Top Movies */}
        <TopMovies />

        {/* Top Rated */}
        <TopRated />




      </Box>
    </div>
  )
}

