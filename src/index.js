import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import './index.css';
import App from './App';
import store from "./redux/store";
import theme from "./theme";
import { SocketProvider } from './Seller/SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={"930070247348-ih7vn23a9s96hgauicdfk6rplv92hbg2.apps.googleusercontent.com"}>
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <SocketProvider> 
    <App />
    </SocketProvider>
  </ThemeProvider>
</Provider>
</GoogleOAuthProvider>
);
