import React from 'react';
import './header.css';
import logo from '../../imagens/logo.svg';

export default function Header(){
    return(
        <div className='header'>
            <div>
                <img src={logo} alt='logo'/>
                <a href='#sobre'>Sobre</a>
                <a href='#sobre'>Serviços</a>
                <a href='#sobre'>Contatos</a>
            </div>
            <button>Agendar horário</button>
        </div>
    )
}