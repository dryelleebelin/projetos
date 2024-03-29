import React, { useState } from "react";
import './signin.scss'
import Modal from 'react-modal';

import { IoClose } from "react-icons/io5";

export default function SignIn({isOpen, closeModal}){
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(true)
  const customStyles = {
    content:{
        top: '50%',
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        padding: '0',
        backgroundColor: 'transparent',
        transform: 'translate(-50%, -50%)'
    }
  }
  
  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  return(
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="signin">
        <div>
          <p>LOGIN</p>
          <IoClose onClick={closeModal}/>
        </div>
        <form>
          <label>Usuário</label>
          <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Digite o seu usuário"/>
          <label>Senha</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Digite a sua senha"/>
          <a href="#">Esqueceu a senha?</a>
          <button type="submit">ENTRAR</button>
          <p><input type="checkbox" checked={isChecked} onChange={handleCheck}/>Lembre-se de mim</p>
          <a href="#">Ainda não possui um conta? Cadastrar-se</a>
        </form>
      </div>
    </Modal>
  )
} 