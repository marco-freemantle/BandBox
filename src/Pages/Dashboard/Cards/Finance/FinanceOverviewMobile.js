import "./FinanceOverview.css";
import "chart.js/auto";

function FinanceOverviewMobile(props) {
  return (
    <div>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Financial Overview
      </h2>
      <div className="finance-overview-wrapper">
        <div className="bottom-finance-strip">
          <div className="strip-container">
            <h3 className="strip-title">Revenue:</h3>
            <h3 className="strip-value">£{props.financeBreakdown.totalRev}</h3>
          </div>

          <div className="strip-container">
            <h3 className="strip-title">Expenditure:</h3>
            <h3 className="strip-value">£{props.financeBreakdown.totalExp}</h3>
          </div>
          <div className="strip-container">
            <h3 className="strip-title">Profit:</h3>
            <h3 className="strip-value">
              £
              {props.financeBreakdown.totalRev -
                props.financeBreakdown.totalExp}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceOverviewMobile;
