import React from "react";
import Checkbox from "material-ui/Checkbox";

export const renderCheckbox = props => {
  console.log("checkbox props", props);
  return (
    <Checkbox
      label={props.label}
      checked={props.checked}
      onCheck={props.input.onChange}
    />
  );
};

export const renderSimpleCheckbox = props => {
  console.log("checkbox props", props);
  return (
    <Checkbox
      label={props.label}
      checked={props.input.value}
      onCheck={props.input.onChange}
    />
  );
};
