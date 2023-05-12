import { Box, Typography, useMediaQuery, IconButton } from "@mui/material";
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { likeMovie } from "../../Redux/features/authSlice";

export default function SearchCardGrid({ item }) {
  const { user, savedMovies } = useSelector((state) => state.auth);
  const isNonMobile = useMediaQuery("(min-width:640px)");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  return (
    <Box className="h-[460px] " onClick={()=>{
        navigate(`/movie/${item.id}`)
      }}>
      {/* Content */}
      <Box className="w-full h-full flex flex-col relative">
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
              : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
          }
          alt="Movie Pic"
          className="  h-[80%] w-full  "
          
        />

        {/* Movie Name at the bottom with date*/}
        <Box className="flex flex-col w-full p-1">
          {item.title.length > 80 ? (
            <Typography className="text-[16px] font-bold flex justify-center mt-3 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-105  duration-300 no-underline hover:underline hover:text-indigo-500 ">
              <Link to={`/movie/${item.id}`}>
                {item.title.slice(0, 75) + "..."}
              </Link>
            </Typography>
          ) : (
            <Typography className="text-[16px] font-bold flex justify-center mt-3 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-105  duration-300 no-underline hover:underline hover:text-indigo-500 ">
              <Link to={`/movie/${item.id}`}>{item.title}</Link>
            </Typography>
          )}

          <Box className="flex items-center justify-center">
            <Typography className="font-bold">
              {" "}
              <span className=" font-normal">Year:</span>{" "}
              {item?.release_date ? item?.release_date?.slice(0, 4) : "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* OverLay */}
        <Box className="absolute w-full h-[80%] flex flex-col  bg-black/80 items-center  opacity-0  hover:opacity-100 duration-500 z-10  group">

          {/* Title and Star */}
          <Box className="flex items-center w-full  sm:mb-10 mb-2 h-auto">

            <Typography className="font-bold sm:text-[24px] text-[18px] text-gray-300 transition ease-in-out delay-150 hover:underline cursor-pointer hover:-translate-y-[1px] hover:scale-107  duration-300 hover:text-indigo-500 pl-2 w-[85%] flex justify-center">
              {item.title.length > 50 ? 
              (
                <Link to={`/movie/${item.id}`}>{item.title.slice(0,35) + "..."}</Link>
              ) 
              : 
              (
                <Link to={`/movie/${item.id}`}>{item.title}</Link>
              )
              }
            </Typography>


            {/* We are going to loop array of the users saved movies array... if it contains we return liked start... if it doesnt contain we return empty star */}
            
          </Box>


          {/* Info Movie */}
          <Box className="p-2">
                    {/* <Typography className="text-white font-bold text-[20px]">{item.overview.length > 150 ? <span>{item.overview}</span> + "..." : item.overview}</Typography> */}
                    {item.overview.length > 150 ? (
                      <div className=" text-gray-300 font-bold text-[19px]">
                        {isNonMobile ? (
                          <span className="sm:text-[19px] text-[15px]">
                            {item.overview.slice(0, 120) + "..."}{" "}
                          </span>
                        ) : (
                          <span className="sm:text-[19px] text-[15px]">
                            {item.overview.slice(0, 80) + "..."}{" "}
                          </span>
                        )}
                        <button className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-108  duration-300 text-[16px] sm:text-[21px] no-underline hover:underline text-gray-300 hover:text-indigo-500">
                          <Link to={`/movie/${item.id}`}>Read More</Link>
                        </button>
                        {/* <Box className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                                <span className="text-gray-300 text-[22px] no-underline hover:underline">Read More</span>
                                </Box> */}
                      </div>
                    ) : (
                      <span className=" text-gray-300 font-bold text-[19px]">
                        {item.overview}
                      </span>
                    )}
                  </Box>
        </Box>
      </Box>
    </Box>
  );
}
