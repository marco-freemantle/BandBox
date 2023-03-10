import "./Events.css";
import NavigationBar from "../../Components/NavigationBar";
import EventCalendar from "./Calendar/EventCalendar";
import MobileEvents from "./Mobile/MobileEvents";
import { useState, useEffect } from "react";

function Events() {
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 791) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  const mobileEvents = <MobileEvents />;

  const desktopEvents = (
    <div className="events-wrapper">
      <div className="box calendar-box">
        <EventCalendar />
      </div>
    </div>
  );

  let eventsPageContent = isDeviceSmall ? mobileEvents : desktopEvents;

  return (
    <div className="events-page">
      <NavigationBar />
      <div className="events-main-content">{eventsPageContent}</div>
    </div>
  );
}

export default Events;
