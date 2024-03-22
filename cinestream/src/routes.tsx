import React from "react";
import { Routes, Route } from "react-router-dom";
import Catalog from './pages/Catalog/index.tsx'
  

export default function RoutesApp(){
  return(
    <Routes>
      <Route path="/catalog" element={<Catalog/>}/>
    </Routes>
  )
}