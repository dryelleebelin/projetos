import React, { useState, useEffect } from "react"
import './catalog.scss'
import { toast } from "react-toastify"

import Header from "../../components/Header"
import Filters from "../../components/Filters"
import CarouselTopMovies from "../../components/CarouselTopMovies"
import Carousel from "../../components/Carousel"

import avengers from '../../images/avengers.jpg'

import { FaRegCirclePlay, FaAngleRight } from "react-icons/fa6";
import { MdOutlineDownload } from "react-icons/md";
import { FaRegBookmark, FaBookmark  } from "react-icons/fa";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";

export default function Catalog(){
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleLike = () => {
    setLike(true)
    setDislike(false)
  }

  const handleDislike = () => {
    setDislike(true)
    setLike(false)
  }

  const handleFavorite = () => {
    setFavorite(!favorite)
  }

  useEffect(() => {
    document.title = "Catalog - CineStream ";
  }, []);
  
  const info = () => {
    toast.info("Em desenvolvimento!")
  }

  return(
    <>
      <Header/>

      <Filters/>

      <main className="main-catalog">
        <section className="billboard">
          <img src={avengers} alt="Background"/>

          <div className="content" onClick={info}>
            <h1>AVENGERS: ENDGAME</h1>
            <div>
              <button>WATCH <FaRegCirclePlay/></button>
              <button>DOWNLOAD <MdOutlineDownload/></button>
              {favorite ? <FaBookmark className="mark" onClick={handleFavorite}/> : <FaRegBookmark className="mark" onClick={handleFavorite}/>}
              {like ? <BiSolidLike className="like"/> : <BiLike className="like" onClick={handleLike}/>}
              {dislike ? <BiSolidDislike className="dislike"/> : <BiDislike className="dislike" onClick={handleDislike}/>}
            </div>
          </div>
        </section>
        
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
    </>
  )
}