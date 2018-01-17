import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";

class AdminDateIntervalsForm extends Component {
  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("form data", formData);
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="startDate"
          label="Start-Date"
          component={renderDatePicker}
        />
        <Field name="endDate" label="End-Date" component={renderDatePicker} />

        <Field name="price" label="Price" component={renderPriceField} />
        <RaisedButton
          type="Submit"
          label="Submit"
          disabled={pristine || submitting}
          primary={true}
          fullWidth={false}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "dateIntervalsForm",
  enableReinitialize: true
})(AdminDateIntervalsForm);
