import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedMovies } from "../../Redux/features/authSlice";
import DashBoardCard from "../../components/cards/DashBoardCard";

export default function Dashboard() {
  const { user, savedMovies } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user?.user?._id) {
      dispatch(getLikedMovies());
    }
    // eslint-disable-next-line
  }, [user]);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <Box className="bg-black/80 mt-[90px] min-h-screen w-full flex">
      {/* Content */}
      <Box className="flex flex-col w-full h-full">
        {/* Title */}
        <Box className="flex justify-center p-10">
          <Typography className="text-[40px] text-gray-200 underline">
            Your List
          </Typography>
        </Box>

        {/* Grid */}
        <Box className="flex flex-col p-10 w-full h-full">
          {savedMovies?.length > 0 ? <Typography className="text-white my-5 text-lg font-bold">Your Saved Movies</Typography> : <Typography className="text-white my-5 text-lg font-bold">You Don't Have Any Saved Movies</Typography>}

          <Box className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
            {savedMovies.map((item, index) => (
              <DashBoardCard item={item} key={index} />
            ))}
          </Box>
        </Box>
      </Box>
      {/* <Box className="grid grid-cols-4">
        {savedMovies.map((item, index) => (
          <DashBoardCard item={item} key={index} />
        ))}
      </Box> */}
    </Box>
  );
}
