import { useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from '.././hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'


export const useLogin = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const navigate = useNavigate()

  const login = (email, password) => {
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user})
        navigate('/dashboard')
      })
      .catch((err) => {
        setError(err.message)
      })
  }


  return { error, login }
  
}
