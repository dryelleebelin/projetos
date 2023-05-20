/*  trabalhando com requisições http: 
import React, {useEffect, useState} from 'react';
import './style.css';

function App() {
  const [nutri, setNutri] = useState([]);

  useEffect(() => {
    function loadApi(){
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';
      fetch(url)
      .then((resultado) => resultado.json())
      .then((json) => {
        console.log(json);
        setNutri(json);
      })
    }

    loadApi();

  }, []);

  return (
    <div className="container">
      <header>
        <strong>React Nutri</strong>
      </header>
      {nutri.map((item) => {
        return(
          <article key={item.id} className="post">
            <strong className="titulo">{item.titulo}</strong>
            <img src={item.capa} alt={item.titulo} className="capa"/>
            <p className="subtitulo">
              {item.subtitulo}
            </p>
            <a className="botao">Acessar</a>
          </article>
        )
      })}
    </div>
  );
}

export default App;
*/

//  trabalhando com rotas(páginas):
import RoutesApp from './routes';

function App() {
  return (
    <RoutesApp/>
  );
}

export default App;