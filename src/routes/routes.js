import { Routes, Route } from 'react-router-dom';
import Home from '../paginas/Home';
import Login from '../paginas/Login';
import EditarProduto from '../paginas/EditarProduto';
import Fiado from '../paginas/Fiado';
import AddUsuario from '../paginas/AddUsuario';

export default function RoutesApp(){
    return (
        <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/editar/:id" element={<EditarProduto/>} />
            <Route path="/fiado" element={<Fiado/>}/>
            <Route path="/fiado/add-usuario" element={<AddUsuario/>}/>
        </Routes >
    )
}