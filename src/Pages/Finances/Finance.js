import "./Finance.css";
import NavigationBar from "../../Components/NavigationBar";
import FinanceGraph from "./Cards/Graph/FinanceGraph";
import RevenueEntryForm from "./Cards/Forms/RevenueEntryForm";
import ExpenseEntryForm from "./Cards/Forms/ExpenseEntryForm";
import FinanceTable from "./Cards/Table/FinanceTable";
import BandCreation from "../../Components/NewAccount/BandCreation";
import { useState } from "react";

function Finance(props) {
  //State that holds month filter
  const [monthFilter, setMonthFilter] = useState("");
  //State that holds year filter
  const [yearFilter, setYearFilter] = useState("2023");

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

  function setFilters(month, year) {
    setMonthFilter(month);
    setYearFilter(year);
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
            <FinanceGraph band={props.band} setFilters={setFilters} />
          </div>
          <div className="box finance-table">
            <FinanceTable
              band={props.band}
              bandId={props.bandId}
              monthFilter={monthFilter}
              yearFilter={yearFilter}
            />
          </div>
        </div>
        <div className="finance-form-wrapper">
          <div className="box revenue-entry">
            <RevenueEntryForm bandId={props.bandId} />
          </div>
          <div className="box expense-entry">
            <ExpenseEntryForm bandId={props.bandId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
