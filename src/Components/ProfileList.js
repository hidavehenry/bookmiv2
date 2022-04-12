
export default function ProfileList({ profiles }) {

  return (
    <div>
      <h2>Profile Preview</h2>
        {profiles.map(profile => (
          <div key={profile.id}>
            <p>{profile.name}</p> 
            <p>{profile.location}</p> 
            <p>{profile.facebookLink}, {profile.instaLink}, {profile.twitterLink}</p> 
            <p>{profile.bio}</p>
          </div>
        ))}
    </div>
  )
}
