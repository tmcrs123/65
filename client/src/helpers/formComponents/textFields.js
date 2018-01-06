import React from "react";
import TextField from "material-ui/TextField";

export function renderTextField(formProps) {
  return (
    <TextField
      hintText={formProps.label}
      floatingLabelText={formProps.label}
      type={formProps.type}
      value={`${formProps.reservationPrice} €`}
      disabled={formProps.disabled}
      errorText={formProps.meta.touched && formProps.meta.error}
      multiLine={true}
      fullWidth={formProps.fullWidth}
      rows={2}
      rowsMax={4}
    />
  );
}
