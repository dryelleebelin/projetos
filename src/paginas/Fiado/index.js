import React from 'react';
import './fiado.css';
import logo from '../../imagens/logo.png';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Fiado(){
    return(
        <div className='body-fiado'>
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
                            <p>Todos os dias das 12h as 22h</p>
                        </div>
                    </section>
                    <Link to={`/`}><button>HOME</button></Link>
                </article>
                <nav>
                    <p>Bem-vindo ao Controle de Fiados. Aqui, você pode adicionar, editar ou excluir registros de fiados e manter um controle eficaz.</p>
                </nav>
            </header>

            <main>
                <h2>Controle de Fiados</h2>
                <Link to={`/fiado/add-usuario`}><button className='btn btn-success'>Adicionar usuário</button></Link>

                <table className='table table-dark table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">CEP</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Rua</th>
                            <th scope="col">Número</th>
                            <th scope="col">Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>João Silva</td>
                            <td>(123) 456-7890</td>
                            <td>Masculino</td>
                            <td>123</td>
                            <td>Centro</td>
                            <td>Rua A</td>
                            <td>123</td>
                            <td><button className='btn btn-primary'>Ver fiados</button></td>
                        </tr>
                        <tr>
                            <td>Maria Oliveira</td>
                            <td>(987) 654-3210</td>
                            <td>Feminino</td>
                            <td>123</td>
                            <td>Ipanema</td>
                            <td>Rua B</td>
                            <td>456</td>
                            <td><button className='btn btn-primary'>Ver fiados</button></td>
                        </tr>
                        <tr>
                            <td>Ana Rodrigues</td>
                            <td>(444) 555-6666</td>
                            <td>Feminino</td>
                            <td>123</td>
                            <td>Copacabana</td>
                            <td>Rua D</td>
                            <td>987</td>
                            <td><button className='btn btn-primary'>Ver fiados</button></td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    )
}