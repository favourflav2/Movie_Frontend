import React from "react";
import {
  Box,
 
  Typography,
  CircularProgress,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { likeMovie } from "../../Redux/features/authSlice";
import { toast } from "react-toastify";

export default function TrendingCard({ item }) {
  const { user, savedMovies,loading } = useSelector((state) => state.auth);
  const isNonMobile = useMediaQuery("(min-width:640px)");
  const dispatch = useDispatch();
  const movieFind = savedMovies?.find((value) => value.movieId === item.id);

  return (
    <Box className=" relative  group p-1 h-[280px] sm:h-[350px] md:h-[380px] 2xl:h-[490px] flex-col  ">
      <img
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        alt=""
        className="  h-full w-full"
      />

      {/* Movie Name at the bottom */}
      <Typography className="text-[16px] font-bold flex justify-center mt-3 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[2px] hover:scale-110  duration-300 no-underline hover:underline hover:text-indigo-500">
        <Link to={`/movie/${item.id}`}>{item.title}</Link>
      </Typography>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col  bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10  sm:p-5 p-2">
        {/* Title and Star */}
        <Box className="flex items-center w-full justify-around sm:mb-10 mb-2">
          <Typography className="font-bold sm:text-[24px] text-[18px] text-white transition ease-in-out delay-150 hover:underline cursor-pointer hover:-translate-y-[1px] hover:scale-110  duration-300 hover:text-indigo-500">
            <Link to={`/movie/${item.id}`}>{item.title}</Link>
          </Typography>
          {/* We are going to loop array of the users saved movies array... if it contains we return liked start... if it doesnt contain we return empty star */}

          {user?.user?._id ? (movieFind?.movieId === item.id ? (
            <>
              {loading ? (<CircularProgress />) : (<IconButton
              onClick={() => {
                dispatch(
                  likeMovie({
                    movie: {
                      movieId: item.id,
                      title: item.title,
                      img: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                      overview: item.overview,
                    },
                  })
                );
                
                toast.success("Unliked Movie", { theme: "dark" });
              }}
            >
              <StarIcon className="text-3xl text-yellow-300" />
            </IconButton>)}
            </>
          ) : (
            <>
              {loading ? (<CircularProgress />) : (<IconButton onClick={() => {
                dispatch(
                  likeMovie({
                    movie: {
                      movieId: item.id,
                      title: item.title,
                      img: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                      overview: item.overview,
                    },
                  })
                );
                toast.success("Liked Movie", { theme: "colored" });
              }}>
              <StarBorderIcon className="text-3xl text-yellow-300" />
            </IconButton>)}
            </>
          )) : (<></>)}
          
          {/* { movieFind?.movieId === item.id ? (
            <IconButton
              onClick={() => {
                dispatch(
                  likeMovie({
                    movie: {
                      movieId: item.id,
                      title: item.title,
                      img: `https:image.tmdb.org/t/p/original/${item.poster_path}`,
                      overview: item.overview,
                    },
                  })
                );
                
                toast.success("Unliked Movie", { theme: "dark" });
              }}
            >
              <StarIcon className="text-3xl text-yellow-300" />
            </IconButton>
          ) : (
            <IconButton onClick={() => {
                dispatch(
                  likeMovie({
                    movie: {
                      movieId: item.id,
                      title: item.title,
                      img: `https:image.tmdb.org/t/p/original/${item.poster_path}`,
                      overview: item.overview,
                    },
                  })
                );
                toast.success("Liked Movie", { theme: "colored" });
              }}>
              <StarBorderIcon className="text-3xl text-yellow-300" />
            </IconButton>
          )} */}
        </Box>

        {/* Info Movie */}
        <Box>
          {/* <Typography className="text-white font-bold text-[20px]">{item.overview.length > 150 ? <span>{item.overview}</span> + "..." : item.overview}</Typography> */}
          {item.overview.length > 150 ? (
            <div className=" text-gray-300 font-bold ">
              {isNonMobile ? (
                <span className="sm:text-[19px] text-[15px]">
                  {item.overview.slice(0, 120) + "..."}{" "}
                </span>
              ) : (
                <span className="sm:text-[19px] text-[15px]">
                  {item.overview.slice(0, 80) + "..."}{" "}
                </span>
              )}
              <button className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 text-[16px] sm:text-[21px] underline hover:underline text-gray-300 hover:text-blue-600">
                <Link to={`/movie/${item.id}`}>Read More</Link>
              </button>
              {/* <Box className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                    <span className="text-gray-300 text-[22px] no-underline hover:underline">Read More</span>
                    </Box> */}
            </div>
          ) : (
            <span className=" text-gray-300 font-bold sm:text-[19px] text-[15px] ">
              {item.overview}
            </span>
          )}
        </Box>
      </div>
    </Box>
  );
}

// {/* <Box
//     className=" relative  group p-1 h-[280px] sm:h-[350px] md:h-[380px] 2xl:h-[490px] flex-col  "

//   >
//     <img
//       src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
//       alt=""
//       className="  h-full w-full"
//     />

//     {/* Movie Name at the bottom */}
//     <Typography className="text-[16px] font-bold flex justify-center mt-3 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[2px] hover:scale-110  duration-300 no-underline hover:underline hover:text-indigo-500">
//       <Link to={`/movie/${item.id}`}>{item.original_title}</Link>
//     </Typography>

//     {/* Overlay Content */}
//     <div className="absolute top-0 left-0 w-full h-full flex flex-col  bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10  sm:p-5 p-2">
//       {/* Title and Star */}
//       <Box className="flex items-center w-full justify-around sm:mb-10 mb-2">
//         <Typography className="font-bold sm:text-[24px] text-[18px] text-white transition ease-in-out delay-150 hover:underline cursor-pointer hover:-translate-y-[1px] hover:scale-110  duration-300 hover:text-indigo-500">
//           <Link to={`/movie/${item.id}`}>
//             {item.original_title}
//           </Link>
//         </Typography>
//         {/* We are going to loop array of the users saved movies array... if it contains we return liked start... if it doesnt contain we return empty star */}
//         {/* <IconButton><StarIcon className="text-3xl text-yellow-300"/></IconButton> */}

//       </Box>

//       {/* Info Movie */}
//       <Box>
//         {/* <Typography className="text-white font-bold text-[20px]">{item.overview.length > 150 ? <span>{item.overview}</span> + "..." : item.overview}</Typography> */}
//         {item.overview.length > 150 ? (
//           <div className=" text-gray-300 font-bold ">
//             {isNonMobile ? (
//               <span className="sm:text-[19px] text-[15px]">
//                 {item.overview.slice(0, 120) + "..."}{" "}
//               </span>
//             ) : (
//               <span className="sm:text-[19px] text-[15px]">
//                 {item.overview.slice(0, 80) + "..."}{" "}
//               </span>
//             )}
//             <button className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 text-[16px] sm:text-[21px] underline hover:underline text-gray-300 hover:text-blue-600">
//               <Link to={`/movie/${item.id}`}>Read More</Link>
//             </button>
//             {/* <Box className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
//                     <span className="text-gray-300 text-[22px] no-underline hover:underline">Read More</span>
//                     </Box> */}
//           </div>
//         ) : (
//           <span className=" text-gray-300 font-bold sm:text-[19px] text-[15px] ">
//             {item.overview}
//           </span>
//         )}
//       </Box>
//     </div>
//   </Box> */}
