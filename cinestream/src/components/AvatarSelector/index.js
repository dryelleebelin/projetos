import React, { useState } from "react"
import './avatarselector.scss'
import { toast } from "react-toastify"
import Modal from 'react-modal'
import { db } from '../../services/firebaseConnection'
import { doc, updateDoc } from "firebase/firestore"
import useTranslations from '../../translations/useTranslations'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function AvatarSelector({ isOpen, closeModal }){
  const translations = useTranslations()
  const [selectedAvatar, setSelectedAvatar] = useState(null)
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

  const data = [
    { id: '1', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Max' },
    { id: '2', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Rascal' },
    { id: '3', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Pepper' },
    { id: '4', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Gracie' },
    { id: '5', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Charlie' },
    { id: '6', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Jack' },
    { id: '7', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Princess' },
    { id: '8', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Bella' },
    { id: '9', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Cookie' },
    { id: '10', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sugar' },
    { id: '11', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Boots' },
    { id: '12', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Milo' },
    { id: '13', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Tinkerbell' },
    { id: '14', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sadie' },
    { id: '15', url: 'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Miss%20kitty' }
  ]

  async function handleSaveAvatar(){
    if (selectedAvatar){
      setLoading(true)

      try{
        const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
        await updateDoc(doc(db, 'avatar', uid), {
          url: selectedAvatar
        })
        closeModal()
        setLoading(false)
        window.location.reload()
      } catch(error){
        console.error(translations.errorSavingAvatar, error)
        setLoading(false)
      }
    } else{
      toast.warning(translations.selectAnAvatarBeforeSaving)
    }
  }

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="modal-avatars">
        <h2>{translations.selectYourAvatar}</h2>
        <IoClose className="close" onClick={closeModal}/>
        <div className="avatars">
          {data.map((item) => (
            <img key={item.id} src={item.url} className={selectedAvatar === item.url ? "selected" : ""} alt="Avatar" onClick={() => setSelectedAvatar(item.url)}/>
          ))}
        </div>
        <div className="button">
          <button type="button" disabled={!selectedAvatar} onClick={handleSaveAvatar}>
            {loading ? <div className="spinner-button"><CgSpinner/></div> : <>{translations.save}</>}
          </button>
        </div>
      </div>
    </Modal>
  );
}