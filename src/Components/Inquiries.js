
export default function Inquiries({ inquery }) {

  return (
    <div className="inqueryCard">
      <p>{inquery.name}</p>
      <p>{inquery.date}</p>
      <p>{inquery.venue}</p>
      <p>{inquery.address}</p>
      <p>{inquery.length}</p>
      <p>{inquery.details}</p>
      <h2>Contact:</h2>
      <p>{inquery.contactName}</p>
      <p>{inquery.contactEmail}</p>
    </div>
  )
}
