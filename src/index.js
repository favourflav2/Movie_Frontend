import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const devEnv = process.env.NODE_ENV !== "production"

const clientId = devEnv ? "334721272133-e0n412nt0chsc120vtlvg9o2lebv1h9q.apps.googleusercontent.com" : "334721272133-tdvuaq7o7ocb730jq45ikai8ghk2070h.apps.googleusercontent.com"

// localhost 334721272133-e0n412nt0chsc120vtlvg9o2lebv1h9q.apps.googleusercontent.com
root.render(
  
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <App />
          </Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  
);
