import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import {useCalendar} from '../hooks/useCalendar';


const Calendar = () => {

  const { initClient, events } = useCalendar()

  return (
    <div className="cal">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
      <div className="cal-btn">
        <button onClick={initClient} className="btn">Connect Google Calendar</button>
      </div>
    </div>
  );
};

export default Calendar;