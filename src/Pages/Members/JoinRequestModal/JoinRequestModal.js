import "./JoinRequestModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";

function JoinRequestModal(props) {
  const [role, setRole] = useState("");
  const [instrument, setInstrument] = useState("");
  const [permissions, setPermissions] = useState({
    dashboard: false,
    bandChat: false,
    tasks: false,
    events: false,
    finances: false,
    setLists: false,
    members: false,
  });

  if (!props.member) return;

  function rejectRequest() {
    utilities.rejectJoinRequest(props.member, props.band.inviteCode);

    setRole("");
    setInstrument("");
    setPermissions({
      dashboard: false,
      bandChat: false,
      tasks: false,
      events: false,
      finances: false,
      setLists: false,
      members: false,
    });

    props.onHide();
  }

  function acceptRequest() {
    const userObject = {
      fullName: props.member.fullName,
      userId: props.member.userId,
      role: role,
      instrument: instrument,
      permissions: permissions,
    };

    utilities.acceptJoinRequest(userObject, props.band);
    props.onHide();
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Join Request
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
              onChange={(e) => {
                setPermissions({
                  ...permissions,
                  dashboard: e.target.checked,
                });
              }}
            />
            <Form.Check
              type="checkbox"
              label={"Band Chat"}
              style={{ marginBottom: "5px" }}
              onChange={(e) => {
                setPermissions({
                  ...permissions,
                  bandChat: e.target.checked,
                });
              }}
            />
            <Form.Check
              type="checkbox"
              label={"Tasks"}
              style={{ marginBottom: "5px" }}
              onChange={(e) => {
                setPermissions({
                  ...permissions,
                  tasks: e.target.checked,
                });
              }}
            />
            <Form.Check
              type="checkbox"
              label={"Events"}
              style={{ marginBottom: "5px" }}
              onChange={(e) => {
                setPermissions({
                  ...permissions,
                  events: e.target.checked,
                });
              }}
            />
            <Form.Check
              type="checkbox"
              label={"Finances"}
              style={{ marginBottom: "5px" }}
              onChange={(e) => {
                setPermissions({
                  ...permissions,
                  finances: e.target.checked,
                });
              }}
            />
            <Form.Check
              type="checkbox"
              label={"Set Lists"}
              style={{ marginBottom: "5px" }}
              onChange={(e) => {
                setPermissions({
                  ...permissions,
                  setLists: e.target.checked,
                });
              }}
            />
            <Form.Check
              type="checkbox"
              label={"Members"}
              style={{ marginBottom: "5px" }}
              onChange={(e) => {
                setPermissions({
                  ...permissions,
                  members: e.target.checked,
                });
              }}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button variant="danger" onClick={rejectRequest}>
              Reject Join Request
            </Button>
            <Button variant="success" onClick={acceptRequest}>
              Accept Join Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default JoinRequestModal;
