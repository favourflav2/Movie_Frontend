import { Box, IconButton, Typography,Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import SearchCard from "../../components/cards/SearchCard";


export default function MobileSearchPage() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState(false);
  const refOne = React.useRef(null);
  const [openSearch, setOpenSearch] = React.useState(false);

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

//   async function handleEnter(e) {
//     if (e.key === "Enter") {
//       if (searchValue) {
//         //dispatch(searchEnterMovies({searchValue}))
//         navigate(`/search/${searchValue}`);
//         setOpenSearch(false);
//         setSearchValue("");
//       }
//     }
//   }

  function handleClickOutside(e) {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenSearch(false);
    }
  }

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
    <Box className=" bg-gray-400/50 min-h-screen  items-center flex flex-col mt-[90px]">
      {/* Content */}
      <Box className="flex flex-col justify-center mt-10">
        <Typography className="text-3xl font-bold">
          Search For A Movie
        </Typography>
        <form className="flex items-center">
          <input
            type="text"
            className="w-[270px] input indent-2 h-[40px] placeholder-black/60 "
            value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                handleSearch(e.target.value)
              }}
              placeholder="Search A Movie"
          />

          <IconButton onClick={()=>{
            navigate(`/search/${searchValue}`)
          }}>
              <SearchIcon className="text-[40px]"/>
          </IconButton>
        </form>

        {openSearch ? 
    (
      !isFetching ? 
        (
          <div className="  w-[274px] bg-gray-700 rounded-md flex flex-col pb-1 pt-1" ref={refOne}>

          {data?.results?.slice(0,6).map((item,index)=>(
            <SearchCard item={item} key={index} setOpenSearch={setOpenSearch} setSearchValue={setSearchValue}/>
          ))}
        </div>
        ) 
        : 
        (
          <div className=" w-[274px] bg-gray-700 rounded-md flex flex-col pb-1 pt-1" ref={refOne}>

          <Skeleton className="h-[100px]  my-1 hover:bg-gray-500/60"/>
        </div>
        )
        
    ) 
    : 
    (<></>)
    }
      </Box>
    </Box>
  );
}
