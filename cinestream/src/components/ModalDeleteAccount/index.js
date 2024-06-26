import React, { useState } from "react"
import './modaldeleteaccount.scss'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import useTranslations from '../../translations/useTranslations'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"
import { toast } from "react-toastify"

export default function ModalDeleteAccount({ isOpen, closeModal }){
  const translations = useTranslations()
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
      toast.error(translations.errorDeletingAccountTryAgainLater)
      console.error(translations.errorDeletingAccount, error)
      setLoading(false)
    }
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="modal-delete-account">
        <IoClose className="close-modal" onClick={closeModal}/>
        <h1>{translations.accountDeletion}</h1>
        <p>{translations.textDeleteAccount}</p>
        <div>
          <button type="button" onClick={handleDeleteAccount}>
            {loading ? <div className="spinner-button"><CgSpinner/></div> : <>{translations.confirmDeletion}</>}
          </button>
          <button type="button" onClick={closeModal}>{translations.cancel}</button>
        </div>
      </div>
    </Modal>
  );
}