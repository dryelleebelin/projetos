import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes"
import './global.scss'

export default function App() {
  return (
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter>
  );
}