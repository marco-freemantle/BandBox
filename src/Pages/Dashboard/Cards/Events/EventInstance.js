import "./EventInstance.css";

function EventInstance(props) {
  return (
    <div className="event-instance">
      <p style={{ margin: "0px", fontWeight: "600" }}>{props.title}</p>
      <p
        style={{ margin: "0px", fontSize: "15px", color: "rgb(107, 110, 110)" }}
      >
        {props.date} - {props.amount}
      </p>
    </div>
  );
}

export default EventInstance;
