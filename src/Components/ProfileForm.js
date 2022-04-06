import { useState } from 'react'
import { useAuthContext } from '.././hooks/useAuthContext'

// firebase imports
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore' 

export default function ProfileForm() {
  const [stageName, setStageName] = useState('')
  const [location, setLocation] = useState('')
  const [instaLink, setInstaLink] = useState('')
  const [fbLink, setFbLink] = useState('')
  const [twitterLink, setTwitterLink] = useState('')
  const [bio, setBio] = useState('')
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ref = collection(db, 'profiles')

    await addDoc(ref, {
      name: stageName,
      location: location,
      facebookLink: fbLink,
      instaLink: instaLink,
      twitterLink: twitterLink,
      bio: bio,
      uid: user.uid
    })
    .then(() =>{
      // reset forms here
    })
  }

  return (
    <div className="formWrapper">
      <h2>Edit Profile</h2>
      <form className="profileForm" onSubmit={handleSubmit}>
      <label>
        <span>Performer Name:</span>
        <input 
          required
          type="text"
          onChange={(e) => setStageName(e.target.value)}
          value={stageName}
        />
      </label>
      <label>
        <span>Location:</span>
        <input 
          required
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
      </label>
      <label>
        <span>Facebook Link:</span>
        <input 
          required
          type="text"
          onChange={(e) => setFbLink(e.target.value)}
          value={fbLink}
        />
      </label>
      <label>
        <span>Instagram Link:</span>
        <input 
          required
          type="text"
          onChange={(e) => setInstaLink(e.target.value)}
          value={instaLink}
        />
      </label>
      <label>
        <span>Twitter Link:</span>
        <input 
          required
          type="text"
          onChange={(e) => setTwitterLink(e.target.value)}
          value={twitterLink}
        />
      </label>
      <label>
        <span>Bio:</span>
        <textarea 
          required
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
