import "./SongCard.css";

function SongCard(props) {
  return (
    <button
      style={{
        border: "none",
        backgroundColor: "transparent",
        minWidth: "100%",
        padding: "0%",
        marginBottom: "18px",
      }}
      onClick={() => {
        console.log(props.title);
      }}
    >
      <div className="song-instance">
        <p style={{ margin: "0px", fontWeight: "600" }}>{props.title}</p>
        <p
          style={{
            margin: "0px",
            fontSize: "15px",
            color: "rgb(107, 110, 110)",
          }}
        >
          {props.artist}
        </p>
      </div>
    </button>
  );
}

export default SongCard;
