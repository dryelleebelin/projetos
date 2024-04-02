import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"
import './detailmovie.scss'
import isoLangs from 'iso-639-1';

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { CgSpinner } from "react-icons/cg"
import { FaRegCirclePlay } from "react-icons/fa6"
import { FaRegBookmark, FaBookmark  } from "react-icons/fa"

export default function Detail() {
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState('')
  const releaseYear = new Date(detail.release_date || detail.first_air_date).getFullYear()
  const [loading, setLoading] = useState(true)
  const titleTrailer = detail.title || detail.name

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
          console.error('Erro ao carregar detalhes: ', error)
        }
      } else {
        console.error('Erro ao carregar detalhes: ', error)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    document.title = "Detail - CineStream"
    loadDetail()
  }, [id])

  const getLanguageName = (code) => {
    return isoLangs.getName(code)
  };

  return(
    <>
      <Header/>

      {loading ? 
        <div className="spinner-vh spinner"><CgSpinner/></div>
      :
        <div className="detail">
          <div className="container-trailer">
            <a href={`https://www.youtube.com/results?search_query=${titleTrailer} Trailer`} target="_blank" rel="noopener noreferrer"><FaRegCirclePlay/></a>
            <img className="backdrop" src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt="Backdrop"/>
          </div>

          <main>
            <img src={`https://image.tmdb.org/t/p/original/${detail.poster_path}`} alt="Poster"/>
            <section>
              <h1>{detail.title || detail.name} <span>{releaseYear || detail.first_air_date}</span></h1>
              {detail.vote_average && <span>{detail.vote_average.toFixed(1)}/10</span>}
              {detail.overview && <p>{detail.overview}</p>}
              {detail.runtime && <h4>Duração: <p>{Math.floor(detail.runtime / 60)}h {detail.runtime % 60}min</p></h4>}
              {detail.number_of_seasons && <h4>Temporadas: <p>{detail.number_of_seasons}</p></h4>}
              {detail.number_of_episodes && <h4>Episódios: <p>{detail.number_of_episodes}</p></h4>}
              <h4>{detail.genres && detail.genres.length === 1 ? "Gênero:" : "Gêneros:"}
                <p>{detail.genres && detail.genres.map(genre => genre.name).join(', ')}</p>
              </h4>
              <h4>Idioma Original: <p>{getLanguageName(detail.original_language)}</p></h4>
              {director && <h4>Diretor: <p>{director}</p></h4>}
              {cast && <h4>Elenco: <p>{cast.map(actor => actor.name).join(', ')}...</p></h4>}
              <FaRegBookmark className="mark"/>
            </section>
          </main>
        </div>
      }

      <Footer/>
    </>
  );
}
