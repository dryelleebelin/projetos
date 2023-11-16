import React, { useState } from 'react';
import ModalAgendar from '../ModalAgendar';

import './header.css';
import logo from '../../imagens/logo.svg';

export default function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='header'>
      <div>
        <img src={logo} alt='logo'/>
        <a href='#sobre'>Sobre</a>
        <a href='#servicos'>Serviços</a>
        <a href='#equipe'>Equipe</a>
        <a href='#unidades'>Unidades</a>
      </div>
      <button onClick={openModal}>Agendar horário</button>
      <ModalAgendar isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}
