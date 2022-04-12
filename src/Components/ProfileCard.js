import '../styles/ProfileCard.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { storage } from '.././firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'


export default function ProfileCard({ profile }) {
  const [photoLink, setPhotoLink] = useState('https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=')


  async function getPhoto() {
    const imageRef = ref(storage, 'images/' + profile.id + '.png');
    
    const photoURL = await getDownloadURL(imageRef);

    setPhotoLink(photoURL)
  }

  useEffect(() => {
    getPhoto()
  }, [])

  return (
    <div className="cardWrapper">
      <ul className="profileCards">
        <img className="avatar" src={photoLink} />
        <li>Name: {profile.name}</li>
        <li>Location: {profile.location}</li>

        <p><Link to={`/profiles/${profile.id}`}>View More</Link></p>
      </ul>
    </div>
  )
}