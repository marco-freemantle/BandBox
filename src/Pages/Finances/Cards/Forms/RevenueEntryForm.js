import "./RevenueEntryForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";

function RevenueEntryForm(props) {
  //Currently selected date
  const [selectedDate, setSelectedDate] = useState();
  //Form data
  const [nameOfFood, setNameOfFood] = useState();
  const [caloriesAmount, setCaloriesAmount] = useState();
  const [carbsAmount, setCarbsAmount] = useState();
  const [fatAmount, setFatAmount] = useState();
  const [proteinAmount, setProteinAmount] = useState();

  /**
   * Adds food entry to entryObject in CalorieChart.js
   * @param event Form submission event
   */
  function handleCalorieEntry(event) {
    event.preventDefault();
    //Create new entry object
    const entryObject = {
      _selectedDate: selectedDate,
      _nameOfFood: nameOfFood,
      _caloriesAmount: caloriesAmount,
      _carbsAmount: carbsAmount,
      _fatAmount: fatAmount,
      _proteinAmount: proteinAmount,
    };

    //Adds food entry to entryObject in CalorieChart.js
    props.addFoodEntry(entryObject);

    //Reset form fields
    ReactDOM.findDOMNode(document.getElementById("foodName")).value = "";
    ReactDOM.findDOMNode(document.getElementById("calorieAmount")).value = "";
    ReactDOM.findDOMNode(document.getElementById("carbsAmount")).value = "";
    ReactDOM.findDOMNode(document.getElementById("fatAmount")).value = "";
    ReactDOM.findDOMNode(document.getElementById("proteinAmount")).value = "";
  }

  return (
    <div className="calorie-entry">
      <Form
        onSubmit={handleCalorieEntry}
        className="calorie-entry-form"
        autoComplete="off"
      >
        {/*
        To accurately capture revenue entries for your database, the form should collect the following data:

        Date: The date on which the revenue was generated.
        Product/Service: The product or service that generated the revenue.
        Description: A brief description of the revenue entry.
        Amount: The amount of revenue generated by the product or service.
        Customer: The name of the customer who generated the revenue (optional).
        Payment Method: The method used to pay for the product or service.
        Transaction ID: A unique identifier for the transaction (optional).
        Collecting this information will ensure that your revenue data is accurately recorded and can be easily retrieved and analyzed later.
        */}
        <h3 className="calorie-entry-form-field">Add Revenue Entry</h3>
        <Form.Group className="mb-3">
          <Form.Control
            required
            type="text"
            onChange={(e) => {
              setNameOfFood(e.target.value);
              setSelectedDate(props.selectedDate);
            }}
            placeholder={"Name of Entry"}
            id="foodName"
            className="calorie-entry-form-field"
          />
          <Form.Control
            required
            type="number"
            onChange={(e) => setCaloriesAmount(e.target.value)}
            placeholder={"Amount of Calories"}
            id="calorieAmount"
            className="calorie-entry-form-field"
          />
          <Form.Control
            type="number"
            onChange={(e) => setCarbsAmount(e.target.value)}
            placeholder={"Amount of Carbs (grams)"}
            id="carbsAmount"
            className="calorie-entry-form-field"
          />
          <Form.Control
            type="number"
            onChange={(e) => setFatAmount(e.target.value)}
            placeholder={"Amount of Fat (grams)"}
            id="fatAmount"
            className="calorie-entry-form-field"
          />
          <Form.Control
            type="number"
            onChange={(e) => setProteinAmount(e.target.value)}
            placeholder={"Amount of Protein (grams)"}
            id="proteinAmount"
            className="calorie-entry-form-field"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="calorie-entry-form-field"
        >
          Add Entry
        </Button>
      </Form>
    </div>
  );
}

export default RevenueEntryForm;
