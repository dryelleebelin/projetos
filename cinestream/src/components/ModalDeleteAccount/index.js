import React, { useState } from "react"
import './modaldeleteaccount.scss'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function ModalDeleteAccount({ isOpen, closeModal }){
  const navigate = useNavigate()
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
  }

  async function handleDeleteAccount(){
    setLoading(true)

    try{
      const user = auth.currentUser
      await user.delete()
      localStorage.removeItem('@uidCinestream')
      navigate("/")
      setLoading(false)

    } catch(error){
      console.error("Erro ao deletar conta: ", error)
      setLoading(false)
    }
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="modal-delete-account">
        <IoClose className="close-modal" onClick={closeModal}/>
        <h1>Exclusão de Conta</h1>
        <p>Você está prestes a excluir permanentemente sua conta. Esta ação é irreversível e resultará na perda de todos os seus dados e informações associadas à sua conta.</p>
        <div>
          <button type="button" onClick={handleDeleteAccount}>
            {loading ? <div className="spinner-button"><CgSpinner/></div> : "Confirmar Exclusão"}
          </button>
          <button type="button" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
}