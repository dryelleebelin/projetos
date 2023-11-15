import React from 'react';
import './header.css';
import logo from '../../imagens/logo.svg';

export default function Header(){
    return(
        <div className='header'>
            <div>
                <img src={logo} alt='logo'/>
                <a href='#sobre'>Sobre</a>
                <a href='#servicos'>Serviços</a>
                <a href='#equipe'>Equipe</a>
                <a href='#unidades'>Unidades</a>
            </div>
            <button>Agendar horário</button>
        </div>
    )
}