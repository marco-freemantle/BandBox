import "./RevenueEntryForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";

function RevenueEntryForm(props) {
  //Form data
  const [nameOfRevenue, setNameOfRevenue] = useState();
  const [revenueAmount, setRevenueAmount] = useState();
  const [notes, setNotes] = useState();
  const [revenueType, setRevenueType] = useState();
  const [date, setDate] = useState();

  return (
    <div className="revenue-entry-form">
      <Form autoComplete="off">
        <h3 className="revenue-entry-form-field">Add Revenue Entry</h3>

        <Form.Control
          required
          type="text"
          onChange={(e) => {
            setNameOfRevenue(e.target.value);
          }}
          placeholder={"Name of Entry"}
          id="revenueName"
          className="revenue-entry-form-field"
        />
        <Form.Control
          required
          type="number"
          onChange={(e) => setRevenueAmount(e.target.value)}
          placeholder={"Amount of Revenue"}
          id="revenueAmount"
          className="revenue-entry-form-field"
        />
        <Form.Control
          type="text"
          onChange={(e) => setNotes(e.target.value)}
          placeholder={"Notes"}
          id="proteinAmount"
          className="revenue-entry-form-field"
        />
        <Form.Select
          className="revenue-entry-form-field"
          required
          onChange={(e) => setRevenueType(e.target.value)}
        >
          <option value="">Revenue Type</option>
          <option value="Event">Event</option>
          <option value="Merchandise">Merchandise</option>
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

export default RevenueEntryForm;
