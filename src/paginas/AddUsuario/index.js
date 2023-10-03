import React, { useState } from "react";
import './addusuario.css';
import api from '../../services/api';
export default function AddUsuario(){

    const [Nome, setNome] = useState('');
    const [Celular, setCelular] = useState('');
    const [DataNascimento, setDataNascimento] = useState('');
    const [Sexo, setSexo] = useState('Nenhum');
    const [Cep, setCep] = useState('');
    const [Cidade, setCidade] = useState('');
    const [Bairro, setBairro] = useState('');
    const [Rua, setRua] = useState('');
    const [Numero, setNumero] = useState('');
    const url = "Produtos/inserirUsuario";

    const handleNome = (event) => {
        setNome(event.target.value);
        console.log(Nome);
    };
    const handleCelular = (event) => {
        setCelular(event.target.value);
        console.log(Celular)
    };
    const handleNascimento = (event) => {
        setDataNascimento(event.target.value);
        console.log(DataNascimento)
    };
    const handleSexo = (event) => {
        setSexo(event.target.value);
        console.log(Sexo)
    };
    const handleCep = (event) => {
        setCep(event.target.value);
        console.log(Cep)
    };
    const handleCidade = (event) => {
        setCidade(event.target.value);
        console.log(Cidade)

    };
    const handleBairro =(event) => {
        setBairro(event.target.value);
        console.log(Bairro)

    };
    const handleRua = (event) => {
        setRua(event.target.value);
        console.log(Rua)

    };
    const handleNumero = (event) => {
        setNumero(event.target.value);
        console.log(Numero)

    };

    const handleCadastro = async () => {
        try {
            const response = await api.post(url, {nome : Nome, telefone :Celular, dataNascimento : DataNascimento,
                sexo : Sexo, cep : Cep, cidade : Cidade, bairro : Bairro, rua : Rua, numero : Numero   
            })
            if (response.status === 200) {
                setNome('');
                setCelular('');
                setDataNascimento('');
                setSexo('');
                setCep('');
                setCidade('');
                setBairro('');
                setRua('');
                setNumero('');
            }
        }
        catch (error) {
           alert("ta dano erro")
        }
    };

    return(
        <div className="body-add">
            <div>
                <label>Nome completo:</label>
                <input type="text" value={Nome} placeholder='Digite o nome completo'  onChange={handleNome}/>
            </div>
            <div>
                <label>Telefone:</label>
                <input type="tel" value={Celular} placeholder='(**) *****-****' onChange={handleCelular}/>
            </div>
            <div>
                <label>Data de nascimento:</label>
                <input type="date" value={DataNascimento} placeholder='Digite a data de nascimento' onChange={handleNascimento}/>
            </div>
            <div>
                <label>Sexo:</label>
                <select value={Sexo} onChange={handleSexo}>
                    <option value="Nenhum">Nenhum</option> 
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                </select>
            </div>
            <div>
                <label>CEP:</label>
                <input type="text" value={Cep} placeholder='Digite o CEP' onChange={handleCep}/>
            </div>
            
            <div>
                <label>Cidade:</label>
                <input type="text" value={Cidade} placeholder='Digite a cidade' onChange={handleCidade}/>
            </div>
            <div>
                <label>Bairro:</label>
                <input type="text" value={Bairro} placeholder='Digite o bairro' onChange={handleBairro}/>
            </div>
            <div>
                <label>Rua:</label>
                <input type="text" value={Rua} placeholder='Digite a rua' onChange={handleRua}/>
            </div>
            <div>
                <label>Número residêncial:</label>
                <input type="text" value={Numero} placeholder='Digite o número residêncial' onChange={handleNumero}/>
            </div>
            <button className="btn btn-success" onClick={handleCadastro}>Salvar</button>
        </div>
        
    )
}