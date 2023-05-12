import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, setError, signUp } from "../../Redux/features/authSlice";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

export default function SignUp() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const [inputState, setInputState] = React.useState({
    userName: "",
    email: "",
    confirmPassword: "",
    password: "",
  });
  const navigate = useNavigate()

  function handleChange(e) {
    setInputState((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  }


  function handleSubmit() {
    dispatch(setError())
    const { userName, email, confirmPassword, password } = inputState;

    if (password !== confirmPassword) {
      return toast.error("Passwords don't match", { theme: "colored" });
    }

    if (userName && email && password && confirmPassword) {
      dispatch(signUp({formData:inputState,toast,navigate}))
    }else{
      toast.error("Please Fill Out Fields", { theme: "colored" });
    }
  }

  // Google Log In
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        //console.log(res.data)
        // sub === token
        //dispatch(setError());
        //console.log(res.data)
        //console.log(tokenResponse);
        const { email, name, sub } = res.data;
        const formData = { email, userName: name, sub };
        dispatch(googleSignIn({ formData, navigate, toast }));
      } catch (e) {
        console.log(e);
      }
    },
  });

  React.useEffect(()=>{
    if(error){
      toast.error(error, { theme: "colored" });
    }
  },[error])

  return (
    <Box className="mt-[90px] flex w-full h-[830px] sm:h-[920px]">
      {/* Content Container */}
      <Box className="flex w-full h-full">
        {/* Left Side */}
        <Box className="w-[30%] bg-indigo-500 sm:flex hidden flex-col items-center">
          <Box className="flex-col flex p-10 mt-[30px] items-center">
            <Typography className="text-white text-3xl my-5">
              Welcome!
            </Typography>
            <Typography className="text-gray-200 text-xl">
              In order to fully utilize our MovieDB webiste, you should create
              an account! Creating an account will allow you to save your
              favorite movies!
            </Typography>
          </Box>

          <Box className="flex-col flex p-10 mt-[30px] items-center ">
            <Typography className="text-white text-3xl ">
              Already Have An Account?
            </Typography>
            <Typography className="underline text-xl hover:text-gray-200">
              <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Box>

        {/* Right Side */}
        <Box className="sm:w-[70%] w-full bg-gray-400/30 flex items-center justify-center">
          {/* Content Container */}
          <Box className="flex flex-col w-[360px] sm:w-[380px] sm:h-[550px] md:w-[400px] lg:w-[500px] xl:w-[600px] rounded-xl border-2 border-indigo-500 bg-white/50 items-center">
            {/* Inner Box */}
            <Box className="flex flex-col p-4  w-[95%] h-full ">
              <Box className="flex flex-col items-center">
                <Typography className="text-[40px] underline p-5 mb-8 text-indigo-500">
                  Sign Up
                </Typography>

                <form className="mt-1 flex flex-col">
                  <input
                    type="text"
                    className="input w-[300px] h-[40px] placeholder:text-black/70 indent-2 text-lg my-2"
                    placeholder="Username"
                    value={inputState.userName}
                    name="userName"
                    onChange={(e) => handleChange(e)}
                  />

                  <input
                    type="text"
                    className="input w-[300px] h-[40px] placeholder:text-black/70 indent-2 text-lg my-2"
                    placeholder="E-mail"
                    name="email"
                    value={inputState.email}
                    onChange={(e) => handleChange(e)}
                  />

                  <input
                    type="password"
                    className="input w-[300px] h-[40px] placeholder:text-black/70 indent-2 text-lg my-2"
                    placeholder="Confirm Password"
                    value={inputState.confirmPassword}
                    name="confirmPassword"
                    onChange={(e) => handleChange(e)}
                    autoComplete=""
                  />

                  <input
                    type="password"
                    className="input w-[300px] h-[40px] placeholder:text-black/70 indent-2 text-lg my-2"
                    placeholder="Password"
                    value={inputState.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                    autoComplete=""
                  />
                </form>

                {/* Mobile Only */}
                <Typography className=" sm:hidden flex text-lg my-2">
                  Already Have An Account?{" "}
                  <span className="underline text-indigo-500 ml-1">
                    <Link to="/login">Log In</Link>
                  </span>
                </Typography>

                {/* Buttons */}
                <Box className="flex flex-col items-center  w-full mt-5">
                  <Button
                    variant="contained"
                    className="w-[300px] bg-indigo-500 text-lg mb-4 hover:bg-indigo-700"
                    disabled={loading}
                    onClick={()=>handleSubmit()}
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </Button>

                  <Button
                    className="flex items-center bg-red-500 text-lg hover:bg-red-700 w-[300px]"
                    variant="contained"
                    disabled={loading}
                    onClick={()=>googleLogin()}
                  >
                    <span className="mr-2 items-center flex ">
                      <GoogleIcon className="" />
                    </span>
                    {loading ? "Loading..." : "Sign In With Google"}
                    
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
