import { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '.././firebase/config'
import '.././styles/InquiryForm.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function InquiryForm({ id }) {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
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
      startTime: startTime,
      endTime: endTime,
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
      <form className="inquiryForm" onSubmit={handleSubmit}>
        <TextField
            variant="outlined" 
            label="Event Name"
            margin="normal"
            fullWidth
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />

        <TextField
            id="date"
            label="Event Date"
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
            defaultValue="2017-05-24"
            sx={{ width: 320 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

        <label>
          <span>Event date:</span>
          <input 
            required
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
            value={eventDate}
          />
        </label>

        <TextField
            variant="outlined" 
            label="Venue Name"
            margin="normal"
            fullWidth
            onChange={(e) => setVenueName(e.target.value)}
            value={venueName}
          />
        <TextField
            variant="outlined" 
            label="Venue Address"
            margin="normal"
            fullWidth
            onChange={(e) => setVenueAddress(e.target.value)}
            value={venueAddress}
          />
          {/* Start time end time */}
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
        <button className="btn">Submit</button>
      </form>
    </div>
  )
}
