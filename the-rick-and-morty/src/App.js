import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes"
import './global.scss'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </BrowserRouter>
  );
}