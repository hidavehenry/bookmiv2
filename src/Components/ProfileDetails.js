import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InquiryForm from './InquiryForm'
import { useCollection } from '.././hooks/useCollection'

import { storage } from '.././firebase/config'
import { ref, getDownloadURL } from 'firebase/storage'

export default function ProfileDetails({ profile }) {
  const { id } = useParams()
  const { documents: profiles } = useCollection('profiles', ['uid', '==', id])

  const [inquiry, setInquiry] = useState(false)
  const [photoLink, setPhotoLink] = useState('https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=')

  const handleClick = () => {
    setInquiry(!inquiry)
  }

  async function getPhoto() {
    const imageRef = ref(storage, 'images/' + id + '.png');
    
    const photoURL = await getDownloadURL(imageRef);

    setPhotoLink(photoURL)
  }

  useEffect(() => {
    getPhoto()
  }, [])

  return (
    <div className="wrapper">
        {profiles && 
        <div>
          <img className="avatar" src={photoLink} alt="Profile image"/>
          {profiles.map(profile  => (
            <div key={profile.id}>
              <h1>{profile.name}</h1>
              <h2>{profile.category}</h2>
              <p>{profile.location}</p>
              <p>{profile.bio}</p>
              <ul className="socialLinks">
                <li><a href={profile.facebookLink} target="_blank"><i className="icon fa-brands fa-facebook"></i></a></li>
                <li><a href={profile.instaLink} target="_blank"><i className="icon fa-brands fa-instagram"></i></a></li>
                <li><a href={profile.twitterLink} target="_blank"><i className="icon fa-brands fa-twitter"></i></a></li>
              </ul>            
            </div>
          ))}
        </div>
        }
      <button className="btn" onClick={handleClick}>Make Inquiry</button>
      {inquiry && <InquiryForm id={id} />}
    </div>
  )
}
