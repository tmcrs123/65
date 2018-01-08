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
