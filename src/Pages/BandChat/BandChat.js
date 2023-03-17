import "./BandChat.css";
import NavigationBar from "../../Components/NavigationBar";
import ParticipantList from "./Participants/ParticipantsList";
import ChatBox from "./ChatBox/ChatBox";
import BandCreation from "../../Components/NewAccount/BandCreation";
import { useEffect, useState } from "react";

function BandChat(props) {
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 770) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  if (props.user.bandName === "") {
    return <BandCreation />;
  }

  return (
    <div className="dashboard-page">
      <NavigationBar />
      <div className="bandchat-main-content">
        <div className="band-chat">
          {!isDeviceSmall && (
            <>
              <div className="participants-chat-section">
                <h3>Participants</h3>
                <ParticipantList />
              </div>
              <div style={{ borderLeft: "2px solid grey" }} />
            </>
          )}

          <div className="main-chat-section">
            <h3>ChatBox</h3>
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BandChat;
