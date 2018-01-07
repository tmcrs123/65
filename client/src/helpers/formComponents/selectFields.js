import React from "react";
import SelectField from "material-ui/SelectField";

export function renderSelectField(formProps) {
  return (
    <SelectField
      floatingLabelText={formProps.label}
      errorText={formProps.meta.touched && formProps.meta.error}
      {...formProps.input}
      children={formProps.children}
      onChange={(event, index, value) => {
        formProps.clearErrors();
        formProps.input.onChange(value);
      }}
    />
  );
}
