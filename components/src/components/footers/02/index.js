import React from "react"
import './footer02.css'

import logo from '../../../images/logo.svg'
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Footer02(){
  return(
    <div className="body-footer2">
      <footer>
        <article>
          <h2>Try Hologram today.</h2>
          <button>
            <p>Sign up free</p>
            <span><FaLongArrowAltRight /></span>
          </button>
        </article>

        <section class="top">
          <img src={logo}/>
          <ul>
            <li>
              <h3>Resources</h3>
              <a>Usage</a>
              <a>Docs</a>
              <a>Support</a>
              <a>Hardware</a>
            </li>
            <li>
              <h3>Pricing</h3>
              <a>Overview</a>
              <a>Flexible Data</a>
              <a>High Volume</a>
              <a>Enterprise</a>
            </li>
            <li>
              <h3>Developers</h3>
              <a>Forum</a>
              <a>Projects</a>
              <a>Open Source</a>
              <a>GitHub</a>
            </li>
            <li>
              <h3>Company</h3>
              <a>About Us</a>
              <a>Blog</a>
              <a>Partnerships</a>
              <a>Careers</a>
            </li>
          </ul>
        </section>

        <section class="bottom">© 2023 Hologram</section>
      </footer>
    </div>
  )
}