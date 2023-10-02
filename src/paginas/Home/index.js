import React, { useState, useEffect, useRef } from "react";
import './home.css';
import logo from '../../imagens/logo.png';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bebida1 from '../../imagens/bebida1.webp';
import bebida2 from '../../imagens/bebida2.webp';
import bebida3 from '../../imagens/bebida3.webp';
import bebida4 from '../../imagens/bebida4.webp';
import { Link } from 'react-router-dom';
import whatsapp from '../../imagens/whatsapp.png';
import api from '../../services/api';
import { FiUpload } from 'react-icons/fi';


export default function Home() {
    const [showTodos, setShowTodos] = useState(false);
    const [produtos, setPodutos] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef('');
    const [viado, isViado] = useState(window.localStorage.getItem("num") != null)

    const handleVerTodosClick = () => {
        setShowTodos(true);
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleRede = async () => {
        try {
            await api.get('/Produtos').then((response) => {
                setPodutos(response.data)
            })
        } catch (error) {
        }
    }
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFormSubmit = async (id, e) => {

        if (selectedFiles.length === 0) {
            console.log("Selecione pelo menos uma foto")
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        try {
            const response = await api.post(`/Produtos/Atualizarfoto/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Foto enviada com sucesso");
        } catch (error) {
            console.log("Erro ao enviar a foto")
        }
    };

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
                    <Link to={`/`}><img src={logo} /></Link>
                    <form action="https://www.instagram.com/adega_gordao131/">
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
                    <img src={whatsapp} />
                    <p>Faça seu pedido</p>
                </a>
                <section className="section-destaques">
                    <h2>Produtos em destaque<p>a</p></h2>
                    <Slider {...settingsCarossel} className="slider-carossel">
                    {produtos 
                    .map((produto) => (
                                    <div key={produto.numeroProduto} className="item">
                                        <div className="label-avatar">
                                            {viado ? <FiUpload onClick={handleImageClick} color="black" size={25} /> : ""}
                                            <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} />
                                            {viado ? <><button className='botao-upload' onClick={() => {
                                                handleFormSubmit(produto.numeroProduto)
                                            }} type="button">Carregar foto</button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }} /> </> : ""}
                                        </div>
                                        <p>{produto.nome}</p>
                                        <p>R${produto.valor.toFixed(2)}</p>
                                    </div>
                                ))}
                    </Slider>
                    <button className="btn-ver-todos" onClick={handleVerTodosClick}>Ver todos os produtos</button>
                </section>

                {showTodos && (
                    <section className="section-destaques">
                        <h2>Cervejas<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                        {produtos
                                .filter((produto) => produto.tipo === 1) // Filtre os produtos de vinhos
                                .map((produto) => (
                                    <div key={produto.numeroProduto} className="item">
                                        <div className="label-avatar">
                                            {viado ? <FiUpload onClick={handleImageClick} color="black" size={25} /> : ""}
                                            <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} />
                                            {viado ? <><button className='botao-upload' onClick={() => {
                                                handleFormSubmit(produto.numeroProduto)
                                            }} type="button">Carregar foto</button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }} /> </> : ""}
                                        </div>
                                        <p>{produto.nome}</p>
                                        <p>R${produto.valor.toFixed(2)}</p>
                                    </div>
                                ))}
                        </Slider>
                    </section>
                )}

                {showTodos && (
                    <section className="section-destaques">
                        <h2>Whisky<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                        {produtos
                                .filter((produto) => produto.tipo === 2) // Filtre os produtos de vinhos
                                .map((produto) => (
                                    <div key={produto.numeroProduto} className="item">
                                        <div className="label-avatar">
                                            {viado ? <FiUpload onClick={handleImageClick} color="black" size={25} /> : ""}
                                            <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} />
                                            {viado ? <><button className='botao-upload' onClick={() => {
                                                handleFormSubmit(produto.numeroProduto)
                                            }} type="button">Carregar foto</button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }} /> </> : ""}
                                        </div>
                                        <p>{produto.nome}</p>
                                        <p>R${produto.valor.toFixed(2)}</p>
                                    </div>
                                ))}
                        </Slider>
                    </section>
                )}

                {showTodos && (
                    <section className="section-destaques">
                        <h2>Vinhos<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                            {produtos
                                .filter((produto) => produto.tipo === 3) // Filtre os produtos de vinhos
                                .map((produto) => (
                                    <div key={produto.numeroProduto} className="item">
                                        <div className="label-avatar">
                                            {viado ? <FiUpload onClick={handleImageClick} color="black" size={25} /> : ""}
                                            <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} />
                                            {viado ? <><button className='botao-upload' onClick={() => {
                                                handleFormSubmit(produto.numeroProduto)
                                            }} type="button">Carregar foto</button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }} /> </> : ""}
                                        </div>
                                        <p>{produto.nome}</p>
                                        <p>R${produto.valor.toFixed(2)}</p>
                                    </div>
                                ))}
                        </Slider>
                    </section>
                )}

                {showTodos && (
                    <section className="section-destaques">
                        <h2>Gin<p>a</p></h2>
                        <Slider {...settingsCarossel} className="slider-carossel">
                        {produtos
                                .filter((produto) => produto.tipo === 4) // Filtre os produtos de vinhos
                                .map((produto) => (
                                    <div key={produto.numeroProduto} className="item">
                                        <div className="label-avatar">
                                            {viado ? <FiUpload onClick={handleImageClick} color="black" size={25} /> : ""}
                                            <img src={produto.foto == null ? bebida1 : `http://localhost/images/${produto.foto}`} />
                                            {viado ? <><button className='botao-upload' onClick={() => {
                                                handleFormSubmit(produto.numeroProduto)
                                            }} type="button">Carregar foto</button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }} /> </> : ""}
                                        </div>
                                        <p>{produto.nome}</p>
                                        <p>R${produto.valor.toFixed(2)}</p>
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
                <h6>Copyright Adega do Gordão - 2023. Todos os direitos reservados.</h6>
            </footer>
        </div>
    )
}