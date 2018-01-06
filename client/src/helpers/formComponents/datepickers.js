import React from "react";
import DatePicker from "material-ui/DatePicker";
import { disableWeekends } from "../formHelpers/customerForms/customerCreateReservationHelper.js";

export function renderDatePicker(props) {
  return (
    <DatePicker
      name={props.label}
      shouldDisableDate={disableWeekends}
      autoOk={true}
      onChange={props.onChange}
      hintText={props.label}
      errorText={props.meta.touched && props.meta.error}
      {...props}
      onChange={(event, value, index) => {
        props.input.onChange(value);
      }}
    />
  );
}
