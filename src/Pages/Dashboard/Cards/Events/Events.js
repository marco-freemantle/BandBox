import "./Events.css";
import EventInstance from "./EventInstance";

function Events() {
  return (
    <div style={{ padding: "2%" }}>
      <h2>Events</h2>
      <div className="events-overview">
        <EventInstance
          title={"Go and buy a new guitar!"}
          date={"10/12/2023"}
          amount={"£1050.99"}
        />
        <EventInstance
          title={"Go and buy a new guitar!"}
          date={"10/12/2023"}
          amount={"£1050.99"}
        />
        <EventInstance
          title={
            "Go and buy a new guitar Go and buy a new guitarGo and buy a new guitar!"
          }
          date={"10/12/2023"}
          amount={"£1050.99"}
        />
        <EventInstance
          title={
            "Go and buy a new guitar Go and buy a new guitarGo and buy a new guitar!"
          }
          date={"10/12/2023"}
          amount={"£1050.99"}
        />
      </div>
    </div>
  );
}

export default Events;
