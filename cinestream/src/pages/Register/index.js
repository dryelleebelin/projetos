import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../SignIn/signin.scss'
import Modal from 'react-modal'
import { toast } from "react-toastify"
import { auth, db } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import useTranslations from '../../translations/useTranslations'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function Register({ isOpen, closeModal, openSignInModal }){
  const translations = useTranslations()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '0',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)'
    }
  };

  async function handleSubmit(e){
    e.preventDefault()

    if (user === '' || email === '' || password === ''){
      toast.warn(translations.pleaseFillInAllFields)
      return
    }
    if (!isValidEmail(email)){
      toast.warn(translations.pleaseEnterAValidEmailAddress)
      return
    }
    if (!isValidPassword(password)){
      toast.warn(translations.passwordMustContainAtLeast8Characters)
      return
    }

    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid
      await setDoc(doc(db, "users", uid), {
        name: user
      })
      await setDoc(doc(db, "avatar", uid), {
        url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Max'
      })
      localStorage.setItem('@uidCinestream', JSON.stringify(uid))
      localStorage.setItem('@languageCinestream', 'portuguese') 
      setLoading(false)
      navigate('/catalog')

    } catch(error){
      if (error.code === "auth/weak-password"){
        toast.warn(translations.pleaseChooseAStrongerPassword)
      } else if (error.code === "auth/email-already-in-use"){
        toast.error(translations.sorryThisEmailIsAlreadyInUse)
      } else{
        toast.error(translations.errorCreatingAccountTryAgainLater)
      }
      console.error(translations.errorWhenRegistering, error)
      setLoading(false)
    }
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  };

  const isValidPassword = (password) => {
    return password.length >= 8
  };

  const handleOpenSignInModal = () => {
    closeModal()
    openSignInModal()
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="register">
        <div>
          <p>{translations.register}</p>
          <IoClose onClick={closeModal} />
        </div>
        <form onSubmit={handleSubmit}>
          <label>{translations.fullName}:</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder={translations.enterYourFullName}/>
          <label>{translations.email}:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={translations.enterYourEmail}/>
          <label>{translations.password}:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={translations.enterYourPassword}/>
          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner-button"><CgSpinner/></div> : <>{translations.toCreate}</>}
          </button>
          <a onClick={handleOpenSignInModal}>{translations.iAlreadyHaveAnAccount}</a>
        </form>
      </div>
    </Modal>
  );
}
