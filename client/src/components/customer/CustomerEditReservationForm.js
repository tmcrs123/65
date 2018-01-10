import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { reduxForm, Field, formValueSelector } from "redux-form";
import * as actions from "../../actions/customer_actions.js";

import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import {
  parseDate,
  renderMenuItems,
  style
} from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import { renderCheckbox } from "../../helpers/formComponents/checkbox.js";
import { renderSelectField } from "../../helpers/formComponents/selectFields.js";
import { renderTextField } from "../../helpers/formComponents/textFields.js";
import { validateCustomerEditReservationForm } from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";

import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";

class CustomerEditReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteReservationMessage: false
    };
  }

  componentDidMount() {
    const selectedReservationId = this.props.match.params.id;
    this.props.selectedReservation(selectedReservationId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showDeleteReservationMessage: true });
    } else {
      this.setState({ showDeleteReservationMessage: false });
    }
  }

  handleRequestClose() {
    this.props.clearCustomerReservationFormMessage();
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
      ? this.props.change("price_toPay", this.props.price)
      : this.props.change("price_toPay", this.props.price * 0.1);
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    console.log("got form data", formData);
    const validationErrors = validateCustomerEditReservationForm(
      formData,
      this.props.sendInvalidDatesMessage
    );
    this.props.updateReservation(
      this.props.match.params.id,
      formData,
      this.props.history
    );
  }

  render() {
    const { handleSubmit, error, reset, pristine, submitting } = this.props;
    return (
      <div className="container">
        <h2>Edit a reservation</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
          <Field name="price" label="Price" component={renderPriceField} />
          <br />
          <Field
            name="upfrontPayment"
            id="upfrontPayment"
            label="Pay reservation total now?"
            component={renderCheckbox}
            onChange={(event, value) => this.handleCheckboxChange(value)}
          />
          <br />
          <Field
            name="price_toPay"
            label="Pay Now"
            component={renderPriceField}
          />
          <br />
          <Field
            name="numberAdults"
            label="Number of Adults"
            component={renderSelectField}
          >
            {renderMenuItems(1, 4)}
            <br />
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

const selector = formValueSelector("customerEditReservationForm");

function mapStateToProps(state) {
  const startDate = selector(state, "startDate");
  const endDate = selector(state, "endDate");
  const upfrontPayment = selector(state, "upfrontPayment");
  const price = selector(state, "price");
  const priceToPay = selector(state, "price_toPay");

  return {
    message: state.customerMessages.message,
    initialValues: state.customerSelectedReservation,
    startDate,
    endDate,
    upfrontPayment,
    price,
    priceToPay
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
