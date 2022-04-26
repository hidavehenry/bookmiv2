import { useCalendar } from '.././hooks/useCalendar'

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/config'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

export default function Inquiries({ inquery }) {

  const { addEvent } = useCalendar()


  const acceptInvite = async (e) => {
    e.preventDefault()
    
    const inquiryRef = doc(db, 'inquiries', inquery.id);

    await updateDoc(inquiryRef, {
      status: 'accepted',
    })
  }

  const declineInvite = async (e) => {
    e.preventDefault()
    
    const inquiryRef = doc(db, 'inquiries', inquery.id);

    await updateDoc(inquiryRef, {
      status: 'declined',
    })
  }

  const handleAdd = (e) => {
    addEvent(inquery)
  }

  return (
    <div className="inquiry-container">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><span>{inquery.name}</span> - {inquery.status}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p><span>Location:</span> {inquery.venue}, {inquery.address}</p>
          <p><span>Set Length: </span>{inquery.length}</p>
          <p><span>Additional Details: </span>{inquery.details}</p>
          <p><span>Contact: </span>{inquery.contactName}, {inquery.contactEmail}</p>
          <div className="btn-container">
            <button className="btn" onClick={acceptInvite}>Accept</button>
            <button className="btn-decline" onClick={declineInvite}>Decline</button>
          </div>
          <button onClick={handleAdd} className="btn">Add Event to Google Calendar</button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
