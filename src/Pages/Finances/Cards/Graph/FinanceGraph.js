import "./FinanceGraph.css";
import { Line } from "react-chartjs-2";
import DateFilter from "../../Filters/DateFilter";
import React, { useState, useEffect } from "react";

function FinanceGraph() {
  //State that holds month filter
  const [monthFilter, setMonthFilter] = useState("");
  //State that holds year filter
  const [yearFilter, setYearFilter] = useState("2023");

  function handleChangeMonthFilter(month) {
    setMonthFilter(month);
  }

  function handleChangeYearFilter(year) {
    setYearFilter(year);
  }

  let monthLabels = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  /**
   * Graph labels (X-Axis). Only used if there is not a valid month filter
   */
  let yearLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Choose which labels to use for the graph X-Axis based upon filters
  let labels = monthFilter === "" ? yearLabels : monthLabels;

  //Graph options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
      title: {
        display: false,
      },
    },
  };

  //Passed into <Line/> to draw the graph
  const graphData = {
    labels,
    datasets: [
      {
        label: "Profit (£)",
        data: [123, 23, 34, 45, 45, 56],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        cubicInterpolationMode: "monotone",
        spanGaps: true,
        radius: 5,
      },
    ],
  };

  return (
    <div>
      <div className="title-and-filters-container">
        <h2>Finances</h2>
        <div className="filter-container">
          <DateFilter
            changeMonthFilter={handleChangeMonthFilter}
            changeYearFilter={handleChangeYearFilter}
          />
        </div>
      </div>
      <div className="finance-graph">
        <Line options={options} data={graphData} />
      </div>
    </div>
  );
}

export default FinanceGraph;
