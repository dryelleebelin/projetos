import React, { useEffect, useState } from "react"
import './account.scss'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../services/firebaseConnection'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { signOut } from 'firebase/auth'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { IoIosLogOut } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"

export default function Account(){
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(true)

  async function fetchData(){
    try{
      const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      const user = auth.currentUser

      if (docSnap.exists()){
        setName(docSnap.data().name)
        setBirthday(docSnap.data().birthday)
        setEmail(user.email)
        setLoading(false)
      } else{
        setName('')
      }
      
    } catch(error){
      console.error("Erro ao buscar dados: ", error)
    }
  }

  function handleEdit(){
    setDisabled(false)
  }

  async function updateData(){
    try{
      const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
      await updateDoc(doc(db, 'users', uid), {
        name: name,
        birthday: birthday
      })
      setDisabled(true)

    } catch(error){
      console.error("Erro ao atualizar dados: ", error)
    }
  }

  async function handleLogout(){
    await signOut(auth)
    localStorage.removeItem('@uidCinestream')
    navigate("/")
  }

  async function handleDeleteAccount(){
    try{
      const user = auth.currentUser
      await user.delete()
      localStorage.removeItem('@uidCinestream')
      navigate("/")

    } catch(error){
      console.error("Erro ao deletar conta: ", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return(
    <>
      <Header/> 

      <div className="account">
        {!loading &&
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Nome</label>
              <input type="text" value={name} placeholder="Digite seu nome..." disabled={disabled} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
              <label>Data de nascimento</label>
              <input type="date" value={birthday} disabled={disabled} onChange={(e) => setBirthday(e.target.value)}/>
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={email} disabled/>
            </div>
            {disabled ? (
              <button type="button" onClick={handleEdit}>Editar</button> 
            ) : (
              <button type="button" onClick={updateData}>Salvar</button>
            )}
          </form>
        }

        <section>
          <button type="button" onClick={handleLogout}><IoIosLogOut/> Sair</button>
        </section>

        <section>
          <button type="button" onClick={handleDeleteAccount} style={{color: 'red'}}><MdDeleteOutline/> Deletar conta</button>
        </section>
      </div>

      <Footer/>
    </>
  )
}