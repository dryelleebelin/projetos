import React, { useEffect, useState } from 'react';
import './filters.scss';
import api from '../../services/api';

export default function Filters() {
    const [genres, setGenres] = useState([])
    const [countries, setCountries] = useState([])
    const [languages, setLanguages] = useState([])
    const [search, setSearch] = useState('')

    async function loadFilters() {
        try {
            const [moviesResponse, tvResponse, countriesResponse, languagesResponse, searchResponse] = await Promise.all([
                api.get('genre/movie/list'),
                api.get('genre/tv/list'),
                api.get('configuration/countries'),
                api.get('configuration/languages'),
                api.get('search/multi', {
                    params: {
                        query: search
                    }
                })
            ]);
            const combinedGenres = [...moviesResponse.data.genres, ...tvResponse.data.genres];
            setGenres(filterGenres(combinedGenres));
            setCountries(countriesResponse.data)
            setLanguages(languagesResponse.data)
            setSearch(searchResponse.data.results)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadFilters()
    }, []);

    function filterGenres(genres) {
        return genres.filter((genre, index, self) => (
            index === self.findIndex((g) => (g.id === genre.id && g.name === genre.name))
        ));
    }

    return (
        <>
            <form className='container-filters'>
                <select name='genre'>
                    <option disabled selected value="gênero">gênero</option>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre.name}>{genre.name}</option>
                    ))}
                </select>
                <select name='country'>
                    <option disabled selected value="país">país</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.english_name}>{country.english_name.split(" ").slice(0, 2).join(" ")}</option>
                    ))}
                </select>
                <select name='language'>
                    <option disabled selected value="idioma">idioma</option>
                    {languages.map((language, index) => (
                        <option key={index} value={language.english_name}>{language.english_name.split(" ").slice(0, 1).join(" ")}</option>
                    ))}
                </select>
                <input type='text' placeholder='Filme, Série ou Pessoa...' autoComplete='off' onChange={(e) => setSearch(e.target.value)}/>
                <button type='submit'>LIMPAR</button>
            </form>
        </>
    );
}
