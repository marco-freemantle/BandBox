import "./Dashboard.css";
import NavigationBar from "../../Components/NavigationBar";
import BandCreation from "../../Components/NewAccount/BandCreation";
import FinanceOverview from "./Cards/Finance/FinanceOverview";
import Todos from "./Cards/Todos/Todos";

function Dashboard(props) {
  if (props.user === undefined) return;

  if (props.user.bandName === "" || props.user.bandName === undefined) {
    return <BandCreation />;
  } else {
    return (
      <div className="dashboard-page">
        <NavigationBar />
        <div className="dashboard-main-content">
          <div className="wrapper">
            <div className="box finance"></div>
            <div className="box todos">
              <Todos />
            </div>
            <div className="box events">Events</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
