import React, { useEffect, useState } from "react";
import './home.scss';

import SignIn from "../SignIn";
import Register from "../Register";

export default function Home() {
  useEffect(() => {
    document.title = "Home - CineStream";
  }, []);

  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModalSignIn(false);
    setIsOpenModalRegister(false);
  };

  const handleOpenSignInModal = () => {
    setIsOpenModalSignIn(true);
    setIsOpenModalRegister(false);
  };

  const handleOpenRegisterModal = () => {
    setIsOpenModalSignIn(false);
    setIsOpenModalRegister(true);
  };

  return (
    <div className="home">
      <button type="button" onClick={handleOpenSignInModal}>Login</button>
      <button type="button" onClick={handleOpenRegisterModal}>Register</button>

      {isOpenModalSignIn && (
        <SignIn isOpen={isOpenModalSignIn} closeModal={handleCloseModal} openRegisterModal={handleOpenRegisterModal} />
      )}
      {isOpenModalRegister && (
        <Register isOpen={isOpenModalRegister} closeModal={handleCloseModal} openSignInModal={handleOpenSignInModal} />
      )}
    </div>
  );
}
