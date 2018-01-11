import React from "react";
import Checkbox from "material-ui/Checkbox";

export const renderCheckbox = props => {
  return (
    <Checkbox
      label={props.label}
      checked={props.input.value ? props.input.value : false}
      value={props.input.value}
      onCheck={(event, value) => {
        props.input.onChange(event, value);
      }}
    />
  );
};

export const renderSimpleCheckbox = props => {
  return (
    <Checkbox
      label={props.label}
      checked={props.input.value}
      onCheck={props.input.onChange}
    />
  );
};
