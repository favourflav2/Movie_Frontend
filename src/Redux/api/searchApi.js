import axios from "axios"

const API = axios.create({baseURL:"https://api.themoviedb.org/3"})

export function search_Enter(searchValue,page){
    return API.get(`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchValue}`)
}

export function get_All_Trending(page){
    return API.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
}

export function get_All_Top_Movies(page){
    return API.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
}

export function get_All_Top_Rated_Movies(page){
    return API.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
}