import "./ChatBox.css";
import Message from "./Message";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function ChatBox() {
  const [typedMessage, setTypedMessage] = useState("");

  return (
    <div className="chat-container">
      <div className="chat-area">
        <Message
          senderId={"12345"}
          author={"Marco"}
          content={"When are we jamming?"}
        />
        <Message
          senderId={"11111"}
          author={"Mike"}
          content={
            "Tomorrow afternoon I think. I'm sending quite a long message son I can sort out max widths for the message containers?"
          }
        />
        <Message
          senderId={"12345"}
          author={"Marco"}
          content={"When are we jamming?"}
        />
        <Message
          senderId={"11111"}
          author={"Mike"}
          content={
            "Tomorrow afternoon I think. I'm sending quite a long message son I can sort out max widths for the message containers?"
          }
        />
        <Message
          senderId={"12345"}
          author={"Marco"}
          content={"When are we jamming?"}
        />
        <Message
          senderId={"11111"}
          author={"Mike"}
          content={
            "Tomorrow afternoon I think. I'm sending quite a long message son I can sort out max widths for the message containers?"
          }
        />
        <Message
          senderId={"12345"}
          author={"Marco"}
          content={"When are we jamming?"}
        />
        <Message
          senderId={"11111"}
          author={"Mike"}
          content={
            "Tomorrow afternoon I think. I'm sending quite a long message son I can sort out max widths for the message containers?"
          }
        />
        <Message
          senderId={"12345"}
          author={"Marco"}
          content={"When are we jamming?"}
        />
        <Message
          senderId={"11111"}
          author={"Mike"}
          content={
            "Tomorrow afternoon I think. I'm sending quite a long message son I can sort out max widths for the message containers?"
          }
        />
      </div>

      <Form className="message-form-flexbox">
        <Form.Group controlId="formMessage" className="message-input-group">
          <Form.Control
            type="text"
            placeholder="Message"
            bsPrefix="message-input"
            autoComplete="off"
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default ChatBox;
