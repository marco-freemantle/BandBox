import "./FinanceOverview.css";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import {
  FaMusic,
  FaTshirt,
  FaHandsHelping,
  FaShuttleVan,
  FaGuitar,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";

function FinanceOverview() {
  //Graph options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  //Data passed to the revenue doughnut
  const data_revenue = {
    labels: ["Revenue", "Expenditure", "asd", "56", "dfgin"],
    datasets: [
      {
        data: [20000, 11354, 12965, 34568],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 0.25)"],
        borderColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  //Data passed to the expenses doughnut
  const data_expenses = {
    labels: ["Revenue", "Expenditure"],
    datasets: [
      {
        data: [1275, 2490],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 0.25)"],
        borderColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  return (
    <div className="dashboard-finance-card">
      <h2>Financial Overview - 30 Days</h2>
      <div
        style={{
          display: "flex",
        }}
      >
        <div className="doughnut-flex">
          <div>
            <Doughnut
              data={data_revenue}
              options={options}
              className="financial-doughnut"
            />
            <h4 className="revenue-title">Revenue</h4>
            <div className="counter-section">
              <div>
                <FaMusic size={"20"} />
                <p className="counter-text">Events</p>
                <p className="counter-value">1200</p>
              </div>

              <div>
                <FaTshirt size={"20"} />
                <p className="counter-text">Merch</p>
                <p className="counter-value">340</p>
              </div>

              <div>
                <FaHandsHelping size={"20"} />
                <p className="counter-text">Other</p>
                <p className="counter-value">347</p>
              </div>
            </div>
          </div>

          <div>
            <Doughnut
              data={data_expenses}
              options={options}
              className="financial-doughnut"
            />
            <h4 className="expenses-title">Expenses</h4>
            <div className="counter-section">
              <div>
                <FaShuttleVan size={"20"} />
                <p className="counter-text">Travel</p>
                <p className="counter-value">1200</p>
              </div>

              <div>
                <FaGuitar size={"20"} />
                <p className="counter-text">Wages</p>
                <p className="counter-value">340</p>
              </div>

              <div>
                <FaMoneyBillWaveAlt size={"20"} />
                <p className="counter-text">Other</p>
                <p className="counter-value">347</p>
              </div>
            </div>
          </div>
        </div>
        <div className="statistics-container">
          <div>
            <h5 style={{ fontWeight: "400" }}>Revenue:</h5>
            <h3>£13,000.00</h3>
          </div>
          <div>
            <h5 style={{ fontWeight: "400" }}>Expenses:</h5>
            <h3>£11,030.13</h3>
          </div>
          <div>
            <h5 style={{ fontWeight: "400" }}>Profit:</h5>
            <h3>£10,345.19</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceOverview;
