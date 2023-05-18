import "./RevenueEntryForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as utilities from "../../../../Utilities/FireStoreUtilities";

function RevenueEntryForm(props) {
  //Form data
  const [nameOfRevenue, setNameOfRevenue] = useState("");
  const [revenueAmount, setRevenueAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [revenueType, setRevenueType] = useState("");
  const [date, setDate] = useState("");

  function createRevenueEntry(event) {
    event.preventDefault();

    //Format date
    const dateparts = date.split("-");
    const formattedDate = `${dateparts[2]}/${dateparts[1]}/${dateparts[0]}`;

    const newRevenue = {
      nameOfRevenue: nameOfRevenue,
      revenueAmount: revenueAmount,
      notes: notes,
      revenueType: revenueType,
      date: formattedDate,
      id: uuidv4(),
    };

    utilities.addNewRevenue(props.bandId, newRevenue);

    setNameOfRevenue("");
    setRevenueAmount("");
    setNotes("");
    setRevenueType("");
    setDate("");
  }

  return (
    <div className="revenue-entry-form">
      <Form autoComplete="off" onSubmit={createRevenueEntry}>
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
          value={nameOfRevenue}
        />
        <Form.Control
          required
          type="number"
          onChange={(e) => setRevenueAmount(e.target.value)}
          placeholder={"Amount of Revenue"}
          id="revenueAmount"
          className="revenue-entry-form-field"
          value={revenueAmount}
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
          onChange={(e) => setRevenueType(e.target.value)}
          value={revenueType}
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

export default RevenueEntryForm;
