import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import './signin.scss'
import Modal from 'react-modal'
import { toast } from "react-toastify";
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function SignIn({ isOpen, closeModal, openRegisterModal }) {
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
      toast.warn("Por favor, preencha todos os campos")
      return
    }
    if (!isValidEmail(email)){
      toast.warn("Por favor, insira um endereço de e-mail válido")
      return
    }
    if (!isValidPassword(password)){
      toast.warn("A senha deve conter pelo menos 8 caracteres")
      return
    }

    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
        setEmail('')
        setPassword('')
        setLoading(false)
        navigate('/catalog')
    } catch(error){
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password"){
        toast.error("E-mail ou senha incorretos")
      } else if (error.code === "auth/too-many-requests"){
        toast.error("Muitas tentativas. Tente novamente mais tarde.")
      } else{
        toast.error("Erro ao fazer login. Tente novamente mais tarde.")
      }
      console.error(error)
      setLoading(false)
    }
  };

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
      toast.warn("Por favor, preencha o campo")
      return
    }
    if (!isValidEmail(email)){
      toast.warn("Por favor, insira um endereço de e-mail válido")
      return
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("E-mail de redefinição de senha enviado. Verifique sua caixa de entrada")
      setForgotPassword(false)
    } catch(error){
      if (error.code === "auth/user-not-found"){
        toast.error("E-mail não encontrado")
      } else{
        toast.error("Erro ao enviar e-mail de redefinição de senha. Tente novamente.")
      }
      console.error(error)
    }
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="signin">
        <div>
          <p>LOGIN</p>
          <IoClose onClick={closeModal} />
        </div>
        {forgotPassword ? 
          <div className="forgot-password">
            <p>Nos conte algumas informações sobre sua conta</p>
            <form onSubmit={handleForgotPassword}>
              <label>E-mail:</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu e-mail" />
              <button type="submit">ENVIAR</button>
            </form>
          </div>
        : 
        <form onSubmit={handleSubmit}>
          <label>E-mail:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu e-mail"/>
          <label>Senha:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Digite a sua senha"/>
          <a onClick={handleForgotPasswordClick}>Esqueceu a senha?</a>
          <button type="submit">
            {loading ? <div className="spinner-button"><CgSpinner/></div> : "ENTRAR"}
          </button>
          <p><input type="checkbox" checked={isChecked} onChange={handleCheck} />Lembre-se de mim</p>
          <a onClick={handleOpenRegisterModal}>Ainda não possui um conta? Cadastrar-se</a>
        </form>
        }
      </div>
    </Modal>
  );
}