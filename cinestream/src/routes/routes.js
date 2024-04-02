import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Detail from "../pages/Detail";
import MyList from "../pages/MyList";

export default function RoutesApp(){
  return(
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/catalog" element={<Catalog/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/my-list" element={<MyList/>}/>
    </Routes>
  )
}