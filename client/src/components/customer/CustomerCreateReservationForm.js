import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import {
  renderTextField,
  renderDatePicker,
  renderSelectField
} from "../../helpers/customerFormsHelper.js";
import { validateCustomerCreateReservationForm } from "../../helpers/customerFormsHelper.js";

class CustomerCreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { AdultValue: 1, ChildrenValue: 0 };
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("HERRE");
    const validationErrors = validateCustomerCreateReservationForm(formData);
    console.log("Errors", validationErrors);
  }

  handleAdultChange = (event, index, value) =>
    this.setState({ AdultValue: value });

  handleChildrenChange = (event, index, value) =>
    this.setState({ ChildrenValue: value });

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <div className="container">
        <h3>Create a reservation</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="startDate"
            label="Start-Date"
            component={renderDatePicker}
          />
          <br />
          <Field name="endDate" label="End-Date" component={renderDatePicker} />
          <br />
          <Field
            name="numberAdults"
            label="Number of Adults"
            component={renderSelectField}
          >
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
          </Field>
          <br />
          <Field
            name="numberChildrens"
            label="Number of childrens"
            component={renderSelectField}
          >
            <MenuItem value={0} primaryText="0" />
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
          </Field>
          <br />
          <Field
            name="observations"
            label="Observations"
            component={renderTextField}
            type="text"
          />
          <button type="submit">Submit</button>
        </form>
        {error && <strong>{error}</strong>}
      </div>
    );
  }
}

export default reduxForm({
  form: "customerCreateReservationForm",
  asyncBlurFields: ["startDate", "endDate"]
})(CustomerCreateReservationForm);
