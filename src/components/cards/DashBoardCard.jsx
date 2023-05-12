import React from "react";
import {
  Box,
  Typography,
  //useMediaQuery,
  IconButton,

} from "@mui/material";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { likeMovie } from "../../Redux/features/authSlice";
import { toast } from "react-toastify";


export default function DashBoardCard({ item }) {
  const { user, savedMovies } = useSelector((state) => state.auth);
  //const isNonMobile = useMediaQuery("(min-width:640px)");
  const dispatch = useDispatch();
  //const navigate = useNavigate()
  //const [like, setLike] = React.useState(false);
  const movieFind = savedMovies?.find(
    (value) => value.movieId === item.movieId
  );

  //   React.useEffect(()=>{
  //     dispatch(getLikedMovies())
  //   },[like])
  return (
    <Box className=" relative  group p-1  flex-col  h-[350px] w-auto sm:mb-[50px] mb-[70px]">
     <img
          src={`${item.img}`}
          alt="Backgroung Img"
          className="  h-full w-full "
        />

      {/* Movie Name at the bottom */}
      <Box className="flex sm:justify-center justify-between items-center my-2 sm:my-0">
        <Typography className="  text-[16px] text-white font-bold flex justify-center sm:mt-3 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-108  duration-300 no-underline hover:underline hover:text-indigo-500">
          <Link to={`/movie/${item.movieId}`}>{item.title}</Link>
        </Typography>

        <Box className="sm:hidden flex items-center">
          {user?.user?._id ? (
            movieFind?.movieId === item.movieId ? (
              <IconButton
                onClick={() => {
                  dispatch(
                    likeMovie({
                      movie: {
                        movieId: item.movieId,
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
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  dispatch(
                    likeMovie({
                      movie: {
                        movieId: item.movieId,
                        title: item.title,
                        img: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                        overview: item.overview,
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
      </Box>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col  bg-black/80 items-center  opacity-0  group-hover:opacity-100 duration-500 z-10  sm:p-5 p-2"> 
        {/* Title and Star */}
        <Box className="flex items-center w-full justify-around sm:mb-10 mb-2">
          <Typography className="font-bold sm:text-[24px] text-[18px] text-white transition ease-in-out delay-150 hover:underline cursor-pointer hover:-translate-y-[1px] hover:scale-110  duration-300 hover:text-indigo-500">
            <Link to={`/movie/${item.movieId}`}>{item.title}</Link>
          </Typography>
          {/* We are going to loop array of the users saved movies array... if it contains we return liked start... if it doesnt contain we return empty star */}

          {user?.user?._id ? (
            movieFind?.movieId === item.movieId ? (
              <IconButton
                onClick={() => {
                  dispatch(
                    likeMovie({
                      movie: {
                        movieId: item.movieId,
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
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  dispatch(
                    likeMovie({
                      movie: {
                        movieId: item.movieId,
                        title: item.title,
                        img: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                        overview: item.overview,
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
      </div>
    </Box>
  );
}
