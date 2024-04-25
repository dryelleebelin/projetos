import React, { useEffect, useState } from "react"
import './filtered.scss'
import api from "../../services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useTranslations from "../../translations/useTranslations"

import Header from "../../components/Header"
import Filters from "../../components/Filters"
import Footer from "../../components/Footer"

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { CgSpinner } from "react-icons/cg"

export default function Filtered(){
  const translations = useTranslations()
  const navigate = useNavigate()
  const [filtered, setFiltered] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(30)
  const [loading, setLoading] = useState(true)

  async function fetchResults(filters){
    try{
      const [movieResponse, tvResponse] = await Promise.all([
        api.get('discover/movie', {params: { page: page, with_genres: filters.genre }}),
        api.get('discover/tv', {params: { page: page, with_genres: filters.genre }})
      ])

      const combinedResults = [...movieResponse.data.results, ...tvResponse.data.results]
      
      setTimeout(() => {
        setFiltered(combinedResults)
        setLoading(false)
      }, 1000)

    } catch(error){
      toast.error(translations.anErrorOccurredWhileFetchingTheResultsTryAgainLater)
      console.error(translations.errorWhenFetchingFilterResults, error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults({})
  }, [page])

  return(
    <>
      <Header/>
      <Filters onFilterChange={fetchResults}/>

      {loading ? (
        <div className="spinner-vh spinner"><CgSpinner/></div>
      ) : (
        <main className="filtered">
          <section>
            {filtered.map(item => (
              <img key={item.id} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="Cover" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); navigate(`/detail/${item.id}`) }}/>
            ))}
          </section>

          <div className='pagination'>
            <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1}><FaChevronLeft/></button>
            <p>{page} / {totalPages}</p>
            <button type="button" onClick={() => setPage(page + 1)} disabled={page === totalPages}><FaChevronRight/></button>
          </div>
        </main>
      )}

      <Footer/>
    </>
  )
}
