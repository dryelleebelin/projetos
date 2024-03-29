import React, { useEffect, useState } from "react";
import './home.scss'

import SignIn from "../SignIn";

export default function Home(){
  useEffect(() => {
    document.title = "CineStream"
  }, [])

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return(
    <div className="home">
      {!isOpenModal && <button type="button" onClick={() => setIsOpenModal(!isOpenModal)}>Login</button>}
      {isOpenModal && <SignIn isOpen={isOpenModal} closeModal={handleCloseModal}/>}
    </div>
  )
}