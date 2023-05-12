import React from "react";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useTrendingMoviesQuery } from "../../Redux/api/movieApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { toast } from "react-toastify";




import TrendingCard from "../../components/cards/TrendingCard";

export default function Trending() {
  
  const [sliderRef, setSliderRef] = React.useState(null);
  const { data, isFetching, error } = useTrendingMoviesQuery(1);
  
  
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
      name="trending"
      className=" sm:h-[670px] h-[580px] sm:my-[100px] flex flex-col "
    >
      <Typography className="text-2xl mb-1 underline ">Trending</Typography>

      <Typography className="text-[19px] p-2 flex cursor-pointer transition ease-in-out delay-150 hover:-translate-y-[2px] underline justify-end duration-300  hover:text-indigo-500">
        <Link to={`/allCategories/Trending`}>See All</Link>
      </Typography>

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

