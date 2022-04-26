import { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '.././firebase/config'
import '.././styles/InquiryForm.css'
import TextField from '@mui/material/TextField';

export default function InquiryForm({ id }) {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [venueName, setVenueName] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
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
      details: moreDetails,
      contactName: contactName,
      contactEmail: contactEmail,
      uid: id
    })
    .then(alert('Inquiry sent!'));
  }


  return (
    <div className="formWrapper">
      <form  onSubmit={handleSubmit}>
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
            fullWidth
            onChange={(e) => setEventDate(e.target.value)}
            defaultValue="null"
            sx={{ width: 320 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

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
          <span>Start Time:</span>
          <input 
            required
            type="time"
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
          />
        </label>
        <label>
          <span>End Time:</span>
          <input 
            required
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
          />
        </label>

        <TextField
            variant="outlined" 
            label="Your Name"
            margin="normal"
            fullWidth
            onChange={(e) => setContactName(e.target.value)}
            value={contactName}
          />

        <TextField
            variant="outlined" 
            label="Your Email"
            margin="normal"
            fullWidth
            onChange={(e) => setContactEmail(e.target.value)}
            value={contactEmail}
          />
          <TextField
          variant="outlined" 
          label="Additional Details" 
          multiline
          maxRows={4}
          margin="normal"
          fullWidth
          onChange={(e) => setMoreDetails(e.target.value)}
          value={moreDetails}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  )
}
