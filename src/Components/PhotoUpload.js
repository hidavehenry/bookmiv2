import { useEffect, useState } from 'react'
import { useAuthContext } from '.././hooks/useAuthContext'
import { upload } from '.././firebase/config'


export default function PhotoUpload() {
  const [photoURL, setPhotoURL] = useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=" )
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuthContext()

  const handleSubmit = () => {
    upload(photo, user, setLoading)
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL)
    }
  }, [user])

  
  return (
    <div>
      <input required type='file' onChange={handleFileChange} />
      <button disabled={loading || !photo} onClick={handleSubmit}>Upload</button>
      <img src={photoURL} alt="avatar" className="avatar" />
    </div>
  )
}
