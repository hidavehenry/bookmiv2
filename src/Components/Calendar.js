import { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {useCalendar} from '../hooks/useCalendar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Calendar = () => {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleOpen = (e) => {
    console.log(e.event.start.date)
    setTitle(e.event.title)
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const { initClient, events } = useCalendar()

  return (
    <div className="cal">
      <div className="cal-btn">
        <button onClick={initClient} className="btn">Connect Google Calendar</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
            </Typography>
          </Box>
        </Modal>
    </div>
  );
};

export default Calendar;