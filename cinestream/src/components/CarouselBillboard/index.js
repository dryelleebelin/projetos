import React, { useState, useEffect } from "react"
import './carouselbillboard.scss'
import { toast } from "react-toastify"
import api from "../../services/api"

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';

import { FaRegCirclePlay, FaAngleRight } from "react-icons/fa6";
import { MdOutlineDownload } from "react-icons/md";
import { FaRegBookmark, FaBookmark  } from "react-icons/fa";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";

register()

export default function CarouselBillboard(){
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [movies, setMovies] = useState([])

  async function loadMovies() {
    try {
      const response = await api.get(`movie/upcoming`, {
        params: {
          page: 1
        }
      })
      setMovies(response.data.results.slice(0, 20))
    } catch (error) {
      console.log(error)
      return
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

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
  
  const info = () => {
    toast.info("Em desenvolvimento!")
  }

  return (
    <Swiper className="billboard" modules={[EffectFade]} effect="fade" slidesPerView={1} autoplay={{ delay: 10000 }} allowTouchMove={false}>
      {movies.map((item) => (
        <SwiperSlide className="background" key={item.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})` }}>
          <div className="gradient-overlay">
            <div className="content" onClick={info}>
              <h1>{item.title}</h1>
              <div>
                <button>ASSISTIR <FaRegCirclePlay /></button>
                <button>DOWNLOAD <MdOutlineDownload /></button>
                {favorite ? <FaBookmark className="mark" onClick={handleFavorite} /> : <FaRegBookmark className="mark" onClick={handleFavorite} />}
                {like ? <BiSolidLike className="like" /> : <BiLike className="like" onClick={handleLike} />}
                {dislike ? <BiSolidDislike className="dislike" /> : <BiDislike className="dislike" onClick={handleDislike} />}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}