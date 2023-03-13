import "./SongViewer.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function SongViewer(props) {
  const [songName, setSongName] = useState(props.songName);
  const [artistName, setArtistName] = useState(props.artistName);
  const [notes, setNotes] = useState(props.notes);

  const [changesButtonDisabled, setChangesButtonDisabled] = useState(true);

  function changeDetails(event) {
    event.preventDefault();

    setChangesButtonDisabled(true);
  }

  return (
    <Form onSubmit={changeDetails} id="song-viewer">
      <Form.Group className="mb-3">
        <Form.Label>Song Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setSongName(e.target.value);
            setChangesButtonDisabled(false);
          }}
          value={songName}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Artist Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setArtistName(e.target.value);
            setChangesButtonDisabled(false);
          }}
          value={artistName}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter notes"
          onChange={(e) => {
            setNotes(e.target.value);
            setChangesButtonDisabled(false);
          }}
          value={notes}
          className="song-notes-textarea"
        />
      </Form.Group>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Button
          variant="primary"
          type="submit"
          style={{ minWidth: "250px" }}
          disabled={changesButtonDisabled}
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
}

export default SongViewer;
