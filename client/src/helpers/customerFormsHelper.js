import React from "react";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";

export function renderTextField(formProps) {
  return (
    <TextField
      hintText={formProps.label}
      floatingLabelText={formProps.label}
      type={formProps.type}
      {...formProps.input}
      errorText={formProps.meta.touched && formProps.meta.error}
      multiLine={true}
      fullWidth={true}
      rows={2}
      rowsMax={4}
    />
  );
}

export function renderDatePicker(formProps) {
  console.log(formProps);
  return <DatePicker hintText={formProps.label} />;
}

// export default function renderTextField({
//     input,
//     type,
//     label,
//     meta: { touched, error }
//   }) {
//     return (
//       <div>
//         <TextField
//           hintText={label}
//           floatingLabelText={label}
//           errorText={touched && error}
//           type={type}
//           underlineShow={true}
//           {...input}
//         />
//         <br />
//         <br />
//       </div>
//     );
//   }
