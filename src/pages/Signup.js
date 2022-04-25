import { useState } from 'react';
import { useSignup } from '../hooks/useSignup'
import { useGoogleSignup } from '../hooks/useGoogleSignup'

//design imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Signup () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signup } = useSignup()
  const { googleSignup } = useGoogleSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password)
  }

  return (
    <div className="wrapper">
        <h2>Signup</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
          noValidate
          autoComplete="off"
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
          <button className="btn">Sign up</button> 
        </Box>
        <button className="btn" onClick={googleSignup}>Sign up with Google</button>
    </div>
  )
}
