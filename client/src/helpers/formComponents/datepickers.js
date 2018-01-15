import React from "react";
import DatePicker from "material-ui/DatePicker";
import {
  parseDate,
  renderMenuItems,
  style
} from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";

function disableWeekends(date) {
  if (date.getTime() < Date.now()) return true;
  return false;
}

export function renderDatePicker(props) {
  return (
    <DatePicker
      name={props.name}
      floatingLabelText={props.label}
      shouldDisableDate={disableWeekends}
      autoOk={true}
      value={props.input.value ? props.input.value : {}}
      onChange={(event, value, index) => {
        props.input.onChange(value);
      }}
      hintText={props.label}
      errorText={props.meta.touched && props.meta.error}
    />
  );
}
