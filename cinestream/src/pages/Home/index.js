import React, { useEffect, useState } from "react"
import './home.scss'
import { useNavigate } from 'react-router-dom'

import SignIn from "../SignIn"
import Register from "../Register"

import logo from '../../images/logo.png'

import { CgSpinner } from "react-icons/cg"

export default function Home(){
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Home - CineStream"

    const uid = localStorage.getItem("@uidCinestream")
    if(uid){
      navigate("/catalog")
      setLoading(false)
    } else{
      navigate("/")
      setLoading(false)
    }
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
    <>
      {loading ? 
        <div className="spinner-vh spinner"><CgSpinner/></div>
      :
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
              <img src={logo} alt="Logo"/>
              <h1>Deixe-se envolver pelas melhores narrativas do cinema, disponíveis agora em nossa plataforma.</h1>
              <button type="button" onClick={handleOpenSignInModal}>ENTRAR</button>
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
      }
    </>
  );
}
