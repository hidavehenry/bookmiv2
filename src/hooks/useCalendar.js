import { useEffect, useState } from "react";

export const useCalendar = () => {
  const [events, setEvents] = useState(null);




  let gapi = window.gapi
  let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  const CLIENT_ID =
  "867003229298-5enmsgdle65bsvsdp2sct09m3d40lnef.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBiZfERcnjMj90bBDBMwjwHiCA_UOLW0EU";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.gapi) handleClientLoad();
    });
  }, []);

  const openSignInPopup = () => {
    window.gapi.auth2.authorize(
      { client_id: CLIENT_ID, scope: SCOPES },
      (res) => {
        console.log(res);
        if (res) {
          console.log(window.gapi.client, res);

          if (res.access_token)
            localStorage.setItem("access_token", res.access_token);

          window.gapi.client.load("calendar", "v3", listUpcomingEvents);
        }
      }
    );
  };

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  const handleClientLoad = () => {
    window.gapi.load("client:auth2");
  };

  // initClient ** WAS BEST AUTH2", 

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */

  const initClient = () => {
    if (!localStorage.getItem("access_token")) {
      openSignInPopup();
    } else {
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => {
          if (res.status !== 401) {
            return res.json();
          } else {
            localStorage.removeItem("access_token");

            openSignInPopup();
          }
        })
        .then((data) => {
          if (data?.items) {
            setEvents(formatEvents(data.items));
          }
        });
    }
  };

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        // timeMin: new Date().toISOString(),
        showDeleted: true,
        singleEvents: true,
        // maxResults: 10,
        // orderBy: "startTime",
      })
      .then(function (response) {
        var events = response.result.items;

        console.log(events);

        if (events.length > 0) {
          setEvents(formatEvents(events));
        }
      });
      
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };


  const addEvent = (inquery) => {


    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance()
      .then(() => {

        let event = {
          'summary': inquery.name,
          'location': inquery.venue + ' ' + inquery.address,
          'description': inquery.details,
          'start': {
            'dateTime': '2022-04-27T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          },
          'end': {
            'dateTime': '2022-04-27T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': inquery.contactEmail},
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10},
            ],
          },
        };
        

        let request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          window.open(event.htmlLink)
        })

      })
    })
  }

  return { addEvent, initClient, events }
}
