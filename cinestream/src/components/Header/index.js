import React, { useState } from 'react';
import './header.scss';
import { toast } from 'react-toastify';

import logo from '../../images/logo.png';
import avatar from '../../images/avatar.svg';

import { IoSearch } from "react-icons/io5";

export default function Header() {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const info = () => {
    toast.info("Em desenvolvimento!")
  }

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <header className='header'>
      <img className='logo' src={logo} alt='Logo' onClick={scrollToTop}/>
      <nav>
        <a onClick={scrollToTop}>HOME</a>
        <a href='#' onClick={info}>MINHA LISTA</a>
        <a href='#' onClick={info}>CONTA</a>
      </nav>
      <div>
        {searchVisible && <input type="text" placeholder="Procurar..."/>}
        <IoSearch onClick={() => {toggleSearch(); info();}} />
        <img src={avatar} alt='Avatar' onClick={info}/>
      </div>
    </header>
  );
}
