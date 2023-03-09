import "./CreateTask.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function CreateTask(props) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");

  function createTaskSubmit(event) {
    event.preventDefault();
    console.log(taskName);
    console.log(dueDate);
    setTaskName("");
    setDueDate("");
  }

  return (
    <Modal {...props} size="lg" centered backdropClassName="custom-backdrop">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createTaskSubmit} id="newTaskForm">
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Name"
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              value={taskName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
              value={dueDate}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTask;
