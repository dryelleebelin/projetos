import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Private({children}){
  const [signed, setSigned] = useState(null)
    
  useEffect(() => {
    async function loadUser(){
      const storageUser = localStorage.getItem('@uidCinestream')
      if(storageUser){
        setSigned(JSON.parse(storageUser))
      }
    }
    loadUser()
  }, [])

  if(!signed){
    return <Navigate to="/"/>
  }

  return children
}