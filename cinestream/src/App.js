import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} closeOnClick/>
      <RoutesApp/>
    </BrowserRouter>
  );
}