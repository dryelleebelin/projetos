import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from "./App"
import Sidebar01 from "./components/sidebars/01"
import DarkMode from "./components/buttons/DarkMode/DarkMode"
import Download from "./components/buttons/Download"
import Card01 from "./components/cards/01"
import DragAndDrop from "./components/listas/DragAndDrop/index.tsx"
import Calculator from "./pages/Calculator/index.js"
import Citacoes from "./pages/Citacoes/index.js"
import Notifications01 from "./components/notifications/01/index.js"
import Progressbar01 from "./components/progressbar/01/index.js"
import Progressbar02 from "./components/progressbar/02/index.js"
import Stepper from "./components/progressbar/stepper/index.js"
import Footer01 from "./components/footers/01/index.js"
import Footer02 from "./components/footers/02/index.js"
import Card02 from "./components/cards/02/index.js"
import Footer03 from "./components/footers/03/index.js"

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
        <Route path="/notifications/01" element={<Notifications01/>}/>
        <Route path="/progressbar/01" element={<Progressbar01/>}/>
        <Route path="/progressbar/02" element={<Progressbar02/>}/>
        <Route path="/progressbar/stepper" element={<Stepper/>}/>
        <Route path="/footer/01" element={<Footer01/>}/>
        <Route path="/footer/02" element={<Footer02/>}/>
        <Route path="/card/02" element={<Card02/>}/>
        <Route path="/footer/03" element={<Footer03/>}/>
      </Routes>
    </BrowserRouter>
  )
}