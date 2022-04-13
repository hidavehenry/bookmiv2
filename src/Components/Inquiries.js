import { useState } from 'react'


export default function Inquiries({ inquery }) {
  const [expand, setExpand] = useState(false)

  const handleClick = () => {
    setExpand(!expand)
  }

  return (
    <div className="inqueryCard">
      <h3>{inquery.name}</h3>
      <p><span>Date:</span> {inquery.date}</p>
      <p><span>Details:</span> {inquery.details}</p>
      <p onClick={handleClick}>View More...</p>
      {expand && (
        <>
          <p><span>Location:</span> {inquery.venue}, {inquery.address}</p>
          <p><span>Set Length: </span>{inquery.length}</p>
          <h2><span>Contact:</span></h2>
          <p>{inquery.contactName}</p>
          <p>{inquery.contactEmail}</p>
          <button className="btn">Accept</button>
          <button className="btn-decline">Decline</button>
        </>
      )
      }
    </div>
  )
}
