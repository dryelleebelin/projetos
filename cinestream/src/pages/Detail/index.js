import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"
import './detailmovie.scss'
import isoLangs from 'iso-639-1'
import axios from "axios"
import useTranslations from "../../translations/useTranslations"

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FavoriteIcon from '../../components/FavoriteIcon'
import ModalTrailer from "../../components/ModalTrailer"

import { CgSpinner } from "react-icons/cg"
import { FaRegCirclePlay } from "react-icons/fa6"

export default function Detail() {
  const translations = useTranslations()
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState('')
  const releaseYear = new Date(detail.release_date || detail.first_air_date).getFullYear()
  const [loading, setLoading] = useState(true)
  const titleTrailer = detail.title || detail.name
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [videoId, setVideoId] = useState('')

  async function loadDetail(){
    try {
      const tvResponse = await api.get(`movie/${id}`)
      setDetail(tvResponse.data)

      const creditsResponse = await api.get(`movie/${id}/credits`)
      setCast(creditsResponse.data.cast.slice(0, 5))

      const crew = creditsResponse.data.crew
      const director = crew.find(member => member.job === 'Director')
      if(director){
        setDirector(director.name)
      }

      setLoading(false)
    } catch(error){
      if (error.response && error.response.status === 404){
        try {
          const movieResponse = await api.get(`tv/${id}`)
          setDetail(movieResponse.data)

          const creditsResponse = await api.get(`tv/${id}/credits`)
          setCast(creditsResponse.data.cast.slice(0, 5))

          const crew = creditsResponse.data.crew
          const director = crew.find(member => member.job === 'Director')
          if(director){
            setDirector(director.name)
          }

          setLoading(false)
        } catch(error) {
          console.error(translations.errorLoadingDetails, error)
        }
      } else {
        console.error(translations.errorLoadingDetails, error)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    document.title = "Detalhes - CineStream"

    loadDetail()
  }, [id])

  const getLanguageName = (code) => {
    return isoLangs.getName(code)
  }

  async function openModal(){
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(titleTrailer)}%20trailer&key=AIzaSyDmNT3GTNKKAjipgXKKsuZwx3uxoNKwjkk&part=snippet&type=video`
      )

      if (response.data.items.length > 0) {
        const firstVideoId = response.data.items[0].id.videoId
        setVideoId(firstVideoId)
        setIsOpenModal(true)

      } else {
        console.log(translations.noTrailersFound)
        return
      }
    } catch (error) {
      console.error(translations.errorWhenSearchingForTrailer, error)
    }
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return(
    <>
      <Header/>

      {loading ? 
        <div className="spinner-vh spinner"><CgSpinner/></div>
      :
        <div className="detail">
          <div className="container-trailer">
            <FaRegCirclePlay onClick={openModal}/>
            <img className="backdrop" src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt="Backdrop"/>
          </div>

          <main>
            <img src={`https://image.tmdb.org/t/p/original/${detail.poster_path}`} alt="Poster"/>
            <section>
              <h1>{detail.title || detail.name} <span>{releaseYear || detail.first_air_date}</span></h1>
              {detail.vote_average && <span>{detail.vote_average.toFixed(1)}/10</span>}
              {detail.overview && <p>{detail.overview}</p>}
              {detail.runtime && <h4>{translations.duration}: <p>{Math.floor(detail.runtime / 60)}h {detail.runtime % 60}min</p></h4>}
              {detail.number_of_seasons && <h4>{translations.seasons}: <p>{detail.number_of_seasons}</p></h4>}
              {detail.number_of_episodes && <h4>{translations.episodes}: <p>{detail.number_of_episodes}</p></h4>}
              <h4>{detail.genres && detail.genres.length === 1 ? <>{translations.gender}:</> : <>{translations.genres}:</>}
                <p>{detail.genres && detail.genres.map(genre => genre.name).join(', ')}</p>
              </h4>
              <h4>{translations.originalLanguage}: <p>{getLanguageName(detail.original_language)}</p></h4>
              {director && <h4>{translations.director}: <p>{director}</p></h4>}
              {cast && <h4>{translations.cast}: <p>{cast.map(actor => actor.name).join(', ')}...</p></h4>}
              <FavoriteIcon id={detail.id}/>
            </section>
          </main>

          <ModalTrailer isOpen={isOpenModal} closeModal={handleCloseModal} id={videoId}/>
        </div>
      }

      <Footer/>
    </>
  );
}
