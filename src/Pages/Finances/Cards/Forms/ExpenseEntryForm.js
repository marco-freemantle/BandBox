import "./RevenueEntryForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

function ExpenseEntryForm(props) {
  //Form data
  const [nameOfExpense, setNameOfExpense] = useState();
  const [expenseAmount, setExpenseAmount] = useState();
  const [notes, setNotes] = useState();
  const [expenseType, setExpenseType] = useState();
  const [date, setDate] = useState();

  return (
    <div className="revenue-entry-form">
      <Form autoComplete="off">
        <h3 className="revenue-entry-form-field">Add Expense Entry</h3>

        <Form.Control
          required
          type="text"
          onChange={(e) => {
            setNameOfExpense(e.target.value);
          }}
          placeholder={"Name of Entry"}
          id="revenueName"
          className="revenue-entry-form-field"
        />
        <Form.Control
          required
          type="number"
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder={"Expense Amount"}
          id="revenueAmount"
          className="revenue-entry-form-field"
        />
        <Form.Control
          type="text"
          onChange={(e) => setNotes(e.target.value)}
          placeholder={"Notes"}
          id="notes"
          className="revenue-entry-form-field"
        />
        <Form.Select
          className="revenue-entry-form-field"
          required
          onChange={(e) => setExpenseType(e.target.value)}
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
