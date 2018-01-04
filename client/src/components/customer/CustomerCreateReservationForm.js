import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import {
  renderTextField,
  renderDatePicker
} from "../../helpers/customerFormsHelper.js";

class CustomerCreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { AdultValue: 1, ChildrenValue: 0 };
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("in customer create reservation from submit");
    console.log(formData);
  }

  handleAdultChange = (event, index, value) =>
    this.setState({ AdultValue: value });

  handleChildrenChange = (event, index, value) =>
    this.setState({ ChildrenValue: value });

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <h3>Create a reservation</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="Start-Date"
            label="Start-Date"
            component={renderDatePicker}
          />
          <br />
          <Field
            name="End-Date"
            label="End-Date"
            component={renderDatePicker}
          />
          <br />
          <SelectField
            floatingLabelText="Adults"
            value={this.state.AdultValue}
            onChange={this.handleAdultChange}
          >
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
          </SelectField>
          <br />
          <SelectField
            floatingLabelText="Children"
            value={this.state.ChildrenValue}
            onChange={this.handleChildrenChange}
          >
            <MenuItem value={0} primaryText="0" />
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
          </SelectField>
          <br />
          <Field
            name="Observations"
            label="Observations"
            component={renderTextField}
            type="text"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "customerCreateReservationForm" })(
  CustomerCreateReservationForm
);
