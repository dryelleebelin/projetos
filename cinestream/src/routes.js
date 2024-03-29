import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from './pages/Catalog'

export default function RoutesApp(){
  return(
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/catalog" element={<Catalog/>}/>
    </Routes>
  )
}