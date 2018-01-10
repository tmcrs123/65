import React from "react";
import TextField from "material-ui/TextField";

export function renderPriceField(props) {
  return (
    <TextField
      hintText={props.label}
      floatingLabelText={props.label}
      value={props.input.value ? `${props.input.value}€` : `${0}€`}
      disabled={true}
      errorText={props.meta.touched && props.meta.error}
    />
  );
}

export function renderSimplePriceField(props) {
  return (
    <TextField
      name={props.name}
      hintText={props.label}
      floatingLabelText={props.label}
      value={props.input.value}
      disabled={true}
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
      multiLine={props.multiLine}
      fullWidth={props.fullWidth}
      rows={2}
      rowsMax={4}
    />
  );
}

export function renderTextFieldControlled(props) {
  return (
    <TextField
      floatingLabelText={props.label}
      errorText={props.meta.touched && props.meta.error}
      multiLine={props.multiLine}
      fullWidth={props.fullWidth}
      value={props.text}
      onChange={props.input.onChange}
      rows={2}
      rowsMax={4}
    />
  );
}
