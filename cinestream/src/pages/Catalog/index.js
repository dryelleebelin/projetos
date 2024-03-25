import React, { useEffect } from "react"
import './catalog.scss'

import Header from "../../components/Header"
import Filters from "../../components/Filters"
import CarouselBillboard from "../../components/CarouselBillboard"
import CarouselTopMovies from "../../components/CarouselTopMovies"
import Carousel from "../../components/Carousel"
import Footer from "../../components/Footer"

import { FaAngleRight } from "react-icons/fa6";

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
        
        <CarouselTopMovies/>

        <section className="section">
          <h1>PRÓXIMAS ESTREIAS <FaAngleRight/></h1>
          <Carousel route='movie/upcoming' page='1'/>
        </section>

        <section className="section">
          <h1>SÉRIES DE TV MAIS BEM AVALIADAS <FaAngleRight/></h1>
          <Carousel route='tv/top_rated' page='1'/>
        </section>

        <section className="section">
          <h1>EM CARTAZ <FaAngleRight/></h1>
          <Carousel route='movie/now_playing' page='2'/>
        </section>

        <section className="section">
          <h1>MAIS BEM AVALIADOS <FaAngleRight/></h1>
          <Carousel route='movie/top_rated' page='1'/>
        </section>

        <section className="section">
          <h1>SÉRIES DE TV EM EXIBIÇÃO HOJE<FaAngleRight/></h1>
          <Carousel route='tv/airing_today' page='2'/>
        </section>

        <section className="section">
          <h1>SÉRIES DE TV POPULARES <FaAngleRight/></h1>
          <Carousel route='tv/popular' page='1'/>
        </section>
      </main>

      <Footer/>
    </>
  )
}