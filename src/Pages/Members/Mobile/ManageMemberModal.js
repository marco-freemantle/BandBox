import "./ManageMemberModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import * as utilities from "../../../Utilities/FireStoreUtilities";

function ManageMemberModal(props) {
  const [saveNotEnabled, setSaveNotEnabled] = useState(true);
  const [permissions, setPermissions] = useState(props.member.permissions);

  let notEditableUser = false;

  const auth = getAuth();

  if (auth.currentUser.uid === props.member.userId) {
    // Current user is the member being checked
    notEditableUser = true;
  } else if (auth.currentUser.uid === props.band.ownerId) {
    // Current user is the owner of the band
    notEditableUser = false;
  } else {
    // Current user is neither the member being checked nor the owner of the band
    notEditableUser = true;
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
    setSaveNotEnabled(false);
  };

  function removeMember() {
    utilities.removeBandMember(props.band.inviteCode, props.member.userId);
    props.onHide();
  }

  function saveChanges() {
    setSaveNotEnabled(true);
    utilities.changeUserPermissions(
      props.band.inviteCode,
      props.member.userId,
      permissions
    );
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
              defaultChecked={props.member.permissions.dashboard}
              disabled={notEditableUser}
              onChange={handleCheckboxChange}
              name="dashboard"
            />
            <Form.Check
              type="checkbox"
              label={"Band Chat"}
              style={{ marginBottom: "5px" }}
              defaultChecked={props.member.permissions.bandChat}
              disabled={notEditableUser}
              onChange={handleCheckboxChange}
              name="bandChat"
            />
            <Form.Check
              type="checkbox"
              label={"Tasks"}
              style={{ marginBottom: "5px" }}
              defaultChecked={props.member.permissions.tasks}
              disabled={notEditableUser}
              onChange={handleCheckboxChange}
              name="tasks"
            />
            <Form.Check
              type="checkbox"
              label={"Events"}
              style={{ marginBottom: "5px" }}
              defaultChecked={props.member.permissions.events}
              disabled={notEditableUser}
              onChange={handleCheckboxChange}
              name="events"
            />
            <Form.Check
              type="checkbox"
              label={"Finances"}
              style={{ marginBottom: "5px" }}
              defaultChecked={props.member.permissions.finances}
              disabled={notEditableUser}
              onChange={handleCheckboxChange}
              name="finances"
            />
            <Form.Check
              type="checkbox"
              label={"Set Lists"}
              style={{ marginBottom: "5px" }}
              defaultChecked={props.member.permissions.setLists}
              disabled={notEditableUser}
              onChange={handleCheckboxChange}
              name="setLists"
            />
            <Form.Check
              type="checkbox"
              label={"Members"}
              style={{ marginBottom: "5px" }}
              defaultChecked={props.member.permissions.members}
              disabled={notEditableUser}
              onChange={handleCheckboxChange}
              name="members"
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {!notEditableUser && (
              <Button variant="danger" onClick={removeMember}>
                Remove Member
              </Button>
            )}
            {!notEditableUser && (
              <Button
                variant="success"
                disabled={saveNotEnabled}
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ManageMemberModal;
