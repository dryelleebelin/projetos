import { createContext, useState, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

export default function AuthProvider({children}){
  const navigate = useNavigate()
  const [loadingAuth, setLoadingAuth] = useState(false)

  async function signIn(email, password){
    setLoadingAuth(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid
      storageUser(uid)
      setLoadingAuth(false)
      navigate('/catalog')

    } catch(error){
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password"){
        toast.error("E-mail ou senha incorretos")
      } else if (error.code === "auth/too-many-requests"){
        toast.error("Muitas tentativas. Tente novamente mais tarde")
      } else{
        toast.error("Erro ao fazer login")
      }
      console.error(error)
      setLoadingAuth(false)
    }
  }


  async function register(user, email, password){
    setLoadingAuth(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid
      await setDoc(doc(db, "users", uid), {
        name: user
      })
      storageUser(uid)
      setLoadingAuth(false)
      navigate('/catalog')

    } catch(error){
      if (error.code === "auth/weak-password"){
        toast.warn("Por favor, escolha uma senha mais forte")
      } else if (error.code === "auth/email-already-in-use"){
        toast.error("Desculpe, este e-mail já está em uso")
      } else{
        toast.error("Erro ao criar conta. Tente novamente mais tarde.")
      }
      console.error(error)
      setLoadingAuth(false)
    }
  }

  function storageUser(uid){
    localStorage.setItem('@uidCinestream', JSON.stringify(uid)) 
  }

  async function logout(){
    await signOut(auth)
    localStorage.removeItem('@uidCinestream')
    navigate("/")
  }

  return(
    <AuthContext.Provider value={{
      signIn,
      register,
      logout,
      loadingAuth,
      storageUser
    }}> 
      {children}
    </AuthContext.Provider>
  )
}