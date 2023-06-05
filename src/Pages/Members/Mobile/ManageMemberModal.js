import "./ManageMemberModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ManageMemberModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Manage Member
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={() => {}}
              value={props.member.fullName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="permissions">
            <Form.Label>Permissions</Form.Label>
            <Form.Check
              type="checkbox"
              label={"Dashboard"}
              style={{ marginBottom: "5px" }}
            />
            <Form.Check
              type="checkbox"
              label={"Band Chat"}
              style={{ marginBottom: "5px" }}
            />
            <Form.Check
              type="checkbox"
              label={"Tasks"}
              style={{ marginBottom: "5px" }}
            />
            <Form.Check
              type="checkbox"
              label={"Events"}
              style={{ marginBottom: "5px" }}
            />
            <Form.Check
              type="checkbox"
              label={"Finances"}
              style={{ marginBottom: "5px" }}
            />
            <Form.Check
              type="checkbox"
              label={"Set Lists"}
              style={{ marginBottom: "5px" }}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button variant="danger" type="submit">
              Remove Member
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ManageMemberModal;
