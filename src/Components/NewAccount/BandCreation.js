import "./BandCreation.css";
import NavigationBar from "../NavigationBar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import * as utilities from "../../Utilities/FireStoreUtilities";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";

function BandCreation(props) {
  const [bandName, setBandName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  function createBand(event) {
    event.preventDefault();
    utilities.createBand(getAuth().currentUser.uid, bandName);
  }

  return (
    <div style={{ display: "flex", backgroundColor: "#f3f3f5" }}>
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="band-creation-container">
        <div className="band-creation-card">
          <Form className="band-creation-form" onSubmit={createBand}>
            <h3>Create a New Band!</h3>
            <br />
            <Form.Group controlId="bandname">
              <Form.Control
                className="bandname-field"
                type="text"
                placeholder="Enter Band Name"
                required={true}
                onChange={(e) => setBandName(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="bandname-button">
              Create Band
            </Button>
          </Form>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <h3>OR</h3>
          </div>

          <Form className="band-creation-form">
            <h3>Join an Existing Band!</h3>
            <br />
            <Form.Group controlId="bandname">
              <Form.Control
                className="bandname-field"
                type="text"
                placeholder="Enter invite code"
                onChange={(e) => setJoinCode(e.target.value)}
              />
              <Form.Text className="text-muted" style={{ marginLeft: "10px" }}>
                Enter your unique invite code
              </Form.Text>
            </Form.Group>

            <Button type="submit" variant="primary" className="bandname-button">
              Join Band
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default BandCreation;
