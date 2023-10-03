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

                "Adicionar Fiado" "Editar Fiado" "Excluir Fiado"

                <table className='table table-dark table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Turmas</th>
                            <th scope="col">Vagas</th>
                            <th scope="col">Espera</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    )
}