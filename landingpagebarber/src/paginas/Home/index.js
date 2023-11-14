import React from 'react';
import './home.css';
import Header from '../../componentes/Header';
import images from '../../imagens/images.png';
import corte1 from '../../imagens/corte1.jpg';
import corte2 from '../../imagens/corte2.jpg';
import corte3 from '../../imagens/corte3.jpg';
import barber1 from '../../imagens/barber1.jpg';
import barber2 from '../../imagens/barber2.jpg';
import barber3 from '../../imagens/barber3.jpg';
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import logoAzul from '../../imagens/logo-azul.png';
import whatsapp from '../../imagens/whatsapp.png';

export default function Home(){
    return(
        <>
            <Header/>
            <div className='home'>
                <section className='cta'>
                    <div>
                        <h1>ESTILO É UM REFLEXO DA SUA ATITUDE E SUA PERSONALIDADE</h1>
                        <p>Horário de funcionamento: 09:00 ás 18:00</p>
                        <button>Agendar horário</button>
                    </div>
                </section>
                <section className='sobre'>
                    <div className='left'>
                        <img src={images} alt='imagens de exemplo'/>
                    </div>
                    <div className='right'>
                        <h1>Sobre</h1>
                        <p>Lorem ipsum dolor sit amet consectetur. Pellentesque ultricies pretium leo mauris mattis potenti quam morbi. Dictum montes non vel velit sagittis at nisl. Facilisi ultrices vitae eleifend a auctor sagittis auctor scelerisque.</p>
                        <p>Lorem ipsum dolor sit amet consectetur. Pellentesque ultricies pretium leo mauris mattis potenti quam morbi. Dictum montes non vel velit sagittis at nisl. Facilisi ultrices vitae eleifend a auctor sagittis auctor scelerisque.</p>
                        <h5>Horário de funcionamento: 09:00 ás 18:00</h5>
                    </div>
                </section>
                <section className='servicos'>
                    <h1>Serviços</h1>
                    <p className='text'>Lorem ipsum dolor sit amet consectetur. Iaculis eget sem magnis non turpis venenatis tellus varius. Viverra gravida eget ullamcorper pharetra vestibulum amet arcu ipsum. Nibh molestie eu amet quis potenti.</p>
                    <div className='cards'>
                        <div className='card'>
                            <img src={corte1} alt='imagem de corte'/>
                            <div>
                                <p>Corte de cabelo</p>
                                <p>R$ 55,90</p>
                            </div>
                        </div>
                        <div className='card'>
                            <img src={corte2} alt='imagem de corte'/>
                            <div>
                                <p>Corte completo</p>
                                <p>R$ 85,90</p>
                            </div>
                        </div>
                        <div className='card'>
                            <img src={corte3} alt='imagem de corte'/>
                            <div>
                                <p>Corte & Barba</p>
                                <p>R$ 95,00</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='time'>
                    <h1>NOSSA EQUIPE</h1>
                    <div className='cards'>
                        <div className='card'>
                            <img src={barber1}/>
                            <span>Lucas Silva</span>
                            <div>
                                <FiFacebook />
                                <FiInstagram />
                                <FiTwitter />
                            </div>
                        </div>
                        <div className='card'>
                            <img src={barber2}/>
                            <span>Henrique</span>
                            <div>
                                <FiFacebook />
                                <FiInstagram />
                                <FiTwitter />
                            </div>
                        </div>
                        <div className='card'>
                            <img src={barber3}/>
                            <span>Matheus Fraga</span>
                            <div>
                                <FiFacebook />
                                <FiInstagram />
                                <FiTwitter />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='unidades'>
                    <h1>Nossa unidades</h1>
                    <div className='cards'>
                        <div className='card unidade1'>
                            <div>
                                <p>Rua Aguiar, nº 120</p>
                                <p>Campo Grande - MS</p>
                            </div>
                        </div>
                        <div className='card unidade2'>
                            <div>
                                <p>Rua Centro, nº 10</p>
                                <p>Campo Grande - MS</p>
                            </div>
                        </div>
                    </div>
                </section>
                <footer>
                    <div>
                        <FiFacebook />
                        <FiInstagram />
                        <FiTwitter />
                    </div>
                    <img src={logoAzul}/>
                </footer>
                <img src={whatsapp} className='whatsapp'/>
            </div>
        </>
    )
}