import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from '.././hooks/useAuthContext'
// import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  // const navigate = useNavigate()

  const signup = (email, password) => {
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({type: 'LOGIN', payload: res.user })
        // navigate('/profile')
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { error, signup }
}
