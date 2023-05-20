import {Link} from 'react-router-dom';
import './style.css';

function Header(){
    return(
        <header>
            <h2>Sujeito Dev</h2>
            <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/contato">Contato</Link>
            </div>
        </header>
    )
}

export default Header;  //header fixo