import React, { useEffect, useState } from 'react';
import './fiado.css';
import logo from '../../imagens/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';

export default function Fiado() {
    const [usuarios, setUsuario] = useState([]);
    const [oid , setOID] = useState('');
    const navigate = useNavigate();

    const handleUsuario = async () => {
        try {
            await api.get('/Produtos/obterUsuarios').then((response) => {
                setUsuario(response.data);
            })
        }
        catch (error) {

        }
    }
    useEffect(() => {
        handleUsuario();
    }, [])

const handleDetalhes = (id) =>{
    setOID(id)
    navigate("/")
}




    return (
        <div className='body-fiado'>
            <div className='div-buscar'>
                <h2>Controle de Fiados</h2>
                <div>
                    <Link to={`/fiado/add-usuario`}><button className='btn btn-success'>Adicionar usuário</button></Link>
                </div>

                <table className='table table-dark table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Data nascimento</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Cep</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Rua</th>
                            <th scope="col">Numero</th>
                            <th scope="col">Fiados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios
                        .map((user) => (     
                        <tr>
                            <td>{user.nome}</td>
                            <td>{user.telefone}</td>
                            <td>{new Date(user.dataNascimento).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                            <td>{user.sexo}</td>
                            <td>{user.cep}</td>
                            <td>{user.cidade}</td>
                            <td>{user.bairro}</td>
                            <td>{user.rua}</td>
                            <td>{user.numero}</td>
                            <td><button className='btn btn-primary' value={oid} onClick={() => {handleDetalhes(user.id)}}>Ver fiados</button></td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}