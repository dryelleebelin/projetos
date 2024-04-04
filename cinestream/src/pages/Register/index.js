import React, { useContext, useState } from "react"
import '../SignIn/signin.scss'
import Modal from 'react-modal'
import { toast } from "react-toastify"
import { AuthContext } from "../../contexts/auth"

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg";

export default function Register({ isOpen, closeModal, openSignInModal }){
  const { register, loadingAuth } = useContext(AuthContext)
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      toast.warn("Por favor, preencha todos os campos");
      return;
    }
    if (!isValidEmail(email)){
      toast.warn("Por favor, insira um endereço de e-mail válido");
      return;
    }
    if (!isValidPassword(password)){
      toast.warn("A senha deve conter pelo menos 8 caracteres");
      return;
    }

    await register(user, email, password)
  };

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
          <p>CADASTRO</p>
          <IoClose onClick={closeModal} />
        </div>
        <form onSubmit={handleSubmit}>
          <label>Nome completo:</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Digite o seu nome completo"/>
          <label>E-mail:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu e-mail"/>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a sua senha"/>
          <button type="submit" disabled={loadingAuth}>
            {loadingAuth ? <div className="spinner-button"><CgSpinner/></div> : "CRIAR"}
          </button>
          <a onClick={handleOpenSignInModal}>Já tenho conta.</a>
        </form>
      </div>
    </Modal>
  );
}
