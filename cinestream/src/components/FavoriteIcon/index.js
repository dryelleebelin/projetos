import React, { useState, useEffect } from "react"
import './favoriteicon.scss'
import { toast } from "react-toastify"
import { db } from '../../services/firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from'firebase/firestore'
import useTranslations from '../../translations/useTranslations'

import { FaRegBookmark, FaBookmark  } from "react-icons/fa"

export default function FavoriteIcon({id}){
  const translations = useTranslations()
  const [favorites, setFavorites] = useState([])

  const getUIDFromLocalStorage = () => {
    const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
    return uid
  }

  async function handleFavorite(id){
    try{
      const uid = getUIDFromLocalStorage()
      await addDoc(collection(db, `favorites/${uid}/movies`), {
        idFavorite: id
      })
      setFavorites([...favorites, id])

    } catch(error){
      toast.error(translations.favoriteErrorPleaseTryAgainLater)
      console.error(translations.errorWhenFavorites, error)
    }
  }

  async function searchFavorites(){
    try {
      const uid = getUIDFromLocalStorage()
      const favoritesRef = collection(db, `favorites/${uid}/movies`)
      const snapshot = await getDocs(favoritesRef)
      const lista = snapshot.docs.map(doc => doc.data().idFavorite)
      setFavorites(lista)

    } catch (error) {
      console.error(translations.errorWhenSearchingForFavorites, error)
    }
  }

  async function removeFavorite(id){
    try{
      const uid = getUIDFromLocalStorage()
      const docRef = doc(db, `favorites/${uid}/movies`, id.toString())
      await deleteDoc(docRef)
      setFavorites(favorites.filter(itemId => itemId !== id))
      console.log("removido com sucesso!!!")
  
    } catch(error){
      toast.error(translations.errorRemovingFavorite2)
      console.error(translations.errorRemovingFavorite, error)
    }
  }

  useEffect(() => {
    searchFavorites()
  }, [])

  const info = () => {
    toast.info(translations.underDevelopment)
  }

  return(
    <>
      {favorites.includes(id) ? 
        <FaBookmark className="mark" onClick={info}/>
      : 
        <FaRegBookmark className="mark" onClick={() => handleFavorite(id)}/>
      }
    </>
  )
}