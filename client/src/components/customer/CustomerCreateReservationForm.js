import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import {
  renderTextField,
  renderDatePicker,
  renderSelectField
} from "../../helpers/customerFormsHelper.js";
import { validateCustomerCreateReservationForm } from "../../helpers/customerFormsHelper.js";

const style = {
  margin: 12
};

class CustomerCreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AdultValue: 1,
      ChildrenValue: 0,
      startDate: undefined,
      endDate: undefined,
      price: 0
    };
  }

  handleDateChange(event, newValue, caller) {
    this.setState({ [caller]: newValue });
    if (this.state.startDate && this.state.endDate) {
      axios.get("/api/price").then(res => {
        this.setState({ price: res.data.price });
      });
    }
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
    const price = this.state.price;

    return (
      <div className="container">
        <h3>Create a reservation</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="startDate"
            label="Start-Date"
            component={renderDatePicker}
            onChange={(event, newValue) =>
              this.handleDateChange(event, newValue, "startDate")}
          />
          <br />

          <Field
            name="endDate"
            label="End-Date"
            component={renderDatePicker}
            onChange={(event, newValue) =>
              this.handleDateChange(event, newValue, "endDate")}
          />
          <br />
          <Field
            name="reservationPrice"
            disabled={true}
            fullWidth={false}
            label="Price"
            reservationPrice={this.state.price}
            component={renderTextField}
          />
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
          <br />
          <RaisedButton
            type="submit"
            label="Submit"
            primary={true}
            style={style}
            fullWidth={false}
          />
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
