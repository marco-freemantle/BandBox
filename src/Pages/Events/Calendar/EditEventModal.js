import "./EditEventModal.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useEffect } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";

function EditEventModal({ bandId, event, ...props }) {
  const [eventName, setEventName] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!event) return;
    let date = event.start;

    //Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    //Format date as 'yyyy-MM-dd'
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    //Extract time components
    const hours = date.getHours();
    const minutes = date.getMinutes();

    //Format time as 'hh:mm'
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    setEventName(event.title);
    setAmount(event.amount);
    setAddress(event.address);
    setNotes(event.notes);
    setDate(formattedDate);
    setTime(formattedTime);

    // eslint-disable-next-line
  }, [event]);

  function deleteEvent() {
    utilities.deleteEvent(bandId, event.id);
    props.onHide(true);
  }

  function saveChanges() {
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
      id: event.id,
    };

    utilities.saveEventChanges(bandId, newEvent);
  }

  return (
    <Modal {...props} size="lg" centered backdropClassName="custom-backdrop">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Edit Event</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off">
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

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="danger"
              onClick={deleteEvent}
              className="edit-event-modal-button"
            >
              Delete Event
            </Button>
            <Button
              variant="success"
              onClick={saveChanges}
              className="edit-event-modal-button"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditEventModal;
