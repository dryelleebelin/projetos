import React, { useState, useEffect } from "react";
import './carousel.scss'
import api from "../../services/api";

import CarouselTopMovies from "../CarouselTopMovies";

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FaAngleRight } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";

register()

export default function Carousel(){
  const [slidesPerView, setSlidesPerView] = useState(7)
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true)

  const data = [
    { title: 'PRÓXIMAS ESTREIAS', route: 'movie/upcoming', page: '1'},
    { title: 'FILMES DE ANIMAÇÃO', route: '/discover/movie', genreId: '16', page: '2'},
    { title: 'SÉRIES DE TV MAIS BEM AVALIADAS', route: 'tv/top_rated', page: '1'},
    { title: 'EM CARTAZ', route: 'movie/now_playing', page: '2'},
    { title: 'SÉRIES DE TV PARA CRIANÇAS', route: '/discover/tv', genreId: '10762', page: '1'},
    { title: 'DOCUMENTÁRIO', route: '/discover/movie', genreId: '99', page: '1'},
    { title: 'MAIS BEM AVALIADOS', route: 'movie/top_rated', page: '1'},
    { title: 'SÉRIES DE TV EM EXIBIÇÃO HOJE', route: 'tv/airing_today', page: '2'},
    { title: 'FILMES DE TERROR', route: '/discover/movie', genreId: '27', page: '1'},
    { title: 'SÉRIES DE TV POPULARES', route: 'tv/popular', page: '1'},
    { title: 'SÉRIES DE TV NEWS', route: '/discover/tv', genreId: '10763', page: '1'},
  ]

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
      } catch (error){
        console.log(error);
        return [];
      }
    }

    async function loadCarouselData() {
      const carousels = await Promise.all(data.map(async (item) => {
        const movies = await fetchData(item.route, item.genreId, item.page);
        return { title: item.title, movies: movies };
      }));
      setCarouselData(carousels);
      setLoading(false)
    }

    loadCarouselData();
  }, []);

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
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Cover"/>
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
