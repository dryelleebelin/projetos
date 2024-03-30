import React, { useEffect, useState } from "react";
import './citacoes.scss'

export default function Citacao({autor, texto}){
  const [traducao, setTraducao] = useState("")

  async function traduzirCitacao(idioma){
    try{
      const resposta = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: texto,
          source: "pt-BR",
          target: idioma
        }),
        headers: {"Content-Type": "application/json"}
      })
      const data = await resposta.json()
      setTraducao(data.translatedText)
    } catch(error){
      console.error("Erro ao traduzir!" + error)
      return
    }
  }

  useEffect(() => {
    setTraducao("")
  }, [texto])

  return(
    <div className="citacao">
      <blockquote>
        <p>{traducao ? traducao : texto}</p>
        <footer>{autor}</footer>
      </blockquote>
      <button onClick={() => traduzirCitacao("en")}>Traduzir para o inglês</button>
      <button onClick={() => traduzirCitacao("es")}>Traduzir para o espanhol</button>
    </div>
  )
}