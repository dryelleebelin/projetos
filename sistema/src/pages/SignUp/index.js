import logo from '../../assets/logo.png';

import {useState, useContext} from 'react';  //salvar dados //chama o contexto
import {Link} from 'react-router-dom';  //usar navegação

import {AuthContext} from '../../contexts/auth';

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');  //passa no value do input
    const [password, setPassword] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext);

    async function handleSubmit(event){ //recebe um evento de ação do form
        event.preventDefault();  //prevê comportamento de atualizar a página //impede que o formulário seja enviado e a página seja recarregada quando o botão for clicado

        if(name !== '' && email !== '' && password !== ''){
            await signUp(name, email, password)
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema de chamados"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Nova conta</h1>
                    <input type="text" placeholder="Digite seu nome" value={name}
                    onChange={(event) => setName(event.target.value)}/>
                    <input type="text" placeholder="email@email.com" value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder="********" value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                    <button type="submit"> 
                        {loadingAuth ? 'Carregando...' : 'Cadastrar'} 
                    </button>
                </form> 
                <Link to="/">Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}