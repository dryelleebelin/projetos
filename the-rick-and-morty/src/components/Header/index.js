import React, { useState } from 'react';
import './header.scss';
import logo from '../../images/logo.png';
import logo2 from '../../images/logo2.png';
import DarkMode from '../DarkMode/DarkMode';
import { IoMenu, IoClose } from "react-icons/io5";
import 'animate.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const scrollToCharacters = () => {
        document.getElementById('characters').scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToPhrases = () => {
        document.getElementById('phrases').scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToSeasons = () => {
        document.getElementById('seasons').scrollIntoView({ behavior: 'smooth' });
    };

    const menuShow = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <header>
            <div onClick={scrollToTop}>
                <img className='logo2' src={logo2} alt='Logo Rick and Morty'/>
                <img className='logo' src={logo} alt='Logo'/>
            </div>
            <nav>
                <a onClick={scrollToTop}>HOME</a>
                <a onClick={scrollToCharacters}>PERSONAGENS</a>
                <a onClick={scrollToPhrases}>FRASES E MEMES</a>
                <a onClick={scrollToSeasons}>TEMPORADAS</a>
            </nav>
            <div className='dark-mode'>
                <DarkMode/>
            </div>

            <button className='menu-icon' onClick={menuShow}>
                {menuOpen ? <IoClose className='icon'/> : <IoMenu className='icon'/>}
            </button>

            {menuOpen && (
                <>
                    <span className='close-menu' onClick={closeMenu}/>
                    <div className='animate__animated animate__fadeInRight nav-menu'>
                        <a onClick={() => { scrollToTop(); closeMenu(); }}>HOME</a>
                        <a onClick={() => { scrollToCharacters(); closeMenu(); }}>PERSONAGENS</a>
                        <a onClick={() => { scrollToPhrases(); closeMenu(); }}>FRASES E MEMES</a>
                        <a onClick={() => { scrollToSeasons(); closeMenu(); }}>TEMPORADAS</a>
                        <div className='dark-mode-menu'>
                            <DarkMode/>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
