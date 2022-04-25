import { useState } from 'react'

import { useCalendar } from '.././hooks/useCalendar'

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/config'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

export default function Inquiries({ inquery }) {
  const [expand, setExpand] = useState(false)

  const { addEvent } = useCalendar()


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

  const handleAdd = (e) => {
    addEvent(inquery)
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{inquery.name} - {inquery.status}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p><span>Location:</span> {inquery.venue}, {inquery.address}</p>
          <p><span>Set Length: </span>{inquery.length}</p>
          <p><span>Additional Details: </span>{inquery.details}</p>
          <p><span>Contact: </span>{inquery.contactName}, {inquery.contactEmail}</p>
          <button className="btn" onClick={acceptInvite}>Accept</button>
          <button className="btn-decline" onClick={declineInvite}>Decline</button>
          <button onClick={handleAdd} className="btn">Add Event to Google Calendar</button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
