import React from "react";
import './mylist.scss'

import Header from "../../components/Header";
import Footer from "../../components/Footer"

export default function MyList(){
  return(
    <>
      <Header/>

      <div className="my-list">
        favoritos
      </div>

      <Footer/>
    </>
  )
}