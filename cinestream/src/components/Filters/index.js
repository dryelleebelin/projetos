import React, { useEffect, useState } from 'react'
import './filters.scss'
import api from '../../services/api'
import useTranslations from '../../translations/useTranslations'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Filters({ onFilterChange }) {
    const translations = useTranslations()
    const navigate = useNavigate()
    const [genres, setGenres] = useState([])
    const [countries, setCountries] = useState([])
    const [languages, setLanguages] = useState([])
    const [loading, setLoading] = useState(true)

    const [filter, setFilter] = useState({
        genre: '',
        country: '',
        language: ''
    })

    async function loadFilters(){
        try {
            const [moviesResponse, tvResponse, countriesResponse, languagesResponse] = await Promise.all([
                api.get('genre/movie/list'),
                api.get('genre/tv/list'),
                api.get('configuration/countries'),
                api.get('configuration/languages')
            ])
            const combinedGenres = [...moviesResponse.data.genres, ...tvResponse.data.genres]
            const sortedGenres = combinedGenres.sort((a, b) => a.name.localeCompare(b.name))
            setGenres(filterGenres(sortedGenres))

            setCountries(countriesResponse.data)

            const sortedLanguages = languagesResponse.data.sort((a, b) => a.english_name.localeCompare(b.english_name))
            setLanguages(sortedLanguages)
            setLoading(false)

        } catch(error){
            console.error(translations.errorLoadingFilters, error)
            setLoading(false)
        }
    }

    function filterGenres(genres){
        return genres.filter((genre, index, self) => (
            index === self.findIndex((g) => (g.id === genre.id && g.name === genre.name))
        ))
    }

    function handleChangeFilter(e){
        const {name, value} = e.target
        const updatedFilter = {...filter, [name]: value}
        setFilter(updatedFilter)
    
        if (onFilterChange) {
            onFilterChange(updatedFilter)
        }

        if (value !== '') {
            navigate('/filtered-results')
            toast.info(translations.underDevelopment)
        }
    }

    function handleClearFilters(e){
        e.preventDefault()

        navigate('/catalog')

        setFilter({
            genre: '',
            country: '',
            language: ''
        })
        if (onFilterChange) {
            onFilterChange({
                genre: '',
                country: '',
                language: ''
            })
        }
    }

    useEffect(() => {
        loadFilters()
    }, [])

    return (
        <>
            {!loading && (
                <form className='container-filters'>
                    <select name='genre' defaultValue="gênero" onChange={handleChangeFilter}>
                        <option disabled value="gênero">{translations.gender}</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                    <select name='country' defaultValue="país" onChange={handleChangeFilter} disabled>
                        <option disabled value="país">{translations.country}</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.iso_3166_1}>{country.english_name.split(" ").slice(0, 2).join(" ")}</option>
                        ))}
                    </select>
                    <select name='language' defaultValue="idioma" onChange={handleChangeFilter} disabled>
                        <option disabled value="idioma">{translations.language}</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language.iso_639_1}>{language.english_name.split(" ").slice(0, 1).join(" ")}</option>
                        ))}
                    </select>
                    <input type='text' name='search' value={filter.search || ''} placeholder={translations.filmSeriesOrPerson} autoComplete='off' onChange={handleChangeFilter} disabled/>
                    <button type='button' onClick={handleClearFilters}>{translations.toClean}</button>
                </form>
            )}
        </>
    )
}
