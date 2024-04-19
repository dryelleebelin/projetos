import React, { useEffect } from "react"
import './catalog.scss'
import useTranslations from "../../translations/useTranslations"

import Header from "../../components/Header"
import Filters from "../../components/Filters"
import CarouselBillboard from "../../components/CarouselBillboard"
import Carousel from "../../components/Carousel"
import Footer from "../../components/Footer"

export default function Catalog(){
  const { catalog } = useTranslations()

  useEffect(() => {
    document.title = `${catalog} - CineStream`
  }, [catalog])

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