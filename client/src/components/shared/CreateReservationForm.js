import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import * as formActions from "../../actions/form_actions/CreateReservationFormActions";
import * as customerActions from "../../actions/admin_actions";

import { renderTextField } from "../../helpers/formComponents/textFields.js";
import { renderPriceField } from "../../helpers/formComponents/textFields.js";
import { renderDatePicker } from "../../helpers/formComponents/datepickers.js";
import { renderSelectField } from "../../helpers/formComponents/selectFields.js";
import { renderCheckbox } from "../../helpers/formComponents/checkbox.js";
import validate from "../../helpers/formValidation/createReservationFormValidation";

const composedActions = { ...formActions, ...customerActions };

class CreateReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  componentDidMount() {
    this.props.getCustomerList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  createCustomerList() {
    let customers = [];
    this.props.customers.map(customer => {
      customers.push(
        <MenuItem
          key={customer.id}
          value={customer.id}
          primaryText={`${customer.name}`}
        />
      );
    });
    return customers;
  }

  renderSelectCustomerField() {
    if (!this.props.isAdmin) return null;

    return (
      <Field
        name="customerId"
        label="Select a customer"
        component={renderSelectField}
      >
        {this.createCustomerList()}
      </Field>
    );
  }

  renderMenuItems = (startValue, endValue) => {
    let menuItems = [];
    for (let i = startValue; i <= endValue; i++) {
      let item = <MenuItem key={i} value={i} primaryText={`${i}`} />;
      menuItems.push(item);
    }
    return menuItems;
  };

  handleRequestClose() {
    this.props.clearMessage();
  }

  handlePriceChange() {
    setTimeout(() => {
      this.props.upfrontPayment
        ? this.props.change("payNow", this.props.price)
        : this.props.change("payNow", this.props.price * 0.1);
    }, 500);
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
    let price = "";

    value
      ? this.props.change("payNow", this.props.price)
      : this.props.change("payNow", this.props.price * 0.1);
  }

  handleFormSubmit(formData, dispatchFunction, formProps) {
    formData["price"] = Number(formData["price"]);
    formData["payNow"] = Number(formData["payNow"]);
    console.log("form data", formData);
    validate(
      formData,
      this.props.sendInvalidDatesMessage,
      this.props.sendInvalidPersonsMessage,
      this.props.sendInvalidPriceMessage
    );
    // this.props.submitCustomerReservationForm(
    //   {
    //     ...formData,
    //     createdByCustomer: true
    //   },
    //   this.props.reset
    // );
  }

  render() {
    console.log("props in render", this);
    const { handleSubmit, error, reset, pristine, submitting } = this.props;

    return (
      <div className="container">
        <h3>TEST CREATE RESERVATION</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="form-group">
            {this.props.isAdmin ? this.renderSelectCustomerField() : null}
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
          <Field
            name="price"
            label="Price"
            component={renderPriceField}
            onChange={() => this.handlePriceChange()}
            disabled={false}
          />
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
            {this.renderMenuItems(1, 4)}
          </Field>
          <br />
          <Field
            name="numberChildrens"
            label="Number of childrens"
            component={renderSelectField}
          >
            {this.renderMenuItems(0, 3)}
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
            fullWidth={false}
          />
          <RaisedButton
            type="button"
            label="Clear Value"
            disabled={pristine || submitting}
            primary={true}
            fullWidth={false}
            onClick={reset}
          />
        </form>
        <Snackbar
          open={this.state.showMessage}
          message={this.props.message}
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}
        />
      </div>
    );
  }
}

const selector = formValueSelector("CreateReservationForm");

function mapStateToProps(state) {
  const upfrontPayment = selector(state, "upfrontPayment");
  const price = selector(state, "price");
  const startDate = selector(state, "startDate");
  const endDate = selector(state, "endDate");
  const payNow = selector(state, "payNow");

  return {
    message: state.reservationForm.message,
    customers: state.adminCustomerList,
    customerInfo: state.customerInfo,
    adminInfo: state.adminAuth,
    upfrontPayment,
    price,
    startDate,
    endDate,
    payNow
  };
}

CreateReservationForm = reduxForm({
  form: "CreateReservationForm",
  enableReinitialize: true,
  initialValues: { upfrontPayment: false }
})(CreateReservationForm);

CreateReservationForm = connect(mapStateToProps, composedActions)(
  CreateReservationForm
);

export default CreateReservationForm;
