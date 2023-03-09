import "./EventCalendar.css";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [
  {
    title:
      "Meeting This is some random data so i can see if the content wraps onto the next line",
    start: new Date(),
  },
  {
    title:
      "Meeting This is some random data so i can see if the content wraps onto the next line",
    start: new Date(),
  },
];

function EventCalendar() {
  return (
    <div style={{ overflowY: "visible" }}>
      <h1>Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        dayCellContent={renderDayCellContent}
        eventClassNames="calendar-event"
        viewClassNames="calendar-view"
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
          onClick={() => console.log("Event clicked")}
        >
          <div>
            <b
              style={{
                marginRight: "10px",
              }}
            >
              {eventInfo.timeText}
            </b>
            <i>{eventInfo.event.title}</i>
          </div>
        </button>
      </div>
    );
  }

  function renderDayCellContent(dayInfo) {
    return (
      <div>
        <button
          style={{
            width: "100%",
          }}
          onClick={() => console.log(`Button clicked on date: ${dayInfo.date}`)}
        >
          New
        </button>
        <div>{dayInfo.dayNumberText}</div>
      </div>
    );
  }
}

export default EventCalendar;
