import Rotas from './rotas/rotas';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </div>
  );
}