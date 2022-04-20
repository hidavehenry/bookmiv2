import { useState } from 'react'
import { useAuthContext } from '.././hooks/useAuthContext'
import PhotoUpload from '.././Components/PhotoUpload'

// firebase imports
import { db } from '../firebase/config'
import { doc, setDoc } from 'firebase/firestore' 

//design imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem, Select, InputLabel } from '@mui/material'

export default function ProfileForm() {
  const [stageName, setStageName] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [instaLink, setInstaLink] = useState('')
  const [fbLink, setFbLink] = useState('')
  const [twitterLink, setTwitterLink] = useState('')
  const [bio, setBio] = useState('')
  const { user } = useAuthContext()

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const profileRef = doc(db, 'profiles', user.uid);

    await setDoc(profileRef, {
      name: stageName,
      location: location,
      category: category,
      facebookLink: 'http://' + fbLink,
      instaLink: 'http://' + instaLink,
      twitterLink: 'http://' + twitterLink,
      bio: bio,
      uid: user.uid
    })
    .then(() =>{
      // reset()
    })
  }

  
  return (
    <div className="formWrapper">
      <form className="profileForm" onSubmit={handleSubmit}>
        <TextField
          variant="outlined" 
          label="Performer Name"
          margin="normal"
          fullWidth
          onChange={(e) => setStageName(e.target.value)}
          value={stageName}
        />
        <TextField 
          variant="outlined" 
          label="Location"
          margin="normal"
          fullWidth
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
          <InputLabel id="demo-simple-select-label">Type of performer</InputLabel>
        <Select
        value="Type of performer"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Band">Band</MenuItem>
          <MenuItem value="DJ">DJ</MenuItem>
          <MenuItem value="Solo Musician">Solo Musician</MenuItem>
          <MenuItem value="Artist">Artist</MenuItem>
          <MenuItem value="Drag Performer">Drag Performer</MenuItem>
          <MenuItem value="Comedian">Comedian</MenuItem>
          <MenuItem value="Magician">Magician</MenuItem>
          <MenuItem value="Speaker">Speaker</MenuItem>
          <MenuItem value="Host">Host</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <TextField
          variant="outlined" 
          label="Facebook Link" 
          margin="normal"
          fullWidth
          onChange={(e) => setFbLink(e.target.value)}
          value={fbLink}
        />
        <TextField
          variant="outlined" 
          label="Instagram Link" 
          margin="normal"
          fullWidth
          onChange={(e) => setInstaLink(e.target.value)}
          value={instaLink}
        />
        <TextField
          variant="outlined" 
          label="Twitter Link" 
          margin="normal"
          fullWidth
          onChange={(e) => setTwitterLink(e.target.value)}
          value={twitterLink}
        />

        <TextField
          variant="outlined" 
          label="Bio" 
          multiline
          maxRows={4}
          defaultValue="Default Value"
          margin="normal"
          fullWidth
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />

      <button className="btn">Add</button>
    </form>
    <PhotoUpload /> 
    </div>
  )
}
