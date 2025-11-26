import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/reset.css";

import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    
        <App />
  
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
