import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useAuthContext } from '.././hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return { logout }
}
