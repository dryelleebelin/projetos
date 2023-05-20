import './signin.css';
import logo from '../../assets/logo.png';

import {useState, useContext} from 'react';  //salvar dados  //chama o contexto
import {Link} from 'react-router-dom';  //usar navegação
import {AuthContext} from '../../contexts/auth'; //controle de autenticação

export default function SignIn(){
    const [email, setEmail] = useState('');  //passa no value do input
    const [password, setPassword] = useState('')
    
    const {signIn, loadingAuth} = useContext(AuthContext)

    function handleSignIn(event){
        event.preventDefault();

        if(email !== '' && password !== ''){
            signIn(email, password);
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema de chamados"/>
                </div>
                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="email@email.com" value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder="********" value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                    <button type="submit">
                        {loadingAuth ? "Carregando..." : "Acessar"}
                    </button>
                </form>
                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}