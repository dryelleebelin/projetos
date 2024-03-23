import React, { useState, useEffect } from "react"
import './catalog.scss'
import { toast } from "react-toastify"

import Header from "../../components/Header"
import Filters from "../../components/Filters"

import avengers from '../../images/avengers.jpg'
import cover4 from '../../images/cover4.webp'

import { FaRegCirclePlay, FaAngleRight } from "react-icons/fa6";
import { MdOutlineDownload } from "react-icons/md";
import { FaRegBookmark, FaBookmark  } from "react-icons/fa";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import TopCharts from "../../components/TopCharts"

export default function Catalog(){
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [favorite, setFavorite] = useState(false)

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

        <div style={{backgroundColor: 'red'}}>
        aaa

<TopCharts/>

aaa
        </div>

        <section className="movies">
          <h1>MOVIES <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>TV SERIES <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>MOVIES TOP RATED <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>MOVIES NOW PLAYING <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>MOVIES POPULAR <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>TV SERIES ON THE AIR <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>TV SERIES POPULAR <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>MOVIES UPCOMING<FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>TV SERIES TOP RATED <FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>

        <section className="movies">
          <h1>KIDS<FaAngleRight/></h1>
          <div className="carrossel">
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
            <img src={cover4} alt="Cover"/>
          </div>
        </section>
      </main>
    </>
  )
}