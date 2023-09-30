import React from "react"
import './home.css';
import logo from '../../imagens/logo.png';
import {BiSearch} from 'react-icons/bi';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {BsWhatsapp} from 'react-icons/bs';

export default function Home(){
    return(
        <div className="body-home">
            <header>
                <article>
                    <img src={logo}/>
                    <form>
                        <input type="text"  placeholder="Buscar"/>
                        <button type="submit"><BiSearch/></button>
                    </form>
                    <section>
                        <FaMapMarkerAlt/>
                        <div>
                            <h6>Endereço</h6>
                            <p>R. Faustolo, 1.493 - Lapa</p>
                            <p>São Paulo - SP, 05041-001</p>
                        </div>
                    </section>
                    <section>
                        <AiOutlineClockCircle/>
                        <div>
                            <h6>Funcionamento</h6>
                            <p>Seg. a Sex. das 08h as 18h</p>
                            <p>Sábado das 08h as 17h</p>
                        </div>
                    </section>
                    <section>
                        <BsWhatsapp/>
                        <div>
                            <h6>Whatsapp</h6>
                            <p>11 94710-5521</p>
                        </div>
                    </section>
                </article>
                <nav>
                    <a href="#">Todos</a>
                    <a href="#">Promoções</a>
                    <a href="#">Cervejas</a>
                    <a href="#">Whisky</a>
                    <a href="#">Vinhos</a>
                    <a href="#">Gin</a>
                    <a href="#">Cachaças</a>
                    <a href="#">Vodkas</a>
                    <a href="#">Conhaques</a>
                    <a href="#">Espumantes</a>
                    <a href="#">Licores</a>
                    <a href="#">Outros</a>
                </nav>
            </header>

            <main>
                
            </main>

            <footer>

            </footer>
        </div>
    )
}