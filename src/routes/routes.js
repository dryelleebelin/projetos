import { Routes, Route } from 'react-router-dom';
import Home from '../paginas/Home';
import Login from '../paginas/Login';
import EditarProduto from '../paginas/EditarProduto';
import Fiado from '../paginas/Fiado';

export default function RoutesApp(){
    return (
        <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/editar" element={<EditarProduto/>} />
            <Route path="/fiado" element={<Fiado/>}/>
        </Routes >
    )
}