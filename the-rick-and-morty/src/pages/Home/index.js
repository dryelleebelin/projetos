import './home.scss'
import Header from '../../components/Header'
import logo from '../../images/logo.png'
import rickandmorty from '../../images/characters.png'
import { FaPlay } from "react-icons/fa";
import api from '../../services/api';
import React, {useEffect, useState} from 'react';

export default function Home(){
    const [characters, setCharacters] = useState([])

    async function loadCharacters(){
        try{
            const response = await api.get("/character")
            setCharacters(response.data.results.slice(0, 20))
        } catch(err){
            console.error('Erro ao buscar dados: ', err);
            return;
        }
    }

    useEffect(() => {
        loadCharacters()
    }, [])

    return(
        <>
            <Header/>

            <main>
                <section className='home'>
                    <div>
                        <span>As perigosas aventuras de um cientista alcóolico e seu neto</span>
                        <img src={logo} alt='Logo Rick and Morty'/>
                        <p>Rick é um cientista louco excêntrico e completamente irresponsável que usa o neto, Morty, um menino de coração bom mas, não muito brilhante, como cobaia em seus experimentos. Juntos, eles embarcam em malucas aventuras interdimensionais.</p>
                        <button>Assistir <FaPlay/></button>
                    </div>

                    <aside>
                        <img src={rickandmorty} alt='Characters Rick and Morty'/>
                    </aside>
                </section>

                <section className='sinopse'>
                    <div>
                        <h2>Sinopse</h2>
                        <p>Rick  e Morty é uma série de animação adulta que mistura comédia e ficção científica e se originou de uma paródia animaada em curta-metragem do filme De Volta Para o Futuro. O show acompanha as aventuras e os descobrimentos de um super cientista. Rick e seu neto não muito brilhante, Morty que entre um número infinito de realidades, viajam para outros planetas e dimensões através de portais usando o veículo voador de Rick e mesmo com diversos desentendimentos, os dois se divertem descobrindo lugares incríveis e criaturas assustadoras através de universos e galáxias desconhecidas.</p>
                    </div>
                </section>

                <section className='characters'>
                    <h2>Personagens</h2>
                    <p>De viajantes no tempo à medica de cavalos, aqui a diversidade é igual a quantidade de realidades paralelas, além, é claro de muitosrostos inusitados e aleatórios a cada episódio.</p>
                    <div className='container'>
                        {characters.map((character) => {
                            return(
                                <div className='item' key={character.id}>
                                    <img src={character.image} alt='Character'/>
                                    <span>{character.name.split(" ").slice(0, 2).join(" ")}</span>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section>
                    
                </section>
            </main>
        </>
    )
}