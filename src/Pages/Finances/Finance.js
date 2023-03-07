import "./Finance.css";
import NavigationBar from "../../Components/NavigationBar";
import FinanceGraph from "./Cards/Graph/FinanceGraph";
import RevenueEntryForm from "./Cards/Forms/RevenueEntryForm";
import ExpenseEntryForm from "./Cards/Forms/ExpenseEntryForm";
import FinanceTable from "./Cards/Table/FinanceTable";

function Finance() {
  return (
    <div className="finance-page">
      <NavigationBar />
      <div className="finance-main-content">
        <div className="finance-wrapper">
          <div className="box graph">
            <FinanceGraph />
          </div>
          <div className="box revenue-entry">
            <RevenueEntryForm />
          </div>
          <div className="box expense-entry">
            <ExpenseEntryForm />
          </div>
          <div className="box finance-table">
            <FinanceTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
