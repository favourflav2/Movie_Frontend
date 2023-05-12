import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_All_Top_Movies, get_All_Top_Rated_Movies, get_All_Trending, search_Enter } from "../api/searchApi";

export const searchEnterMovies = createAsyncThunk(
  "enter-movies",
  async ({ searchValue,page }, { rejectWithValue }) => {
    try {
      const res = await search_Enter(searchValue,page);
      
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);

export const getAllTrending = createAsyncThunk(
    "all-Trending",
    async ({ page }, { rejectWithValue }) => {
      try {
        const res = await get_All_Trending(page);
        
        return res.data;
      } catch (e) {
        return rejectWithValue(e.response.data.status_message);
      }
    }
  );


  export const getAllTopMovies = createAsyncThunk(
    "all-Top-Movies",
    async ({ page }, { rejectWithValue }) => {
      try {
        const res = await get_All_Top_Movies(page);
        
        return res.data;
      } catch (e) {
        return rejectWithValue(e.response.data.status_message);
      }
    }
  );


  export const getAllTopRatedMovies = createAsyncThunk(
    "all-Top-Rated-Movies",
    async ({ page }, { rejectWithValue }) => {
      try {
        const res = await get_All_Top_Rated_Movies(page);
        
        return res.data;
      } catch (e) {
        return rejectWithValue(e.response.data.status_message);
      }
    }
  );

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    error: "",
    loading: false,
    searchedMovies: [],
    trendingAll :[],
    searchName:""
  },
  reducers: {
    saveMovieName: (state,action) => {
        state.searchName = action.payload
    },
    setSearchMovies : (state) => {
        state.searchedMovies = []
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(searchEnterMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchEnterMovies.fulfilled, (state, action) => {
        
        state.loading = false;
        state.searchedMovies = action.payload
      })
      .addCase(searchEnterMovies.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getAllTrending.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTrending.fulfilled, (state, action) => {
        
        state.loading = false;
        state.trendingAll = action.payload
      })
      .addCase(getAllTrending.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getAllTopMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTopMovies.fulfilled, (state, action) => {
        
        state.loading = false;
        state.trendingAll = action.payload
      })
      .addCase(getAllTopMovies.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getAllTopRatedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTopRatedMovies.fulfilled, (state, action) => {
        
        state.loading = false;
        state.trendingAll = action.payload
      })
      .addCase(getAllTopRatedMovies.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default movieSlice.reducer

export const {saveMovieName, setSearchMovies} = movieSlice.actions