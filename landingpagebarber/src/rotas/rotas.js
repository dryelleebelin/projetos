import { Routes, Route } from 'react-router-dom';
import Home from '../paginas/Home';

export default function Rotas() {
    return (
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />
        </Routes >
    )
}