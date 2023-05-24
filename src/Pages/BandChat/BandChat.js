import "./BandChat.css";
import NavigationBar from "../../Components/NavigationBar";
import BandCreation from "../../Components/NewAccount/BandCreation";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Message from "./ChatBox/Message";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

function BandChat(props) {
  const [typedMessage, setTypedMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (props.band) {
      setMessageList(props.band.messages);
    }
  }, [props.band]);

  useEffect(() => {
    if (props.band && messageList) {
      let scrollBox = document.getElementById("chat-box");
      scrollBox.scrollTop = 10000000;
    }
    // eslint-disable-next-line
  }, [messageList]);

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
    const auth = getAuth();

    const message = {
      senderId: auth.currentUser.uid,
      author: auth.currentUser.displayName,
      content: typedMessage,
      id: uuidv4(),
    };

    utilities.sendMessage(props.bandId, message);
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
            <div className="chat-box" id="chat-box">
              {messageList.length === 0 && (
                <h3
                  style={{
                    textAlign: "center",
                    marginTop: "auto",
                    marginBottom: "auto",
                    color: "grey",
                  }}
                >
                  Send a message!
                </h3>
              )}
              {messageList.map((message) => {
                return (
                  <Message
                    key={uuidv4()}
                    senderId={message.senderId}
                    author={message.author}
                    content={message.content}
                  />
                );
              })}
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
