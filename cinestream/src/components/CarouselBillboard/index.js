import React, { useState, useEffect } from "react"
import './carouselbillboard.scss'
import api from "../../services/api"
import { Link } from "react-router-dom"
import useTranslations from "../../translations/useTranslations"

import FavoriteIcon from "../FavoriteIcon"

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade } from 'swiper/modules'

import { FaRegCirclePlay } from "react-icons/fa6"
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { toast } from "react-toastify"

register()

export default function CarouselBillboard() {
  const translations = useTranslations()
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])

  async function loadMovies() {
    try {
      const response = await api.get(`movie/upcoming`, {
        params: {
          page: 1
        }
      });
      setMovies(response.data.results.slice(0, 20))
      loadGenres()
    } catch (error) {
      console.error(translations.errorLoadingMovies, error)
      return
    }
  }

  async function loadGenres(){
    try{
      const response = await api.get('genre/movie/list')
      setGenres(response.data.genres)
    } catch(error){
      console.error(translations.errorLoadingGenres, error)
      return
    }
  }

  const getGenreNames = (genreIds) => {
    return genreIds.map(genreId => {
      const genre = genres.find(g => g.id === genreId);
      return genre ? genre.name : "";
    });
  };

  useEffect(() => {
    loadMovies()
  }, [])
  

  const handleLike = () => {
    setLike(true)
    setDislike(false)
    toast.info(translations.underDevelopment)
  }

  const handleDislike = () => {
    setDislike(true)
    setLike(false)
    toast.info(translations.underDevelopment)
  }

  return (
    <Swiper className="billboard" modules={[EffectFade]} effect="fade" slidesPerView={1} autoplay={{ delay: 10000 }} allowTouchMove={false}>
      {movies.map((item) => (
        <SwiperSlide className="background" key={item.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})` }}>
          <div className="gradient-overlay">
            <div className="content">
              <span>{getGenreNames(item.genre_ids).join(", ")}</span>
              <h1>{item.title}</h1>
              <div>
                <a href={`https://www.youtube.com/results?search_query=${item.title} Trailer`} target="_blank" rel="noopener noreferrer"><button>{translations.seeTrailer} <FaRegCirclePlay/></button></a>
                <Link to={`/detail/${item.id}`}><button>{translations.moreInformation} <IoMdInformationCircleOutline/></button></Link>
                <FavoriteIcon id={item.id}/>
                {like ? <BiSolidLike className="like" /> : <BiLike className="like" onClick={handleLike} />}
                {dislike ? <BiSolidDislike className="dislike" /> : <BiDislike className="dislike" onClick={handleDislike} />}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
