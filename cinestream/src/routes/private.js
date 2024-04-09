import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Private({children}){
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('@uidCinestream')
    
    if (!token){
      setRedirect(true)
    }
  }, [])

  if(redirect) {
    return <Navigate to="/" replace />
  }

  return children
}