import "./BandChat.css";
import NavigationBar from "../../Components/NavigationBar";
import BandCreation from "../../Components/NewAccount/BandCreation";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Message from "./ChatBox/Message";

function BandChat(props) {
  const [typedMessage, setTypedMessage] = useState("");

  if (props.user.bands === undefined) return;
  if (props.user.bands.length === 0) {
    return (
      <BandCreation
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
    );
  }

  function sendMessage(event) {
    event.preventDefault();
    console.log(typedMessage + "... message sent");
    setTypedMessage("");
  }

  return (
    <div className="dashboard-page">
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="bandchat-main-content">
        <div className="band-chat">
          <div className="main-chat-section">
            <h3>ChatBox</h3>
            <div className="chat-box">
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
            <Form className="message-form-flexbox" onSubmit={sendMessage}>
              <Form.Group
                controlId="formMessage"
                className="message-input-group"
              >
                <Form.Control
                  type="text"
                  placeholder="Message"
                  bsPrefix="message-input"
                  autoComplete="off"
                  value={typedMessage}
                  onChange={(e) => {
                    setTypedMessage(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BandChat;
