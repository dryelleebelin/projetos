import React, { useEffect, useState } from "react"
import './account.scss'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../services/firebaseConnection'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { signOut } from 'firebase/auth'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ModalDeleteAccount from "../../components/ModalDeleteAccount"
import AvatarSelector from "../../components/AvatarSelector"

import { IoIosLogOut } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"

export default function Account(){
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalAvatar, setIsOpenModalAvatar] = useState(false)

  async function fetchAvatar(){
    try{
      const uid = JSON.parse(localStorage.getItem('@uidCinestream'))
      const docRef = doc(db, 'avatar', uid)
      const docSnap = await getDoc(docRef)
      setAvatar(docSnap.data().url)

    } catch(error){
      console.error("Erro ao buscar avatar: ", error)
    }
  }

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

  const handleOpenModalAvatar = () => {
    setIsOpenModalAvatar(true)
  }
  const handleCloseModalAvatar = () => {
    setIsOpenModalAvatar(false)
  }

  function handleChangeLanguage(){
    alert("teste")
  }

  async function handleLogout(){
    await signOut(auth)
    localStorage.removeItem('@uidCinestream')
    navigate("/")
  }

  const handleOpenModalDelete = () => {
    setIsOpenModalDelete(true)
  }
  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false)
  }

  useEffect(() => {
    document.title = "Minha conta - CineStream"

    fetchAvatar()
    fetchData()
  }, [])

  return(
    <>
      <Header/> 

      <div className="account">
        {!loading &&
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Avatar</label>
              <img src={avatar} alt="Avatar"/>
              <button type="button" onClick={handleOpenModalAvatar}>Editar avatar</button>
            </div>

            <span></span>

            <div>
              <label>Nome</label>
              <input type="text" value={name} placeholder="Digite seu nome..." disabled={disabled} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
              <label>Data de nascimento</label>
              <input type="date" value={birthday} disabled={disabled} onChange={(e) => setBirthday(e.target.value)}/>
            </div>
            {disabled ? (
              <button type="button" onClick={handleEdit}>Editar</button> 
            ) : (
              <button type="button" onClick={updateData}>Salvar</button>
            )}
          </form>
        }

        <form style={{paddingBottom: '0'}}>
          <div style={{marginTop: '1vh'}}>
            <label>Email</label>
            <input type="email" value={email} disabled/>
          </div>
        </form>

        <form onSubmit={(e) => e.preventDefault()}>
          <label style={{marginTop: '1vh'}}>Idioma</label>
          <select name="language" defaultValue="portuguese" disabled={disabled}>
            <option value="portuguese">Português</option>
            <option value="english">Inglês</option>
          </select>
          {disabled ? (
            <button type="button" onClick={handleEdit}>Trocar idioma</button> 
          ) : (
            <button type="button" onClick={handleChangeLanguage}>Salvar</button>
          )}
        </form>

        <section>
          <button type="button" onClick={handleLogout}><IoIosLogOut/> Sair</button>
        </section>

        <section>
          <button type="button" onClick={handleOpenModalDelete} style={{color: 'red'}}><MdDeleteOutline/> Deletar conta</button>
        </section>

        <AvatarSelector isOpen={isOpenModalAvatar} closeModal={handleCloseModalAvatar}/>
        <ModalDeleteAccount isOpen={isOpenModalDelete} closeModal={handleCloseModalDelete}/>
      </div>

      <Footer/>
    </>
  )
}