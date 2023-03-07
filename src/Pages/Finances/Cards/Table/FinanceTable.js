import "./FinanceTable.css";
import Table from "react-bootstrap/Table";
import { CloseButton } from "react-bootstrap";

function FinanceTable() {
  const data = [
    {
      rev: "Revenue",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
      date: "12/02/2023",
    },
    {
      rev: "Expense",
      name: "asd",
      amount: 120.0,
      type: "Tuck",
      notes: "nothing",
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
