import React, { useEffect, useState } from "react"
import './account.scss'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../services/firebaseConnection'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { signOut } from 'firebase/auth'
import useTranslations from "../../translations/useTranslations"

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ModalDeleteAccount from "../../components/ModalDeleteAccount"
import AvatarSelector from "../../components/AvatarSelector"

import { IoIosLogOut } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"

export default function Account(){
  const translations = useTranslations()
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalAvatar, setIsOpenModalAvatar] = useState(false)
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('@languageCinestream')
    return storedLanguage ? storedLanguage : 'portuguese'
  })

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

  async function fetchData(){
    try{
      const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      const user = auth.currentUser

      if (docSnap.exists()){
        setName(docSnap.data().name)
        setBirthday(docSnap.data().birthday)
        setEmail(user.email)
        setLoading(false)
        
      } else{
        setName('')
      }
      
    } catch(error){
      console.error(translations.errorFetchingData, error)
    }
  }

  function handleEdit(){
    setDisabled(false)
  }

  async function updateData(){
    try{
      const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
      await updateDoc(doc(db, 'users', uid), {
        name: name,
        birthday: birthday
      })
      setDisabled(true)

    } catch(error){
      console.error(translations.errorUpdatingData, error)
    }
  }

  const handleOpenModalAvatar = () => {
    setIsOpenModalAvatar(true)
  }
  const handleCloseModalAvatar = () => {
    setIsOpenModalAvatar(false)
  }

  const handleSaveLanguage = () => {
    setLanguage(language)
    localStorage.setItem('@languageCinestream', language)
    setDisabled(true)
    window.location.reload()
  }

  async function handleLogout(){
    await signOut(auth)
    localStorage.removeItem('@uidCinestream')
    navigate("/")
  }

  const handleOpenModalDelete = () => {
    setIsOpenModalDelete(true)
  }
  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false)
  }

  useEffect(() => {
    document.title = translations.account + " - CineStream"

    fetchAvatar()
    fetchData()
  }, [translations])

  return(
    <>
      <Header language={language}/> 

      <div className="account">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>{translations.avatar}</label>
            {avatar ? <img src={avatar} alt='Avatar'/> : <img src='https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Max' alt='Avatar' style={{opacity: '0'}}/>}
            <button type="button" onClick={handleOpenModalAvatar}>{translations.editAvatar}</button>
          </div>

          <span></span>

          <div>
            <label>{translations.name}</label>
            <input type="text" value={name} placeholder={translations.enterYourFullName} disabled={disabled} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div>
            <label>{translations.dateOfBirth}</label>
            <input type="date" value={birthday} disabled={disabled} onChange={(e) => setBirthday(e.target.value)}/>
          </div>
          {disabled ? (
            <button type="button" onClick={handleEdit}>{translations.edit}</button> 
          ) : (
            <button type="button" onClick={updateData}>{translations.save}</button>
          )}
        </form>

        <form style={{paddingBottom: '0'}}>
          <div style={{marginTop: '1vh'}}>
            <label>{translations.email}</label>
            <input type="email" value={email} disabled/>
          </div>
        </form>

        <form onSubmit={(e) => e.preventDefault()}>
          <label style={{marginTop: '1vh'}}>{translations.language}</label>
          <select name="language" value={language} onChange={(e) => setLanguage(e.target.value)} disabled={disabled}>
            <option value="portuguese">{translations.portuguese}</option>
            <option value="english">{translations.english}</option>
          </select>
          {disabled ? (
            <button type="button" onClick={handleEdit}>{translations.changeLanguage}</button> 
          ) : (
            <button type="button" onClick={handleSaveLanguage}>{translations.save}</button>
          )}
        </form>

        <section>
          <button type="button" onClick={handleLogout}><IoIosLogOut/> {translations.logout}</button>
        </section>

        <section>
          <button type="button" onClick={handleOpenModalDelete} style={{color: 'red'}}><MdDeleteOutline/> {translations.deleteAccount}</button>
        </section>

        <AvatarSelector isOpen={isOpenModalAvatar} closeModal={handleCloseModalAvatar}/>
        <ModalDeleteAccount isOpen={isOpenModalDelete} closeModal={handleCloseModalDelete}/>
      </div>

      <Footer/>
    </>
  )
}