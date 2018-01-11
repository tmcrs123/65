/**
 * Remove imports I dont need
 * merge handlechange adulsts and children
 * shorten render form method to use form fields
 * organize helpers
 */

import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import axios from "axios";
import * as actions from "../../actions/customer_actions.js";

import { renderTextField } from "../../helpers/formComponents/textFields.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderSelectField } from "../../helpers/formComponents/selectFields.js";
import { renderCheckbox } from "../../helpers/formComponents/checkbox.js";
import {
  validateCustomerCreateReservationForm,
  style
} from "../../helpers/formHelpers/customerForms/customerCreateReservationHelper.js";
import { renderMenuItems } from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";

class CustomerCreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteReservationMessage: false
    };
  }

  handleRequestClose() {
    this.props.clearCustomerReservationFormMessage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showDeleteReservationMessage: true });
    } else {
      this.setState({ showDeleteReservationMessage: false });
    }
  }

  handleDateChange() {
    /**
     * Explain why set timeout
     */
    setTimeout(() => {
      if (this.props.startDate && this.props.endDate) {
        axios.get("/api/price").then(res => {
          this.props.change("price", res.data.price);
          this.handleCheckboxChange(this.props.upfrontPayment);
        });
      }
    }, 500);
  }

  handleCheckboxChange(value) {
    value
      ? this.props.change("payNow", this.props.price)
      : this.props.change("payNow", this.props.price * 0.1);
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("got form data", formData);
    validateCustomerCreateReservationForm(
      formData,
      this.props.sendInvalidDatesMessage,
      this.props.sendInvalidPersonsMessage
    );
    this.props.submitCustomerReservationForm(
      {
        ...formData,
        createdByCustomer: true
      },
      this.props.reset
    );
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;

    return (
      <div className="container">
        <h3>Create a reservation</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="form-group">
            <Field
              name="startDate"
              label="Start-Date"
              component={renderDatePicker}
              onChange={() => this.handleDateChange()}
            />
            <br />
            <Field
              name="endDate"
              label="End-Date"
              component={renderDatePicker}
              onChange={() => this.handleDateChange()}
            />
            <br />
          </div>
          <Field name="price" label="Price" component={renderPriceField} />
          <br />
          <Field
            name="upfrontPayment"
            label="Pay reservation total now?"
            component={renderCheckbox}
            onChange={(event, value) => this.handleCheckboxChange(value)}
          />
          <br />
          <Field name="payNow" label="Pay Now" component={renderPriceField} />
          <br />
          <Field
            name="numberAdults"
            label="Number of Adults"
            component={renderSelectField}
          >
            {renderMenuItems(1, 4)}
          </Field>
          <br />
          <Field
            name="numberChildrens"
            label="Number of childrens"
            component={renderSelectField}
          >
            {renderMenuItems(0, 3)}
          </Field>
          <br />
          <Field
            name="observations"
            label="Observations"
            component={renderTextField}
            multiline={true}
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
            onClick={reset}
          />
        </form>
        <Snackbar
          open={this.state.showDeleteReservationMessage}
          message={this.props.message}
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}
        />
      </div>
    );
  }
}

const selector = formValueSelector("customerCreateReservationForm");

function mapStateToProps(state) {
  const upfrontPayment = selector(state, "upfrontPayment");
  const price = selector(state, "price");
  const startDate = selector(state, "startDate");
  const endDate = selector(state, "endDate");
  const payNow = selector(state, "payNow");

  return {
    message: state.customerMessages.message,
    upfrontPayment,
    price,
    startDate,
    endDate,
    payNow
  };
}

CustomerCreateReservationForm = reduxForm({
  form: "customerCreateReservationForm",
  enableReinitialize: true,
  initialValues: { upfrontPayment: false }
})(CustomerCreateReservationForm);

CustomerCreateReservationForm = connect(mapStateToProps, actions)(
  CustomerCreateReservationForm
);

export default CustomerCreateReservationForm;
