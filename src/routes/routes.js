import { Routes, Route } from 'react-router-dom';
import Home from '../paginas/Home';
import Login from '../paginas/Login';

export default function RoutesApp(){
    return (
        <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
        </Routes >
    )
}