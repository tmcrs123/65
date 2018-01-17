import React from "react";
import TextField from "material-ui/TextField";

export function renderPriceField(props) {
  let value = 0;

  if (isNaN(props.input.value)) {
    value = "";
  } else if (typeof props.input.value === "string") {
    if (props.input.value === "") {
      value = "";
    } else {
      value = Number(props.input.value);
    }
  } else {
    value = props.input.value;
  }

  return (
    <TextField
      hintText={props.label}
      floatingLabelText={props.label}
      value={value}
      onChange={props.input.onChange}
      disabled={props.disabled}
      errorText={props.meta.touched && props.meta.error}
    />
  );
}

export function renderTextField(props) {
  return (
    <TextField
      hintText={props.label}
      floatingLabelText={props.label}
      value={props.input.value}
      errorText={props.meta.touched && props.meta.error}
      {...props.input}
      type={props.type}
      disabled={props.disabled}
      rows={props.rows}
      multiLine={props.multiLine}
      rowsMax={props.rowsMax}
    />
  );
}
