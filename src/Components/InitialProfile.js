import { useState } from 'react'
import { useAuthContext } from '.././hooks/useAuthContext'
import PhotoUpload from '.././Components/PhotoUpload'

// firebase imports
import { db } from '../firebase/config'
import { doc, setDoc } from 'firebase/firestore' 

export default function InitialProfile() {
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
    <PhotoUpload />
      <form className="profileForm" onSubmit={handleSubmit}>
      <label>
        <span>Performer Name:</span>
        <input 
          type="text"
          onChange={(e) => setStageName(e.target.value)}
          value={stageName}
        />
      </label>
      <label>
        <span>Location:</span>
        <input 
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
      </label>
      <label>
        <span>Type of performer:</span>
        <select
        onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Band">Band</option>
          <option value="DJ">DJ</option>
          <option value="Solo Musician">Solo Musician</option>
          <option value="Artist">Artist</option>
          <option value="Drag Performer">Drag Performer</option>
          <option value="Comedian">Comedian</option>
          <option value="Magician">Magician</option>
          <option value="Speaker">Speaker</option>
          <option value="Host">Host</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        <span>Facebook Link:</span>
        <input 
          type="text"
          onChange={(e) => setFbLink(e.target.value)}
          value={fbLink}
        />
      </label>
      <label>
        <span>Instagram Link:</span>
        <input 
          type="text"
          onChange={(e) => setInstaLink(e.target.value)}
          value={instaLink}
        />
      </label>
      <label>
        <span>Twitter Link:</span>
        <input 
          type="text"
          onChange={(e) => setTwitterLink(e.target.value)}
          value={twitterLink}
        />
      </label>
      <label>
        <span>Bio:</span>
        <textarea 
          type="text"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </label>
      <button>Add</button>
    </form>
    </div>
  )
}