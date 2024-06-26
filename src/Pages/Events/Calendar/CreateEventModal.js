import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";
import { v4 as uuidv4 } from "uuid";

function CreateEventModal({ bandId, ...props }) {
  const [eventName, setEventName] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  function createEvent(event) {
    event.preventDefault();

    // Extracting date components
    var dateComponents = date.split("-");
    var year = parseInt(dateComponents[0]);
    var month = parseInt(dateComponents[1]) - 1; // Zero-based month
    var day = parseInt(dateComponents[2]);

    // Extracting time components
    var timeComponents = time.split(":");
    var hour = parseInt(timeComponents[0]);
    var minute = parseInt(timeComponents[1]);

    const newEvent = {
      title: eventName,
      amount: amount,
      address: address,
      start: new Date(year, month, day, hour, minute).toString(),
      notes: notes,
      id: uuidv4(),
    };

    utilities.createNewEvent(bandId, newEvent);

    setEventName("");
    setAmount("");
    setAddress("");
    setDate("");
    setTime("");
    setNotes("");
  }

  return (
    <Modal {...props} size="lg" centered backdropClassName="custom-backdrop">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Create an Event</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off" onSubmit={createEvent}>
          <Form.Group className="create-event-form-field">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Name"
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              required
            />
          </Form.Group>
          <Form.Group className="create-event-form-field">
            <Form.Label>Amount (If Applicable)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </Form.Group>
          <Form.Group className="create-event-form-field">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: "100%",
              marginTop: "20px",
            }}
          >
            <Form.Group style={{ minWidth: "48%" }}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </Form.Group>
            <Form.Group style={{ minWidth: "48%" }}>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="create-event-form-field">
            <Form.Label style={{ marginTop: "20px" }}>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Notes"
              style={{ resize: "none" }}
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="primary"
              type="submit"
              style={{ minWidth: "250px" }}
            >
              Add New Event
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateEventModal;
