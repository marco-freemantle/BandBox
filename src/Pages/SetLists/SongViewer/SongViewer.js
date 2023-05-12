import "./SongViewer.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";

function SongViewer(props) {
  const [editedSong, setEditedSong] = useState(null);

  const [changesButtonDisabled, setChangesButtonDisabled] = useState(true);

  useEffect(() => {
    setChangesButtonDisabled(true);
    setEditedSong(null);
  }, [props.song]);

  function changeDetails(event) {
    event.preventDefault();

    const updatedSong = {
      artistName: editedSong.artistName,
      songName: editedSong.songName,
      notes: editedSong.notes,
      id: props.song.id,
    };

    utilities.updateSong(props.bandId, updatedSong, props.setList);

    setChangesButtonDisabled(true);
    setEditedSong(null);
    props.selectSong(updatedSong);
  }

  if (!props.song) return null;

  return (
    <Form onSubmit={changeDetails} id="song-viewer">
      <Form.Group className="mb-3">
        <Form.Label>Song Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setEditedSong((prevSong) => ({
              ...prevSong,
              songName: e.target.value,
            }));
            setChangesButtonDisabled(false);
          }}
          value={editedSong?.songName ?? props.song.songName}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Artist Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setEditedSong((prevSong) => ({
              ...prevSong,
              artistName: e.target.value,
            }));
            setChangesButtonDisabled(false);
          }}
          value={editedSong?.artistName ?? props.song.artistName}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter notes"
          onChange={(e) => {
            setEditedSong((prevSong) => ({
              ...prevSong,
              notes: e.target.value,
            }));
            setChangesButtonDisabled(false);
          }}
          value={editedSong?.notes ?? props.song.notes}
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
