import "./EventTabs.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateEventForm from "../Forms/CreateEventForm";

function EventTabs() {
  return (
    <Tabs
      defaultActiveKey="eventCreator"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="eventCreator" title="Create an Event">
        <div className="tab-content">
          <CreateEventForm />
        </div>
      </Tab>
      <Tab eventKey="profile" title="View/Edit Event">
        <div className="tab-content">
          <h3>View/Edit Event</h3>
        </div>
      </Tab>
    </Tabs>
  );
}

export default EventTabs;
