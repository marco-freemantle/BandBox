import "./MembersMobile.css";
import Table from "react-bootstrap/Table";
import { uuidv4 } from "@firebase/util";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useState } from "react";
import ManageMemberModal from "./ManageMemberModal";
import JoinRequestModal from "../JoinRequestModal/JoinRequestModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Image from "react-bootstrap/Image";
import questionMark from "../../../Images/questionMark.png";

function MembersMobile(props) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [selectedJoinRequest, setSelectedJoinRequest] = useState();

  const handleManageClick = (member) => {
    setSelectedMember(member);
    setModalShow(true);
  };

  return (
    <div className="members-area">
      <div className="join-request-dropdown">
        <h2 className="members-title">Members</h2>
        <div className="invite-code-mobile">
          <div style={{ display: "flex" }}>
            <p style={{ margin: "0px" }}>Invite Code</p>
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip id="tooltip">
                  Send this code to your band members. They can use it to join
                  this workspace.
                </Tooltip>
              }
            >
              <Image
                roundedCircle
                src={questionMark}
                fluid
                style={{
                  maxHeight: "17px",
                  maxWidth: "17px",
                  marginTop: "4px",
                  marginLeft: "3px",
                }}
              />
            </OverlayTrigger>
          </div>
          <Form.Control type="text" value={props.band.inviteCode} readOnly />
        </div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">Join Requests</Dropdown.Toggle>

          <Dropdown.Menu>
            {props.band.joinRequests.map((user) => {
              return (
                <div
                  key={uuidv4()}
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                >
                  <Button
                    className="join-request-button"
                    onClick={() => {
                      setSelectedJoinRequest(user);
                      setModalShow(true);
                    }}
                  >
                    {user.fullName}
                    <div className="notification-circle" />
                  </Button>
                </div>
              );
            })}
          </Dropdown.Menu>
          <JoinRequestModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            member={selectedJoinRequest}
          />
        </Dropdown>
      </div>
      <Table style={{ minHeight: "20%", borderBottom: "transparent" }}>
        <thead>
          <tr>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {props.band.members.map((member) => {
            return (
              <tr key={uuidv4()} style={{ display: "flex" }}>
                <td style={{ width: "80%" }}>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={member.fullName}
                    onChange={() => {}}
                  />
                </td>
                <td>
                  <Button onClick={() => handleManageClick(member)}>
                    Manage
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {selectedMember && (
        <ManageMemberModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          member={selectedMember}
        />
      )}
    </div>
  );
}

export default MembersMobile;
