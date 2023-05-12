import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from './api/movieApi';
import movieSlice from './features/movieSlice';
import authSlice from './features/authSlice';

export const store = configureStore({
    reducer:{
        [movieApi.reducerPath] : movieApi.reducer,
        movie: movieSlice,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(movieApi.middleware)
})