import './login.css';
import logo from '../../imagens/logo.png';
import {BiSearch} from 'react-icons/bi';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {AiOutlineClockCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../Home/home.css';

export default function Login(){
    return(
        <div className='body-login'>
            <header>
                <article>
                    <img src={logo}/>
                    <form action="https://www.instagram.com/adega_gordao131/">
                        <input type="text"  placeholder="Buscar"/>
                        <button type="submit"><BiSearch/></button>
                    </form>
                    <section>
                        <FaMapMarkerAlt/>
                        <div>
                            <h6>Endereço</h6>
                            <p>R. Antônio Carlos, 131 - Vila Ceres</p>
                            <p>Barueri- SP, 06406120</p>
                        </div>
                    </section>
                    <section>
                        <AiOutlineClockCircle/>
                        <div>
                            <h6>Funcionamento</h6>
                            <p>Seg. a Dom. das 12h as 22h</p>
                        </div>
                    </section>
                    <Link to={`/login`}><button>LOGIN</button></Link>
                </article>
                <nav>
                    <a href="#">Todos</a>
                    <a href="#">Cervejas</a>
                    <a href="#">Whisky</a>
                    <a href="#">Vinhos</a>
                    <a href="#">Gin</a>
                    <a href="#">Cachaças</a>
                    <a href="#">Vodkas</a>
                    <a href="#">Energéticos</a>
                    <a href="#">Refrigerantes</a>
                    <a href="#">Outros</a>
                </nav>
            </header>
            <main>
                <h2>Digite seu<br/>usuário<br/>e senha</h2>
                <form>
                    <label>Usuário</label>
                    <input type='text' autoComplete='none'/>
                    <label>Senha</label>
                    <input type='password' autoComplete='none'/>
                    <button type='submit'>Login</button>
                </form>
            </main>
        </div>
    )
}