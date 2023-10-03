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
                            <p>Seg. a Dom. das 12h as 22h</p>
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

                "Adicionar Fiado" "Excluir Fiado" "Pesquisar Fiado"

                <table className='table table-dark table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Editar</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Rua</th>
                            <th scope="col">Número</th>
                            <th scope="col">Data Fiado</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Data de Liquidação</th>
                            <th scope="col">Forma de Pagamento</th>
                            <th scope="col">Valor Pago</th>
                            <th scope="col">Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button>Editar</button></td>
                            <td>João Silva</td>
                            <td>(123) 456-7890</td>
                            <td>Masculino</td>
                            <td>Centro</td>
                            <td>Rua A</td>
                            <td>123</td>
                            <td>2023-09-25</td>
                            <td>150.00</td>
                            <td>2023-09-30</td>
                            <td>Cartão de Crédito</td>
                            <td>150.00</td>
                            <td>Pagamento efetuado no prazo</td>
                        </tr>
                        <tr>
                            <td><button>Editar</button></td>
                            <td>Maria Oliveira</td>
                            <td>(987) 654-3210</td>
                            <td>Feminino</td>
                            <td>Ipanema</td>
                            <td>Rua B</td>
                            <td>456</td>
                            <td>2023-10-05</td>
                            <td>200.00</td>
                            <td>null</td>
                            <td>Dinheiro</td>
                            <td>null</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><button>Editar</button></td>
                            <td>Ana Rodrigues</td>
                            <td>(444) 555-6666</td>
                            <td>Feminino</td>
                            <td>Copacabana</td>
                            <td>Rua D</td>
                            <td>987</td>
                            <td>2023-12-20</td>
                            <td>250.00</td>
                            <td>null</td>
                            <td>Transferência</td>
                            <td>null</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    )
}