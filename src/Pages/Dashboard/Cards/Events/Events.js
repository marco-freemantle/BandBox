import "./Events.css";
import EventInstance from "./EventInstance";

function Events() {
  return (
    <div style={{ padding: "2%" }}>
      <h2>Events</h2>
      <div className="events-overview">
        <EventInstance
          title={"Amy's wedding!"}
          date={"10/12/2023"}
          amount={"£1050.99"}
        />
        <EventInstance
          title={"Band rehearsal!"}
          date={"10/12/2023"}
          amount={"£0.00"}
        />
        <EventInstance
          title={"Go and buy a new guitar"}
          date={"10/12/2023"}
          amount={"£599.99"}
        />
        <EventInstance
          title={"Go and buy a new guitar!"}
          date={"10/12/2023"}
          amount={"£1050.99"}
        />
      </div>
    </div>
  );
}

export default Events;
