import "./AddBandModal.css";
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import * as utilities from "../../Utilities/FireStoreUtilities";

function AddBandModal(props) {
  const [bandName, setBandName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [joinBandResponse, setJoinBandResponse] = useState();

  function createBand(event) {
    event.preventDefault();

    const auth = getAuth();

    utilities.createBand(auth.currentUser.uid, bandName).then((bandId) => {
      const newevent = {
        target: {
          value: bandId,
        },
      };
      props.handleBandChange(newevent);
    });

    setBandName("");
    setJoinCode("");
    setJoinBandResponse();
    props.onHide();
  }

  function joinBand(event) {
    event.preventDefault();
    utilities.sendJoinRequest(joinCode).then((response) => {
      setJoinBandResponse(response);
    });
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      centered
      backdropClassName="custom-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create/Join a Band
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createBand} id="newTaskForm">
          <Form.Group className="mb-3">
            <Form.Label>Band Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter band name"
              onChange={(e) => {
                setBandName(e.target.value);
              }}
              value={bandName}
              required
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: "250px" }}
            >
              Create Band
            </Button>
          </div>
        </Form>
        <h4
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          OR
        </h4>
        <Form onSubmit={joinBand} id="newTaskForm">
          <Form.Group className="mb-3">
            <Form.Label>Invite Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter invite codes"
              onChange={(e) => {
                setJoinCode(e.target.value);
              }}
              value={joinCode}
              required
            />
          </Form.Group>
          {joinBandResponse && (
            <p className="join-band-response" style={joinBandResponse.style}>
              {joinBandResponse.text}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: "250px" }}
            >
              Join Band
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBandModal;
