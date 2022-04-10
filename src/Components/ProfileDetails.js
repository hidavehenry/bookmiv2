import { useParams } from 'react-router-dom'
import { useState } from 'react'
import InquiryForm from './InquiryForm'
import { useCollection } from '.././hooks/useCollection'


export default function ProfileDetails({ profile, name }) {
  const { id } = useParams()
  const { documents: profiles } = useCollection('profiles', ['uid', '==', id])
  const [inquiry, setInquiry] = useState(false)

  const handleClick = () => {
    setInquiry(!inquiry)
  }


  return (
    <div className="wrapper">
        {profiles && 
        <div>
          {profiles.map(profile  => (
            <div key={profile.id}>
              <h1>{profile.name}</h1>
              <p>{profile.location}</p>

              <h2>Social Media Links:</h2>
              <p>{profile.facebookLink}</p>
              <p>{profile.instaLink}</p>
              <p>{profile.twitterLink}</p>

              <h2>Bio</h2>
              <p>{profile.bio}</p>
            
            </div>
          ))}
        </div>
        }
      <button className="btn" onClick={handleClick}>Make Inquiry</button>
      {inquiry && <InquiryForm id={id} />}
    </div>
  )
}
