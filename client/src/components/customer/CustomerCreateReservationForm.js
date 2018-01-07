/**
 * Remove imports I dont need
 * merge handlechange adulsts and children
 * shorten render form method to use form fields
 * organize helpers
 */

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import * as actions from "../../actions/customer_actions.js";

import { renderTextField } from "../../helpers/formComponents/textFields.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderSelectField } from "../../helpers/formComponents/selectFields.js";
import { renderCheckbox } from "../../helpers/formComponents/checkbox.js";
import { validateCustomerCreateReservationForm } from "../../helpers/formHelpers/customerForms/customerCreateReservationHelper.js";
import { formFields } from "../../helpers/formFields/customerForms/customerCreateReservationFormFields.js";

class CustomerCreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AdultValue: 1,
      ChildrenValue: 0,
      startDate: undefined,
      endDate: undefined,
      price: 0,
      totalPayment: false
    };
  }

  handleCheckboxChange() {
    this.setState({ totalPayment: !this.state.totalPayment });
  }

  handleFormClear(reset) {
    reset();
    this.setState({ startDate: undefined });
    this.setState({ endDate: undefined });
  }

  handleDateChange(event, newValue, caller) {
    this.setState({ [caller]: newValue });
    if (this.state.startDate && this.state.endDate) {
      axios.get("/api/price").then(res => {
        this.setState({ price: res.data.price });
      });
    }
    if (this.props.error) this.props.clearSubmitErrors();
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log(formData);
    const validationErrors = validateCustomerCreateReservationForm(formData);
    console.log("Submitting form to DB");
    this.props.submitCustomerReservationForm({
      ...formData,
      reservationPrice: this.state.price
    });
  }

  renderMenuItems(startValue, endValue) {
    let menuItems = [];
    for (let i = startValue; i <= endValue; i++) {
      let item = <MenuItem key={i} value={i} primaryText={`${i}`} />;
      menuItems.push(item);
    }
    return menuItems;
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;

    const style = {
      margin: 12
    };

    return (
      <div className="container">
        <h3>Create a reservation</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="form-group" style={{ display: "block" }}>
            <Field
              name="startDate"
              label="Start-Date"
              component={renderDatePicker}
              date={this.state.startDate}
              onChange={(event, newValue) =>
                this.handleDateChange(event, newValue, "startDate")}
            />
            <br />
            <Field
              name="endDate"
              label="End-Date"
              component={renderDatePicker}
              date={this.state.endDate}
              onChange={(event, newValue) =>
                this.handleDateChange(event, newValue, "endDate")}
            />
            <br />
          </div>
          <Field
            name="reservationPrice"
            label="Price"
            price={this.state.price}
            component={renderPriceField}
          />
          <br />
          <br />
          <Field
            name="totalPayment"
            label="Pay reservation total now?"
            component={renderCheckbox}
            onChange={() => this.handleCheckboxChange()}
          />
          <br />
          <Field
            name="payNow"
            label="Pay Now"
            price={
              this.state.totalPayment
                ? this.state.price
                : this.state.price * 0.1
            }
            component={renderPriceField}
          />
          <br />
          <Field
            name="numberAdults"
            label="Number of Adults"
            component={renderSelectField}
            clearErrors={this.props.clearSubmitErrors}
          >
            {this.renderMenuItems(1, 4)}
          </Field>
          <br />
          <Field
            name="numberChildrens"
            label="Number of childrens"
            component={renderSelectField}
            clearErrors={this.props.clearSubmitErrors}
          >
            {this.renderMenuItems(0, 3)}
          </Field>
          <br />
          <Field
            name="observations"
            label="Observations"
            component={renderTextField}
            multiline={true}
            onChange={() => this.props.clearSubmitErrors()}
          />
          <br />
          <RaisedButton
            type="Submit"
            label="Submit"
            disabled={pristine || submitting}
            primary={true}
            style={style}
            fullWidth={false}
          />
          <RaisedButton
            type="button"
            label="Clear Value"
            disabled={pristine || submitting}
            primary={true}
            style={style}
            fullWidth={false}
            onClick={() => this.handleFormClear(reset)}
          />
        </form>
        {error && <strong>{error}</strong>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { submitCustomerReservationForm: state.customerSubmitReservationForm };
}

CustomerCreateReservationForm = connect(mapStateToProps, actions)(
  CustomerCreateReservationForm
);

export default reduxForm({
  form: "customerCreateReservationForm",
  asyncBlurFields: ["startDate", "endDate"]
})(CustomerCreateReservationForm);
