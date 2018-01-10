import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { reduxForm, Field, formValueSelector } from "redux-form";
import * as actions from "../../actions/customer_actions.js";

import { renderSimpleDatePicker } from "../../helpers/formComponents/datepickers.js";
import {
  parseDate,
  renderMenuItems,
  style
} from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";
import {
  renderPriceField,
  renderSimplePriceField
} from "../../helpers/formComponents/textFields.js";
import { renderSimpleCheckbox } from "../../helpers/formComponents/checkbox.js";
import { renderSimpleSelectField } from "../../helpers/formComponents/selectFields.js";
import { renderTextField } from "../../helpers/formComponents/textFields.js";
import { validateCustomerEditReservationForm } from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";

import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";

class CustomerEditReservationForm extends Component {
  componentDidMount() {
    const selectedReservationId = this.props.match.params.id;
    this.props.selectedReservation(selectedReservationId);
  }

  handleDateChange(event, newValue, caller) {
    console.log("this in handle data change", this);
    if (this.props.startDate && this.props.endDate) {
      axios.get("/api/price").then(res => {
        this.setState({ price: res.data.price });
      });
    }
    if (this.props.error) this.props.clearSubmitErrors();
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("got form data", formData);
    // const validationErrors = validateCustomerEditReservationForm(formData);
  }

  render() {
    console.log("state in render", this);
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <div className="container">
        <h2>Edit a reservation</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="startDate"
            label="Start-Date"
            component={renderSimpleDatePicker}
            onChange={(event, newValue) =>
              this.handleDateChange(event, newValue, "startDate")}
          />
          <br />
          <Field
            name="endDate"
            label="End-Date"
            component={renderSimpleDatePicker}
            onChange={(event, newValue) =>
              this.handleDateChange(event, newValue, "endDate")}
          />
          <br />
          <Field
            name="totalValue"
            label="Price"
            component={renderSimplePriceField}
          />
          <br />
          <Field
            name="totalPayment"
            id="totalPayment"
            label="Pay reservation total now?"
            component={renderSimpleCheckbox}
          />
          <br />
          <Field
            name="payNow"
            label="Pay Now"
            price={
              this.props.totalPayment
                ? this.props.totalValue
                : this.props.totalValue * 0.1
            }
            component={renderPriceField}
          />
          <br />
          <Field
            name="numberAdults"
            label="Number of Adults"
            component={renderSimpleSelectField}
            clearErrors={this.props.clearSubmitErrors}
          >
            {renderMenuItems(1, 4)}
            <br />
          </Field>
          <br />
          <Field
            name="numberChildrens"
            label="Number of childrens"
            component={renderSimpleSelectField}
            clearErrors={this.props.clearSubmitErrors}
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
          {error && <strong>{error}</strong>}
        </form>
      </div>
    );
  }
}

const selector = formValueSelector("customerEditReservationForm");

function mapStateToProps(state) {
  const startDate = selector(state, "startDate");
  const endDate = selector(state, "endDate");
  const totalPayment = selector(state, "totalPayment");
  const totalValue = selector(state, "totalValue");
  return {
    initialValues: state.customerInfo.selectedReservation,
    startDate,
    endDate,
    totalPayment,
    totalValue
  };
}
/**
 * A Ordem interessa!
 * 
 */

CustomerEditReservationForm = reduxForm({
  form: "customerEditReservationForm",
  enableReinitialize: true
})(CustomerEditReservationForm);

CustomerEditReservationForm = connect(mapStateToProps, actions)(
  CustomerEditReservationForm
);

export default CustomerEditReservationForm;
