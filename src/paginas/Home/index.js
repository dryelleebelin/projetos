import React, { useState } from "react";
import './home.css';
import logo from '../../imagens/logo.png';
import {BiSearch} from 'react-icons/bi';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {AiOutlineClockCircle} from 'react-icons/ai';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bebida1 from '../../imagens/bebida1.webp';
import bebida2 from '../../imagens/bebida2.webp';
import bebida3 from '../../imagens/bebida3.webp';
import bebida4 from '../../imagens/bebida4.webp';
import { Link } from 'react-router-dom';
import whatsapp from '../../imagens/whatsapp.png';

export default function Home(){
    const [showTodos, setShowTodos] = useState(false);

    const handleVerTodosClick = () => {
        setShowTodos(true);
    };

    const contentCarossel = [
        <div key={1} className="item">
            <img src={bebida1}/>
            <p>Vinho Esporão Monte Velho Branco 750ml</p>
            <p>R$68,50</p>
        </div>,
        <div key={2} className="item">
            <img src={bebida2}/>
            <p>Vinho Montes Alpha Malbec 750ml</p>
            <p>R$175,00</p>
        </div>,
        <div key={3} className="item">
            <img src={bebida3}/>
            <p>Cachaça Santo Grau Paraty Reserva 750ml</p>
            <p>R$82,00</p>
        </div>,
        <div key={4} className="item">
            <img src={bebida4}/>
            <p>Whisky Johnnie Walker Red Label 1l</p>
            <p>R$87,00</p>
        </div>,
        <div key={5} className="item">
            <img src={bebida1}/>
            <p>Vinho Esporão Monte Velho Branco 750ml</p>
            <p>R$68,50</p>
        </div>,
        <div key={6} className="item">
            <img src={bebida2}/>
            <p>Vinho Montes Alpha Malbec 750ml</p>
            <p>R$175,00</p>
        </div>,
        <div key={7} className="item">
            <img src={bebida3}/>
            <p>Cachaça Santo Grau Paraty Reserva 750ml</p>
            <p>R$82,00</p>
        </div>,
        <div key={8} className="item">
            <img src={bebida4}/>
            <p>Whisky Johnnie Walker Red Label 1l</p>
            <p>R$87,00</p>
        </div>,
        <div key={9} className="item">
            <img src={bebida1}/>
            <p>Vinho Esporão Monte Velho Branco 750ml</p>
            <p>R$68,50</p>
        </div>,
        <div key={10} className="item">
            <img src={bebida2}/>
            <p>Vinho Montes Alpha Malbec 750ml</p>
            <p>R$175,00</p>
        </div>
    ];

    const settingsCarossel = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1
      };

    return(
        <div className="body-home">
            <header>
                <article>
                    <Link to={`/`}><img src={logo}/></Link>
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
                <a href="https://api.whatsapp.com/send/?phone=5511940165069&text=kaualindo&type=phone_number&app_absent=0" className="whatsapp" target="_blank">
                    <img src={whatsapp}/>
                    <p>Faça seu pedido</p>
                </a>
                <section className="section-destaques">
                    <h2>Produtos em destaque<p>a</p></h2>
                    <Slider {...settingsCarossel} className="slider-carossel">
                        {contentCarossel.map((item) => (
                            <div key={item.key}>
                                {item}
                            </div>
                        ))}
                    </Slider>
                    <button className="btn-ver-todos" onClick={handleVerTodosClick}>Ver todos os produtos</button>
                </section>
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Cervejas<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Whisky<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Vinhos<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Gin<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Cachaças<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Vodkas<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Energéticos<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Refrigerantes<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
                {showTodos && (
                    <section className="section-destaques">
                        <h2>Outros<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {contentCarossel.map((item) => (
                                <div key={item.key}>
                                    {item}
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}
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