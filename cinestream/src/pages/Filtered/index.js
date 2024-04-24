import React, { useEffect, useState } from "react"
import './filtered.scss'
import api from "../../services/api"

import Header from "../../components/Header"
import Filters from "../../components/Filters"
import Footer from "../../components/Footer"

export default function Filtered(){
  const [filteredMovies, setFilteredMovies] = useState([])

  async function fetchResults(filters){
    try{
      const response = await api.get('discover/movie', {
        params: {
          with_genres: filters.genre,
          'region': filters.country,
          'language': filters.language
        }
      })
      setFilteredMovies(response.data.results)
      console.log(response.data.results)

    } catch(error){
      console.error('Erro ao buscar resultados do filtro: ', error)
    }
  }

  useEffect(() => {
    fetchResults({})
  }, [])

  return(
    <>
      <Header/>
      <Filters onFilterChange={fetchResults}/>

      <main className="filtered">
        {filteredMovies.map(item => (
          <img key={item.id} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="Cover"/>
        ))}
      </main>

      <Footer/>
    </>
  )
}
