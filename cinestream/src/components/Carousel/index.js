import React, { useState, useEffect } from "react";
import './carousel.scss'
import api from "../../services/api";

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';

register()

export default function Carousel({route, page}) {
  const [slidesPerView, setSlidesPerView] = useState(7)
  const [movies, setMovies] = useState([])

  async function loadMovies() {
    try {
      const response = await api.get(`${route}`, {
        params: {
          page: page
        }
      })
      setMovies(response.data.results.slice(0, 20))
    } catch (err) {
      console.log(err)
      return
    }
  }

  useEffect(() => {
    loadMovies()
  }, [route, page])

  return (
    <Swiper className="carousel" slidesPerView={slidesPerView} navigation spaceBetween={20}>
      {movies.map((item) => (
        <SwiperSlide className="item" key={item.id}>
          <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="Cover"/>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}