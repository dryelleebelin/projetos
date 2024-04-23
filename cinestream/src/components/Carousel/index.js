import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './carousel.scss'
import api from "../../services/api"
import useTranslations from "../../translations/useTranslations"

import CarouselTopMovies from "../CarouselTopMovies"

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react'

import { FaAngleRight } from "react-icons/fa6"
import { CgSpinner } from "react-icons/cg"

register()

export default function Carousel(){
  const translations = useTranslations()
  const navigate = useNavigate()
  const [slidesPerView, setSlidesPerView] = useState(7)
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true)

  const data = [
    { title: <h1>{translations.upcomingPremieres}</h1>, route: 'movie/upcoming', page: '1'},
    { title: <h1>{translations.animationFilms}</h1>, route: '/discover/movie', genreId: '16', page: '2'},
    { title: <h1>{translations.topRatedTvSeries}</h1>, route: 'tv/top_rated', page: '1'},
    { title: <h1>{translations.inTheaters}</h1>, route: 'movie/now_playing', page: '2'},
    { title: <h1>{translations.tvSeriesForChildren}</h1>, route: '/discover/tv', genreId: '10762', page: '1'},
    { title: <h1>{translations.documentary}</h1>, route: '/discover/movie', genreId: '99', page: '1'},
    { title: <h1>{translations.topRated}</h1>, route: 'movie/top_rated', page: '1'},
    { title: <h1>{translations.tvSeriesShowingToday}</h1>, route: 'tv/airing_today', page: '2'},
    { title: <h1>{translations.horrorMovies}</h1>, route: '/discover/movie', genreId: '27', page: '1'},
    { title: <h1>{translations.popularTvSeries}</h1>, route: 'tv/popular', page: '1'},
    { title: <h1>{translations.newsTvSeries}</h1>, route: '/discover/tv', genreId: '10763', page: '1'},
  ]

  function handleResize(){
    if(window.innerWidth < 480){
      setSlidesPerView(2)
    }
    else if(window.innerWidth >= 481 && window.innerWidth <= 1023){
      setSlidesPerView(4)
    }
    else{
      setSlidesPerView(7)
    }
  }

  useEffect(() => {
    async function fetchData(route, genreId, page){
      try {
        const response = await api.get(route, {
          params: {
            with_genres: genreId,
            page: page
          }
        });
        return response.data.results.slice(0, 20);
      } catch(error){
        console.error(translations.errorFetchingData, error)
        return []
      }
    }

    async function loadCarouselData() {
      const carousels = await Promise.all(data.map(async (item) => {
        const movies = await fetchData(item.route, item.genreId, item.page)
        return { title: item.title, movies: movies }
      }))
      setCarouselData(carousels)
      setLoading(false)
    }

    loadCarouselData()

    handleResize()
    window.addEventListener("resize", handleResize)
    return() => {
      window.removeEventListener("resize", handleResize)
    }
    
  }, [translations])


  return(
    <>
      {loading ? 
        <div className="spinner"><CgSpinner/></div>
      :
        <>
          <CarouselTopMovies/>
          {carouselData.map((carousel, index) => (
            <div className="section" key={index}>
              <h1>{carousel.title} <FaAngleRight/></h1>
              <Swiper className="carousel" slidesPerView={slidesPerView} navigation spaceBetween={20}>
                {carousel.movies.map((movie) => (
                  <SwiperSlide className="item" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Cover" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'}); navigate(`/detail/${movie.id}`) }}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </>
      }
    </>
  );
}
