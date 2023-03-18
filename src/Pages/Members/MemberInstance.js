import { Form, Dropdown, Button } from "react-bootstrap";

function MemberInstance(props) {
  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          placeholder="Full Name"
          value={props.member.fullName}
          onChange={() => {}}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          placeholder="Instrument"
          value={props.member.instrument}
          onChange={() => {}}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          placeholder="Role"
          value={props.member.role}
          onChange={() => {}}
        />
      </td>
      <td>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">Permissions</Dropdown.Toggle>

          <Dropdown.Menu>
            <Form.Group controlId={1} style={{ marginLeft: "10px" }}>
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
          </Dropdown.Menu>
        </Dropdown>
      </td>
      <td>
        <Button variant="danger">Remove</Button>
      </td>
    </tr>
  );
}

export default MemberInstance;
