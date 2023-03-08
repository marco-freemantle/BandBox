import "./ParticipantItem.css";

function ParticipantItem(props) {
  return (
    <div className="participant-item-container">
      <p>
        {props.name} - {props.instrument}
      </p>
    </div>
  );
}

export default ParticipantItem;
