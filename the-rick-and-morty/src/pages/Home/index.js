import './home.scss'
import Header from '../../components/Header'
import logo from '../../images/logo.png'
import rickandmorty from '../../images/characters.png'
import { FaPlay } from "react-icons/fa";
import api from '../../services/api';
import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import CarouselPhrases from '../../components/CarouselPhrases';
import CarouselSeasons from '../../components/CarouselSeasons';

export default function Home(){
    const [characters, setCharacters] = useState([])
    const currentYear = new Date().getFullYear()

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

    const handleInfo = () => {
        toast.info("Página ainda em construção!")
    }

    return(
        <>
            <Header/>

            <main>
                <section className='home'>
                    <div>
                        <span>As perigosas aventuras de um cientista alcóolico e seu neto</span>
                        <img src={logo} alt='Logo Rick and Morty'/>
                        <p>Rick é um cientista louco excêntrico e completamente irresponsável que usa o neto, Morty, um menino de coração bom mas, não muito brilhante, como cobaia em seus experimentos. Juntos, eles embarcam em malucas aventuras interdimensionais.</p>
                        <button onClick={handleInfo}>Assistir <FaPlay/></button>
                    </div>

                    <aside>
                        <img src={rickandmorty} alt='Characters Rick and Morty'/>
                    </aside>
                </section>

                <span id='sinopse'/>

                <section className='sinopse'>
                    <div>
                        <h2>Sinopse</h2>
                        <p>Rick  e Morty é uma série de animação adulta que mistura comédia e ficção científica e se originou de uma paródia animaada em curta-metragem do filme De Volta Para o Futuro. O show acompanha as aventuras e os descobrimentos de um super cientista. Rick e seu neto não muito brilhante, Morty que entre um número infinito de realidades, viajam para outros planetas e dimensões através de portais usando o veículo voador de Rick e mesmo com diversos desentendimentos, os dois se divertem descobrindo lugares incríveis e criaturas assustadoras através de universos e galáxias desconhecidas.</p>
                        <span id='characters'/>
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
                    <span id='phrases'/>
                </section>

                <section className='phrases'>
                    <h2>Frases e Memes</h2>
                    <p>A combinação de doses de bizarrice com crises existenciais reunidos em coloridos memes. Os melhores de todos os tempos e espaço!</p>
                    <CarouselPhrases/>
                    <span id='seasons'/>
                </section>

                <section className='seasons'>
                    <h2>Temporadas</h2>
                    <p>Se você adora acompanhar as aventuras de Rick e Morty, está no lugar certo! São muitos espisódios icônicos, cheios de humor e malucas viagens no tempo-espaço e por universos paralelos.</p>
                    <CarouselSeasons/>
                </section>

                <footer>
                    <div className='footer-left'>
                        <img src={logo} alt='Logo Rick and Morty' onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}/>
                        <p>As perigosas aventuras de um cientista alcóolico e seu neto.</p>
                    </div>

                    <div className='footer-right'>
                        <div>
                            <a onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}>Home</a>
                            <a onClick={() => {document.getElementById('sinopse').scrollIntoView({ behavior: 'smooth' })}}>Sinopse</a>
                            <a onClick={() => {document.getElementById('characters').scrollIntoView({ behavior: 'smooth' })}}>Personagens</a>
                            <a onClick={() => {document.getElementById('phrases').scrollIntoView({ behavior: 'smooth' })}}>Frases e Memes</a>
                            <a onClick={() => {document.getElementById('seasons').scrollIntoView({ behavior: 'smooth' })}}>Temporadas</a>
                        </div>
                        <div>
                            <a onClick={handleInfo}>Contato</a>
                            <a onClick={handleInfo}>Sobre</a>
                        </div>
                    </div>
                </footer>

                <section className='baseboard'>
                    <p>&#169;{currentYear}. Todos os direitos reservados.</p>
                    <div>
                        <a onClick={handleInfo}>Termos de uso</a>
                        <a onClick={handleInfo}>Política de privacidade</a>
                    </div>
                </section>
            </main>
        </>
    )
}