import React, { useState } from "react"
import './modaltrailer.scss'
import Modal from 'react-modal'

import { IoClose } from "react-icons/io5"
import { CgSpinner } from "react-icons/cg"

export default function ModalTrailer({ isOpen, closeModal, id }){
  const loading = id

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

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
      <div className="modal-trailer">
        <IoClose onClick={closeModal} className="close"/>
        {loading === '' ? ( 
          <div className="spinner"><CgSpinner/></div> 
        ) : ( 
          <iframe src={`https://www.youtube.com/embed/${id}`} title="Trailer do Filme" allowFullScreen/> 
        )}
      </div>
    </Modal>
  );
}