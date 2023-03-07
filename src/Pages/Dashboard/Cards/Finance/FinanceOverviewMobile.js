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

function FinanceOverviewMobile() {
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
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 50,
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
        cutout: "65%",
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
        cutout: "60%",
      },
    ],
  };

  return (
    <div>
      <h2 style={{ marginBottom: "50px" }}>Financial Overview - 30 Days</h2>
      <div className="finance-overview-wrapper">
        <div className="main-doughnuts-container">
          <div className="revenue-stats">
            <div style={{ display: "flex" }}>
              <FaMusic size={20} />
              <h4 className="stat-title">Events</h4>
            </div>
            <p className="stat-value">£3097.76</p>
            <div style={{ display: "flex" }}>
              <FaTshirt size={20} />
              <h4 className="stat-title">Merch</h4>
            </div>
            <p className="stat-value">£3097.76</p>
            <div style={{ display: "flex" }}>
              <FaHandsHelping size={20} />
              <h4 className="stat-title">Other</h4>
            </div>
            <p className="stat-value">£3097.76</p>
          </div>
          <div className="revenue-stats">
            <div style={{ display: "flex" }}>
              <FaShuttleVan size={20} />
              <h4 className="stat-title">Travel</h4>
            </div>
            <p className="stat-value">£3097.76</p>
            <div style={{ display: "flex" }}>
              <FaGuitar size={20} />
              <h4 className="stat-title">Wages</h4>
            </div>
            <p className="stat-value">£3097.76</p>
            <div style={{ display: "flex" }}>
              <FaMoneyBillWaveAlt size={20} />
              <h4 className="stat-title">Other</h4>
            </div>
            <p className="stat-value">£3097.76</p>
          </div>
        </div>
      </div>
      <div className="overview-stats"></div>
    </div>
  );
}

export default FinanceOverviewMobile;
