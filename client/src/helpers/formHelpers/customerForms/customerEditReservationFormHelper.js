import moment from "moment";
import React from "react";
import MenuItem from "material-ui/MenuItem";
import { SubmissionError } from "redux-form";
import { formFields } from "../../formFields/customerForms/customerCreateReservationFormFields.js";

export const parseDate = string => {
  if (string === "") {
    return new Date();
  }

  let test = moment(string);
  return test._d;
};

export const renderMenuItems = (startValue, endValue) => {
  let menuItems = [];
  for (let i = startValue; i <= endValue; i++) {
    let item = <MenuItem key={i} value={i} primaryText={`${i}`} />;
    menuItems.push(item);
  }
  return menuItems;
};

export const style = {
  margin: 12
};

export function validateCustomerEditReservationForm(
  values,
  sendInvalidDatesMessage,
  sendInvalidPersonsMessage
) {
  console.log("In validation");
  const validationErrors = false;

  const { startDate, endDate, numberAdults, numberChildrens } = values;

  const totalPersons = numberAdults + numberChildrens;

  if (startDate > endDate) {
    sendInvalidDatesMessage();
    throw new SubmissionError({
      _error: "Start date cannot be a date after the end date!"
    });
  }

  if (totalPersons > 4) {
    sendInvalidPersonsMessage();
    throw new SubmissionError({
      _error: "The maximum number of persons allowed is 4"
    });
  }

  return validationErrors;
}
