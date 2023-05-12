import "./AddSongModal.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";
import { v4 as uuidv4 } from "uuid";

function AddSongModal({ setList, bandId, ...props }) {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [notes, setNotes] = useState("");

  function addNewSong(event) {
    event.preventDefault();

    const newSong = {
      artistName: artistName,
      songName: songName,
      notes: notes,
      id: uuidv4(),
    };

    utilities.addNewSong(bandId, newSong, setList);

    setSongName("");
    setArtistName("");
    setNotes("");
  }

  return (
    <Modal {...props} size="lg" centered backdropClassName="custom-backdrop">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addNewSong} id="newTaskForm">
          <Form.Group className="mb-3">
            <Form.Label>Song Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter song name"
              onChange={(e) => {
                setSongName(e.target.value);
              }}
              value={songName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter artist name"
              onChange={(e) => {
                setArtistName(e.target.value);
              }}
              value={artistName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Enter notes"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              value={notes}
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: "250px" }}
            >
              Add New Song
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddSongModal;
