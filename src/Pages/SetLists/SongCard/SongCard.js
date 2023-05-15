import UseAnimations from "react-useanimations";
import "./SongCard.css";
import trash2 from "react-useanimations/lib/trash2";

function SongCard(props) {
  return (
    <button
      className="song-card-button"
      onClick={() => {
        props.selectSong(props.song);
      }}
    >
      <div className="song-instance">
        <div>
          <p
            style={{
              margin: "0px",
              fontWeight: "600",
              textAlign: "start",
            }}
          >
            {props.song.songName}
          </p>
          <p
            style={{
              margin: "0px",
              fontSize: "15px",
              color: "rgb(107, 110, 110)",
              textAlign: "start",
            }}
          >
            {props.song.artistName}
          </p>
        </div>

        <UseAnimations
          size={26}
          animation={trash2}
          onClick={() => {
            props.deleteSong(props.song);
          }}
          className="delete-icon-song"
        />
      </div>
    </button>
  );
}

export default SongCard;
