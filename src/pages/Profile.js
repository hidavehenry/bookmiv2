
import { useCollection } from '../hooks/useCollection'
import ProfileForm from '../Components/ProfileForm'
import ProfileList from '../Components/ProfileList'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Profile() {
  const { user } = useAuthContext()
  const { documents: profiles } = useCollection(
    'profiles',
    ['uid', '==', user.uid]
  )

  return (
    <div className="wrapper">
      <h1>Edit your profile</h1>
      <div>
        <ProfileForm />
      </div>
      <div>
        {profiles && <ProfileList profiles={profiles} />}
      </div>
    </div>
  )
}
