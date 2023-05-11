import "./FinanceTable.css";
import Table from "react-bootstrap/Table";
import { CloseButton } from "react-bootstrap";

function FinanceTable() {
  const data = [
    {
      rev: "Revenue",
      name: "Amy's Wedding",
      amount: 1200.0,
      type: "Event",
      notes: "...",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "Petrol",
      amount: -120.0,
      type: "Travel",
      notes: "...",
      date: "12/02/2023",
    },
    {
      rev: "Revenue",
      name: "Leeds Festival",
      amount: 1200.0,
      type: "Event",
      notes: "...",
      date: "12/02/2023",
    },
    {
      rev: "Revenue",
      name: "John's Wedding",
      amount: 1200.0,
      type: "Event",
      notes: "...",
      date: "12/02/2023",
    },
  ];

  return (
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
          <tr key={Math.random()}>
            <td>{entry.rev}</td>
            <td>{entry.name}</td>
            <td>{entry.amount}</td>
            <td>{entry.type}</td>
            <td>{entry.notes}</td>
            <td>
              {entry.date}
              {<CloseButton style={{ float: "right" }} />}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FinanceTable;
