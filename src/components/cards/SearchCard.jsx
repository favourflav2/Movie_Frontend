import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchCard({item,setOpenSearch, setSearchValue}) {

    const navigate = useNavigate()
  return (
    <Box className="flex h-[100px]  my-1 hover:bg-slate-500/40 border-t border-b cursor-pointer group" onClick={()=>{
        setOpenSearch(false)
        navigate(`/movie/${item.id}`)
        setSearchValue("")
    }}>

        {/* Image */}
        <Box className="w-[30%] h-full p-1">
            <img src={item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}`:"https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"} alt="Movie Pic" className='h-full w-[70px] '/>
        </Box>

        <Box className="w-[70%] flex flex-col items-center justify-center text-gray-300 p-1">
            {item.title.length > 80 ? (<Typography className='font-bold'>{item.title.slice(0,80) + "..."}</Typography>) : (<Typography className='font-bold'>{item.title}</Typography>)}

            
        </Box>
    </Box>
  )
}
