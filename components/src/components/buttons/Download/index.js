import React from "react";
import './download.scss'

import { FaCloudArrowDown } from "react-icons/fa6";

export default function Download(){
  function triggerDownload(){
    const btn = document.getElementById('btn-download')
    const loadingBar = document.getElementById('loading-bar')
    const content = document.getElementById('content')

    content.innerHTML = ""
    btn.classList.add('toLoadingBar')
    loadingBar.classList.add('isLoading')

    setTimeout(() => {
      loadingBar.classList.add('isLoading')
      setTimeout(() => {
        loadingBar.style.display = 'none'
        btn.innerHTML = 'Downloaded!'
        btn.classList.add('toButton')
      }, 1000)
    }, 300)
  }

  return(
    <div className="download">
      <button className="btn" id="btn-download" onClick={triggerDownload}>
        <span id="loading-bar"></span>
        <span id="content"><FaCloudArrowDown/>Download</span>
      </button>
    </div>
  )
}