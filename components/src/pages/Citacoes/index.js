import React, { useState } from "react";
import './citacoes.scss'
import Citacao from "./citacao";

export default function Citacoes(){
  const citacoes = [
    { autor: "Machado de Assis", texto: "A verdade é sempre o argumento mais forte." },
    { autor: "Carlos Drummond de Andrade", texto: "No meio do caminho tinha uma pedra." },
    { autor: "Clarice Lispector", texto: "Amar é mudar a alma de casa." },
    { autor: "Vinicius de Moraes", texto: "Que seja eterno enquanto dure." },
    { autor: "Guimarães Rosa", texto: "O correr da vida embrulha tudo." },
    { autor: "Manoel de Barros", texto: "O essencial é invisível aos olhos." },
    { autor: "Fernando Sabino", texto: "Nada na vida é definitivo, nem a dor, nem a felicidade." },
    { autor: "Lygia Fagundes Telles", texto: "A vida é curta, mas as emoções que podemos deixar duram uma eternidade." },
    { autor: "Mario Quintana", texto: "O tempo é um rio que corre sem fim." },
    { autor: "Adélia Prado", texto: "Apressa-te a viver bem e pensa que cada dia é, por si só, uma vida." },
    { autor: "Rubem Alves", texto: "A vida é uma oportunidade de conhecer a Deus." },
    { autor: "Paulo Coelho", texto: "O segredo é não correr atrás das borboletas… É cuidar do jardim para que elas venham até você." },
    { autor: "Cecília Meireles", texto: "E tudo vale a pena quando a alma não é pequena." },
    { autor: "Érico Veríssimo", texto: "A felicidade é uma construção." },
    { autor: "Oswald de Andrade", texto: "Só a antropofagia nos une. Socialmente. Economicamente. Filosoficamente." },
    { autor: "Rachel de Queiroz", texto: "Não é o amor que sustenta o relacionamento. É o modo de se relacionar que sustenta o amor." },
    { autor: "Graciliano Ramos", texto: "A pior forma de saudade é quando a gente querendo esquecer, lembra." },
    { autor: "Jorge Amado", texto: "O amor é uma flor roxa que nasce no coração dos trouxas." },
    { autor: "Carlos Heitor Cony", texto: "O acaso é uma palavra vazia de sentido, por que pressupõe um sentido em tudo." },
    { autor: "Lima Barreto", texto: "Ai de ti, Copacabana." },
    { autor: "Ruth Rocha", texto: "Quem tem medo do lobo mau?" }
  ];

  const [indice, setIndice] = useState(0)

  const proximaCitacao = () => {
    setIndice((indiceAtual) => (indiceAtual + 1) % citacoes.length)
  }

  return(
    <div className="citacoes">
      <Citacao texto={citacoes[indice].texto} autor={citacoes[indice].autor}/>
      <button onClick={proximaCitacao}>Próxima citação</button>
    </div>
  )
}