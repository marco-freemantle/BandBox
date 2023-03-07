import "./Dashboard.css";
import NavigationBar from "../../Components/NavigationBar";
import BandCreation from "../../Components/NewAccount/BandCreation";
import FinanceOverview from "./Cards/Finance/FinanceOverview";
import Tasks from "./Cards/Tasks/Tasks";
import Events from "./Cards/Events/Events";
import { useEffect, useState } from "react";

function Dashboard(props) {
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 474) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  if (props.user === undefined) return;

  if (props.user.bandName === "" || props.user.bandName === undefined) {
    return <BandCreation />;
  } else {
    return (
      <div className="dashboard-page">
        <NavigationBar />
        <div className="dashboard-main-content">
          <div className="wrapper">
            <div className="box finance">
              <FinanceOverview />
            </div>
            {!isDeviceSmall && (
              <div className="box finance-stats">
                <div className="finance-stat-container">
                  <h2 className="finance-stat-title">Revenue</h2>
                  <h4 className="finance-stat-value">£13,000.00</h4>
                </div>
                <div className="finance-stat-container">
                  <h2 className="finance-stat-title">Expenses</h2>
                  <h4 className="finance-stat-value">£11,030.12</h4>
                </div>
                <div className="finance-stat-container">
                  <h2 className="finance-stat-title">Profit</h2>
                  <h4 className="finance-stat-value">£10,345.19</h4>
                </div>
              </div>
            )}

            <div className="box todos">
              <Tasks />
            </div>
            <div className="box events">
              <Events />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
