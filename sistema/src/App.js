//componente principal
import {BrowserRouter} from 'react-router-dom'; //navegações das rotas
import RoutesApp from './routes';

import AuthProvider from './contexts/auth';  //controle de autenticação

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  //alertas

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000}/>
        <RoutesApp/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;