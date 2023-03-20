import "./Finance.css";
import NavigationBar from "../../Components/NavigationBar";
import FinanceGraph from "./Cards/Graph/FinanceGraph";
import RevenueEntryForm from "./Cards/Forms/RevenueEntryForm";
import ExpenseEntryForm from "./Cards/Forms/ExpenseEntryForm";
import FinanceTable from "./Cards/Table/FinanceTable";
import BandCreation from "../../Components/NewAccount/BandCreation";

function Finance(props) {
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
  return (
    <div className="finance-page">
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="finance-main-content">
        <div className="finance-wrapper">
          <div className="box graph">
            <FinanceGraph />
          </div>
          <div className="box finance-table">
            <FinanceTable />
          </div>
        </div>
        <div className="finance-form-wrapper">
          <div className="box revenue-entry">
            <RevenueEntryForm />
          </div>
          <div className="box expense-entry">
            <ExpenseEntryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
