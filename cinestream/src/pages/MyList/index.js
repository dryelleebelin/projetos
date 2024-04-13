import React, { useEffect, useState } from "react";
import './mylist.scss'
import { useNavigate } from "react-router-dom"
import api from "../../services/api"
import { db } from '../../services/firebaseConnection'
import { collection, getDocs } from'firebase/firestore'

import Header from "../../components/Header"
import Footer from "../../components/Footer"

import { CgSpinner } from "react-icons/cg"

export default function MyList(){
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    document.title = "Minha lista - CineStream"

    async function loadFavorites(){
      try{
        const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
        const favoritesRef = collection(db, `favorites/${uid}/movies`)
        const snapshot = await getDocs(favoritesRef)
        const lista = snapshot.docs.map(doc => doc.data().idFavorite)

        const moviesPromises = lista.map(async id => {
          const response = await api.get(`movie/${id}`);
          return response.data;
        });
    
        const favoritesData = await Promise.all(moviesPromises);

        setFavorites(favoritesData)
        setLoading(false)
  
      } catch(error){
        console.error("Erro ao carregar favoritos: " + error)
      }
    }
    loadFavorites()
  }, [])

  return(
    <>
      <Header/>

      {loading ? (
        <div className="spinner-vh spinner"><CgSpinner/></div>
      ) : (
        <div className="my-list">
          {favorites.length > 0 ? (
            <>
              <h1>Minha lista</h1>
              <div>
                {favorites.map((item) => (
                  <img key={item.id} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="Cover" onClick={() => navigate(`/detail/${item.id}`)}/>
                ))}
              </div>
            </>
          ) : (
            <span>Sua lista está vazia.</span>
          )}
        </div>
      )}

      <Footer/>
    </>
  )
}