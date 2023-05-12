import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const movieApi = createApi({
    reducerPath:"movieApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://api.themoviedb.org/3"}),
    endpoints: (builder) => ({
        trendingMovies: builder.query({query: (pageNumber) => `/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}` }),
        topMovies: builder.query({query: (pageNumber) => `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}` }),
        topRated: builder.query({query: (pageNumber) => `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}` }),
        topTV: builder.query({query: (pageNumber) => `/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}` }),
        getOneMovie: builder.query({query: (id) => `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos` }),
        getSimilarMovies: builder.query({query: (id) => `/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1` }),
        searchMovie: builder.query({query: (searchValue) => `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchValue}` }),
    })
})

export const { useTrendingMoviesQuery,useTopMoviesQuery,useTopRatedQuery,useTopTVQuery,useGetOneMovieQuery,useGetSimilarMoviesQuery,useSearchMovieQuery } = movieApi


//https://api.themoviedb.org/3/search/movie?api_key=77f3b279816a2f3037720b6e0d10b1ff&language=en-US&page=1&include_adult=false&query=Jo