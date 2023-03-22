import "./Members.css";
import NavigationBar from "../../Components/NavigationBar";
import Table from "react-bootstrap/Table";
import MemberInstance from "./MemberInstance";
import Image from "react-bootstrap/Image";
import questionMark from "../../Images/questionMark.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import BandCreation from "../../Components/NewAccount/BandCreation";
import { uuidv4 } from "@firebase/util";
import { useEffect, useState } from "react";
import MembersMobile from "./Mobile/MembersMobile";
import { Form, Button, Dropdown } from "react-bootstrap";
import JoinRequestModal from "./JoinRequestModal/JoinRequestModal";

function Members(props) {
  //Is user viewing on a device smaller than 750px width
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [selectedJoinRequest, setSelectedJoinRequest] = useState();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 750) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  //If the current user object.bands is not defined, return
  if (props.user.bands === undefined) return;
  //If current user has no bands, show band creation page
  if (props.user.bands.length === 0) {
    return (
      <BandCreation
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
    );
  }

  //If the current band object is undefined, return
  if (!props.band) return;

  //Only show for large devices
  if (!isDeviceSmall) {
    return (
      <div className="members-page">
        <NavigationBar
          user={props.user}
          selectedBand={props.bandId}
          setSelectedBand={props.setSelectedBand}
        />

        <div className="members-main-content">
          <div className="members-area">
            <div
              style={{
                display: "flex",
                height: "30px",
                marginBottom: "60px",
                justifyContent: "space-between",
              }}
            >
              <h2 className="members-title">Members</h2>
              <div style={{ marginTop: "-23px" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ margin: "0px" }}>Invite Code</p>
                  <OverlayTrigger
                    placement="left"
                    overlay={
                      <Tooltip id="tooltip">
                        Send this code to your band members. They can use it to
                        join this workspace.
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
                <Form.Control
                  type="text"
                  value={props.band.inviteCode}
                  readOnly
                />
              </div>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  Join Requests
                </Dropdown.Toggle>

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
                  band={props.band}
                />
              </Dropdown>
            </div>

            <Table style={{ minHeight: "20%", borderBottom: "transparent" }}>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Instrument</th>
                  <th>
                    Permissions
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip id="tooltip">
                          Set the permissions for each band member by selecting
                          what they can and can't view
                        </Tooltip>
                      }
                    >
                      <Image
                        roundedCircle
                        src={questionMark}
                        fluid
                        style={{
                          maxHeight: "20px",
                          maxWidth: "20px",
                          marginLeft: "5px",
                        }}
                      />
                    </OverlayTrigger>
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.band.members.map((member) => {
                  return <MemberInstance member={member} key={uuidv4()} />;
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
    //Only show for small devices
  } else {
    return (
      <div className="members-page">
        <NavigationBar />

        <div className="members-main-content">
          <MembersMobile band={props.band} />
        </div>
      </div>
    );
  }
}

export default Members;
