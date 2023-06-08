import "./Events.css";
import NavigationBar from "../../Components/NavigationBar";
import EventCalendar from "./Calendar/EventCalendar";
import MobileEvents from "./Mobile/MobileEvents";
import BandCreation from "../../Components/NewAccount/BandCreation";
import { getAuth } from "firebase/auth";
import InvalidPermissions from "../../Components/InvalidPermissions/InvalidPermissions";
import { useState, useEffect } from "react";

function Events(props) {
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 1093) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  const mobileEvents = (
    <div className="events-wrapper">
      <MobileEvents bandId={props.bandId} band={props.band} />
    </div>
  );

  const desktopEvents = (
    <div className="events-wrapper">
      <div className="box calendar-box">
        <EventCalendar bandId={props.bandId} band={props.band} />
      </div>
    </div>
  );

  let eventsPageContent = isDeviceSmall ? mobileEvents : desktopEvents;

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

  //Checks if the current user has valid permissions to view this page
  if (!props.band) return;
  const currentBandMember = props.band.members.find(
    (member) => member.userId === getAuth().currentUser.uid
  );
  if (currentBandMember.permissions["events"] === false) {
    return (
      <InvalidPermissions
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
    );
  }

  return (
    <div className="events-page">
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="events-main-content">{eventsPageContent}</div>
    </div>
  );
}

export default Events;
