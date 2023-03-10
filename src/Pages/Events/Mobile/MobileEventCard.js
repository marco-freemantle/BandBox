import "./MobileEventCard.css";

function MobileEventCard(props) {
  return (
    <div className="mobile-event-card">
      <p style={{ marginBottom: "0px" }}>{props.eventName}</p>
      <p>
        {props.date} - {props.amount}
      </p>
    </div>
  );
}
export default MobileEventCard;
