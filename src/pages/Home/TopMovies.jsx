import React from "react";
import { useTopMoviesQuery } from "../../Redux/api/movieApi";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { toast } from "react-toastify";

import TrendingCard from "../../components/cards/TrendingCard";

export default function TopMovies() {
  const [sliderRef, setSliderRef] = React.useState(null);
  const { data, isFetching, error } = useTopMoviesQuery(1);
  
  //const movieFind = savedMovies?.find((value) => value.movieId === item.id);

  //console.log(data?.results);
  
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:1024px)");

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: lg ? 4 : md ? 3 : 2,
    slidesToScroll: lg ? 4 : md ? 3 : 2,
    arrows: false,
  };

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
      name="top"
      className="sm:h-[670px] h-[580px] mb-[100px] flex flex-col "
    >
      <Typography className="text-2xl mb-1 underline ">
        Popular Movies
      </Typography>

      <Box className="w-full flex items-end justify-end">
        <Typography className="flex items-center justify-center w-[80px] text-[19px]  p-2  cursor-pointer transition ease-in-out delay-150 hover:-translate-y-[2px] underline  duration-300 hover:text-indigo-500">
          <Link to={`/allCategories/Popular Movies`}>See All</Link>
        </Typography>
      </Box>

      {isFetching ? (
        <Stack className=" text-indigo-500 flex justify-center items-center">
          <CircularProgress color="inherit" />
        </Stack>
      ) : (
        <Box className=" h-full relative">
          {/* Arrows */}
          <span className="sm:flex hidden">
            <IconButton
              className="absolute  z-10 top-[35%]  left-0 bg-gray-300/40 hover:bg-gray-400/50"
              onClick={sliderRef?.slickPrev}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </span>

          <span className="sm:flex hidden">
            <IconButton
              className="absolute  z-10 top-[35%]  right-0 bg-gray-300/40 hover:bg-gray-400/50"
              onClick={sliderRef?.slickNext}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </span>

          {/* Slider Componet */}
          <Slider ref={setSliderRef} {...settings} className="glass  p-2">
            {/* Looped Data */}

            {data?.results?.slice(0, 10).map((item, index) => (
              // Data Container
              <TrendingCard item={item} key={index}/>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
}

// text-[19px] bg-green-200 p-2  cursor-pointer transition ease-in-out delay-150 hover:-translate-y-[2px] underline  duration-300 hover:text-indigo-500
