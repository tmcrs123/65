import React from "react";
import TextField from "material-ui/TextField";

export function renderPriceField(formProps) {
  return (
    <TextField
      hintText={formProps.label}
      floatingLabelText={formProps.label}
      value={`${formProps.price} €`}
      disabled={true}
      errorText={formProps.meta.touched && formProps.meta.error}
    />
  );
}

export function renderSimplePriceField(formProps) {
  return (
    <TextField
      name={formProps.name}
      hintText={formProps.label}
      floatingLabelText={formProps.label}
      value={formProps.input.value}
      disabled={true}
      errorText={formProps.meta.touched && formProps.meta.error}
    />
  );
}

export function renderTextField(formProps) {
  return (
    <TextField
      hintText={formProps.label}
      floatingLabelText={formProps.label}
      value={formProps.input.value}
      errorText={formProps.meta.touched && formProps.meta.error}
      {...formProps.input}
      multiLine={formProps.multiLine}
      fullWidth={formProps.fullWidth}
      rows={2}
      rowsMax={4}
    />
  );
}

export function renderTextFieldControlled(formProps) {
  return (
    <TextField
      floatingLabelText={formProps.label}
      errorText={formProps.meta.touched && formProps.meta.error}
      multiLine={formProps.multiLine}
      fullWidth={formProps.fullWidth}
      value={formProps.text}
      onChange={formProps.input.onChange}
      rows={2}
      rowsMax={4}
    />
  );
}
