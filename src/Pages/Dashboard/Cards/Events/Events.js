import "./Events.css";
import EventInstance from "./EventInstance";
import { v4 as uuidv4 } from "uuid";

function Events(props) {
  if (!props.band) return;

  //Filter events that occur after the current date
  const filteredEvents = props.band.events.filter((event) => {
    const eventDate = new Date(event.start);
    return eventDate > new Date();
  });

  return (
    <div style={{ padding: "2%" }}>
      <h2>Events</h2>
      <div className="events-overview">
        {filteredEvents.map((event) => {
          return (
            <EventInstance
              key={uuidv4()}
              title={event.title}
              date={event.start}
              amount={event.amount}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Events;
