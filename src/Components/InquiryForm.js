import { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '.././firebase/config'

export default function InquiryForm({ id }) {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [venueName, setVenueName] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
  const [performanceLength, setPerformanceLength] = useState('')
  const [moreDetails, setMoreDetails] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(id)

    await addDoc(collection(db, 'inquiries'), {
      name: eventName,
      date: eventDate,
      venue: venueName,
      address: venueAddress,
      length: performanceLength,
      details: moreDetails,
      contactName: contactName,
      contactEmail: contactEmail,
      uid: id
    })
    .then(alert('Inquiry sent!'));
  }


  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <h2>Make your booking request below</h2> 
        <label>
          <span>Event Name:</span>
          <input 
            required
            type="text"
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />
        </label>
        <label>
          <span>Event date:</span>
          <input 
            required
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
            value={eventDate}
          />
        </label>
        <label>
          <span>Venue Name:</span>
          <input 
            required
            type="text"
            onChange={(e) => setVenueName(e.target.value)}
            value={venueName}
          />
        </label>
        <label>
          <span>Venue Address:</span>
          <input 
            required
            type="text"
            onChange={(e) => setVenueAddress(e.target.value)}
            value={venueAddress}
          />
        </label>
        <label>
          <span>Length of Performance:</span>
          <input 
            required
            type="text"
            onChange={(e) => setPerformanceLength(e.target.value)}
            value={performanceLength}
          />
        </label>
        <label>
          <span>Your name:</span>
          <input 
            required
            type="text"
            onChange={(e) => setContactName(e.target.value)}
            value={contactName}
          />
        </label>
        <label>
          <span>Your email:</span>
          <input 
            required
            type="text"
            onChange={(e) => setContactEmail(e.target.value)}
            value={contactEmail}
          />
        </label>
        <label>
          <span>More details:</span>
          <p>Please include any other info such as expected audience, type of event (public/private, indoor/outdoor), etc.</p>
          <textarea
            required
            type="text"
            onChange={(e) => setMoreDetails(e.target.value)}
            value={moreDetails}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
