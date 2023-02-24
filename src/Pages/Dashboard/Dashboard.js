import "./Dashboard.css";
import NavigationBar from "../../Components/NavigationBar";
import BandCreation from "../../Components/NewAccount/BandCreation";
import FinanceOverview from "./Cards/Finance/FinanceOverview";

function Dashboard(props) {
  if (props.user === undefined) return;

  if (props.user.bandName === "" || props.user.bandName === undefined) {
    return <BandCreation />;
  } else {
    return (
      <div className="dashboard-page">
        <NavigationBar />
        <div className="dashboard-main-content">
          <div className="dashboard-vertical-div">
            <FinanceOverview />
            <div className="dashboard-event-card"></div>
          </div>
          <div className="dashboard-todos"></div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
