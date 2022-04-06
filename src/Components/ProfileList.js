import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'


export default function ProfileList({ profiles }) {

  const handleClick = async (id) => {
    const docRef = doc(db, 'profiles', id)
    await deleteDoc(docRef)
  }

  return (
    <div>
      <h2>Profile Preview</h2>
        {profiles.map(profile => (
          <div key={profile.id} onClick={() => handleClick(profile.id)}>
            <img className="avatar" src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=" />
            <p>{profile.name}</p> 
            <p>{profile.location}</p> 
            <p>{profile.facebookLink}, {profile.instaLink}, {profile.twitterLink}</p> 
            <p>{profile.bio}</p>
          </div>
        ))}
    </div>
  )
}
