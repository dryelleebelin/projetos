import './header.scss'
import logo from '../../images/logo.png'
import logo2 from '../../images/logo2.png'

export default function Header(){
    return(
        <header>
            <div>
                <img className='logo2' src={logo2} alt='Logo Rick and Morty'/>
                <img className='logo' src={logo} alt='Logo'/>
            </div>
            <nav>
                <a href='#'>HOME</a>
                <a href='#'>PERSONAGENS</a>
                <a href='#'>FRASES E MEMES</a>
                <a href='#'>TEMPORADAS</a>
            </nav>
        </header>
    )
}