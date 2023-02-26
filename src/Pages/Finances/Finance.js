import "./Finance.css";
import NavigationBar from "../../Components/NavigationBar";
import FinanceGraph from "./Cards/Graph/FinanceGraph";
import RevenueEntryForm from "./Cards/Forms/RevenueEntryForm";
import ExpenseEntryForm from "./Cards/Forms/ExpenseEntryForm";

function Finance(props) {
  return (
    <div className="finance-page">
      <NavigationBar />
      <div className="finance-main-content">
        <div className="finance-vertical-div-left">
          <FinanceGraph />
          {/*Next card goes here*/}
        </div>
        <div className="finance-vertical-div-right">
          <div className="finance-entry">
            <RevenueEntryForm />
          </div>
          <div className="finance-entry">
            <ExpenseEntryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
