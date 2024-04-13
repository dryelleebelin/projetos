import React, { useState } from 'react'
import './header.scss'
import { Link } from 'react-router-dom'

import logo from '../../images/logo.png'
import avatar from '../../images/avatar.svg'

import { IoSearch } from "react-icons/io5"

export default function Header(){
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <header className='header'>
      <img className='logo' src={logo} alt='Logo' onClick={scrollToTop}/>
      <nav>
        <Link to={`/catalog`} onClick={scrollToTop}>CATÁLOGO</Link>
        <Link to={`/my-list`} onClick={scrollToTop}>MINHA LISTA</Link>
        <Link to={`/account`} onClick={scrollToTop}>CONTA</Link>
      </nav>
      <div>
        {searchVisible && <input type="text" placeholder="Procurar..."/>}
        <IoSearch onClick={() => toggleSearch()}/>
        <Link to={`/account`} onClick={scrollToTop}><img src={avatar} alt='Avatar'/></Link>
      </div>
    </header>
  );
}
