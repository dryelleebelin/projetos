import React, { useState } from 'react';
import './header.scss';

import logo from '../../images/logo.png';
import avatar from '../../images/avatar.svg';

import { IoSearch } from "react-icons/io5";

export default function Header() {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header className='header'>
      <img className='logo' src={logo} alt='Logo'/>
      <nav>
        <a href='#'>HOME</a>
        <a href='#'>NEW</a>
        <a href='#'>ACCOUNT</a>
        <a href='#'>MY LIST</a>
        <a href='#'>FILTERS</a>
      </nav>
      <div>
        {searchVisible && <input type="text" placeholder="Search..."/>}
        <IoSearch onClick={toggleSearch} />
        <img src={avatar} alt='Avatar'/>
      </div>
    </header>
  );
}
