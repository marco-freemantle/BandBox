import "./MobileEvents.css";
import Form from "react-bootstrap/Form";
import MobileEventCard from "./MobileEventCard";

const eventData = [
  {
    eventName: "Wedding",
    amount: "£1500",
    address: "281 Lidgett Lane",
    date: "12/06/2023",
    time: "12pm",
    notes: "No notes here!",
  },
  {
    eventName: "Wedding",
    amount: "£1500",
    address: "281 Lidgett Lane",
    date: "12/06/2023",
    time: "12pm",
    notes: "No notes here!",
  },
];

function MobileEvents() {
  return (
    <div className="mobile-events-container">
      <h1>Events</h1>
      <div style={{ display: "flex" }}>
        <Form.Select size="sm">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </Form.Select>
        <Form.Select size="sm">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </Form.Select>
      </div>
      <hr />
      <div className="mobile-events-scrollbox">
        {eventData.map((event) => {
          return (
            <MobileEventCard
              eventName={event.eventName}
              amount={event.amount}
              address={event.address}
              date={event.date}
              time={event.time}
              notes={event.notes}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MobileEvents;
