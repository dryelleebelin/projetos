import React, { useState, useEffect } from "react"
import './carouselbillboard.scss'
import api from "../../services/api"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from '../../services/firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from'firebase/firestore'

import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade } from 'swiper/modules'

import { FaRegCirclePlay, FaAngleRight } from "react-icons/fa6"
import { FaRegBookmark, FaBookmark  } from "react-icons/fa"
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi"
import { IoMdInformationCircleOutline } from "react-icons/io"

register()

export default function CarouselBillboard() {
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [favorites, setFavorites] = useState([])
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
      console.error('Erro ao carregar filmes: ', error)
      return
    }
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
    searchFavorites()
  }, []);

  async function handleFavorite(id){
    try{
      await addDoc(collection(db, "favorites"), {
        idFavorite: id
      })
      setFavorites([...favorites, id])

    } catch(error){
      toast.error("Erro ao favoritar, tente novamente mais tarde.")
      console.error("Erro ao favoritar: ", error)
    }
  }

  async function searchFavorites(){
    try {
      const favoritesRef = collection(db, "favorites")
      const snapshot = await getDocs(favoritesRef)
      const lista = snapshot.docs.map(doc => doc.data().idFavorite)
      setFavorites(lista)

    } catch (error) {
      console.error("Erro ao buscar favoritos: ", error);
    }
  }

  async function removeFavorite(id){
    try{
      const docRef = doc(db, "favorites", id);
      await deleteDoc(docRef)
      setFavorites(favorites.filter(itemId => itemId !== id))
      console.log("removido com sucesso!!!")

    } catch(error){
      toast.error("Erro ao remover favorito.")
      console.error("Erro ao remover favorito: " + error)
    }
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
                <a href={`https://www.youtube.com/results?search_query=${item.title} Trailer`} target="_blank" rel="noopener noreferrer"><button>VER TRAILER <FaRegCirclePlay/></button></a>
                <Link to={`/detail/${item.id}`}><button>MAIS INFORMAÇÕES <IoMdInformationCircleOutline/></button></Link>
                {favorites.includes(item.id) ? <FaBookmark className="mark" onClick={() => removeFavorite(item.id)}/> : <FaRegBookmark className="mark" onClick={() => handleFavorite(item.id)}/>}
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
