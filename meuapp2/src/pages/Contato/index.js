import {Link} from 'react-router-dom';

function Contato(){
    return(
        <div>
            <h1>Página contato</h1>
            <span>Contato da empresa (dd) xxxx-xxxx</span><br/><br/>
            <Link to="/">Página home</Link><br/>
            <Link to="/sobre">Sobre</Link><br/>
        </div>
    )
}

export default Contato;