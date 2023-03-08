import "./Message.css";
import { getAuth } from "firebase/auth";

function Message(props) {
  const auth = getAuth();

  /**USE THIS TO DIFFERENCIATE WHOS SENDING THE MESSAGE
   * if (props.senderId === auth.currentUser.uid){
   * SENT
   * } ELSE {
   * RECEIVED
   * }
   */

  if (props.senderId === "12345") {
    return (
      <div className="sentBubble">
        <p className="sentMessage-name">Marco Freemantle</p>
        <hr className="message-split" />
        <p className="sentMessage">{props.content}</p>
      </div>
    );
  } else {
    return (
      <div className="receivedBubble">
        <p className="receivedMessage-name">Mike Goody</p>
        <hr className="message-split" />
        <p className="receivedMessage">{props.content}</p>
      </div>
    );
  }
}

export default Message;
