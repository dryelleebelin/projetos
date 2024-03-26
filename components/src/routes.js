import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Sidebar01 from "./components/Sidebars/01";

export default function RoutesApp(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/sidebar/01" element={<Sidebar01/>}/>
      </Routes>
    </BrowserRouter>
  )
}