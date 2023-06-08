import "./Settings.css";
import NavigationBar from "../../Components/NavigationBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAuth,
  updateProfile,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";

function Settings(props) {
  const auth = getAuth();

  //State for display name
  const [nameChangeDisabled, setNameChangeDisabled] = useState(true);
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName);

  //State for new password
  const [passChangeDisabled, setPassChangeDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [passNoti, setPassNoti] = useState();

  //State for band delete
  const [selectedBand, setSelectedBand] = useState("");
  const [deleteNoti, setDeleteNoti] = useState("");

  function changeName() {
    setNameChangeDisabled(true);
    updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    utilities.changeUserName(props.user.userid, displayName);
  }

  function changePassword() {
    if (password.trim().length < 5) {
      setPassNoti(
        <p
          style={{
            marginBottom: "0px",
            marginTop: "20px",
            color: "red",
          }}
        >
          Password is too short
        </p>
      );
    } else {
      signInWithEmailAndPassword(auth, email, oldPass)
        .then(() => {
          updatePassword(auth.currentUser, password).then(() => {
            setPassChangeDisabled(true);
            setPassNoti(
              <p
                style={{
                  marginBottom: "0px",
                  marginTop: "20px",
                  color: "green",
                }}
              >
                Password changed successfully
              </p>
            );
          });
        })
        .catch((error) => {
          setPassNoti(
            <p
              style={{
                marginBottom: "0px",
                marginTop: "20px",
                color: "red",
              }}
            >
              {error.message}
            </p>
          );
        });
    }
  }

  function deleteBand() {
    console.log(selectedBand);

    //
  }

  return (
    <div style={{ display: "flex", backgroundColor: "#f3f3f5" }}>
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="settings-card">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          User Settings
        </h2>
        <div style={{ marginBottom: "30px" }}>
          <h4>Change Name</h4>
          <Form>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) => {
                  setNameChangeDisabled(false);
                  setDisplayName(e.target.value);
                }}
                defaultValue={auth.currentUser.displayName}
              />
            </Form.Group>
            <Button disabled={nameChangeDisabled} onClick={changeName}>
              Save Changes
            </Button>
          </Form>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <h4>Change Password</h4>
          <Form>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter old password"
                onChange={(e) => {
                  setOldPass(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new password"
                onChange={(e) => {
                  setPassChangeDisabled(false);
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button disabled={passChangeDisabled} onClick={changePassword}>
              Save Changes
            </Button>
            {passNoti && <>{passNoti}</>}
          </Form>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <h4>Delete Band</h4>
          <Form.Group className="mb-3" controlId="band">
            <Form.Label>Enter Band Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type band name you wish to delete"
              onChange={(e) => {
                setSelectedBand(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="danger" onClick={deleteBand}>
            Delete Band
          </Button>
          {deleteNoti && <>{deleteNoti}</>}
        </div>
        <div>
          <h4>Delete Account</h4>
        </div>
      </div>
    </div>
  );
}

export default Settings;
