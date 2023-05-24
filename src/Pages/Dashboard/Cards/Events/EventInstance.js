import "./EventInstance.css";

function EventInstance(props) {
  const formattedDate = new Date(props.date).toLocaleDateString("en-GB");
  return (
    <div className="event-instance">
      <p style={{ margin: "0px", fontWeight: "600" }}>{props.title}</p>
      <p
        style={{ margin: "0px", fontSize: "15px", color: "rgb(107, 110, 110)" }}
      >
        {formattedDate}
        {props.amount.length !== 0 && <span> - £{props.amount}</span>}
      </p>
    </div>
  );
}

export default EventInstance;
