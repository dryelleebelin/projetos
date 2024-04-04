import React, { useContext, useState } from 'react'
import './header.scss';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import logo from '../../images/logo.png'
import avatar from '../../images/avatar.svg'

import { IoSearch } from "react-icons/io5"

export default function Header() {
  const { logout } = useContext(AuthContext)
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
        <a href='#'>CONTA</a>
      </nav>
      <div>
        {searchVisible && <input type="text" placeholder="Procurar..."/>}
        <IoSearch onClick={() => toggleSearch()}/>
        <img src={avatar} alt='Avatar' onClick={() => logout()}/>
      </div>
    </header>
  );
}
