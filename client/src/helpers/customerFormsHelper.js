import React from "react";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import { SubmissionError } from "redux-form";
import customerCreateReservationFormFields from "../components/customer/customerCreateReservationFormFields.js";

export function renderTextField(formProps) {
  return (
    <TextField
      hintText={formProps.label}
      floatingLabelText={formProps.label}
      type={formProps.type}
      {...formProps.input}
      errorText={formProps.meta.touched && formProps.meta.error}
      multiLine={true}
      fullWidth={true}
      rows={2}
      rowsMax={4}
    />
  );
}

function disableWeekends(date) {
  if (date.getTime() < Date.now()) return true;
  return false;
}

export function renderDatePicker(props) {
  return (
    <DatePicker
      name={props.label}
      shouldDisableDate={disableWeekends}
      autoOk={true}
      hintText={props.label}
      errorText={props.meta.touched && props.meta.error}
      {...props}
      onChange={(event, value, index) => {
        props.input.onChange(value);
      }}
    />
  );
}

export function renderSelectField(formProps) {
  return (
    <SelectField
      floatingLabelText={formProps.label}
      errorText={formProps.meta.touched && formProps.meta.error}
      {...formProps.input}
      children={formProps.children}
      onChange={(event, index, value) => formProps.input.onChange(value)}
    />
  );
}

export function validateCustomerCreateReservationForm(values) {
  const validationErrors = false;

  const { startDate, endDate, numberAdults, numberChildrens } = values;

  const totalPersons = numberAdults + numberChildrens;

  console.log(values);

  customerCreateReservationFormFields.forEach(field => {
    if (field.required && !values[field.name]) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase insert a ${field.label}`,
        _error: "Reservation NOT created!"
      });
    }
  });

  if (startDate > endDate) {
    throw new SubmissionError({
      _error: "Start date cannot be a date after the end date!"
    });
  }

  if (totalPersons > 4) {
    throw new SubmissionError({
      _error: "The maximum number of persons allowed is 4"
    });
  }

  return validationErrors;
}
