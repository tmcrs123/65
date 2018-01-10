import React from "react";
import DatePicker from "material-ui/DatePicker";
import { disableWeekends } from "../formHelpers/customerForms/customerCreateReservationHelper.js";
import {
  parseDate,
  renderMenuItems,
  style
} from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";

export function renderDatePicker(props) {
  return (
    <DatePicker
      name={props.label}
      shouldDisableDate={disableWeekends}
      autoOk={true}
      onChange={props.onChange}
      floatingLabelText={props.label}
      hintText={props.label}
      value={props.date}
      errorText={props.meta.touched && props.meta.error}
      {...props}
      onChange={(event, value, index) => {
        props.input.onChange(value);
      }}
    />
  );
}

export function renderSimpleDatePicker(props) {
  const date = parseDate(props.input.value);
  return (
    <DatePicker
      name={props.name}
      shouldDisableDate={disableWeekends}
      autoOk={true}
      value={date}
      onChange={(event, value, index) => {
        props.input.onChange(value);
      }}
      floatingLabelText={props.label}
      hintText={props.label}
      errorText={props.meta.touched && props.meta.error}
    />
  );
}
