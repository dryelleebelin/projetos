import React, { useState, useEffect } from "react";
import './home.css';
import logo from '../../imagens/logo.png';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bebida1 from '../../imagens/bebida1.webp';
import { Link } from 'react-router-dom';
import whatsapp from '../../imagens/whatsapp.png';
import api from '../../services/api';

export default function Home() {
    const [showTodos, setShowTodos] = useState(false);
    const [produtos, setPodutos] = useState([])
    const [adm, isAdm] = useState(window.localStorage.getItem("num") != null)
    const anoAtual = new Date().getFullYear();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredProducts = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleVerTodosClick = () => {
        setShowTodos(true);
        const button = document.getElementById('ver-todos-button');
        if (button) {
            button.style.display = 'none';
        }
    };  

    const handleRede = async () => {
        try {
            await api.get('/Produtos').then((response) => {
                setPodutos(response.data)
            })  
        } catch (error) {
        }
    }
    
    useEffect(() => {
        handleRede()
    }, [])
    const settingsCarossel = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div className="body-home">
            <header>
                <article>
                    <Link to={`/`}><img src={logo}/></Link>
                    <form action="#">
                        <input type="text" placeholder="Buscar" value={searchQuery} onChange={handleSearch}/>
                        <button type="submit" onClick={handleVerTodosClick}><BiSearch /></button>
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
                            <p>Todos os dias das 12h às 22h</p>
                        </div>
                    </section>
                    <div className="botoes">
                        {adm ? "" : <Link to={`/login`}><button>LOGIN</button></Link>}
                        {adm ? <Link to={`/fiado`}><button>FIADO</button></Link> : ""}
                    </div>
                </article>
                <nav>
                    <a href="#" onClick={handleVerTodosClick}>Todos</a>
                    <a href="#cervejas" onClick={handleVerTodosClick}>Cervejas</a>
                    <a href="#whisky" onClick={handleVerTodosClick}>Whisky</a>
                    <a href="#vinhos" onClick={handleVerTodosClick}>Vinhos</a>
                    <a href="#gin" onClick={handleVerTodosClick}>Gin</a>
                    <a href="#" onClick={handleVerTodosClick}>Cachaças</a>
                    <a href="#" onClick={handleVerTodosClick}>Vodkas</a>
                    <a href="#" onClick={handleVerTodosClick}>Energéticos</a>
                    <a href="#" onClick={handleVerTodosClick}>Refrigerantes</a>
                    <a href="#" onClick={handleVerTodosClick}>Outros</a>
                </nav>
            </header>

            <main>
                <a href="https://api.whatsapp.com/send/?phone=5511940165069&text=Olá! Gostaria de fazer um pedido.&type=phone_number&app_absent=0" className="whatsapp" target="_blank">
                    <img src={whatsapp} />
                    <p>Faça seu pedido</p>
                </a>

                <section className="section-destaques">
                    <h2>Produtos em destaque<p>a</p></h2>
                    <Slider {...settingsCarossel} className="slider-carossel">
                    {filteredProducts.map((produto) => (
                        <div key={produto.numeroProduto} className="item">
                            <div className="label-avatar">
                                <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} id="cervejas"/>
                            </div>
                            <p>{produto.nome}</p>
                            <p>R${produto.valor.toFixed(2).replace(".", ",")}</p>
                            {adm ? <Link to={`/editar/${produto.numeroProduto}`}><button className="btn btn-dark">Editar produto</button></Link> : ""}
                        </div>
                     ))}
                    </Slider>
                    <button id="ver-todos-button" className="btn-ver-todos" onClick={handleVerTodosClick} style={{ display: showTodos ? 'none' : 'block' }}>Ver todos os produtos</button>
                </section>

                {showTodos &&  filteredProducts.filter((produto) => produto.tipo === 1).length > 0 &&(
                    <section className="section-destaques">
                        <h2>Cervejas<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                        {filteredProducts.filter((produto) => produto.tipo === 1).map((produto) => (
                            <div key={produto.numeroProduto} className="item">
                                <div className="label-avatar">
                                    <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} id="whisky"/>
                                </div>
                                <p>{produto.nome}</p>
                                <p>R${produto.valor.toFixed(2).replace(".", ",")}</p>
                                {adm ? <Link to={`/editar/${produto.numeroProduto}`}><button className="btn btn-dark">Editar produto</button></Link> : ""}
                            </div>
                         ))}
                        </Slider>
                    </section>
                )}

                {showTodos && filteredProducts.filter((produto) => produto.tipo === 2).length > 0 &&(
                    <section className="section-destaques">
                        <h2>Whisky<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                        {filteredProducts.filter((produto) => produto.tipo === 2).map((produto) => (
                            <div key={produto.numeroProduto} className="item">
                                <div className="label-avatar">
                                    <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} id="vinhos"/>
                                </div>
                                <p>{produto.nome}</p>
                                <p>R${produto.valor.toFixed(2).replace(".", ",")}</p>
                                {adm ? <Link to={`/editar/${produto.numeroProduto}`}><button className="btn btn-dark">Editar produto</button></Link> : ""}
                            </div>
                        ))}
                        </Slider>
                    </section>
                )}

                {showTodos &&  filteredProducts.filter((produto) => produto.tipo === 3).length > 0 && (
                    <section className="section-destaques">
                        <h2>Vinhos<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                        {filteredProducts.filter((produto) => produto.tipo === 3).map((produto) => (
                            <div key={produto.numeroProduto} className="item">
                                <div className="label-avatar">
                                    <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} id="gin"/>
                                </div>
                                <p>{produto.nome}</p>
                                <p>R${produto.valor.toFixed(2).replace(".", ",")}</p>
                                {adm ? <Link to={`/editar/${produto.numeroProduto}`}><button className="btn btn-dark">Editar produto</button></Link> : ""}
                            </div>
                        ))}
                        </Slider>
                    </section>
                )}

                {showTodos && filteredProducts.filter((produto) => produto.tipo === 4).length > 0 && (
                    <section className="section-destaques">
                        <h2>Gin<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                        {filteredProducts.filter((produto) => produto.tipo === 4).map((produto) => (
                            <div key={produto.numeroProduto} className="item">
                                <div className="label-avatar">
                                    <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`}/>
                                </div>
                                <p>{produto.nome}</p>
                                <p>R${produto.valor.toFixed(2).replace(".", ",")}</p>
                                {adm ? <Link to={`/editar/${produto.numeroProduto}`}><button className="btn btn-dark">Editar produto</button></Link> : ""}
                            </div>
                        ))}
                        </Slider>
                    </section>
                )}
                {/*
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
                */}
            </main>

            <footer>
                <h2>Contato</h2>
                <p>(11) 94710-5521</p>
                <p>kaua.kfm@icloud.com.br</p>
                <a href="https://www.instagram.com/adega_gordao131/" target="_blank">Instagram</a>
                <h6>Copyright Adega do Gordão - {anoAtual}. Todos os direitos reservados.</h6>
            </footer>
        </div>
    )
}
