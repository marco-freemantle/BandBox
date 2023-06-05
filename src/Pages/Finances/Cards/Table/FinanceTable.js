import "./FinanceTable.css";
import Table from "react-bootstrap/Table";
import { CloseButton } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import * as utilities from "../../../../Utilities/FireStoreUtilities";

function FinanceTable(props) {
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

  function removeEntry(entryId) {
    utilities.removeFinanceEntry(props.bandId, entryId);
  }

  const processEntries = (entries) => {
    entries.forEach((entry) => {
      const { date, ...rest } = entry;
      const [, month, year] = date.split("/"); // Assuming the date format is "DD/MM/YYYY"

      if (year === props.yearFilter) {
        const monthKey = monthNames[month]; // Convert month number to name to match the key in financeEntries

        if (financeEntries.hasOwnProperty(monthKey)) {
          financeEntries[monthKey].push({ date, ...rest });
        }
      }
    });
  };

  if (props.band) {
    processEntries(props.band.finances);
  }

  const data = [];

  if (props.monthFilter === "") {
    for (const [, value] of Object.entries(financeEntries)) {
      value.forEach((entry) => {
        data.push(entry);
      });
    }
  } else {
    for (const [key, value] of Object.entries(financeEntries)) {
      if (key === props.monthFilter.toLowerCase()) {
        value.forEach((entry) => {
          data.push(entry);
        });
      }
    }
  }

  //Change names of all data objects so they can be mapped
  data.forEach((entry) => {
    if (entry.revenueAmount) {
      //Rename revenueAmount key
      delete Object.assign(entry, { amount: entry["revenueAmount"] })[
        "revenueAmount"
      ];
      //Rename nameOfRevenue key
      delete Object.assign(entry, { name: entry["nameOfRevenue"] })[
        "revenueAmount"
      ];
      //Rename revenueType key
      delete Object.assign(entry, { type: entry["revenueType"] })[
        "revenueType"
      ];
      entry["rev/exp"] = "Revenue";
    } else {
      //Rename expenseAmount key
      delete Object.assign(entry, { amount: entry["expenseAmount"] })[
        "expenseAmount"
      ];
      //Rename nameOfExpense key
      delete Object.assign(entry, { name: entry["nameOfExpense"] })[
        "nameOfExpense"
      ];
      //Rename expenseType key
      delete Object.assign(entry, { type: entry["expenseType"] })[
        "expenseType"
      ];
      entry["rev/exp"] = "Expense";
    }
  });

  return (
    <>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Revenue/Expense</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={uuidv4()}>
              <td>{entry["rev/exp"]}</td>
              <td>{entry.name}</td>
              <td>{entry.amount}</td>
              <td>{entry.type}</td>
              <td>{entry.notes}</td>
              <td>
                {entry.date}
                {
                  <CloseButton
                    style={{ float: "right" }}
                    onClick={() => removeEntry(entry.id)}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data.length === 0 && (
        <h4 style={{ textAlign: "center", marginTop: "90px" }}>
          No financial data
        </h4>
      )}
    </>
  );
}

export default FinanceTable;
