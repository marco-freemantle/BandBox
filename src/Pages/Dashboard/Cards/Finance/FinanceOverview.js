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
import FinanceOverviewMobile from "./FinanceOverviewMobile";
import { useEffect, useState } from "react";

function FinanceOverview(props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 940) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const textCentreRev = {
    id: "textCentre",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;

      ctx.save();
      ctx.font = "bolder 20px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "Revenue",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  const textCentreExp = {
    id: "textCentre",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;

      ctx.save();
      ctx.font = "bolder 20px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "Expenses",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

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
      textCentreRev,
      textCentreExp,
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
    labels: ["Events", "Merch", "Other"],
    datasets: [
      {
        data: [
          props.financeBreakdown.Events,
          props.financeBreakdown.Merch,
          props.financeBreakdown.revOther,
        ],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(41, 128, 185, 0.6)",
          "rgba(46, 204, 113, 0.6)",
        ],
        borderColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 0,
        cutout: "65%",
      },
    ],
  };

  //Data passed to the expenses doughnut
  const data_expenses = {
    labels: ["Travel", "Wages", "Other"],
    datasets: [
      {
        data: [
          props.financeBreakdown.Travel,
          props.financeBreakdown.Wages,
          props.financeBreakdown.expOther,
        ],
        backgroundColor: [
          "rgba(249, 105, 14, 0.5)",
          "rgba(22, 160, 133, 0.5)",
          "rgba(220, 53, 69, 0.6)",
        ],
        borderColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 0,
        cutout: "60%",
      },
    ],
  };

  if (!isMobile) {
    return (
      <div style={{ height: "100%" }}>
        <h2 style={{ marginBottom: "50px" }}>Financial Overview - 30 Days</h2>
        <div className="finance-overview-wrapper">
          <div className="main-doughnuts-container">
            <div className="doughnut-container">
              <Doughnut
                data={data_revenue}
                options={options}
                plugins={[textCentreRev]}
              />

              <div className="revenue-stats">
                <div style={{ display: "flex" }}>
                  <FaMusic size={20} />
                  <h4 className="stat-title">Events</h4>
                </div>
                <p className="stat-value">£{props.financeBreakdown.Events}</p>
                <div style={{ display: "flex" }}>
                  <FaTshirt size={20} />
                  <h4 className="stat-title">Merch</h4>
                </div>
                <p className="stat-value">£{props.financeBreakdown.Merch}</p>
                <div style={{ display: "flex" }}>
                  <FaHandsHelping size={20} />
                  <h4 className="stat-title">Other</h4>
                </div>
                <p className="stat-value">£{props.financeBreakdown.revOther}</p>
              </div>
            </div>
            <div className="doughnut-container">
              <Doughnut
                data={data_expenses}
                options={options}
                plugins={[textCentreExp]}
              />
              <div className="revenue-stats">
                <div style={{ display: "flex" }}>
                  <FaShuttleVan size={20} />
                  <h4 className="stat-title">Travel</h4>
                </div>
                <p className="stat-value">£{props.financeBreakdown.Travel}</p>
                <div style={{ display: "flex" }}>
                  <FaGuitar size={20} />
                  <h4 className="stat-title">Wages</h4>
                </div>
                <p className="stat-value">£{props.financeBreakdown.Wages}</p>
                <div style={{ display: "flex" }}>
                  <FaMoneyBillWaveAlt size={20} />
                  <h4 className="stat-title">Other</h4>
                </div>
                <p className="stat-value">£{props.financeBreakdown.expOther}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <FinanceOverviewMobile financeBreakdown={props.financeBreakdown} />;
  }
}

export default FinanceOverview;
