import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CreateEventModal(props) {
  return (
    <Modal {...props} size="lg" centered backdropClassName="custom-backdrop">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Create an Event</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off">
          <Form.Group className="create-event-form-field">
            <Form.Label>Event Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Event Name" required />
          </Form.Group>
          <Form.Group className="create-event-form-field">
            <Form.Label>Amount (If Applicable)</Form.Label>
            <Form.Control type="text" placeholder="Enter Amount" />
          </Form.Group>
          <Form.Group className="create-event-form-field">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" />
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
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group style={{ minWidth: "48%" }}>
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </div>

          <Form.Group className="create-event-form-field">
            <Form.Label style={{ marginTop: "20px" }}>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Notes"
              style={{ resize: "none" }}
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
