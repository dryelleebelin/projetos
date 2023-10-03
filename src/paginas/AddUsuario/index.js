import React from "react";
import './addusuario.css';

export default function AddUsuario(){
    return(
        <div className="body-add">
            <div>
                <label>Nome completo:</label>
                <input type="text" placeholder='Digite o nome completo'/>
            </div>
            <div>
                <label>Telefone:</label>
                <input type="tel" placeholder='(**) *****-****'/>
            </div>
            <div>
                <label>Data de nascimento:</label>
                <input type="date" placeholder='Digite a data de nascimento'/>
            </div>
            <div>
                <label>Sexo:</label>
                <select>
                    <option>Selecionar</option>
                    <option>Feminino</option>
                    <option>Masculino</option>
                    <option>Outro</option>
                </select>
            </div>
            <div>
                <label>CEP:</label>
                <input type="email" placeholder='Digite o CEP'/>
            </div>
            <div>
                <label>Cidade:</label>
                <input type="email" placeholder='Digite a cidade'/>
            </div>
            <div>
                <label>Bairro:</label>
                <input type="email" placeholder='Digite o bairro'/>
            </div>
            <div>
                <label>Rua:</label>
                <input type="email" placeholder='Digite a rua'/>
            </div>
            <div>
                <label>Número residêncial:</label>
                <input type="email" placeholder='Digite o número residêncial'/>
            </div>
            <button className="btn btn-success">Salvar</button>
        </div>
    )
}