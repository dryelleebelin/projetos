import React from "react"
import './footer.scss'
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

import logo from '../../images/logo.png'
import googlePlay from '../../images/google-play.png'
import appStore from '../../images/app-store.png'

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

export default function Footer(){
  const currenYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth'})
  }

  const info = () => {
    toast.info("Em desenvolvimento.")
  }

  return(
    <footer>
      <div className="footer">
        <div>
          <img src={logo} onClick={scrollToTop}/>
          <Link to={`/catalog`} onClick={scrollToTop}>Catálogo</Link>
          <a onClick={info}>Minha lista</a>
          <a onClick={info}>Conta</a>
        </div>
        <div onClick={info}>
          <a>Sobre</a>
          <a>App</a>
          <a>Termos de uso</a>
          <a>Política de privacidade</a>
          <a>Desenvolvedores</a>
        </div>
        <div className="social">
          <a href="https://www.instagram.com/dryelleebelin/" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
          <a href="https://www.linkedin.com/in/dryelle-ebelin/" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
          <a href="https://github.com/dryelleebelin" target="_blank" rel="noopener noreferrer"><FaGithub/></a>
        </div>
      </div>

      <div className="baseboard">
        <p>© {currenYear} CineStream</p>
        <div>
          <img src={googlePlay} alt="Logo Google Play"/>
          <img src={appStore} alt="Logo App Store"/>
        </div>
      </div>
    </footer>
  )
}