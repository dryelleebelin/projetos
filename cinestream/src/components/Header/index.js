import React, { useEffect, useState } from 'react'
import './header.scss'
import { Link, useLocation } from 'react-router-dom'
import { db } from '../../services/firebaseConnection'
import { doc, getDoc } from "firebase/firestore"

import logo from '../../images/logo.png'

import { IoSearch } from "react-icons/io5"

export default function Header(){
  const location = useLocation()
  const [searchVisible, setSearchVisible] = useState(false);
  const [avatar, setAvatar] = useState('')

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  async function fetchAvatar(){
    try{
      const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
      const docRef = doc(db, 'avatar', uid)
      const docSnap = await getDoc(docRef)
      setAvatar(docSnap.data().url)

    } catch(error){
      console.error("Erro ao buscar avatar: ", error)
    }
  }

  useEffect(() => {
    fetchAvatar()
  }, [])

  return (
    <header className='header'>
      <img className='logo' src={logo} alt='Logo' onClick={scrollToTop}/>
      <nav>
        <Link to={`/catalog`} className={location.pathname === '/catalog' ? 'active' : ''} onClick={scrollToTop}>CATÁLOGO</Link>
        <Link to={`/my-list`} className={location.pathname === '/my-list' ? 'active' : ''} onClick={scrollToTop}>MINHA LISTA</Link>
        <Link to={`/account`} className={location.pathname === '/account' ? 'active' : ''} onClick={scrollToTop}>CONTA</Link>
      </nav>
      <div>
        {searchVisible && <input type="text" placeholder="Procurar..."/>}
        <IoSearch onClick={() => toggleSearch()}/>
        {avatar ? <Link to={`/account`} onClick={scrollToTop}><img src={avatar} alt='Avatar'/></Link> : <img src='https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Max' alt='Avatar' style={{opacity: '0'}}/>}
      </div>
    </header>
  );
}
