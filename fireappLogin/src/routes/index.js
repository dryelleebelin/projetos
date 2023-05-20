//importa a rota e depois add no routes
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home'  //componente
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Private from './Private';  //controle de login do usuário

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<Private><Admin/></Private>}/> 
        </Routes>
    )
}

export default RoutesApp;