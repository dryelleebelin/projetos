import './header.scss';
import logo from '../../images/logo.png';
import logo2 from '../../images/logo2.png';
import DarkMode from '../DarkMode/DarkMode';

export default function Header() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const scrollToCharacters = () => {
        document.getElementById('characters').scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToPhrases = () => {
        document.getElementById('phrases').scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToSeasons = () => {
        document.getElementById('seasons').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header>
            <div onClick={scrollToTop}>
                <img className='logo2' src={logo2} alt='Logo Rick and Morty'/>
                <img className='logo' src={logo} alt='Logo'/>
            </div>
            <nav>
                <a onClick={scrollToTop}>HOME</a>
                <a onClick={scrollToCharacters}>PERSONAGENS</a>
                <a onClick={scrollToPhrases}>FRASES E MEMES</a>
                <a onClick={scrollToSeasons}>TEMPORADAS</a>
            </nav>
            <DarkMode/>
        </header>
    );
}
