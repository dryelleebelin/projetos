import './login.css';
import logo from '../../imagens/logo.png';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import '../Home/home.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setsenha] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleChange2 = (event) => {
        setsenha(event.target.value);
    };
    const handleLogin = async () => {
        setLoadingAuth(true);

        try {
            if (email == "11940165069" && senha == "11940165069") {
                const response = { email, senha };
                window.localStorage.setItem('num',email)
                console.log(response);
                navigate('/');
            }
            else {
                alert("Este login não existe")
            }
        }

        catch (error) {
            console.log('deu merda')
        }

    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };




    return (
        <div className='body-login'>
            <header>
                <article>
                    <img src={logo} />
                    <form >
                        <input type="text" placeholder="Buscar" />
                        <button type="submit"><BiSearch /></button>
                    </form>
                    <section>
                        <FaMapMarkerAlt />
                        <div>
                            <h6>Endereço</h6>
                            <p>R. Antônio Carlos, 131 - Vila Ceres</p>
                            <p>Barueri- SP, 06406120</p>
                        </div>
                    </section>
                    <section>
                        <AiOutlineClockCircle />
                        <div>
                            <h6>Funcionamento</h6>
                            <p>Todos os dias das 12h as 22h</p>
                        </div>
                    </section>
                    <Link to={`/`}><button>HOME</button></Link>
                </article>
                <nav>
                    <Link to={`/`}>Todos</Link>
                    <Link to={`/`}>Cervejas</Link>
                    <Link to={`/`}>Whisky</Link>
                    <Link to={`/`}>Vinhos</Link>
                    <Link to={`/`}>Gin</Link>
                    <Link to={`/`}>Cachaças</Link>
                    <Link to={`/`}>Vodkas</Link>
                    <Link to={`/`}>Energéticos</Link>
                    <Link to={`/`}>Refrigerantes</Link>
                    <Link to={`/`}>Outros</Link>
                </nav>
            </header>

            <main>
                <h2>Digite seu<br />usuário e senha</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>Usuário</label>
                    <input type='text' value={email} onChange={handleChange} autoComplete='none' />
                    <label>Senha</label>
                    <input type='password' value={senha} onChange={handleChange2} autoComplete='none' />
                    <div className='botoes-login'>
                        <button type="submit" className="botao-azul" disabled={loadingAuth}>
                            {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Entrar"}
                        </button>
                    </div>
                </form>
            </main>

            <footer>
                <h2>Contato</h2>
                <p>(11) 94710-5521</p>
                <p>kaua.kfm@icloud.com.br</p>
                <a href="https://www.instagram.com/adega_gordao131/" target="_blank">Instagram</a>
                <h6>Copyright Adega do Gordão - 2023. Todos os direitos reservados.</h6>
            </footer>
        </div>
    )
}