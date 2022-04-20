import { useState } from 'react'
// import { useAccept } from '../hooks/useAccept'

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/config'

export default function Inquiries({ inquery }) {
  const [expand, setExpand] = useState(false)


  const handleClick = () => {
    setExpand(!expand)
  }

  const acceptInvite = async (e) => {
    e.preventDefault()
    
    const inquiryRef = doc(db, 'inquiries', inquery.id);

    await updateDoc(inquiryRef, {
      status: 'accepted',
    })
    .then(() =>{
      // reset()
    })
  }

  const declineInvite = async (e) => {
    e.preventDefault()
    
    const inquiryRef = doc(db, 'inquiries', inquery.id);

    await updateDoc(inquiryRef, {
      status: 'declined',
    })
    .then(() =>{
      console.log(inquery.status)
    })
  }

  return (
    <div className="inqueryCard">
      <p>{inquery.status}</p>
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
          <button className="btn" onClick={acceptInvite}>Accept</button>
          <button className="btn-decline" onClick={declineInvite}>Decline</button>
        </>
      )
      }
    </div>
  )
}
