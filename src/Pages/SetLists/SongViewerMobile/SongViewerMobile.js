import SongViewer from "../SongViewer/SongViewer";
import Form from "react-bootstrap/Form";

function SongViewerMobile(props) {
  return (
    <div className="setlist-song-section">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Select
          style={{
            fontSize: "19px",
            fontWeight: "bold",
            marginTop: "10px",
            maxWidth: "49%",
          }}
        >
          <option value="set-list-1">Set List 1</option>
          <option value="set-list-2">Set List 2</option>
          <option value="set-list-2">Set List 3</option>
        </Form.Select>
        <Form.Select
          style={{
            fontSize: "19px",
            fontWeight: "bold",
            marginTop: "10px",
            maxWidth: "49%",
          }}
        >
          <option value="set-list-1">Valerie</option>
          <option value="set-list-2">I'm Still Standing</option>
        </Form.Select>
      </div>

      <SongViewer
        song={props.song}
        bandId={props.bandId}
        setList={props.setList}
        selectSong={(song) => props.selectSong(song)}
      />
    </div>
  );
}

export default SongViewerMobile;
