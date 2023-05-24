import "./Message.css";
import { getAuth } from "firebase/auth";

function Message(props) {
  if (props.senderId === getAuth().currentUser.uid) {
    return (
      <div className="sentBubble">
        <p className="sentMessage-name">{props.author}</p>
        <hr className="message-split" />
        <p className="sentMessage">{props.content}</p>
      </div>
    );
  } else {
    return (
      <div className="receivedBubble">
        <p className="receivedMessage-name">{props.author}</p>
        <hr className="message-split" />
        <p className="receivedMessage">{props.content}</p>
      </div>
    );
  }
}

export default Message;
