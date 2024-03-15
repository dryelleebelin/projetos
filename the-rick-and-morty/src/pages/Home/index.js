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
import ModalCharacter from '../../components/ModalCharacter';
import { TbSquareArrowUpFilled } from "react-icons/tb";

export default function Home(){
    const [characters, setCharacters] = useState([])
    const currentYear = new Date().getFullYear()
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalItem, setModalItem] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [buttonToTop, setButtonToTop] = useState(false);
    const [filter, setFilter] = useState({
        name: '',
        status: 'Status...',
        species: 'Espécie...',
        gender: 'Gênero...'
    })

    function handleClean(e){
        e.preventDefault();
        setFilter({
            name: '',
            status: 'Status...',
            species: 'Espécie...',
            gender: 'Gênero...'
        })
    }

    function handleChangeFilter(e){
        const {name, value} = e.target
        setFilter((prevFilter) => ({...prevFilter, [name]: value}))
    }

    async function loadCharacters(page){
        try{
            let queryParams = `?page=${page}`

            if (filter.name) queryParams += `&name=${filter.name}`;
            if (filter.status !== 'Status...') queryParams += `&status=${filter.status}`;
            if (filter.species !== 'Espécie...') queryParams += `&species=${filter.species}`;
            if (filter.gender !== 'Gênero...') queryParams += `&gender=${filter.gender}`;

            const response = await api.get(`character${queryParams}`)
            setCharacters(response.data.results.slice(0, 20))
            setTotalPages(response.data.info.pages)
        } catch(err){
            console.error('Erro ao buscar dados: ', err);
            return;
        }
    }
    
    useEffect(() => {
        loadCharacters(page);
    }, [page, filter]);

    const handleInfo = () => {
        toast.info("Página ainda em construção!")
    }

    async function detailCharacter(id){
        const response = await api.get(`/character/${id}`, {
            params:{
                id: id
            }
        })
        setModalItem(response.data)
        setIsOpenModal(true)
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            if (scrollY > window.innerHeight){
            setButtonToTop(true);
          } else {
            setButtonToTop(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return(
        <>
            <Header/>

            <main>
                <section className='home'>
                    <div>
                        <span>As perigosas aventuras de um cientista alcóolico e seu neto</span>
                        <img src={logo} alt='Logo Rick and Morty'/>
                        <p>Rick é um cientista louco excêntrico e completamente irresponsável que usa o neto, Morty, um menino de coração bom mas, não muito brilhante, como cobaia em seus experimentos. Juntos, eles embarcam em malucas aventuras interdimensionais.</p>
                        <button onClick={handleInfo}>Assistir <FaPlay/> </button>
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
                    <form className='filter' onSubmit={handleClean}>
                        <input type='text' placeholder='Procure por um personagem' name='name' value={filter.name} onChange={handleChangeFilter}/>
                        <select name='status' value={filter.status} onChange={handleChangeFilter}>
                            <option value="status">Status...</option>
                            <option value="alive">alive</option>
                            <option value="dead">dead</option>
                            <option value="unknown">unknown</option>
                        </select>
                        <select name='species' value={filter.species} onChange={handleChangeFilter}>
                            <option value="especie">Espécie...</option>
                            <option value="human">human</option>
                            <option value="humanoid">humanoid</option>
                            <option value="alien">alien</option>
                            <option value="unknown">unknown</option>
                        </select>
                        <select name='gender' value={filter.gender} onChange={handleChangeFilter}>
                            <option value="genero">Gênero...</option>
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="genderLess">genderLess</option>
                            <option value="unknown">unknown</option>
                        </select>
                        <button type='submit'>Limpar</button>
                    </form>
                    <div className='container'>
                        {characters.map((character) => {
                            return(
                                <div className='item' key={character.id} onClick={() => detailCharacter(character.id)}>
                                    <img src={character.image} alt='Character'/>
                                    <span>{character.name.split(" ").slice(0, 2).join(" ")}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className='pagination'>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}>prev</button>
                        <p>page: <span>{page}</span> / {totalPages}</p>
                        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>next</button>
                    </div>

                    {isOpenModal && <ModalCharacter isOpen={isOpenModal} closeModal={handleCloseModal} item={modalItem}/>}
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
                    {buttonToTop && (<TbSquareArrowUpFilled className='to-top' onClick={scrollToTop}/>)}
                </section>
            </main>
        </>
    )
}