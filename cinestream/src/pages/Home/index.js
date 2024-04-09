import React, { useEffect, useState } from "react"
import './home.scss'

import SignIn from "../SignIn"
import Register from "../Register"
import CarouselHighlight from "../../components/CarouselHighlight"

import logo from '../../images/logo.png'

export default function Home() {
  useEffect(() => {
    document.title = "Home - CineStream"
  }, [])

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
      <header>
        <div class="blurry-background"></div>
        <img src={logo} alt="Logo"/>
        <div className="buttons">
          <button type="button" onClick={handleOpenSignInModal}>ENTRAR</button>
          <button type="button" onClick={handleOpenRegisterModal}>CADASTRO</button>
        </div>
      </header>

      <main>
        <section className="highlight">
          <aside>
            <h1>ABRA UM NOVO MUNDO DE CINEMA</h1>
            <button type="button" onClick={handleOpenSignInModal}>ENTRAR</button>
          </aside>

          <div>
            <CarouselHighlight/>
          </div>
        </section>

        <section className="looping">
          <p>ABRA UM NOVO MUNDO DE CINEMA</p>
          <p>ABRA UM NOVO MUNDO DE CINEMA</p>
          <p>ABRA UM NOVO MUNDO DE CINEMA</p>
          <p>ABRA UM NOVO MUNDO DE CINEMA</p>
          <p>ABRA UM NOVO MUNDO DE CINEMA</p>
          <p>ABRA UM NOVO MUNDO DE CINEMA</p>
        </section>
      </main>

      {isOpenModalSignIn && (
        <SignIn isOpen={isOpenModalSignIn} closeModal={handleCloseModal} openRegisterModal={handleOpenRegisterModal} />
      )}
      {isOpenModalRegister && (
        <Register isOpen={isOpenModalRegister} closeModal={handleCloseModal} openSignInModal={handleOpenSignInModal} />
      )}
    </div>
  );
}
