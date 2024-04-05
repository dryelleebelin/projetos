import React from "react"
import './footer01.css'

import logo from '../../../images/logo.svg'
import { FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa"

export default function Footer01(){
  return(
    <div className="body-footer">
      <footer>
        <section class="top">
          <img src={logo}/>
          <div class="links">
            <div class="links-column">
              <h2>Portfolio</h2>
              <a>About</a>
              <a>Skills</a>
              <a>Attributes</a>
              <a>Projects</a>
              <a>Testimonials</a>
            </div>
            <div class="links-column">
              <h2>Resources</h2>
              <a>GitHub</a>
              <a>npm</a>
              <a>Codepen</a>
              <a>Codesandbox</a>
              <a>Dribbble</a>
            </div>
            <div class="links-column socials-column">
              <h2>Social Media</h2>
              <p>
                Follow me on social media to get the latest awesome reels and
                posts.
              </p>
              <div class="socials">
                <a><FaInstagram/></a>
                <a><FaTiktok/></a>
                <a><FaLinkedin/></a>
                <a><FaGithub/></a>
              </div>
            </div>
          </div>
        </section>

        <section class="bottom">
          <p class="copyright">© 2024 All rights reserved</p>
          <div class="legal">
            <a> Contact </a>
            <a> Terms </a>
            <a> Privacy </a>
          </div>
        </section>
      </footer>
    </div>
  )
}