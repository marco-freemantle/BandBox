import "./MobileEvents.css";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import CreateEventModal from "../Calendar/CreateEventModal";
import EditEventModal from "../Calendar/EditEventModal";

function MobileEvents(props) {
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
    <div style={{ overflowY: "visible" }} className="events-mobile-card">
      <h1 className="events-title">Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView="listMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventClassNames="calendar-event"
        viewClassNames="calendar-view-mobile"
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
          center: "",
          end: "customButton prev,next",
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
            borderRadius: "4px",
            color: "#333",
            background: "#2ecc71",
            transition: "background 0.3s",
            border: "none",
            padding: "2px 16px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            setSelectedEventId(eventInfo.event._def.publicId);
            setEditModalShow(true);
          }}
        >
          <div style={{ textAlign: "start", background: "#2ecc71" }}>
            {eventInfo.event.title}
          </div>
        </button>
      </div>
    );
  }
}

export default MobileEvents;
