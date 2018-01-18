import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { reduxForm, Field } from "redux-form";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import * as actions from "../../actions/actions_index";
import validate from "../../helpers/formValidation/adminDateIntervalsFormValidation";

class AdminDateIntervalsForm extends Component {
  handleFormSubmit(formData, dispatchFunction, formProps) {
    validate(
      formData,
      this.props.sendInvalidDatesMessage,
      this.props.sendInvalidPriceMessage
    );
    this.props.saveDateInterval(formData);
    formProps.reset();
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

AdminDateIntervalsForm = reduxForm({
  form: "dateIntervalsForm",
  enableReinitialize: true
})(AdminDateIntervalsForm);

AdminDateIntervalsForm = connect(null, actions)(AdminDateIntervalsForm);

export default AdminDateIntervalsForm;
