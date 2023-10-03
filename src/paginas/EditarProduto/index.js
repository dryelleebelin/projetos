import React from "react";
import './editarproduto.css';

export default function EditarProduto(){
    return(
        <div className="body-editar">
            <h2>Editar produto</h2>
            <div>
                <label>Atualizar nome do produto:</label>
                <input type="text" placeholder='Digite o nome do produto'/>
            </div>
            <div>
                <label>Atualizar preço do produto:</label>
                <input type="text" placeholder='Digite o novo valor'/>
            </div>
            <div className="botoes">
                <button className="btn btn-danger">Excluir</button>
                <button className="btn btn-success">Atualizar</button>
            </div>
        </div>
    )
}