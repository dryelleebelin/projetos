import React, { useState, useEffect } from "react";
import './carouseltopmovies.scss'
import api from '../../services/api'

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CgSpinner } from "react-icons/cg";

register()

export default function CarouselTopMovies() {
  const [slidesPerView, setSlidesPerView] = useState(4)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadMovies(){
    try{
      const response = await api.get('movie/popular', {
        params: { 
          page: 1
      }}) 
      setMovies(response.data.results.slice(0, 10).map((item, index) => (
        {...item, id: index + 1}
      )))
      setLoading(false)
    } catch(err){
      console.log(err)
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
          <h1>TOP 10 FILMES</h1>
          <Swiper className="carousel-top" slidesPerView={slidesPerView} navigation spaceBetween={30}>
            {movies.map((item) => (
              <SwiperSlide className="item" key={item.id}>
                <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="Cover"/>
                <span>{item.id}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  )
}
