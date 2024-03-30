import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Sidebar01 from "./components/sidebars/01";
import DarkMode from "./components/buttons/DarkMode/DarkMode";
import Download from "./components/buttons/Download";
import Card01 from "./components/cards/01";
import DragAndDrop from "./components/listas/DragAndDrop/index.tsx";
import Calculator from "./pages/Calculator/index.js";
import Citacoes from "./pages/Citacoes/index.js";

export default function RoutesApp(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/sidebar/01" element={<Sidebar01/>}/>
        <Route path="/button/darkmode" element={<DarkMode/>}/>
        <Route path="/button/download" element={<Download/>}/>
        <Route path="/card/01" element={<Card01/>}/>
        <Route path="/lista/draganddrop" element={<DragAndDrop/>}/>
        <Route path="/page/calculator" element={<Calculator/>}/>
        <Route path="/page/citacoes" element={<Citacoes/>}/>
      </Routes>
    </BrowserRouter>
  )
}