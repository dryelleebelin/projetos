import React from "react"
import './footer.scss'
import { Link } from "react-router-dom"
import useTranslations from '../../translations/useTranslations'

import logo from '../../images/logo.png'
import googlePlay from '../../images/google-play.png'
import appStore from '../../images/app-store.png'

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

export default function Footer(){
  const translations = useTranslations()
  const currenYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth'})
  }

  return(
    <footer>
      <div className="footer">
        <div>
          <img src={logo} onClick={scrollToTop}/>
          <Link to={`/catalog`} onClick={scrollToTop}>{translations.catalog}</Link>
          <Link to={`/my-list`} onClick={scrollToTop}>{translations.myList}</Link>
          <Link to={`/account`} onClick={scrollToTop}>{translations.account}</Link>
        </div>
        <div>
          <a>{translations.about}</a>
          <a>{translations.app}</a>
          <a>{translations.termsOfUse}</a>
          <a>{translations.privacyPolicy}</a>
          <a>{translations.developers}</a>
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