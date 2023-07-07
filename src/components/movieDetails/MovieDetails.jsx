import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetOneMovieQuery,
  useGetSimilarMoviesQuery,
} from "../../Redux/api/movieApi";
import ReactPlayer from "react-player";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getLikedMovies, likeMovie } from "../../Redux/features/authSlice";

// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function MovieDetails() {
  const { user, savedMovies } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isFetching, error } = useGetOneMovieQuery(id);
  const {
    data: similar,
    isFetching: fetchSim,
    error: simError,
  } = useGetSimilarMoviesQuery(id);
  const [trailerState, setTrailerState] = React.useState([]);
  //console.log(data)

  React.useEffect(() => {
    if (data) {
      let newArr = data?.videos?.results.filter(
        (item) => item.type === "Trailer"
      );
      setTrailerState(newArr);
    }
  }, [data]);
  
  //const [likeData, setLikeData] = React.useState([])
  //console.log(movieFind)

  React.useEffect(()=>{
    dispatch(getLikedMovies())
    // eslint-disable-next-line
  },[])
  const movieFind = savedMovies?.find(
    (value) => value.movieId === data?.id
  );

  
  
  //console.log(savedMovies)

  //const isNonMobile = useMediaQuery("(min-width:640px)");
  const md = useMediaQuery("(min-width:775px)");
  const lg = useMediaQuery("(min-width:1182px)");
  const newLg = useMediaQuery("(min-width:1024px)");

  

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: newLg ? 2 : 1,
    slidesToScroll: newLg ? 2 : 1,
    //arrows: false,
  };

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1,
    //arrows: false,
  };

  var settings3 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Error Handler
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

    if (simError) {
      toast.error(simError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(simError);
    }
  }, [error, simError]);

  if (fetchSim || isFetching) {
    return (
      <Box className="min-h-screen bg-gray-400/70 mt-[90px] flex justify-center items-center">
        <CircularProgress
          color="secondary"
          className="text-[50px] flex justify-center items-center  "
        />
      </Box>
    );
  }

  return (
    <>
      {md ? (
        <Box className="mt-[90px] pt-10 flex flex-col w-full min-h-screen  lg bg-gray-400/70">
          {/* Content */}
          <Box className="w-full   flex  p-5 xl:px-[100px]">
            <Box className="xl:w-[30%] w-[40%] p-5">
              {/* Title */}
              <Box className="mb-3 w-full flex justify-between">
                <Typography className="text-[40px] font-bold text-indigo-500">
                  {data?.title}
                </Typography>

                {user?.user?._id ? (
                  movieFind?.movieId === data?.id ? (
                    <IconButton
                    className="h-[50%]"
                      onClick={() => {
                        dispatch(
                          likeMovie({
                            movie: {
                              movieId: data?.id,
                              title: data?.title,
                              img: `https://image.tmdb.org/t/p/original/${data?.poster_path}`,
                              overview: data?.overview,
                            },
                          })
                        );

                        toast.success("Unliked Movie", { theme: "dark" });
                      }}
                    >
                      <StarIcon className="text-3xl text-yellow-300" />
                    </IconButton>
                  ) : (
                    <IconButton
                    className="h-[50%]"
                      onClick={() => {
                        dispatch(
                          likeMovie({
                            movie: {
                              movieId: data?.id,
                              title: data?.title,
                              img: `https://image.tmdb.org/t/p/original/${data?.poster_path}`,
                              overview: data?.overview,
                            },
                          })
                        );
                        toast.success("Liked Movie", { theme: "colored" });
                      }}
                    >
                      <StarBorderIcon className="text-3xl text-yellow-300" />
                    </IconButton>
                  )
                ) : (
                  <></>
                )}
              </Box>

              {/* Image */}
              <img
                src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                alt=""
                className=" object-cover w-full mb-3"
              />

              {lg && (
                <div className="p-2 font-bold text-xl underline mb-1">
                  Similar Movies
                </div>
              )}

              {lg && (
                <Slider {...settings} className="">
                  {similar?.results?.slice(0, 8).map((item, index) => (
                    // <div className=" group h-[270px] " key={index}>
                    //     <img src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`} alt="" className=" w-full h-full"/>

                    //     <div className="absolute top-0 left-0 w-full h-full flex flex-col  bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10 ">
                    //         <span className="text-white">fff</span>
                    //     </div>
                    // </div>
                    <Box
                      className="relative group h-[270px] xl:p-[2px]"
                      key={index}
                    >
                      {/* Picture */}
                      <img
                        src={
                          item?.poster_path
                            ? `https://image.tmdb.org/t/p/original/${item?.poster_path}`
                            : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
                        }
                        alt="Movie Pic"
                        className="w-full h-full"
                      />

                      {/* Overlay Contet */}
                      <Box className="absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10  p-2">
                        <Typography className="text-white text-2xl cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[2px] hover:scale-105  duration-300 no-underline hover:underline hover:text-indigo-500 p-5">
                          <Link to={`/movie/${item.id}`}>{item.title}</Link>
                        </Typography>

                        <Typography className="text-gray-300 text-xl ">
                          {item.vote_average.toFixed(2)}/10
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              )}
            </Box>

            <Box className="xl:w-[70%] w-[60%] flex flex-col items-center ">
              {/* Ratings */}
              <Box className="flex flex-col items-center mt-5 mb-[20px]">
                <span className="flex items-center">
                  <IconButton>
                    <StarIcon className="text-indigo-500 text-3xl" />
                  </IconButton>

                  <span className="ml-1 text-2xl font-bold">
                    {data?.vote_average.toFixed(2)}/10
                  </span>
                </span>

                <div className="flex items-center">
                  <div className="ml-1 text-2xl font-bold">
                    Status: <span className=" font-normal">{data?.status}</span>
                  </div>
                </div>
              </Box>

              {/* Info */}
              <Box className="md:w-[70%] xl:w-[55%] mt-10 mb-[60px]">
                <Typography className="text-2xl">{data?.overview}</Typography>
              </Box>

              {!lg && (
                <div className="p-2 font-bold text-xl underline mb-1">
                  Similar Movies
                </div>
              )}

              {!lg && (
                <Slider {...settings} className="md:w-[70%] xl:w-[55%] mb-10">
                  {similar?.results?.slice(0, 8).map((item, index) => (
                    <Box
                      className="relative group h-[270px] xl:p-[2px]"
                      key={index}
                    >
                      {/* Picture */}
                      <img
                        src={
                          item?.poster_path
                            ? `https://image.tmdb.org/t/p/original/${item?.poster_path}`
                            : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
                        }
                        alt="Movie Pic"
                        className="w-full h-full"
                      />

                      {/* Overlay Contet */}
                      <Box className="absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10  p-2">
                        <Typography className="text-white text-2xl cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[2px] hover:scale-105  duration-300 no-underline hover:underline hover:text-indigo-500 p-5">
                          <Link to={`/movie/${item.id}`}>{item.title}</Link>
                        </Typography>

                        <Typography className="text-gray-300 text-xl ">
                          {item.vote_average.toFixed(2)}/10
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              )}

              {lg ? (
                <Box className="w-[640px] ">
                  <Slider {...settings2} className="">
                    {trailerState?.map((item, index) => (
                      <div key={index}>
                        {item.type === "Trailer" && (
                          <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${item.key}`}
                            controls={true}
                          />
                        )}
                      </div>
                    ))}
                  </Slider>
                </Box>
              ) : (
                <>
                  {trailerState?.map((item, index) => (
                    <div key={index}>
                      {item.type === "Trailer" && (
                        <Box className="flex flex-col items-center">
                          <Typography className="text-[17px] mb-[1px] my-1">
                            {item.name}
                          </Typography>
                          <Link>
                            <Box className="bg-black/80 hover:bg-black/70 h-[50px] w-[220px] rounded-[5px]  flex items-center p-1 justify-center cursor-pointer group">
                              <Typography className="text-white font-bold text-[18px] flex items-center justify-center mr-3 group-hover:text-gray-300 ">
                                Trailer on{" "}
                              </Typography>
                              <YouTubeIcon className="text-white text-[39px] flex items-center justify-center group-hover:text-gray-300" />
                              <span className="text-white  flex items-center justify-center group-hover:text-gray-300">
                                YOUTUBE
                              </span>
                            </Box>
                          </Link>
                        </Box>
                      )}
                    </div>
                  ))}
                </>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        //! Mobile MEnu ---------------------------------------------------------------------------

        <Box className="mt-[90px] p-2 flex flex-col w-full min-h-full items-center  bg-gray-400/70">
          {/* Content */}
          <Box className="w-full   flex flex-col items-center p-5 xl:px-[100px]">
            <Box className="w-full p-5">
              {/* Title */}
              <Box className="mb-3 w-full flex justify-between items-center">
                <Typography className="text-[40px] font-bold text-indigo-500">
                  {data?.title}
                </Typography>


                {user?.user?._id ? (
                  movieFind?.movieId === data?.id ? (
                    <IconButton
                    className="h-[50%]"
                      onClick={() => {
                        dispatch(
                          likeMovie({
                            movie: {
                              movieId: data?.id,
                              title: data?.title,
                              img: `https://image.tmdb.org/t/p/original/${data?.poster_path}`,
                              overview: data?.overview,
                            },
                          })
                        );

                        toast.success("Unliked Movie", { theme: "dark" });
                      }}
                    >
                      <StarIcon className="text-3xl text-yellow-300" />
                    </IconButton>
                  ) : (
                    <IconButton
                    className="h-[50%]"
                      onClick={() => {
                        dispatch(
                          likeMovie({
                            movie: {
                              movieId: data?.id,
                              title: data?.title,
                              img: `https://image.tmdb.org/t/p/original/${data?.poster_path}`,
                              overview: data?.overview,
                            },
                          })
                        );
                        toast.success("Liked Movie", { theme: "colored" });
                      }}
                    >
                      <StarBorderIcon className="text-3xl text-yellow-300" />
                    </IconButton>
                  )
                ) : (
                  <></>
                )}
              </Box>

              {/* Image */}
              <img
                src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                alt=""
                className=" object-cover w-full mb-3"
              />
            </Box>

            <Box className="w-full p-5 flex flex-col items-center ">
              {/* Ratings */}
              <Box className="flex flex-col items-center mt-5 mb-[20px]">
                <span className="flex items-center">
                  <IconButton>
                    <StarIcon className="text-indigo-500 text-3xl" />
                  </IconButton>

                  <span className="ml-1 text-2xl font-bold">
                    {data?.vote_average.toFixed(2)}/10
                  </span>
                </span>

                <div className="flex items-center">
                  <div className="ml-1 text-2xl font-bold">
                    Status: <span className=" font-normal">{data?.status}</span>
                  </div>
                </div>
              </Box>

              {/* Info */}
              <Box className="md:w-[70%] xl:w-[55%] mt-10 mb-[30px]">
                <Typography className="text-2xl">{data?.overview}</Typography>
              </Box>

              <div className="p-2 font-bold text-xl underline mb-1">
                Similar Movies
              </div>

              {!lg && (
                <Slider {...settings3} className="w-[100%] mb-[80px]">
                  {similar?.results?.slice(0, 8).map((item, index) => (
                    // <div className=" group h-[270px] " key={index}>
                    //     <img src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`} alt="" className=" w-full h-full"/>

                    //     <div className="absolute top-0 left-0 w-full h-full flex flex-col  bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10 ">
                    //         <span className="text-white">fff</span>
                    //     </div>
                    // </div>
                    <Box
                      className="relative group h-[270px] xl:p-[2px]"
                      key={index}
                    >
                      {/* Picture */}
                      <img
                        src={
                          item?.poster_path
                            ? `https://image.tmdb.org/t/p/original/${item?.poster_path}`
                            : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
                        }
                        alt="Movie Pic"
                        className="w-full h-full"
                      />

                      {/* Overlay Contet */}
                      <Box className="absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10  p-2">
                        <Typography className="text-white text-2xl cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[2px] hover:scale-105  duration-300 no-underline hover:underline hover:text-indigo-500 p-5">
                          <Link to={`/movie/${item.id}`}>{item.title}</Link>
                        </Typography>

                        <Typography className="text-gray-300 text-xl ">
                          {item.vote_average.toFixed(2)}/10
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              )}

              {lg ? (
                <Box className="w-[640px] ">
                  <Slider {...settings2} className="">
                    {trailerState?.map((item, index) => (
                      <>
                        {item.type === "Trailer" && (
                          <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${item.key}`}
                            controls="true"
                          />
                        )}
                      </>
                    ))}
                  </Slider>
                </Box>
              ) : (
                <>
                  {trailerState?.map((item, index) => (
                    <div key={index}>
                      {item.type === "Trailer" && (
                        <Box className="flex flex-col items-center my-3">
                          <Typography className="text-[17px] mb-[1px]">
                            {item.name}
                          </Typography>
                          <Link
                            to={`https://www.youtube.com/watch?v=${item.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Box className="bg-black/80 hover:bg-black/70 h-[50px] w-[220px] rounded-[5px]  flex items-center p-1 justify-center cursor-pointer group">
                              <Typography className="text-white font-bold text-[18px] flex items-center justify-center mr-3 group-hover:text-gray-300 ">
                                Trailer on{" "}
                              </Typography>
                              <YouTubeIcon className="text-white text-[39px] flex items-center justify-center group-hover:text-gray-300" />
                              <span className="text-white  flex items-center justify-center group-hover:text-gray-300">
                                YOUTUBE
                              </span>
                            </Box>
                          </Link>
                        </Box>
                      )}
                    </div>
                  ))}
                </>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
