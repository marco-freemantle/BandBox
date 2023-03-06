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
    maintainAspectRatio: false,
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
    <div className="finance-overview-wrapper">
      <div>
        <Doughnut data={data_revenue} options={options} />
      </div>
    </div>
  );
}

export default FinanceOverview;
