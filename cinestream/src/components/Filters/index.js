import React, { useEffect, useState } from 'react'
import './filters.scss'
import api from '../../services/api'
import useTranslations from '../../translations/useTranslations'
import { toast } from 'react-toastify'

export default function Filters() {
    const translations = useTranslations()
    const [genres, setGenres] = useState([])
    const [countries, setCountries] = useState([])
    const [languages, setLanguages] = useState([])

    const [filter, setFilter] = useState({
        search: '',
    })

    async function loadFilters(){
        try {
            const [moviesResponse, tvResponse, countriesResponse, languagesResponse, searchResponse] = await Promise.all([
                api.get('genre/movie/list'),
                api.get('genre/tv/list'),
                api.get('configuration/countries'),
                api.get('configuration/languages'),
                api.get('search/multi', {
                    params: {
                        query: filter.search
                    }
                })
            ]);
            const combinedGenres = [...moviesResponse.data.genres, ...tvResponse.data.genres];
            
            setGenres(filterGenres(combinedGenres));
            setCountries(countriesResponse.data)
            setLanguages(languagesResponse.data)
            setFilter.search(searchResponse.data.results)
        } catch(error){
            console.error(translations.errorLoadingFilters, error)
            return
        }
    }

    useEffect(() => {
        //loadFilters()
    }, []);

    function handleChangeFilter(e){
        const {name, value} = e.target
        setFilter((prevFilter) => ({...prevFilter, [name]: value}))
    }

    function filterGenres(genres){
        return genres.filter((genre, index, self) => (
            index === self.findIndex((g) => (g.id === genre.id && g.name === genre.name))
        ));
    }

    const info = () => {
        toast.info(translations.underDevelopment)
    }

    return (
        <>
            <form className='container-filters' onClick={info}>
                <select name='genre' defaultValue="gênero">
                    <option disabled value="gênero">{translations.gender}</option>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre.name}>{genre.name}</option>
                    ))}
                </select>
                <select name='country' defaultValue="país">
                    <option disabled value="país">{translations.country}</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.english_name}>{country.english_name.split(" ").slice(0, 2).join(" ")}</option>
                    ))}
                </select>
                <select name='language' defaultValue="idioma">
                    <option disabled value="idioma">{translations.language}</option>
                    {languages.map((language, index) => (
                        <option key={index} value={language.english_name}>{language.english_name.split(" ").slice(0, 1).join(" ")}</option>
                    ))}
                </select>
                <input type='text' name='search' value={filter.search} placeholder={translations.filmSeriesOrPerson} autoComplete='off' onChange={handleChangeFilter}/>
                <button type='submit' disabled>{translations.toClean}</button>
            </form>
        </>
    );
}
