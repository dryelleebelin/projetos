import React from "react";
import './addusuario.css';

export default function AddUsuario(){
    return(
        <div className="row">
            <div className="col-md-3">
                <label>Nome completo:</label>
                <input type="text" placeholder='Digite seu nome'/>
            </div>
            <div className="col-md-2">
                <label>Telefone:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div className="col-md-2">
                <label>Data de nascimento:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div className="col-md-2">
                <label>Sexo:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div className="col-md-2">
                <label>CEP:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div className="col-md-2">
                <label>Cidade:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div className="col-md-2">
                <label>Bairro:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div className="col-md-2">
                <label>Rua:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div className="col-md-2">
                <label>Número residêncial:</label>
                <input type="email" placeholder='Digite seu e-mail'/>
            </div>
            <div><button className="btn btn-success">Salvar</button></div>
        </div>
    )
}