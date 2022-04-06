import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useGoogleSignin } from '../hooks/useGoogleSignin'
import { useNavigate } from 'react-router-dom'

//design imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, login } = useLogin()
  const { googleSignin } = useGoogleSignin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser)
  // })

  return (
    <div className="wrapper">
      <h2>Login</h2>
      <Box
        component="form"
        sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          onChange={(event) => {setEmail(event.target.value)}} 
        />
        <TextField 
          id="outlined-basic" 
          label="Password" 
          type="password"
          variant="outlined" 
          onChange={(event) => {setPassword(event.target.value)}} 
        />
        <button className="btn">Log In</button> 
      </Box>
      <button className="btn" onClick={googleSignin}>Sign in with Google</button>
    </div>
  )
}