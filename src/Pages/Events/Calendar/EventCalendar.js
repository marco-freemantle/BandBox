import "./EventCalendar.css";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";

function EventCalendar(props) {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  let tempEvents = [];

  //When band data has loaded, populate events array
  useEffect(() => {
    if (props.band) {
      props.band.events.forEach((event) => {
        event["start"] = new Date(event.start);
        tempEvents.push(event);
      });

      setEvents(tempEvents);
    }
    // eslint-disable-next-line
  }, [props.band]);

  //When an event has been selected
  useEffect(() => {
    //Get data of selected event
    setSelectedEvent(events.find((event) => event["id"] === selectedEventId));

    // eslint-disable-next-line
  }, [selectedEventId]);

  return (
    <div style={{ overflowY: "visible" }}>
      <h1>Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventClassNames="calendar-event"
        viewClassNames="calendar-view"
        customButtons={{
          customButton: {
            text: "Add New Event",
            click: function () {
              setModalShow(true);
            },
          },
        }}
        headerToolbar={{
          start: "title",
          end: "customButton prev,next today",
        }}
      />
      <CreateEventModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        bandId={props.bandId}
      />
      <EditEventModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        bandId={props.bandId}
        event={selectedEvent}
      />
    </div>
  );

  function renderEventContent(eventInfo) {
    return (
      <div>
        <button
          style={{
            border: "none",
            outline: "none",
            background: "none",
            boxShadow: "none",
          }}
          onClick={() => {
            setSelectedEventId(eventInfo.event._def.publicId);
            setEditModalShow(true);
          }}
        >
          <b
            style={{
              marginRight: "10px",
            }}
          >
            {eventInfo.timeText}m
          </b>
          <i>{eventInfo.event.title}</i>
        </button>
      </div>
    );
  }
}

export default EventCalendar;
