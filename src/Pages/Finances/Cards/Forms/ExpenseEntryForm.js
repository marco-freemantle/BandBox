import "./RevenueEntryForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as utilities from "../../../../Utilities/FireStoreUtilities";

function ExpenseEntryForm(props) {
  //Form data
  const [nameOfExpense, setNameOfExpense] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [date, setDate] = useState("");

  function createExpenseEntry(event) {
    event.preventDefault();

    //Format date
    const dateparts = date.split("-");
    const formattedDate = `${dateparts[2]}/${dateparts[1]}/${dateparts[0]}`;

    const newExpense = {
      nameOfExpense: nameOfExpense,
      expenseAmount: expenseAmount,
      notes: notes,
      expenseType: expenseType,
      date: formattedDate,
      id: uuidv4(),
    };

    utilities.addNewExpense(props.bandId, newExpense);

    setNameOfExpense("");
    setExpenseAmount("");
    setNotes("");
    setExpenseType("");
    setDate("");
  }

  return (
    <div className="revenue-entry-form">
      <Form autoComplete="off" onSubmit={createExpenseEntry}>
        <h3 className="revenue-entry-form-field">Add Expense Entry</h3>

        <Form.Control
          required
          type="text"
          onChange={(e) => {
            setNameOfExpense(e.target.value);
          }}
          placeholder={"Name of Entry"}
          id="expenseName"
          className="revenue-entry-form-field"
          value={nameOfExpense}
        />
        <Form.Control
          required
          type="number"
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder={"Expense Amount"}
          id="revenueAmount"
          className="revenue-entry-form-field"
          value={expenseAmount}
        />
        <Form.Control
          type="text"
          onChange={(e) => setNotes(e.target.value)}
          placeholder={"Notes"}
          id="notes"
          className="revenue-entry-form-field"
          value={notes}
        />
        <Form.Select
          className="revenue-entry-form-field"
          required
          onChange={(e) => setExpenseType(e.target.value)}
          value={expenseType}
        >
          <option value="">Expense Type</option>
          <option value="Travel">Travel</option>
          <option value="Wages">Wages</option>
          <option value="Other">Other</option>
        </Form.Select>
        <Form.Control
          type="Date"
          onChange={(e) => setDate(e.target.value)}
          id="revenueDate"
          className="revenue-entry-form-field"
          value={date}
          required
        />

        <Button
          variant="primary"
          type="submit"
          className="revenue-entry-form-field"
        >
          Add Revenue Entry
        </Button>
      </Form>
    </div>
  );
}

export default ExpenseEntryForm;
