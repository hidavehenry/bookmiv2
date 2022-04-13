import { useCollection } from '../hooks/useCollection'
import ProfileCard from '../Components/ProfileCard'

export default function Browse() {
  const { documents: profiles } = useCollection('profiles')

  return (
    <div className="wrapper">
      <p>Browse through to find the perfect talent for your event, or sign up to start getting booked now!</p>
      <div className="cardArea">
        {profiles && 
        <div>
          {profiles.map(profile  => (
            <ProfileCard 
            key={profile.id}
            profile={profile}
            name={profile.name}
            category={profile.category}
            location={profile.location}
            className="cardWrapper"
            />
          ))}
        </div>
        }
      </div>
    </div>
  )
}
