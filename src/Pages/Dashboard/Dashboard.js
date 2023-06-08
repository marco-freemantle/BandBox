import "./Dashboard.css";
import NavigationBar from "../../Components/NavigationBar";
import BandCreation from "../../Components/NewAccount/BandCreation";
import FinanceOverview from "./Cards/Finance/FinanceOverview";
import ProfitStrip from "./Cards/ProfitStrip/ProfitStrip";
import Tasks from "./Cards/Tasks/Tasks";
import Events from "./Cards/Events/Events";
import InvalidPermissions from "../../Components/InvalidPermissions/InvalidPermissions";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

function Dashboard(props) {
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 940) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

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

  if (!props.band) return;

  //Checks if the current user has valid permissions to view this page
  const currentBandMember = props.band.members.find(
    (member) => member.userId === getAuth().currentUser.uid
  );
  if (currentBandMember.permissions["dashboard"] === false) {
    return (
      <InvalidPermissions
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
    );
  }

  //Get last 30 days of finances
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  };

  const filteredEntries = props.band.finances.filter((entry) => {
    const entryDate = parseDate(entry.date);
    return entryDate >= thirtyDaysAgo;
  });

  let financeBreakdown = {
    Events: 0,
    Merch: 0,
    revOther: 0,
    Travel: 0,
    Wages: 0,
    expOther: 0,
    totalRev: 0,
    totalExp: 0,
  };

  //Populate above object with finance data from last 30 days
  filteredEntries.forEach((entry) => {
    if (entry.revenueAmount) {
      // Revenue entry
      switch (entry.revenueType) {
        case "Event":
          financeBreakdown.Events += parseInt(entry.revenueAmount);
          financeBreakdown.totalRev += parseInt(entry.revenueAmount);
          break;
        case "Merchandise":
          financeBreakdown.Merch += parseInt(entry.revenueAmount);
          financeBreakdown.totalRev += parseInt(entry.revenueAmount);
          break;
        default:
          financeBreakdown.revOther += parseInt(entry.revenueAmount);
          financeBreakdown.totalRev += parseInt(entry.revenueAmount);
          break;
      }
    } else if (entry.expenseAmount) {
      // Expense entry
      switch (entry.expenseType) {
        case "Travel":
          financeBreakdown.Travel += parseInt(entry.expenseAmount);
          financeBreakdown.totalExp += parseInt(entry.expenseAmount);
          break;
        case "Wages":
          financeBreakdown.Wages += parseInt(entry.expenseAmount);
          financeBreakdown.totalExp += parseInt(entry.expenseAmount);
          break;
        default:
          financeBreakdown.expOther += parseInt(entry.expenseAmount);
          financeBreakdown.totalExp += parseInt(entry.expenseAmount);
          break;
      }
    }
  });

  return (
    <div className="dashboard-page">
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="dashboard-main-content">
        <div className="wrapper">
          <div className="box finance">
            <FinanceOverview
              band={props.band}
              financeBreakdown={financeBreakdown}
            />
          </div>
          {!isDeviceSmall && (
            <div className="box finance-strip">
              <ProfitStrip
                band={props.band}
                financeBreakdown={financeBreakdown}
              />
            </div>
          )}

          <div className="box todos">
            <Tasks band={props.band} />
          </div>
          <div className="box events">
            <Events band={props.band} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
