import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_Like_Movie, google_Sign, like_Movie, log_In, sign_Up } from "../api/authApi";

export const signUp = createAsyncThunk(
  "signup",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await sign_Up(formData);
      toast.success("Sign Up Successfull", { theme: "colored" });
      navigate("/");
      return res.data
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);


export const logIn = createAsyncThunk(
  "login",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await log_In(formData);
      toast.success("Log In Successfull", { theme: "colored" });
      navigate("/");
      return res.data
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "googleSignIn",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await google_Sign(formData);
      toast.success("Log In Successfull", { theme: "colored" });
      navigate("/");
      return res.data
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);


export const likeMovie = createAsyncThunk(
  "likeMovie",
  async ({ movie }, { rejectWithValue }) => {
    try {
      const res = await like_Movie(movie);
      
      
      return res.data
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const getLikedMovies = createAsyncThunk(
  "getlikedMovie",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get_Like_Movie();
      
      
      return res.data
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
    loading: false,
    savedMovies: [],
    user: null,
  },
  reducers:{
    setError : (state) => {
      state.error = ""
    },
    setLogOut: (state) => {
      localStorage.clear();
      state.user = null
    },
    setUser: (state,action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      // Log In
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      // Google Sign
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      // like movies
      .addCase(likeMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.savedMovies = action.payload;
      })
      .addCase(likeMovie.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      // get liked movies
      .addCase(getLikedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.savedMovies = action.payload;
      })
      .addCase(getLikedMovies.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default authSlice.reducer
export const {setError, setLogOut,setUser} = authSlice.actions