import React, { useState, useEffect } from "react"
import './carouseltopmovies.scss'
import api from '../../services/api'
import { useNavigate } from "react-router-dom"
import useTranslations from "../../translations/useTranslations"

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CgSpinner } from "react-icons/cg";

register()

export default function CarouselTopMovies(){
  const translations = useTranslations()
  const navigate = useNavigate()
  const [slidesPerView, setSlidesPerView] = useState(4)
  const [movies, setMovies] = useState([])
  const [idMovies, setIdMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const top10 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  async function loadMovies(){
    try{
      const response = await api.get('movie/popular', {
        params: { 
          page: 1
      }}) 
      setMovies(response.data.results.slice(0, 10))
      setLoading(false)
    } catch(error){
      console.error(translations.errorLoadingMovies, error)
      return
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <>
      {loading ? 
        <div className="spinner"><CgSpinner/></div>
      :
        <div className="container-top">
          <h1>{translations.top10Movies}</h1>
          <Swiper className="carousel-top" slidesPerView={slidesPerView} navigation spaceBetween={30}>
            {movies.map((movie, index) => (
              <SwiperSlide className="item" key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Cover" onClick={() => navigate(`/detail/${movie.id}`)}/>
                <span>{top10[index]}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  )
}
