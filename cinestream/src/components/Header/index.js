import React, { useEffect, useState } from 'react'
import './header.scss'
import { Link, useLocation } from 'react-router-dom'
import { db } from '../../services/firebaseConnection'
import { doc, getDoc } from "firebase/firestore"
import useTranslations from '../../translations/useTranslations'

import logo from '../../images/logo.png'

import { IoSearch } from "react-icons/io5"

export default function Header(){
  const translations = useTranslations()
  const location = useLocation()
  const [searchVisible, setSearchVisible] = useState(false)
  const [avatar, setAvatar] = useState('')

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  }

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
      console.error(translations.errorWhenSearchingForAvatar, error)
    }
  }

  useEffect(() => {
    fetchAvatar()
  }, [])

  return (
    <header className='header'>
      <img className='logo' src={logo} alt='Logo' onClick={scrollToTop}/>
      <nav>
        <Link to={`/catalog`} className={location.pathname === '/catalog' ? 'active' : ''} onClick={scrollToTop}>{translations.catalog}</Link>
        <Link to={`/my-list`} className={location.pathname === '/my-list' ? 'active' : ''} onClick={scrollToTop}>{translations.myList}</Link>
        <Link to={`/account`} className={location.pathname === '/account' ? 'active' : ''} onClick={scrollToTop}>{translations.account}</Link>
      </nav>
      <div>
        {searchVisible && <input type="text" placeholder={translations.toSearchFor}/>}
        <IoSearch onClick={() => toggleSearch()}/>
        {avatar ? <Link to={`/account`} onClick={scrollToTop}><img src={avatar} alt='Avatar'/></Link> : <img src='https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Max' alt='Avatar' style={{opacity: '0'}}/>}
      </div>
    </header>
  );
}
