import React from "react";
import DatePicker from "material-ui/DatePicker";

function disablePastDates(date) {
  if (date.getTime() < Date.now()) return true;
  return false;
}

export function renderDatePicker(props) {
  return (
    <DatePicker
      name={props.name}
      floatingLabelText={props.label}
      shouldDisableDate={disablePastDates}
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
