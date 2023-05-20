import {useEffect, useState} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css';

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filmes2, setFilmes2] = useState([]);
    const [loading2, setLoading2] = useState(true);

    const [filmes3, setFilmes3] = useState([]);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key: "df4556586815e5b2b94838a7bf5c822b",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(response.data.results.slice(0, 10))
            setLoading(false);
        }
        loadFilmes();
    }, [])
    useEffect(() => {
        async function loadFilmes2(){
            const response = await api.get("movie/popular",{
                params:{
                    api_key: "df4556586815e5b2b94838a7bf5c822b",
                    language: "pt-BR",
                    page: 2,
                }
            })
            setFilmes2(response.data.results.slice(0, 10))
            setLoading2(false);
        }
        loadFilmes2();
    }, [])
    useEffect(() => {
        async function loadFilmes3(){
            const response = await api.get("movie/top_rated",{
                params:{
                    api_key: "df4556586815e5b2b94838a7bf5c822b",
                    language: "pt-BR",
                    page: 3,
                }
            })
            setFilmes3(response.data.results.slice(0, 10))
            setLoading3(false);
        }
        loadFilmes3();
    }, [])
    

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
    if(loading2){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
    if(loading3){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }


    return(
        <div className="container">
            <p>Adicionados recentemente</p>
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <Link to={`/filme/${filme.id}`}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/></Link>
                        </article>
                    )
                })}
            </div>
            <p>Populares</p>
            <div className="lista-filmes">
                {filmes2.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <Link to={`/filme/${filme.id}`}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/></Link>
                        </article>
                    )
                })}
            </div>
            <p>Melhor classificação</p>
            <div className="lista-filmes">
                {filmes3.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <Link to={`/filme/${filme.id}`}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/></Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;

