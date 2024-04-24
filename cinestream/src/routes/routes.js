import React from "react"
import { Routes, Route } from "react-router-dom"

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Filtered from "../pages/Filtered"
import Detail from "../pages/Detail"
import MyList from "../pages/MyList"
import Account from "../pages/Account"

import Private from "./private"

export default function RoutesApp(){
  return(
    <Routes>
      <Route path="*" element={<Home/>}/>
      <Route exact path="/" element={<Home/>}/>
      
      <Route path="/catalog" element={<Private><Catalog/></Private>}/>
      <Route path="/filtered-results" element={<Private><Filtered/></Private>}/>
      <Route path="/detail/:id" element={<Private><Detail/></Private>}/>
      <Route path="/my-list" element={<Private><MyList/></Private>}/>
      <Route path="/account" element={<Private><Account/></Private>}/>
    </Routes>
  )
}
