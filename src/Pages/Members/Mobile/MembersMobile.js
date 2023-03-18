import "./MembersMobile.css";
import Table from "react-bootstrap/Table";
import { uuidv4 } from "@firebase/util";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import ManageMemberModal from "./ManageMemberModal";

function MembersMobile(props) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleManageClick = (member) => {
    setSelectedMember(member);
    setModalShow(true);
  };

  return (
    <div className="members-area">
      <h2 className="members-title">Members</h2>
      <Table style={{ minHeight: "20%", borderBottom: "transparent" }}>
        <thead>
          <tr>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {props.members.map((member) => {
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
