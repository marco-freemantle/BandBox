import "./EventCalendar.css";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CreateEventModal from "./CreateEventModal";

const events = [
  {
    title:
      "Meeting This is some random data so i can see if the content wraps onto the next line",
    start: new Date("03/11/2023"),
  },
  {
    title:
      "Meeting This is some random data so i can see if the content wraps onto the next line",
    start: new Date(),
  },
];

function EventCalendar() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div style={{ overflowY: "visible" }}>
      <h1>Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
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
      <CreateEventModal show={modalShow} onHide={() => setModalShow(false)} />
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
          onClick={() => console.log("Event clicked")}
        >
          <b
            style={{
              marginRight: "10px",
            }}
          >
            {eventInfo.timeText}
          </b>
          <i>{eventInfo.event.title}</i>
        </button>
      </div>
    );
  }
}

export default EventCalendar;
