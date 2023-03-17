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

const membersData = [
  { fullName: "Marco Freemantle", instrument: "Drums", role: "Leader" },
  { fullName: "Rob Freemantle", instrument: "Guitar", role: "Musician" },
];
function Members(props) {
  if (props.user.bandName === "") {
    return <BandCreation />;
  }
  return (
    <div className="members-page">
      <NavigationBar />

      <div className="members-main-content">
        <div className="members-area">
          <h2 style={{ marginBottom: "30px" }}>Members</h2>
          <Table style={{ minHeight: "20%", borderBottom: "transparent" }}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Instrument</th>
                <th>Role</th>
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
              {membersData.map((member) => {
                return <MemberInstance member={member} key={uuidv4()} />;
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Members;
