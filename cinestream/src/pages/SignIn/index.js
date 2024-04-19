import React, { useState } from "react"
import './signin.scss'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import useTranslations from '../../translations/useTranslations'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function SignIn({ isOpen, closeModal, openRegisterModal }){
  const translations = useTranslations()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(true)
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  
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

    if (email === '' || password === ''){
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid
      localStorage.setItem('@uidCinestream', JSON.stringify(uid)) 
      setLoading(false)
      navigate('/catalog')

    } catch(error){
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password"){
        toast.error(translations.incorrectEmailOrPassword)
      } else if (error.code === "auth/too-many-requests"){
        toast.error(translations.manyAttemptsTryAgainLater)
      } else{
        toast.error(translations.errorWhenLoggingIn)
      }
      console.error(translations.errorLoggingIn, error)
      setLoading(false)
    }
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  };

  const isValidPassword = (password) => {
    return password.length >= 8
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleOpenRegisterModal = () => {
    closeModal();
    openRegisterModal();
  };

  const handleForgotPasswordClick = () => {
    setForgotPassword(true)
  }

  async function handleForgotPassword(e){
    e.preventDefault()

    if (email === ''){
      toast.warn(translations.pleaseFillInTheEmailField)
      return
    }
    if (!isValidEmail(email)){
      toast.warn(translations.pleaseEnterAValidEmailAddress)
      return
    }

    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      toast.info(translations.passwordResetEmailSentCheckYourInbox)
      setForgotPassword(false)
      setLoading(false)

    } catch(error){
      if (error.code === "auth/user-not-found"){
        toast.error(translations.emailNotFound)
      } else{
        toast.error(translations.errorSendingPasswordResetEmailTryAgainLater)
      }
      console.error(translations.errorResettingPassword, error)
      setLoading(false)
    }
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="signin">
        <div>
          <p>{translations.login}</p>
          <IoClose onClick={closeModal} />
        </div>
        {forgotPassword ? 
          <div className="forgot-password">
            <label>{translations.tellUsSomeInformationAboutYourAccount}</label>
            <form onSubmit={handleForgotPassword}>
              <label>{translations.email}:</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder={translations.enterYourEmail} />
              <button type="submit">
                {loading ? <div className="spinner-button"><CgSpinner/></div> : <>{translations.toSend}</>}
              </button>
            </form>
          </div>
        : 
        <form onSubmit={handleSubmit}>
          <label>{translations.email}:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder={translations.enterYourEmail}/>
          <label>{translations.password}:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder={translations.enterYourPassword}/>
          <a onClick={handleForgotPasswordClick}>{translations.forgotPassword}</a>
          <button type="submit">
            {loading ? <div className="spinner-button"><CgSpinner/></div> : <>{translations.toEnter}</>}
          </button>
          <p><input type="checkbox" checked={isChecked} onChange={handleCheck}/>{translations.rememberMe}</p>
          <a onClick={handleOpenRegisterModal}>{translations.doNotHaveAnAccountYetRegister}</a>
        </form>
        }
      </div>
    </Modal>
  );
}