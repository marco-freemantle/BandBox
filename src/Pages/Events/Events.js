import "./Events.css";
import NavigationBar from "../../Components/NavigationBar";
import EventCalendar from "./Calendar/EventCalendar";
import EventTabs from "./Tabs/EventTabs";

function Events() {
  return (
    <div className="events-page">
      <NavigationBar />
      <div className="events-main-content">
        <div className="events-wrapper">
          <div className="box calendar-box">
            <EventCalendar />
          </div>
          {/* <div className="box events-list">
            <EventTabs />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Events;
