import React, { useState, useEffect } from "react";
import './carouselbillboard.scss';
import api from "../../services/api";

import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';

import { FaRegCirclePlay, FaAngleRight } from "react-icons/fa6";
import { FaRegBookmark, FaBookmark  } from "react-icons/fa";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";

register();

export default function CarouselBillboard() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  async function loadMovies() {
    try {
      const response = await api.get(`movie/upcoming`, {
        params: {
          page: 1
        }
      });
      setMovies(response.data.results.slice(0, 20));
    } catch (error) {
      console.error('Erro ao carregar filmes: ', error);
      return;
    }
    loadGenres();
  }

  async function loadGenres(){
    try{
      const response = await api.get('genre/movie/list');
      setGenres(response.data.genres);
    } catch(error){
      console.error('Erro ao carregar gêneros: ', error);
      return;
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
  }, []);

  function favoriteMovie(id) {
    const myList = localStorage.getItem("@cinestream");
    const savedMovies = JSON.parse(myList) || [];
    const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === id);
    if (!hasMovie) {
      savedMovies.push({ id: id });
      localStorage.setItem("@cinestream", JSON.stringify(savedMovies));
      setFavorite(true);
    }
  }
  
  function unfavoriteMovie(id) {
    const myList = localStorage.getItem("@cinestream");
    const savedMovies = JSON.parse(myList) || [];
    const updatedMovies = savedMovies.filter((item) => item.id !== id);
    localStorage.setItem("@cinestream", JSON.stringify(updatedMovies));
    setFavorite(false);
  }
  
  const handleLike = () => {
    setLike(true);
    setDislike(false);
  };

  const handleDislike = () => {
    setDislike(true);
    setLike(false);
  };

  return (
    <Swiper className="billboard" modules={[EffectFade]} effect="fade" slidesPerView={1} autoplay={{ delay: 10000 }} allowTouchMove={false}>
      {movies.map((item) => (
        <SwiperSlide className="background" key={item.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})` }}>
          <div className="gradient-overlay">
            <div className="content">
              <span>{getGenreNames(item.genre_ids).join(", ")}</span>
              <h1>{item.title}</h1>
              <div>
                <a href={`https://www.youtube.com/results?search_query=${item.title} Trailer`} target="_blank" rel="noopener noreferrer"><button>VER TRAILER <FaRegCirclePlay /></button></a>
                {favorite ? <FaBookmark className="mark" onClick={() => unfavoriteMovie(item.id)} /> : <FaRegBookmark className="mark" onClick={() => favoriteMovie(item.id)} />}
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
