import "./FinanceGraph.css";
import { Line } from "react-chartjs-2";
import DateFilter from "../../Filters/DateFilter";
import React, { useState } from "react";

function FinanceGraph(props) {
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

  const financeEntries = {
    january: [],
    february: [],
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
  };

  const monthNames = {
    "01": "january",
    "02": "february",
    "03": "march",
    "04": "april",
    "05": "may",
    "06": "june",
    "07": "july",
    "08": "august",
    "09": "september",
    10: "october",
    11: "november",
    12: "december",
  };

  const processEntries = (entries) => {
    entries.forEach((entry) => {
      const { date, ...rest } = entry;
      const [, month, year] = date.split("/"); // Assuming the date format is "DD/MM/YYYY"

      if (year === yearFilter) {
        const monthKey = monthNames[month]; // Convert month number to name to match the key in financeEntries

        if (financeEntries.hasOwnProperty(monthKey)) {
          financeEntries[monthKey].push({ date, ...rest });
        }
      }
    });
  };

  if (props.band) {
    processEntries(props.band.finances["revenue"]);
    processEntries(props.band.finances["expenses"]);
  }

  let data = [];

  //Data when no month filter is present
  if (monthFilter === "") {
    for (const [, value] of Object.entries(financeEntries)) {
      let revenue = 0;
      let expenses = 0;
      let profit = 0;

      value.forEach((entry) => {
        //If no expenseAmount then must be of type revenue
        if (entry["expenseAmount"] === undefined) {
          revenue += parseFloat(entry["revenueAmount"]);
        } else {
          expenses += parseFloat(entry["expenseAmount"]);
        }
      });

      profit = revenue - expenses;
      data.push(profit);
    }
  } else {
    let profits = new Array(31).fill(0);
    for (const [key, value] of Object.entries(financeEntries)) {
      //Check if current entry matches the month filter
      if (key === monthFilter.toLowerCase()) {
        value.forEach((entry) => {
          // Extract the day from the date string
          let day = parseInt(entry.date.split("/")[0]);

          // Initialize the day's profit if it doesn't exist yet
          if (!profits[day - 1]) {
            profits[day - 1] = 0;
          }

          // Add or subtract the amount from the day's profit
          if (entry.revenueAmount) {
            profits[day - 1] += parseInt(entry.revenueAmount);
          } else if (entry.expenseAmount) {
            profits[day - 1] -= parseInt(entry.expenseAmount);
          }
        });
      }
    }
    data = profits;
  }

  const graphData = {
    labels,
    datasets: [
      {
        label: "Profit (£)",
        data: data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        cubicInterpolationMode: "monotone",
        spanGaps: true,
        radius: 4,
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
