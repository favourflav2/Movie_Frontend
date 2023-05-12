import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Stack,
  Typography,
  Pagination,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import SearchCardGrid from "../../components/cards/SearchCardGrid";
import { searchEnterMovies } from "../../Redux/features/movieSlice";
import { toast } from "react-toastify";



export default function SearchPage() {
  
  const { searchValue } = useParams();
  const { loading, error, searchedMovies } = useSelector(
    (state) => state.movie
  );
  const isNonMobile = useMediaQuery("(min-width:640px)");
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    dispatch(searchEnterMovies({ searchValue, page }));
    setPage(1)
    // eslint-disable-next-line
  }, [page, searchValue]);

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
      console.log(error)
    }
  }, [error]);
  // Scroll to top
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);
  

  

  return (
    <Box className="mt-[90px] bg-gray-400/30 min-h-full w-full flex">
      {/* Content */}
      <Box className=" p-10 w-full h-full flex flex-col">
        {/* Title */}
        <Box className="flex items-center justify-center my-10">
          <Typography className="text-black font-bold text-3xl underline">
            Search Results For "{searchValue}"
          </Typography>
        </Box>

        {/* Pagination */}
        {/* {!loading  && (
            <Stack className="flex justify-center items-center mt-2 mb-10">
              <Typography>Page: {page}</Typography>
              {isNonMobile ? (
                <Pagination
                  count={10}
                  page={page}
                  onChange={handleChange}
                  size="large"
                />
              ) : (
                <Pagination
                  count={10}
                  page={page}
                  onChange={handleChange}
                  size="small"
                />
              )}
            </Stack>
          )} */}

        {!loading &&
          (searchedMovies?.results?.length !== 0 && (
            <Stack className="flex justify-center items-center mt-2 mb-10">
              <Typography>Page: {page}</Typography>
              {isNonMobile ? (
                <Pagination
                  count={searchedMovies?.total_pages}
                  page={page}
                  onChange={handleChange}
                  size="large"
                />
              ) : (
                <Pagination
                  count={searchedMovies?.total_pages}
                  page={page}
                  onChange={handleChange}
                  size="small"
                />
              )}
            </Stack>
          ))}

        {/* Mapped Data */}
        <Box className="grid xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-2 lg:grid-cols-4">
          {loading ? (
            <>
              {Array.from(new Array(20)).map((item, index) => (
                <Skeleton variant="rectangular" height={460} key={index} />
              ))}
            </>
          ) : (
            <>
              {searchedMovies?.results?.map((item, index) => (
                <SearchCardGrid item={item} key={index} />
              ))}
            </>
          )}
        </Box>

        {/* If therers no results */}
        {searchedMovies?.results?.length === 0 && (
          <Box className="h-screen flex justify-center text-red-500">
            <Typography className="font-bold text-3xl">
              No results with the name "{searchValue}"
            </Typography>
          </Box>
        )}

        {/* Error */}
        {error && <Box className="h-screen flex justify-center text-red-500">
            <Typography className="font-bold text-3xl">
              {error}.... <Link to="/"><span className="underline cursor-pointer">Please Go Back</span></Link>
            </Typography>
          </Box>}

        {/* Pagination */}
        {!loading &&
          (searchedMovies?.results?.length !== 0 && (
            <Stack className="flex justify-center items-center mt-2 mb-10">
              <Typography>Page: {page}</Typography>
              {isNonMobile ? (
                <Pagination
                  count={searchedMovies?.total_pages}
                  page={page}
                  onChange={handleChange}
                  size="large"
                />
              ) : (
                <Pagination
                  count={searchedMovies?.total_pages}
                  page={page}
                  onChange={handleChange}
                  size="small"
                />
              )}
            </Stack>
          ))}
      </Box>
    </Box>
  );
}
