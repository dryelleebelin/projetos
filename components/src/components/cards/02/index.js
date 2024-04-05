import React from "react"
import './card02.css'

import check from '../../../images/check.svg'

export default function Card02(){
  return(
    <body className="body-card-02">
      <article class="card">
        <h2>Free</h2>
        <var><abbr>$</abbr>0<small>/MO</small></var>
        <ul>
          <li>
            <img src={check} />
            <p>10 user requests</p>
          </li>
          <li>
            <img src={check} />
            <p>3 design accounts</p>
          </li>
          <li>
            <img src={check} />
            <p>24/7 support</p>
          </li>
        </ul>
        <button>Choose Plan</button>
      </article>
      <article class="card primary">
        <h2>Elite</h2>
        <var><abbr>$</abbr>99<small>/MO</small></var>
        <ul>
          <li>
            <img src={check} />
            <p>10 user requests</p>
          </li>
          <li>
            <img src={check} />
            <p>3 design accounts</p>
          </li>
          <li>
            <img src={check} />
            <p>Email support</p>
          </li>
          <li>
            <img src={check} />
            <p>100 deployments</p>
          </li>
          <li>
            <img src={check} />
            <p>24/7 support</p>
          </li>
        </ul>
        <button class="primary">Choose Plan</button>
      </article>
      <article class="card">
        <h2>Pro</h2>
        <var><abbr>$</abbr>49<small>/MO</small></var>
        <ul>
          <li>
            <img src={check} />
            <p>10 user requests</p>
          </li>
          <li>
            <img src={check} />
            <p>3 design accounts</p>
          </li>
          <li>
            <img src={check} />
            <p>Email support</p>
          </li>
        </ul>
        <button>Choose Plan</button>
      </article>
    </body>
  )
}