import React, { useContext, useState } from "react"
import './signin.scss'
import Modal from 'react-modal'
import { toast } from "react-toastify";
import { auth } from '../../services/firebaseConnection'
import { sendPasswordResetEmail } from 'firebase/auth'
import { AuthContext } from "../../contexts/auth.js"

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function SignIn({ isOpen, closeModal, openRegisterModal }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(true)
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const { signIn, loadingAuth } = useContext(AuthContext)
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

  function handleSubmit(e){
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

    signIn(email, password)
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

    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      toast.info("E-mail de redefinição de senha enviado. Verifique sua caixa de entrada")
      setForgotPassword(false)
      setLoading(false)

    } catch(error){
      if (error.code === "auth/user-not-found"){
        toast.error("E-mail não encontrado")
      } else{
        toast.error("Erro ao enviar e-mail de redefinição de senha. Tente novamente.")
      }
      console.error(error)
      setLoading(false)
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
            <label>Nos conte algumas informações sobre sua conta.</label>
            <form onSubmit={handleForgotPassword}>
              <label>E-mail:</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu e-mail" />
              <button type="submit">
                {loading ? <div className="spinner-button"><CgSpinner/></div> : "ENVIAR"}
              </button>
            </form>
          </div>
        : 
        <form onSubmit={signIn(email, password)}>
          <label>E-mail:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu e-mail"/>
          <label>Senha:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Digite a sua senha"/>
          <a onClick={handleForgotPasswordClick}>Esqueceu a senha?</a>
          <button type="submit">
            {loadingAuth ? <div className="spinner-button"><CgSpinner/></div> : "ENTRAR"}
          </button>
          <p><input type="checkbox" checked={isChecked} onChange={handleCheck} />Lembre-se de mim</p>
          <a onClick={handleOpenRegisterModal}>Ainda não possui um conta? Cadastrar-se</a>
        </form>
        }
      </div>
    </Modal>
  );
}