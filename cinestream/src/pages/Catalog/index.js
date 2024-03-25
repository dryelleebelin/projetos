import React, { useEffect } from "react"
import './catalog.scss'

import Header from "../../components/Header"
import Filters from "../../components/Filters"
import CarouselBillboard from "../../components/CarouselBillboard"
import Carousel from "../../components/Carousel"
import Footer from "../../components/Footer"

export default function Catalog(){
  useEffect(() => {
    document.title = "Catalog - CineStream ";
  }, []);

  return(
    <>
      <Header/>

      <Filters/>

      <main className="main-catalog">
        <CarouselBillboard/>
        <Carousel/>
      </main>

      <Footer/>
    </>
  )
}